import { useEffect, useRef, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import adImg from "../../assets/adImg.jpg"

export default function InterstitialPreview() {
  const [armed, setArmed] = useState(true)
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onFirstUserClick = (e) => {
      if (!armed) return
      if (open) return

      const target = e.target
      if (target?.closest?.('[data-no-interstitial="1"]')) return

      setOpen(true)
      setArmed(false)
    }

    el.addEventListener("click", onFirstUserClick, true)
    return () => el.removeEventListener("click", onFirstUserClick, true)
  }, [armed, open])

  const armAgain = () => {
    setOpen(false)
    setArmed(true)
  }

  return (
    <PreviewFrame maxWidth={1100}>
      <div className="mx-auto max-w-[1100px] px-6">
        <div
          className="sticky top-[72px] z-40 bg-neutral-100/90 backdrop-blur border-b border-neutral-200"
          data-no-interstitial="1"
        >
          <div className="mx-auto max-w-[1100px] px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3" data-no-interstitial="1">
              <div className="text-sm font-semibold text-neutral-800">
                Interstitial
              </div>

              <button
                onClick={armAgain}
                className="h-9 px-3 rounded border border-neutral-300 bg-white text-sm font-semibold hover:bg-neutral-50"
                data-no-interstitial="1"
              >
                Arm again
              </button>
            </div>

            <div className="text-xs text-neutral-600" data-no-interstitial="1">
              Status: {open ? "OPEN" : armed ? "ARMED (click to trigger)" : "DISARMED"}
            </div>
          </div>
        </div>

        <div ref={rootRef}>
          <BaseNewsMock />
        </div>

        <InterstitialLayer
          isOpen={open}
          onClose={() => setOpen(false)}
          clickUrl="https://example.com"
          sideLabel="Interstitial"
          creative={
            <div className="w-[320px] h-[480px] md:w-[300px] md:h-[600px] overflow-hidden">
              <img
                src={adImg}
                alt="Interstitial creative"
                className="w-full h-full object-cover"
              />
            </div>
          }
        />
      </div>
    </PreviewFrame>
  )
}
