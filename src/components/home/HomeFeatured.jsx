const fallbackTags = ["High impact", "Contextual", "Performance"]

function getTag(item, index) {
  if (item.previewKind?.includes("video")) return "Video"
  if (item.formatId?.includes("skin") || item.formatId?.includes("interstitial")) return "High impact"
  return fallbackTags[index] || "Featured"
}

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
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Featured solutions</h2>
        <p className="mt-2 max-w-[640px] text-sm text-white/60 md:text-base">
          Curated high-performing formats to accelerate campaign impact across each market.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.formatId}
            type="button"
            onClick={() => onPreview(item)}
            className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] text-left transition-all hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="h-60 overflow-hidden border-b border-white/10">
              <img
                src={item.cardImage || item.hoverImage}
                alt={`${item.title} creative`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <span
                className="inline-flex w-fit rounded-full px-3 py-1 text-xs"
                style={{
                  border: "1px solid var(--bc-green-border)",
                  background: "var(--bc-green-wash)",
                  color: "var(--bc-green-softest)",
                }}
              >
                {getTag(item, index)}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-white/60">
                {getDescription(item, region)}
              </p>
              <span className="mt-auto pt-6 text-sm font-medium" style={{ color: "var(--bc-green-soft)" }}>
                View format <span aria-hidden="true">-&gt;</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
