import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { PreviewViewportProvider } from "./previewViewport.jsx"

const desktopTabs = [
  { key: "display", label: "Display" },
  { key: "skin", label: "Skin" },
  { key: "interscroller", label: "Interscroller" },
  { key: "interstitial", label: "Interstitial" },
  { key: "videobanner", label: "Video" },
]

const mobileTabs = [
  { key: "display", label: "Display" },
  { key: "interscroller", label: "Interscroller" },
  { key: "interstitial", label: "Interstitial" },
  { key: "videobanner", label: "Video" },
]


export default function PreviewFrame({ children, maxWidth = 1100 }) {
  const navigate = useNavigate()
  const location = useLocation()

  const search = useMemo(() => new URLSearchParams(location.search), [location.search])
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

  const active = location.pathname.split("/").pop()
  const visibleTabs = vp === "mobile" ? mobileTabs : desktopTabs

  const setViewport = (next) => {
    const s = new URLSearchParams(location.search)
    s.set("vp", next)
    setVp(next)
    navigate(`${location.pathname}?${s.toString()}`, { replace: true })
  }

  const goToTab = (key) => {
    const s = new URLSearchParams(location.search)
    s.set("vp", vp)
    navigate(`/preview/${key}?${s.toString()}`)
  }

  return (
    <PreviewViewportProvider vp={vp}>
      <div className="min-h-screen bg-neutral-100 overflow-x-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/80 backdrop-blur border-b border-neutral-200 flex items-center">
          <div className="mx-auto w-full px-6 flex items-center justify-between gap-4" style={{ maxWidth }}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-1.5 bg-neutral-900 text-white rounded text-sm font-medium hover:bg-neutral-700"
              >
                ← Home
              </button>
            <div className="hidden md:flex items-center gap-2">
              {visibleTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => goToTab(t.key)}
                  className={[
                    "px-3 py-1.5 rounded text-sm font-medium border",
                    active === t.key
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>
            </div>
            <div className="flex items-center gap-2">
              <button
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
            <div className="mx-auto px-4 py-6 flex justify-center">
              <div
                className="relative bg-neutral-900 rounded-[34px] p-[10px] shadow-lg"
                style={{ width: deviceW + 20 }}
              >
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 h-[18px] w-[120px] rounded-full bg-neutral-800" />

                <div
                  className="bg-white rounded-[26px] overflow-hidden relative"
                  style={{ width: deviceW, height: deviceH }}
                >
                  <div
                    id="preview-overlay-root"
                    className="absolute inset-0 z-[3000]"
                    style={{ pointerEvents: "none" }}
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
