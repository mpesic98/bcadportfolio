import { useEffect, useRef, useState } from "react"

export default function InterscrollerLayer({ slotId, size = "300x600" }) {
  const [w, h] = size.split("x").map(Number)
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let raf = 0

    const calc = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1

      const start = vh
      const end = -rect.height
      const p = (start - rect.top) / (start - end)

      setProgress(Math.max(0, Math.min(1, p)))
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
  }, [])

  const travel = Math.min(140, Math.max(60, Math.round(h * 0.25)))
  const y = (0.5 - progress) * travel

  return (
    <div className="w-full flex justify-center">
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded border border-neutral-300 bg-white shadow-sm"
        style={{ width: w, height: h }}
      >
        <div className="absolute inset-0">
          <div
            className="absolute -inset-x-8 -inset-y-16 bg-neutral-200"
            style={{ transform: `translateY(${y}px)` }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-sm font-semibold">
          Interscroller · {size}
        </div>

        <div className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded bg-neutral-900 text-white">
          {slotId}
        </div>
      </div>
    </div>
  )
}
