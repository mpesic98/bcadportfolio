const valueProps = [
  {
    title: "Premium visibility",
    body: "High-attention placements built for standout creative and sustained brand recall.",
  },
  {
    title: "Contextual environments",
    body: "Reach audiences in relevant moments across trusted editorial and sports ecosystems.",
  },
  {
    title: "Performance-ready formats",
    body: "Solutions calibrated for measurable outcomes, from efficient reach to action-based KPIs.",
  },
]

export default function HomeValueProps() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {valueProps.map((entry) => (
          <article
            key={entry.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 ring-1 ring-green-400/40">
              <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
            </span>
            <h2 className="text-lg font-semibold text-white">{entry.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{entry.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
