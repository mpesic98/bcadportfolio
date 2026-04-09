const valueProps = [
  {
    value: "+450M",
    label: "Monthly Site Visits",
  },
  {
    value: "+200M",
    label: "Social Media Followers",
  },
  {
    value: "+20Y",
    label: "Campaign Execution",
  },
]

export default function HomeValueProps() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {valueProps.map((entry) => (
          <article
            key={entry.label}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-green-300/70 to-transparent"
            />
            <p className="text-[2.8rem] font-semibold leading-none tracking-tight text-white md:text-[3.4rem]">
              <span className="text-green-300">{entry.value}</span>
            </p>
            <h2 className="mt-4 max-w-[16ch] text-base font-medium leading-snug text-white/78 md:text-lg">
              {entry.label}
            </h2>
          </article>
        ))}
      </div>
    </section>
  )
}
