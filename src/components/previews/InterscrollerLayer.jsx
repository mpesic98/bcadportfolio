import { useEffect, useMemo, useRef, useState } from "react"
import creativeA from "../../assets/Interscrollercocacola.jpg"
import creativeB from "../../assets/Interscrollercocacola.jpg"
import creativeC from "../../assets/Interscrollercocacola.jpg"
import { usePreviewViewport } from "./previewViewport.jsx"

const MOBILE_HEIGHT_RATIO = 0.8
const MOBILE_MIN_HEIGHT = 240

export default function InterscrollerLayer({
  slotId,
  size = "300x600",
  autoScrollIntoView = false,
}) {
  const { vp } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const [w, h] = size.split("x").map(Number)
  const wrapRef = useRef(null)
  const [clip, setClip] = useState("inset(0px 0px 0px 0px)")
  const [show, setShow] = useState(false)
  const [leftPx, setLeftPx] = useState(0)
  const [overlayWidth, setOverlayWidth] = useState(w)
  const [mobileSlotHeight, setMobileSlotHeight] = useState(h)

  const img = useMemo(() => {
    if (slotId === "inline_300x600") return creativeC
    if (slotId === "inline_300x250_1") return creativeA
    return creativeB
  }, [slotId])

  useEffect(() => {
    if (!autoScrollIntoView) return undefined

    const el = wrapRef.current
    if (!el) return undefined

    const raf = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })

    return () => window.cancelAnimationFrame(raf)
  }, [autoScrollIntoView, isMobile, slotId])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined

    const scrollTarget = isMobile ? el.closest(".preview-scroll") || window : window

    let raf = 0

    const calc = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vw = window.innerWidth || 1
      const vh = window.innerHeight || 1

      const containerRect =
        isMobile &&
        scrollTarget &&
        scrollTarget !== window &&
        typeof scrollTarget.getBoundingClientRect === "function"
          ? scrollTarget.getBoundingClientRect()
          : null

      const visTop = containerRect ? Math.max(rect.top, containerRect.top) : rect.top
      const visLeft = containerRect ? Math.max(rect.left, containerRect.left) : rect.left
      const visBottom = containerRect ? Math.min(rect.bottom, containerRect.bottom) : rect.bottom
      const visRight = containerRect ? Math.min(rect.right, containerRect.right) : rect.right

      const fullyOut =
        visBottom - visTop <= 1 ||
        visRight - visLeft <= 1 ||
        visBottom <= 0 ||
        visTop >= vh ||
        visRight <= 0 ||
        visLeft >= vw

      setShow(!fullyOut)
      setLeftPx(rect.left)

      setOverlayWidth(rect.width)

      if (containerRect) {
        const nextHeight = Math.max(
          MOBILE_MIN_HEIGHT,
          Math.round(containerRect.height * MOBILE_HEIGHT_RATIO)
        )
        setMobileSlotHeight((prev) => (prev === nextHeight ? prev : nextHeight))
      }

      const top = Math.max(0, visTop)
      const left = Math.max(0, visLeft)
      const bottom = Math.max(0, vh - visBottom)
      const right = Math.max(0, vw - visRight)

      setClip(`inset(${top}px ${right}px ${bottom}px ${left}px)`)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(calc)
    }

    calc()
    scrollTarget.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isMobile, w, h, mobileSlotHeight])

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          className="relative overflow-hidden"
          style={{
            width: isMobile ? "100%" : w,
            height: isMobile ? mobileSlotHeight : h,
            borderRadius: 10,
          }}
        />
      </div>

      {show && (
        <div
          className="fixed inset-0 z-[5000] pointer-events-none"
          style={{ clipPath: clip, WebkitClipPath: clip }}
        >
          <div
            className="absolute"
            style={{ top: 0, bottom: 0, left: leftPx, width: overlayWidth }}
          >
            <img
              src={img}
              alt="Interscroller creative"
              draggable="false"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  )
}
