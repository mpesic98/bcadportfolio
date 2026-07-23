import { globalAdSpecs2026 } from "../../data/globalAdSpecs2026"

function splitMetric(value) {
  const [metric, ...label] = value.split(" ")
  return {
    metric,
    label: label.join(" "),
  }
}

export default function HomeNetworkOverview() {
  const metrics = globalAdSpecs2026.networkFacts.slice(1).map(splitMetric)

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-[rgba(4,42,35,0.78)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(520px circle at 78% 20%, rgba(143,220,199,0.15), transparent 62%), linear-gradient(90deg, rgba(1,91,73,0.2), transparent 42%, rgba(8,33,28,0.34))",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-44 h-[420px] w-[420px] rounded-full border border-[rgba(143,220,199,0.12)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-4 -top-28 h-[290px] w-[290px] rounded-full border border-[rgba(143,220,199,0.1)]" />

      <div className="relative mx-auto max-w-[1288px] px-4 pt-14 md:px-6 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="max-w-[560px] text-3xl font-semibold leading-tight text-white md:text-[2.35rem]">
              Global scale. Premium sports audiences.
            </h2>
          </div>

          <div className="flex items-stretch border-y border-white/10 py-5 sm:border-y-0 sm:py-0">
            {metrics.map(({ metric, label }, index) => (
              <div
                key={metric}
                className={[
                  "min-w-0 flex-1 text-center",
                  index ? "border-l border-white/12 pl-6 md:pl-9" : "pr-6 md:pr-9",
                ].join(" ")}
              >
                <p className="bg-gradient-to-b from-white via-white to-[rgba(143,220,199,0.72)] bg-clip-text text-5xl font-semibold leading-none tracking-[-0.055em] text-transparent drop-shadow-[0_8px_24px_rgba(143,220,199,0.12)] md:text-6xl">
                  {metric}
                </p>
                <p className="mt-3 text-xs font-medium leading-5 tracking-[0.02em] text-white/58 md:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 py-8 text-center md:flex-row md:items-center md:justify-center md:gap-6">
          <span className="shrink-0 text-xs font-medium text-white/56 md:text-sm">
            Buying access
          </span>
          <p className="text-xs leading-6 text-white/68 md:text-sm">
            {globalAdSpecs2026.buyingOptions.join("  ·  ")}
          </p>
          <span className="hidden h-4 w-px bg-white/12 md:block" aria-hidden="true" />
          <p className="text-xs text-white/46 md:text-sm">
            Preferred SSP: {globalAdSpecs2026.preferredSsp}
          </p>
        </div>
      </div>
    </section>
  )
}
