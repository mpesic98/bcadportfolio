import FormatPreviewIframe from "./FormatPreviewIframe"

export default function FormatCard({ format, onOpen }) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.07] shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:border-white/24">
      <button
        type="button"
        onClick={() => onOpen?.(format)}
        className="group block w-full text-left"
        aria-label={`Open ${format.title} preview`}
      >
        <div className="relative aspect-[16/11] overflow-hidden border-b border-white/10 bg-white">
          <FormatPreviewIframe format={format} />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[rgba(7,20,17,0.82)] via-[rgba(7,20,17,0.32)] to-transparent p-4">
            <span className="bc-pill bc-pill--glass border-white/20 bg-black/28 text-white">
              Live preview
            </span>
            <span className="bc-button bc-button--dark bc-button--sm pointer-events-none opacity-92 transition-opacity group-hover:opacity-100">
              View preview
            </span>
          </div>
        </div>

        <div className="p-5">
          <span className="bc-pill bc-pill--green">{format.category}</span>
          <h3 className="mt-4 text-xl font-semibold text-white">{format.title}</h3>
          <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-white/64">
            {format.description}
          </p>
          {format.sizes?.length ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {format.sizes.slice(0, 3).map((size) => (
                <span key={size} className="bc-pill bc-pill--glass">
                  {size}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </button>
    </article>
  )
}
