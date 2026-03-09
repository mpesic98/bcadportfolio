export default function HomeHero({ regionLabel, heroImage, onExplore }) {
  return (
    <section className="grid gap-10 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-14">
      <div>
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs tracking-[0.18em] text-white/70">
          BETTER COLLECTIVE ADS
        </span>

        <h1 className="mt-5 max-w-[620px] text-4xl font-semibold leading-tight text-white md:text-[3.4rem]">
          Build{" "}
          <span className="text-green-300">high-impact</span>
          {" "}campaigns that turn attention into measurable{" "}
          <span className="text-green-300">performance</span>.
        </h1>

        <p className="mt-5 max-w-[520px] text-base leading-relaxed text-white/70 md:text-lg">
          Premium media solutions across {regionLabel} with contextual inventory,
          high-quality placements, and formats designed for both brand lift and
          outcome-driven campaigns.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="rounded-full bg-green-500 px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-green-400 md:text-base"
          >
            Explore solutions
          </button>

          <a
            href="mailto:ads@bettercollective.com"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 md:text-base"
          >
            Get in touch
          </a>
        </div>

        <p className="mt-5 text-sm text-white/50">
          Used by leading brands and agencies.
        </p>
      </div>

      <div className="relative">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/50 p-3">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/5">
              <img
                src={heroImage}
                alt="Featured ad solution preview"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 right-6 rounded-full border border-white/15 bg-black/65 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-0 w-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-green-300" />
                <div className="h-1 w-14 rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-green-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
