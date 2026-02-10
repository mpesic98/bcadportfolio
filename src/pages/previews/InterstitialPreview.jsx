import { useEffect, useRef, useState } from "react"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import DisplayCreative from "../../components/previews/DisplayCreative"
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

  const renderAd = (slotId) => {
    const sizes = {
      top_1070x27: "1070x27",
      sidebar_300x250_1: "300x250",
      sidebar_300x250_2: "300x250",
      inline_300x600: "300x600",
      inline_300x250_1: "300x250",
      mobile_sticky_320x50: "320x50",
      mobile_inline_300x250_1: "300x250",
      mobile_inline_300x250_2: "300x250",
      mobile_inline_300x250_3: "300x250",
      mobile_inline_300x600: "300x600",
    }

    return <DisplayCreative slotId={slotId} size={sizes[slotId] || "300x250"} />
  }

  return (
    <PreviewFrame maxWidth={1100}>
      <div ref={rootRef}>
        <BaseNewsMock renderAd={renderAd} />
      </div>

      <InterstitialLayer
        isOpen={open}
        onClose={() => setOpen(false)}
        clickUrl="https://example.com"
        creative={
          <div className="w-[320px] h-[480px] md:w-[300px] md:h-[600px] overflow-hidden">
            <img src={adImg} alt="" className="w-full h-full object-cover" />
          </div>
        }
      />
    </PreviewFrame>
  )
}
