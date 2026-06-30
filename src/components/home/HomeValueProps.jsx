const valueProps = [
  {
    value: "+450M",
    label: "Monthly visits across the network",
  },
  {
    value: "+200M",
    label: "Social followers across media brands",
  },
]

export default function HomeValueProps() {
  return (
    <section className="w-full max-w-[760px]">
      <div className="mx-auto">
        <div className="grid grid-cols-2">
          {valueProps.map((entry, index) => (
          <article
            key={entry.label}
            className={[
              "relative px-4 py-3 text-center md:px-8 md:py-4",
              index > 0 ? "border-l border-white/18" : "",
            ].join(" ")}
          >
            <p className="text-[2.15rem] font-semibold leading-none tracking-tight text-white md:text-[2.7rem]">
              <span style={{ color: "var(--bc-green-soft)" }}>{entry.value}</span>
            </p>
            <h2 className="mx-auto mt-2 max-w-[20ch] text-xs font-medium leading-snug text-white/68 md:text-sm">
              {entry.label}
            </h2>
          </article>
          ))}
        </div>
      </div>
    </section>
  )
}
