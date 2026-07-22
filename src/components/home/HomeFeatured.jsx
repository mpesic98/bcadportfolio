import HomeCreativeOptions from "./HomeCreativeOptions"

function getDescription(item, region) {
  return (
    item?.cardDescription ||
    item?.specs?.description ||
    item?.descriptionByRegion?.[region] ||
    "Premium ad experience tailored to your campaign goals."
  )
}

export default function HomeFeatured({ items, region, onPreview, onOpenDetails }) {
  return (
    <section>
      <div className="mb-6 md:mb-3">
        <h2 className="text-2xl font-semibold text-white md:text-[1.65rem]">Featured solutions</h2>
        <p className="mt-1 max-w-[760px] text-sm text-white/60">
          High-impact placements built for premium launches, sustained attention, and stronger share of voice.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.formatId}
            role="link"
            tabIndex={0}
            aria-label={`Open ${item.title} preview`}
            onClick={() => onPreview(item)}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget) return
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onPreview(item)
              }
            }}
            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/12 bg-white/[0.07] text-left shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01] hover:border-white/24 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            <div className="relative block aspect-[16/11] overflow-hidden text-left">
              <img
                src={item.cardImage || item.hoverImage}
                alt={`${item.title} creative`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75"
              />
              {item.specStatus && item.specStatus !== "official" ? (
                <span className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  {item.specStatus}
                </span>
              ) : null}
              <h3 className="absolute inset-x-0 bottom-0 z-10 p-4 text-lg font-semibold text-white drop-shadow-md">
                {item.title}
              </h3>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <HomeCreativeOptions options={item.creativeOptions} className="mb-2" />
              <p className="min-h-[4rem] text-[0.95rem] leading-relaxed text-white/64">
                {getDescription(item, region)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" onClick={(event) => { event.stopPropagation(); onPreview(item) }} className="bc-button bc-button--featured bc-button--sm">
                  View preview
                </button>
                <button type="button" onClick={(event) => { event.stopPropagation(); onOpenDetails(item) }} className="bc-button bc-button--dark bc-button--sm">
                  Specs
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
