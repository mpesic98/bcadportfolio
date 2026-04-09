export default function HomeHero({ heroImage, onExplore }) {
  return (
    <section className="grid gap-10 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-14">
      <div>
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs tracking-[0.18em] text-white/70">
          BETTER COLLECTIVE ADS
        </span>

        <h1 className="mt-5 max-w-[620px] text-4xl font-semibold leading-tight text-white md:text-[3.4rem]">
          Unlock the power of{" "}
          <span className="text-green-300">premium sports media</span>
          {" "}to connect with millions of{" "}
          <span className="text-green-300">passionate fans</span>
        </h1>

        <p className="mt-5 max-w-[520px] text-base leading-relaxed text-white/70 md:text-lg">
          Explore our portfolio of high-impact ad placements available across Better
          Collective&apos;s global network of trusted sports and betting media brands
        </p>

        <p className="mt-5 text-sm text-white/50">
          Used by leading brands and agencies.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="bc-button bc-button--green"
          >
            Explore solutions
          </button>

          <a
            href="mailto:ads@bettercollective.com"
            className="bc-button bc-button--dark"
          >
            Get in touch
          </a>
        </div>

      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-4 py-8 shadow-[0_35px_90px_rgba(0,0,0,0.5)] md:px-6">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.28)_0%,rgba(16,185,129,0.14)_42%,rgba(11,13,16,0)_74%)] blur-xl md:h-[420px] md:w-[420px]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[58%] h-20 w-[72%] -translate-x-1/2 rounded-full bg-black/55 blur-3xl"
        />

        <div className="relative mx-auto max-w-[520px]">
          <div className="absolute inset-x-[14%] top-[10%] h-[58%] rounded-full border border-white/8 bg-white/[0.04] blur-2xl" />
          <img
            src={heroImage}
            alt="BC Ad Portfolio home hero"
            className="relative z-10 mx-auto w-full max-w-[460px] object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.48)]"
          />
        </div>
      </div>
    </section>
  )
}
