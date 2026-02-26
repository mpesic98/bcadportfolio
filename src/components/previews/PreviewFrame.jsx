import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { endemicCatalog } from "../../data/endemicCatalog"
import { nonEndemicCatalog } from "../../data/nonEndemicCatalog"
import { normalizeRegion, normalizeSegment } from "../../data/regionConfig"
import { PreviewViewportProvider, usePreviewViewport } from "./previewViewport.jsx"

const TABS_SCROLL_STORAGE_KEY = "preview-format-tabs-scroll-left"
let tabsScrollMemory = 0

function readSavedTabsScroll() {
  if (typeof window === "undefined") return tabsScrollMemory
  const raw = window.sessionStorage.getItem(TABS_SCROLL_STORAGE_KEY)
  if (!raw) return tabsScrollMemory
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : tabsScrollMemory
}

function saveTabsScroll(value) {
  const next = Math.max(0, Math.round(value || 0))
  tabsScrollMemory = next

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(TABS_SCROLL_STORAGE_KEY, String(next))
  }
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="7" y="2.5" width="10" height="19" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18.5" r="1" fill="currentColor" />
    </svg>
  )
}

function resolveMobileTargetSlot(formatId) {
  if (!formatId) return null
  if (formatId === "leadgen") return "mobile_inline_300x600"
  if (formatId === "pre-roll-video") return "mobile_preroll"
  if (formatId === "interstitial" || formatId === "interscroller") return null
  return "mobile_inline_300x250_1"
}

export default function PreviewFrame({
  children,
  maxWidth = 1100,
  controlsMaxWidth = 1100,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { region: regionParam, segment: segmentParam, formatId } = useParams()

  const region = normalizeRegion(regionParam)
  const segment = normalizeSegment(segmentParam)

  const catalog = segment === "endemic" ? endemicCatalog : nonEndemicCatalog
  const tabs = useMemo(() => {
    const uniqueByKey = new Map()
    catalog.forEach((item) => {
      if (!uniqueByKey.has(item.formatId)) {
        uniqueByKey.set(item.formatId, {
          key: item.formatId,
          label: item.title,
        })
      }
    })
    return Array.from(uniqueByKey.values())
  }, [catalog])

  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const queryVp = search.get("vp")
  const forcedVp = queryVp === "mobile" || queryVp === "desktop" ? queryVp : null

  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const rootViewportRef = useRef(null)
  const mobileViewportRef = useRef(null)

  const headerViewport = usePreviewViewport(headerRef)
  const rootViewport = usePreviewViewport(rootViewportRef)
  const mobileViewport = usePreviewViewport(mobileViewportRef)

  const deviceW = 390
  const mobileFrameHeight = "clamp(620px, calc(100dvh - 120px), 900px)"

  const fallbackWindowWidth = typeof window !== "undefined" ? window.innerWidth || 0 : 0
  const fallbackWindowHeight = typeof window !== "undefined" ? window.innerHeight || 0 : 0
  const rootViewportWidth = rootViewport.width || fallbackWindowWidth
  const rootViewportHeight = rootViewport.height || fallbackWindowHeight
  const vp = forcedVp ?? (rootViewportWidth < 900 ? "mobile" : "desktop")

  const viewportWidth =
    vp === "mobile"
      ? mobileViewport.width || deviceW
      : rootViewportWidth

  const viewportHeight =
    vp === "mobile"
      ? mobileViewport.height || 844
      : rootViewportHeight

  const shouldScaleDesktop =
    vp === "desktop" && rootViewportWidth > 0 && rootViewportWidth < 900
  const desktopScale = shouldScaleDesktop
    ? Math.max(0.55, Math.min(rootViewportWidth / Math.max(1, maxWidth), 1))
    : 1

  const measuredHeaderHeight = headerViewport.height || 72

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow

    if (vp === "mobile") {
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = prevHtml || ""
      document.body.style.overflow = prevBody || ""
    }

    return () => {
      document.documentElement.style.overflow = prevHtml || ""
      document.body.style.overflow = prevBody || ""
    }
  }, [vp])

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  const active = formatId

  useEffect(() => {
    if (vp !== "mobile") return undefined
    if (formatId !== "skin") return undefined

    const fallbackTab = tabs.find((tab) => tab.key !== "skin")
    if (!fallbackTab) return undefined

    const nextSearch = new URLSearchParams(location.search)
    if (forcedVp) {
      nextSearch.set("vp", forcedVp)
    } else {
      nextSearch.delete("vp")
    }

    const queryString = nextSearch.toString()
    navigate(
      `/${region}/${segment}/preview/${fallbackTab.key}${queryString ? `?${queryString}` : ""}`,
      {
        replace: true,
      }
    )

    return undefined
  }, [forcedVp, formatId, location.search, navigate, region, segment, tabs, vp])

  useEffect(() => {
    if (vp !== "mobile") return undefined

    const targetSlotId = resolveMobileTargetSlot(formatId)
    if (!targetSlotId) return undefined

    let raf = 0
    let timer = 0
    let attempts = 0

    const scrollToTarget = () => {
      const scroller = mobileViewportRef.current
      if (!scroller) {
        attempts += 1
        if (attempts >= 20) return

        timer = window.setTimeout(() => {
          raf = requestAnimationFrame(scrollToTarget)
        }, 75)
        return
      }

      const target = scroller.querySelector(`[data-slotid="${targetSlotId}"]`)
      const scrollTarget = target?.firstElementChild || target
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        return
      }

      attempts += 1
      if (attempts >= 20) return

      timer = window.setTimeout(() => {
        raf = requestAnimationFrame(scrollToTarget)
      }, 75)
    }

    raf = requestAnimationFrame(scrollToTarget)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (timer) window.clearTimeout(timer)
    }
  }, [formatId, vp])

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return undefined

    const raf = requestAnimationFrame(() => {
      el.scrollLeft = readSavedTabsScroll()
    })

    const onScroll = () => {
      saveTabsScroll(el.scrollLeft)
    }

    el.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("scroll", onScroll)
    }
  }, [tabs.length])

  useEffect(() => {
    const el = tabsRef.current
    if (!el) return undefined

    const handler = (event) => {
      if (el.scrollWidth <= el.clientWidth) return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation?.()

      el.scrollLeft += event.deltaY
      saveTabsScroll(el.scrollLeft)
    }

    el.addEventListener("wheel", handler, { passive: false })

    return () => {
      el.removeEventListener("wheel", handler)
    }
  }, [tabs.length])

  const setViewport = (next) => {
    const nextSearch = new URLSearchParams(location.search)
    nextSearch.set("vp", next)
    const queryString = nextSearch.toString()
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, { replace: true })
  }

  const goToTab = (key) => {
    if (vp === "mobile" && key === "skin") return

    if (tabsRef.current) saveTabsScroll(tabsRef.current.scrollLeft)

    const nextSearch = new URLSearchParams(location.search)
    if (forcedVp) {
      nextSearch.set("vp", forcedVp)
    } else {
      nextSearch.delete("vp")
    }
    const queryString = nextSearch.toString()
    navigate(`/${region}/${segment}/preview/${key}${queryString ? `?${queryString}` : ""}`)
  }

  const goHome = () => {
    navigate(`/${region}?segment=${segment}`)
  }

  return (
    <PreviewViewportProvider
      vp={vp}
      width={viewportWidth}
      height={viewportHeight}
      scrollElement={vp === "mobile" ? mobileViewportRef.current : null}
      isContainerViewport={vp === "mobile"}
    >
      <div ref={rootViewportRef} className="min-h-screen bg-neutral-100 overflow-x-hidden">
        <div
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200"
          style={{
            minHeight: "calc(80px + env(safe-area-inset-top))",
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <div
            className="mx-auto grid w-full grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 md:gap-y-0 px-4 py-2.5 md:px-6 md:py-3"
            style={{ maxWidth: controlsMaxWidth }}
          >
            <button
              type="button"
              onClick={goHome}
              className="px-4 py-1.5 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-700"
            >
              {"<"} Home
            </button>

            <div
              ref={tabsRef}
              className="preview-tabs-scroll col-span-2 row-start-2 md:col-span-1 md:row-start-1 md:col-start-2 min-w-0 flex items-center gap-2 overflow-x-auto whitespace-nowrap"
            >
              {tabs.map((tab) => {
                const isSkinDisabled = vp === "mobile" && tab.key === "skin"

                return (
                  <button
                    key={tab.key}
                    type="button"
                    disabled={isSkinDisabled}
                    onClick={() => {
                      if (isSkinDisabled) return
                      goToTab(tab.key)
                    }}
                    className={[
                      "px-3 py-1.5 rounded text-sm font-medium border shrink-0 transition-colors",
                      isSkinDisabled
                        ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
                        : active === tab.key
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                    ].join(" ")}
                    aria-disabled={isSkinDisabled}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="row-start-1 justify-self-end md:col-start-3 inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={[
                  "h-9 w-9 inline-flex items-center justify-center rounded border text-neutral-700",
                  vp === "desktop"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
                aria-label="Desktop preview"
                title="Desktop preview"
              >
                <DesktopIcon />
              </button>

              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={[
                  "h-9 w-9 inline-flex items-center justify-center rounded border text-neutral-700",
                  vp === "mobile"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
                aria-label="Mobile preview"
                title="Mobile preview"
              >
                <MobileIcon />
              </button>
            </div>
          </div>
        </div>

        <main
          className="relative z-10"
          style={{ paddingTop: measuredHeaderHeight }}
        >
          {vp === "desktop" ? (
            shouldScaleDesktop ? (
              <div className="mx-auto px-2 py-4 flex justify-center overflow-x-hidden">
                <div
                  className="shrink-0"
                  style={{
                    width: maxWidth,
                    maxWidth,
                    transform: `scale(${desktopScale})`,
                    transformOrigin: "top center",
                  }}
                >
                  {children}
                </div>
              </div>
            ) : (
              <div className="mx-auto" style={{ maxWidth }}>
                {children}
              </div>
            )
          ) : (
            <div className="mx-auto px-4 py-6 flex justify-center overflow-x-hidden">
              <div
                className="relative box-border bg-neutral-900 rounded-[34px] shadow-lg overflow-x-hidden"
                style={{ width: deviceW, maxWidth: deviceW }}
              >
                <div className="absolute top-[8px] left-1/2 -translate-x-1/2 h-[18px] w-[120px] rounded-full bg-neutral-800 z-10" />

                <div
                  className="bg-white rounded-[26px] overflow-hidden relative w-full max-w-full"
                  style={{ height: mobileFrameHeight }}
                >
                  <div
                    id="preview-overlay-root"
                    className="absolute inset-0 z-[3000]"
                    style={{ pointerEvents: "none" }}
                  />

                  <div
                    id="preview-mobile-sticky-root"
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-[2800]"
                  />

                  <div
                    tabIndex={0}
                    ref={mobileViewportRef}
                    className="preview-scroll h-full min-h-0 overflow-y-auto overflow-x-hidden relative overscroll-contain touch-pan-y focus:outline-none"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    {children}
                  </div>
                </div>

                <div className="mt-2 h-[6px] w-[120px] rounded-full bg-neutral-800 mx-auto" />
              </div>
            </div>
          )}
        </main>
      </div>
    </PreviewViewportProvider>
  )
}
