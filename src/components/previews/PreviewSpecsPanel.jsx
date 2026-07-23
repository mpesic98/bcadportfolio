import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { publicCatalogById } from "../../data/publicCatalog"
import { getOfficialSpecsForAppFormat } from "../../data/globalAdSpecs2026"
import { FormatSpecsContent } from "../specs/GlobalAdSpecs"

export default function PreviewSpecsPanel({ formatId }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const format = publicCatalogById[formatId]
  const specs = format?.officialSpecs?.length
    ? format.officialSpecs
    : getOfficialSpecsForAppFormat(formatId)
  const hasDetails = Boolean(specs.length || format?.specs)

  useEffect(() => setOpen(false), [formatId])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open])

  if (!hasDetails) return null

  const panelRoot = typeof document !== "undefined"
    ? document.getElementById("preview-specs-root")
    : null

  const panel = open ? (
    <section
      id={panelId}
      className="bc-scrollbar absolute left-3 right-3 top-0 z-20 max-h-[min(62vh,620px)] overflow-y-auto rounded-xl border border-white/15 bg-[rgba(8,33,28,0.98)] p-4 text-white shadow-2xl md:left-5 md:right-5 md:p-5"
      aria-label={`${format?.title || "Format"} specifications`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--bc-green-soft)]">
            {specs.length ? "Global Ad Specs" : `${format?.specStatus || "Custom"} format`}
          </p>
          <h2 className="mt-1 text-base font-semibold">{format?.title || specs[0]?.name}</h2>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 text-white" aria-label="Close specs">×</button>
      </div>
      <div className="mt-4">
        {specs.length ? (
          <FormatSpecsContent
            compact
            disclosure={false}
            formatData={{
              ...format,
              formatId,
              officialSpecs: specs,
            }}
          />
        ) : (
          <div className="rounded-lg border border-amber-200/20 bg-amber-100/8 p-3 text-sm leading-6 text-white/70">
            <p>{format?.specs?.description}</p>
            <p className="mt-2 text-xs text-white/52">{(format?.specs?.sizes || []).join(" · ")}</p>
          </div>
        )}
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 text-[10px] leading-4 text-white/45">
        Preview media is illustrative. Delivery must follow the specifications and Ad Ops approval process.
      </p>
    </section>
  ) : null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex h-9 items-center rounded-lg border border-white/15 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white/16"
      >
        Specs
      </button>
      {panelRoot && panel ? createPortal(panel, panelRoot) : null}
    </>
  )
}
