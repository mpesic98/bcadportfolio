export default function HomePackages({ items, onPreview, onOpenDetails }) {
  return (
    <section>
      <div className="mb-10 border-b border-white/10 pb-8">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Takeover packages</h2>
        <p className="mt-4 max-w-[820px] text-sm leading-relaxed text-white/60 md:text-base">
          Region-specific bundles that coordinate multiple placements into one high-share-of-voice campaign.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-3">
        {items.map((item) => {
          const includedUnits = item.officialSpecs?.[0]?.includedUnits || item.specs?.sizes || []
          return (
            <article
              key={item.formatId}
              role="link"
              tabIndex={0}
              aria-label={`Open ${item.title} package preview`}
              onClick={() => onPreview(item)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onPreview(item)
                }
              }}
              className="group cursor-pointer rounded-2xl border border-[var(--bc-green-border)] bg-[rgba(143,220,199,0.08)] p-6 shadow-[0_18px_42px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-[rgba(143,220,199,0.58)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <span className="text-2xl text-[var(--bc-green-soft)]" aria-hidden="true">↗</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/64">
                {item.cardDescription || item.specs?.description}
              </p>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                Included placements
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {includedUnits.map((unit) => <span key={unit} className="bc-pill bc-pill--glass">{unit}</span>)}
              </div>
              <div className="mt-6 flex gap-2">
                <button type="button" onClick={(event) => { event.stopPropagation(); onPreview(item) }} className="bc-button bc-button--green bc-button--sm">View package</button>
                <button type="button" onClick={(event) => { event.stopPropagation(); onOpenDetails(item) }} className="bc-button bc-button--dark bc-button--sm">Details</button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
