function getDescription(item, region) {
  return (
    item?.descriptionByRegion?.[region] ||
    item?.specs?.description ||
    "Format details available."
  )
}

export default function HomeFormatsGrid({
  items,
  region,
  onPreview,
  onOpenDetails,
}) {
  return (
    <section>
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Browse all formats</h2>
        <p className="mt-2 text-sm text-white/60 md:text-base">
          Explore the complete solution set by segment and open full previews for each format.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.formatId}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:scale-[1.01] hover:border-white/20"
          >
            <button
              type="button"
              onClick={() => onPreview(item)}
              className="block w-full text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.cardImage || item.hoverImage}
                  alt={`${item.title} format`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </button>

            <div className="p-4">
              <p className="truncate text-sm text-white/60">{getDescription(item, region)}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onPreview(item)}
                  className="text-sm font-medium text-green-300 transition-colors hover:text-green-200"
                >
                  View preview
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDetails(item)}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10"
                >
                  Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
