import { useEffect, useMemo, useRef } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import FormatShowcaseCarousel from "./FormatShowcaseCarousel"
import { REGION_LABELS } from "../data/regionConfig"
import { FormatSpecsContent, GlobalPoliciesAndFaq } from "./specs/GlobalAdSpecs"

function getFocusableElements(root) {
  if (!root) return []
  return Array.from(
    root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((node) => !node.hasAttribute("disabled"))
}

export default function FormatDetailsModal({
  open,
  onClose,
  onOpenFullPreview,
  formatData,
  region,
}) {
  const dialogRef = useRef(null)
  const previouslyFocusedRef = useRef(null)

  const regionLabel = REGION_LABELS[region] || REGION_LABELS.usa

  const titleId = useMemo(() => `format-modal-title-${formatData?.formatId || "default"}`, [formatData])
  const showcaseSlides = useMemo(() => {
    const image = formatData?.cardImage || formatData?.hoverImage || formatData?.showcaseSlides?.[0]?.image || ""
    return [
      { id: `${formatData?.formatId || "format"}-image`, title: formatData?.title || "Format", image },
    ]
  }, [formatData])

  useEffect(() => {
    if (!open) return undefined

    previouslyFocusedRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const timer = window.setTimeout(() => {
      const focusable = getFocusableElements(dialogRef.current)
      if (focusable[0]) focusable[0].focus()
    }, 0)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow

      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus()
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab") return

      const focusable = getFocusableElements(dialogRef.current)
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!formatData) return null

  return (
    <AnimatePresence>
      {open && (
        <Motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />

          <Motion.section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92vh] w-full max-w-[1160px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#11161D]/95 text-white shadow-2xl shadow-black/50"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-sm font-semibold text-white/70 hover:bg-white/10"
            >
              X
            </button>

            <div className="bc-scrollbar min-h-0 overflow-y-auto md:grid md:h-[min(720px,92vh)] md:grid-cols-[3fr_2fr] md:overflow-hidden">
              <div className="relative h-[260px] shrink-0 border-b border-white/10 sm:h-[320px] md:h-auto md:min-h-0 md:border-b-0 md:border-r md:border-white/10">
                <FormatShowcaseCarousel
                  title={formatData.title}
                  slides={showcaseSlides}
                />
              </div>

              <div className="bc-scrollbar flex min-h-0 flex-col p-6 md:overflow-y-auto md:p-8">
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--bc-green-soft)" }}
                >
                  {regionLabel}
                </p>
                <h2 id={titleId} className="mt-2 text-2xl font-semibold text-white">
                  {formatData.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {formatData.descriptionByRegion?.[region] || formatData.specs?.description}
                </p>

                {!formatData.officialSpecs?.length && formatData.specs?.sizes?.length ? (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-white">Sizes</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formatData.specs.sizes.map((size) => (
                        <span key={size} className="bc-pill bc-pill--glass">{size}</span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {!formatData.officialSpecs?.length && formatData.specs?.kpis?.length ? (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-white">Recommended KPIs</h3>
                    <ul className="mt-2 space-y-1 text-sm text-white/70">
                      {formatData.specs.kpis.map((kpi) => <li key={kpi}>- {kpi}</li>)}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-7 border-t border-white/10 pt-7">
                  <h3 className="mb-4 text-sm font-semibold text-white">
                    {formatData.officialSpecs?.length ? "Global Ad Specs 2026" : "Format details"}
                  </h3>
                  <FormatSpecsContent formatData={formatData} compact />
                </div>

                {formatData.officialSpecs?.length ? (
                  <div className="mt-4">
                    <GlobalPoliciesAndFaq />
                  </div>
                ) : null}

                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={onOpenFullPreview}
                    className="bc-button bc-button--green bc-button--full"
                  >
                    Open Full Preview
                  </button>
                </div>
              </div>
            </div>
          </Motion.section>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}
