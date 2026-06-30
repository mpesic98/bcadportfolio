import { useEffect } from "react"
import FormatPreviewIframe from "./FormatPreviewIframe"

export default function FormatPreviewModal({ format, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (!format) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
      <button
        type="button"
        aria-label="Close preview"
        className="absolute inset-0 bg-[rgba(3,12,10,0.82)] backdrop-blur-sm"
        onClick={onClose}
      />

      <section className="relative z-[1] flex max-h-[92vh] w-full max-w-[1180px] flex-col overflow-hidden rounded-[22px] border border-white/12 bg-[rgba(8,33,28,0.94)] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
          <div className="min-w-0">
            <span className="bc-pill bc-pill--green">{format.category}</span>
            <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
              {format.title}
            </h3>
            {format.description ? (
              <p className="mt-2 max-w-[720px] text-sm leading-relaxed text-white/62 md:text-base">
                {format.description}
              </p>
            ) : null}
            {format.sizes?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {format.sizes.map((size) => (
                  <span key={size} className="bc-pill bc-pill--glass">
                    {size}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/12 bg-white/8 text-xl text-white/84 transition-colors hover:bg-white/14 hover:text-white"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 p-4 md:p-6">
          <div className="h-[min(68vh,780px)] overflow-hidden rounded-[18px] border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
            <FormatPreviewIframe format={format} interactive />
          </div>
        </div>
      </section>
    </div>
  )
}
