import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function InterstitialLayer({ topBarHeight = 72 }) {
  const location = useLocation()
  const title = location.state?.title

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") window.history.back()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute left-1/2 -translate-x-1/2 w-[min(92vw,900px)] top-[calc(72px+24px)]">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
            <div className="text-sm font-medium text-neutral-900">{title || "Interstitial"}</div>
            <button
              onClick={() => window.history.back()}
              className="h-8 w-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            <div className="h-[520px] rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-500">
              Interstitial Creative Area
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-10 w-36 rounded bg-neutral-200" />
              <div className="h-10 w-24 rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
