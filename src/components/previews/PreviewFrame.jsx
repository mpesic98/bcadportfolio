import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { publicCatalog } from "../../data/publicCatalog"
import { getProposalFormatById } from "../../data/proposalFormats"
import { PreviewCampaignProvider } from "../../features/proposals/PreviewCampaignContext.jsx"
import { useProposalStore } from "../../features/proposals/ProposalStore"
import { PreviewViewportProvider, usePreviewViewport } from "./previewViewport.jsx"
import PreviewSpecsPanel from "./PreviewSpecsPanel"

const TABS_SCROLL_STORAGE_KEY = "preview-format-tabs-scroll-left"
const HIDDEN_PREVIEW_INDEX_IDS = new Set([
  "pre-roll-video",
  "video-instream-nonskippable-onsite",
  "video-instream-nonskippable-youtube",
  "high-impact-latam-takeover",
  "high-impact-nam-takeover",
  "high-impact-emea-takeover",
])
const PUBLIC_HOME_ORDER = [
  "skin",
  "interscroller",
  "interstitial",
  "display-banners",
  "native",
  "mobile-slider",
  "livescore",
  "countdown-widget",
  "cube",
  "content-widget",
  "leadgen",
  "video-banners",
  "video-instream-skippable-onsite",
  "video-instream-skippable-youtube",
  "betsense-countdown",
  "betsense-three-way-odds",
]
const PUBLIC_HOME_ORDER_INDEX = new Map(
  PUBLIC_HOME_ORDER.map((formatId, index) => [formatId, index])
)
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

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M3.5 10.5 12 3l8.5 7.5M5.5 9.2V21h13V9.2M9.5 21v-6h5v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function resolveMobileTargetSlot(formatId) {
  if (!formatId) return null
  if (formatId === "leadgen") return "mobile_inline_300x600"
  if (formatId === "pre-roll-video" || formatId.startsWith("video-instream-")) return "mobile_preroll"
  if (
    formatId === "interstitial" ||
    formatId === "interscroller" ||
    formatId === "mobile-slider"
  ) return null
  return "mobile_inline_300x250_1"
}

const routeDefaultProposalFormatMap = {
  skin: "skin",
  interscroller: "interscroller",
  interstitial: "interstitial",
  "video-banners": "video-banner",
  "pre-roll-video": "pre-roll-video",
  native: "native",
  cube: "cube",
  leadgen: "leadgen",
  livescore: "livescore",
  "countdown-widget": "countdown-widget",
  "content-widget": "content-widget",
  "mobile-slider": "mobile-slider",
  "video-instream-skippable-onsite": "video-instream-skippable-onsite",
  "video-instream-nonskippable-onsite": "video-instream-nonskippable-onsite",
  "video-instream-skippable-youtube": "video-instream-skippable-youtube",
  "video-instream-nonskippable-youtube": "video-instream-nonskippable-youtube",
}

const formatViewportMap = {
  interscroller: "mobile",
  "mobile-slider": "mobile",
  skin: "desktop",
}

export default function PreviewFrame({
  children,
  maxWidth = 1100,
  controlsMaxWidth = 1100,
  lockPageScroll = false,
  disablePreviewScroll = false,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { formatId } = useParams()
  const { proposalById, campaignById } = useProposalStore()

  const tabs = useMemo(() => {
    const uniqueByKey = new Map()
    publicCatalog.forEach((item) => {
      if (HIDDEN_PREVIEW_INDEX_IDS.has(item.formatId)) return
      if (!uniqueByKey.has(item.formatId)) {
        uniqueByKey.set(item.formatId, {
          key: item.formatId,
          label: item.title,
        })
      }
    })
    const items = Array.from(uniqueByKey.values())
    return items.sort((left, right) => {
      const leftIndex = PUBLIC_HOME_ORDER_INDEX.get(left.key) ?? Number.MAX_SAFE_INTEGER
      const rightIndex = PUBLIC_HOME_ORDER_INDEX.get(right.key) ?? Number.MAX_SAFE_INTEGER
      return leftIndex - rightIndex
    })
  }, [])

  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const queryVp = search.get("vp")
  const forcedVp = queryVp === "mobile" || queryVp === "desktop" ? queryVp : null
  const requiredViewport = formatViewportMap[formatId] || null
  const isMobileOnlyFormat = requiredViewport === "mobile"
  const isDesktopOnlyFormat = requiredViewport === "desktop"
  const proposalId = search.get("proposal")
  const requestedProposalFormatKey = search.get("proposalFormat")

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
  const vp = requiredViewport ?? forcedVp ?? (rootViewportWidth < 900 ? "mobile" : "desktop")

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
  const proposal = proposalId ? proposalById[proposalId] || null : null
  const campaign = proposal ? campaignById[proposal.campaignId] || null : null
  const resolvedProposalFormatKey =
    getProposalFormatById(requestedProposalFormatKey)?.id ||
    routeDefaultProposalFormatMap[formatId] ||
    null
  const proposalFormat = resolvedProposalFormatKey
    ? getProposalFormatById(resolvedProposalFormatKey)
    : null
  const previewCampaignValue = useMemo(
    () => ({
      proposal,
      campaign,
      proposalFormatKey: resolvedProposalFormatKey,
      proposalFormat,
    }),
    [campaign, proposal, proposalFormat, resolvedProposalFormatKey]
  )

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
    if (requiredViewport && next !== requiredViewport) return

    const nextSearch = new URLSearchParams(location.search)
    nextSearch.set("vp", next)
    const queryString = nextSearch.toString()
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ""}`, { replace: true })
  }

  const goToTab = (key) => {
    if (tabsRef.current) saveTabsScroll(tabsRef.current.scrollLeft)

    const nextSearch = new URLSearchParams(location.search)
    const nextRequiredViewport = formatViewportMap[key]

    if (nextRequiredViewport) {
      nextSearch.set("vp", nextRequiredViewport)
    } else if (forcedVp) {
      nextSearch.set("vp", forcedVp)
    } else {
      nextSearch.delete("vp")
    }
    const queryString = nextSearch.toString()
    navigate(`/preview/${key}${queryString ? `?${queryString}` : ""}`)
  }

  const goHome = () => {
    navigate("/")
  }

  return (
    <PreviewCampaignProvider value={previewCampaignValue}>
      <PreviewViewportProvider
        vp={vp}
        width={viewportWidth}
        height={viewportHeight}
        scrollElement={vp === "mobile" ? mobileViewportRef.current : null}
        isContainerViewport={vp === "mobile"}
      >
        <div
          ref={rootViewportRef}
          className={[
            "overflow-x-hidden bg-[var(--bc-green)]",
            lockPageScroll ? "h-screen min-h-0 overflow-y-hidden" : "min-h-screen",
          ].join(" ")}
          style={{
            "--preview-header-height": `${measuredHeaderHeight}px`,
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(143,220,199,0.14), transparent 36%), linear-gradient(180deg, var(--bc-green) 0%, var(--bc-green-strong) 42%, var(--bc-black) 100%)",
          }}
        >
        <div
          ref={headerRef}
          className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[rgba(8,33,28,0.82)] shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          style={{
            minHeight: "calc(76px + env(safe-area-inset-top))",
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <div
            className="mx-auto grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-2.5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:px-5"
            style={{ maxWidth: controlsMaxWidth }}
          >
            <button
              type="button"
              onClick={goHome}
              className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/16"
            >
              <HomeIcon />
              Home
            </button>

            <div
              ref={tabsRef}
              className="preview-tabs-scroll col-span-2 row-start-2 flex min-w-0 items-center gap-1.5 overflow-x-auto rounded-xl border border-white/10 bg-black/15 p-1 whitespace-nowrap md:col-span-1 md:col-start-2 md:row-start-1"
            >
              {tabs.map((tab) => {
                const tabRequiredViewport = formatViewportMap[tab.key]
                const tabTitle =
                  tabRequiredViewport === "desktop"
                    ? `${tab.label} is desktop only`
                    : tabRequiredViewport === "mobile"
                      ? `${tab.label} is mobile only`
                      : tab.label

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => goToTab(tab.key)}
                    className={[
                      "h-9 shrink-0 rounded-lg border px-3 text-sm font-semibold transition-colors",
                      active === tab.key
                        ? "border-white bg-white text-[var(--bc-green)] shadow-sm"
                        : "border-transparent bg-transparent text-white/65 hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                    title={tabTitle}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div className="row-start-1 inline-flex items-center gap-1 justify-self-end rounded-xl border border-white/10 bg-black/15 p-1 md:col-start-3">
              <PreviewSpecsPanel formatId={formatId} />
              <button
                type="button"
                disabled={isMobileOnlyFormat}
                onClick={() => setViewport("desktop")}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                  isMobileOnlyFormat
                    ? "cursor-not-allowed border-white/5 bg-white/5 text-white/25"
                    : vp === "desktop"
                      ? "border-white bg-white text-[var(--bc-green)] shadow-sm"
                      : "border-transparent bg-transparent text-white/65 hover:border-white/10 hover:bg-white/10 hover:text-white",
                ].join(" ")}
                aria-disabled={isMobileOnlyFormat}
                aria-label="Desktop preview"
                title={isMobileOnlyFormat ? "This format is mobile only" : "Desktop preview"}
              >
                <DesktopIcon />
              </button>

              <button
                type="button"
                disabled={isDesktopOnlyFormat}
                onClick={() => setViewport("mobile")}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                  isDesktopOnlyFormat
                    ? "cursor-not-allowed border-white/5 bg-white/5 text-white/25"
                    : vp === "mobile"
                      ? "border-white bg-white text-[var(--bc-green)] shadow-sm"
                      : "border-transparent bg-transparent text-white/65 hover:border-white/10 hover:bg-white/10 hover:text-white",
                ].join(" ")}
                aria-disabled={isDesktopOnlyFormat}
                aria-label="Mobile preview"
                title={isDesktopOnlyFormat ? "This format is desktop only" : "Mobile preview"}
              >
                <MobileIcon />
              </button>
            </div>
          </div>
          <div id="preview-specs-root" className="relative mx-auto w-full" style={{ maxWidth: controlsMaxWidth }} />
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
                style={{ width: deviceW, maxWidth: "100%" }}
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
                    className={[
                      "preview-scroll h-full min-h-0 overflow-x-hidden relative overscroll-contain focus:outline-none",
                      disablePreviewScroll ? "overflow-y-hidden touch-none" : "overflow-y-auto touch-pan-y",
                    ].join(" ")}
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
    </PreviewCampaignProvider>
  )
}
