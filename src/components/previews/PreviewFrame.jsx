import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { endemicCatalog } from "../../data/endemicCatalog"
import { nonEndemicCatalog } from "../../data/nonEndemicCatalog"
import { normalizeRegion, normalizeSegment } from "../../data/regionConfig"
import { PreviewViewportProvider } from "./previewViewport.jsx"

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
  const initialVp = search.get("vp") === "mobile" ? "mobile" : "desktop"
  const [vp, setVp] = useState(initialVp)

  const deviceW = 390
  const [deviceH, setDeviceH] = useState(844)

  useEffect(() => {
    if (vp !== "mobile") return

    const calc = () => {
      const vh = window.innerHeight || 800
      const header = 72
      const pad = 48
      const raw = vh - header - pad
      const clamped = Math.max(620, Math.min(900, raw))
      setDeviceH(clamped)
    }

    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [vp])

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

  const setViewport = (next) => {
    const nextSearch = new URLSearchParams(location.search)
    nextSearch.set("vp", next)
    setVp(next)
    navigate(`${location.pathname}?${nextSearch.toString()}`, { replace: true })
  }

  const goToTab = (key) => {
    const nextSearch = new URLSearchParams(location.search)
    nextSearch.set("vp", vp)
    navigate(`/${region}/${segment}/preview/${key}?${nextSearch.toString()}`)
  }

  const goHome = () => {
    navigate(`/${region}?segment=${segment}`)
  }

  return (
    <PreviewViewportProvider vp={vp}>
      <div className="min-h-screen bg-neutral-100 overflow-x-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/80 backdrop-blur border-b border-neutral-200 flex items-center">
          <div
            className="mx-auto w-full px-6 flex items-center justify-between gap-4"
            style={{ maxWidth: controlsMaxWidth }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={goHome}
                className="px-4 py-1.5 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-700"
              >
                {"<"} Home
              </button>
              <div className="hidden md:flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => goToTab(tab.key)}
                    className={[
                      "px-3 py-1.5 rounded text-sm font-medium border",
                      active === tab.key
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={[
                  "px-3 py-1.5 rounded text-sm font-medium border",
                  vp === "desktop"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
              >
                Desktop
              </button>

              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={[
                  "px-3 py-1.5 rounded text-sm font-medium border",
                  vp === "mobile"
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
              >
                Mobile
              </button>
            </div>
          </div>
        </div>

        <main className="relative pt-[72px] z-10">
          {vp === "desktop" ? (
            <div className="mx-auto" style={{ maxWidth }}>
              {children}
            </div>
          ) : (
            <div className="mx-auto px-4 py-6 flex justify-center overflow-x-hidden">
              <div
                className="relative box-border bg-neutral-900 rounded-[34px] shadow-lg overflow-x-hidden"
                style={{ width: deviceW, maxWidth: deviceW }}
              >
                <div className="absolute top-[8px] left-1/2 -translate-x-1/2 h-[18px] w-[120px] rounded-full bg-neutral-800 z-10" />

                <div
                  className="bg-white rounded-[26px] overflow-hidden relative w-full max-w-full"
                  style={{ height: deviceH }}
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
