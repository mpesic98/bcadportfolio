import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"

function normalizeSlides(slides, fallbackTitle) {
  if (Array.isArray(slides) && slides.length >= 2) return slides

  const fallback = slides?.[0] || {
    id: "fallback-a",
    title: `${fallbackTitle} A`,
    image: "",
  }

  return [
    fallback,
    {
      ...fallback,
      id: "fallback-b",
      title: `${fallbackTitle} B`,
    },
  ]
}

export default function FormatShowcaseCarousel({
  slides,
  title,
  autoplayMs = 3500,
}) {
  const safeSlides = useMemo(() => normalizeSlides(slides, title), [slides, title])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (safeSlides.length < 2) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length)
    }, autoplayMs)

    return () => window.clearInterval(timer)
  }, [safeSlides, autoplayMs])

  const activeSlide = safeSlides[activeIndex]

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <AnimatePresence mode="wait">
        <Motion.div
          key={activeSlide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {activeSlide.image ? (
            <img
              src={activeSlide.image}
              alt={`${title} ${activeSlide.title}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-neutral-800" />
          )}
        </Motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="text-xs uppercase tracking-wide text-neutral-200">Showcase</div>
        <h3 className="text-lg font-semibold text-white">{activeSlide.title}</h3>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        {safeSlides.map((slide, index) => (
          <span
            key={slide.id}
            className={[
              "h-1.5 rounded-full bg-white/70 transition-all",
              index === activeIndex ? "w-6" : "w-2.5 bg-white/40",
            ].join(" ")}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
