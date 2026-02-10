import { useEffect, useMemo, useRef, useState } from "react"
import creativeA from "../../assets/Interscroller.jpg"
import creativeB from "../../assets/Interscroller.jpg"
import creativeC from "../../assets/Interscroller.jpg"
import { usePreviewViewport } from "./previewViewport.jsx"

export default function InterscrollerLayer({ slotId, size = "300x600" }) {
  const { vp } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const [w, h] = size.split("x").map(Number)
  const wrapRef = useRef(null)
  const [clip, setClip] = useState("inset(0px 0px 0px 0px)")
  const [show, setShow] = useState(false)
  const [leftPx, setLeftPx] = useState(0)

  const img = useMemo(() => {
    if (slotId === "inline_300x600") return creativeC
    if (slotId === "inline_300x250_1") return creativeA
    return creativeB
  }, [slotId])

  useEffect(() => {
    if (isMobile) return undefined

    const el = wrapRef.current
    if (!el) return

    let raf = 0

    const calc = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vw = window.innerWidth || 1
      const vh = window.innerHeight || 1

      const fullyOut =
        rect.height <= 1 ||
        rect.bottom <= 0 ||
        rect.top >= vh ||
        rect.right <= 0 ||
        rect.left >= vw

      setShow(!fullyOut)
      setLeftPx(rect.left)

      const top = Math.max(0, rect.top)
      const left = Math.max(0, rect.left)
      const bottom = Math.max(0, vh - rect.bottom)
      const right = Math.max(0, vw - rect.right)

      setClip(`inset(${top}px ${right}px ${bottom}px ${left}px)`)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(calc)
    }

    calc()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          className="relative overflow-hidden"
          style={{ width: w, height: h, borderRadius: 10 }}
        >
          <img
            src={img}
            alt="Interscroller creative"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          ref={wrapRef}
          className="relative overflow-hidden"
          style={{ width: w, height: h, borderRadius: 10 }}
        />
      </div>

      {show && (
        <div
          className="fixed inset-0 z-[5000] pointer-events-none"
          style={{ clipPath: clip, WebkitClipPath: clip }}
        >
          <div
            className="absolute"
            style={{ top: 0, bottom: 0, left: leftPx, width: w }}
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
