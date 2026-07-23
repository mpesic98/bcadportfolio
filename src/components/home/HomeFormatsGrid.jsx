import HomeCreativeOptions from "./HomeCreativeOptions"

function getDescription(item) {
  return (
    item?.cardDescription ||
    item?.specs?.description ||
    "Format details available."
  )
}

function FormatCard({ item, onPreview, onOpenDetails }) {
  return (
    <article
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
      className="group cursor-pointer overflow-hidden rounded-xl border border-white/12 bg-white/[0.07] shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition-all hover:scale-[1.01] hover:border-white/24 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={item.cardImage || item.hoverImage}
          alt={`${item.title} format`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        </div>
      </div>

      <div className="p-5">
        <HomeCreativeOptions options={item.creativeOptions} className="mb-2" />
        <p className="min-h-[4rem] text-[0.95rem] leading-relaxed text-white/64">
          {getDescription(item)}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onPreview(item) }}
            className="bc-button bc-button--featured bc-button--sm"
          >
            View preview
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); onOpenDetails(item) }}
            className="bc-button bc-button--dark bc-button--sm"
          >
            Specs
          </button>
        </div>
      </div>
    </article>
  )
}

export default function HomeFormatsGrid({ groups, onPreview, onOpenDetails }) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Ad formats</h2>
        <p className="mt-2 max-w-[760px] text-sm text-white/60 md:text-base">
          Compare placements by buying context, creative experience, and campaign role.
        </p>
      </div>

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`format-group-${group.id}`}>
            <div className="mb-5 flex items-center gap-4">
              <h3 id={`format-group-${group.id}`} className="text-lg font-semibold text-white">
                {group.title}
              </h3>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <FormatCard
                  key={item.formatId}
                  item={item}
                  onPreview={onPreview}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
