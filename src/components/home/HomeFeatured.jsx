import HomeCreativeOptions from "./HomeCreativeOptions"

function getDescription(item, region) {
  return (
    item?.specs?.description ||
    item?.descriptionByRegion?.[region] ||
    "Premium ad experience tailored to your campaign goals."
  )
}

export default function HomeFeatured({ items, region, onPreview }) {
  return (
    <section>
      <div className="mb-6 md:mb-3">
        <h2 className="text-2xl font-semibold text-white md:text-[1.65rem]">Featured solutions</h2>
        <p className="mt-1 max-w-[640px] text-sm text-white/60">
          Curated high-performing formats to accelerate campaign impact across each market.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.formatId}
            type="button"
            onClick={() => onPreview(item)}
            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/12 bg-white/[0.07] text-left shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01] hover:border-white/24"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
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
              <h3 className="absolute inset-x-0 bottom-0 z-10 p-4 text-lg font-semibold text-white drop-shadow-md">
                {item.title}
              </h3>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <HomeCreativeOptions options={item.creativeOptions} className="mb-2" />
              <p className="min-h-[4rem] text-[0.95rem] leading-relaxed text-white/64">
                {getDescription(item, region)}
              </p>
              <span className="bc-button bc-button--featured bc-button--sm pointer-events-none mt-2 w-fit">
                View preview
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
