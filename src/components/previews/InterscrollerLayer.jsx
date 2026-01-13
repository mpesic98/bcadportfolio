import { useEffect, useRef, useState } from "react"

export default function InterscrollerLayer() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const start = vh
      const end = -rect.height
      const p = (start - rect.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, p)))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative">
      <div className="h-[70vh]" />
      <div ref={ref} className="relative h-[85vh] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100">
        <div className="absolute inset-0 bg-neutral-200" style={{ transform: `translateY(${(0.5 - progress) * 80}px)` }} />
        <div className="absolute inset-0 flex items-center justify-center text-neutral-500 font-medium">
          Interscroller Creative (Parallax)
        </div>
      </div>
      <div className="h-[90vh]" />
    </div>
  )
}
