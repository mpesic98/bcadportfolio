import { useLayoutEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const tabs = [
  { key: "display", label: "Display" },
  { key: "skin", label: "Skin" },
  { key: "interscroller", label: "Interscroller" },
  { key: "interstitial", label: "Interstitial" },
  { key: "videobanner", label: "Video" }

]

export default function PreviewFrame({ children, maxWidth = 1100 }) {
  const navigate = useNavigate()
  const location = useLocation()

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  const active = location.pathname.split("/").pop()

  return (
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
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => navigate(`/preview/${t.key}`)}
                  className={[
                    "px-3 py-1.5 rounded text-sm font-medium border",
                    active === t.key
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-neutral-500 hidden md:block">
            {active ? `Preview: ${active}` : ""}
          </div>
        </div>
      </div>

      <main className="relative pt-[72px] z-10 overflow-visible">
        {children}
      </main>
    </div>
  )
}
