import logo from "../../assets/Logo-3.png"
import desktopHeroVideo from "../../assets/video/V2_Web-Front-Page-Video_LOW-Quality.mp4"
import mobileHeroVideo from "../../assets/video/50-8bit-420-mobile.webm"
import HomeValueProps from "./HomeValueProps"

export default function HomeHero() {
  return (
    <section className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-12">
      <div className="pointer-events-none absolute inset-0 opacity-30 md:opacity-27">
        <video
          className="hidden h-full w-full object-cover mix-blend-screen md:block"
          src={desktopHeroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <video
          className="h-full w-full object-cover mix-blend-screen md:hidden"
          src={mobileHeroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(1,91,73,0.94) 0%, rgba(1,91,73,0.82) 36%, rgba(1,91,73,0.58) 70%, rgba(1,91,73,0.76) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1,91,73,0.5) 0%, rgba(1,91,73,0.04) 42%, rgba(1,72,58,0.68) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[1240px] flex-col">
        <img
          src={logo}
          alt="Better Collective"
          className="h-10 w-auto shrink-0 self-start object-contain md:h-12"
        />
        <div className="h-[7vh] min-h-8 md:h-[10vh]" />
        <div className="max-w-[860px]">
          <h1 className="max-w-[820px] text-4xl font-semibold leading-[1.03] text-white md:text-[3.75rem] lg:text-[4.1rem]">
            Premium sports media for brands that want to move with culture.
          </h1>

          <p className="mt-5 max-w-[760px] text-base leading-relaxed text-white/72 md:text-lg">
            Connect with engaged sports audiences through high-impact advertising
            experiences across Better Collective&apos;s global media network.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="mailto:sales@bettercollective.com" className="bc-button bc-button--hero">
              Contact sales
            </a>
            <span className="text-sm font-medium text-white/54">
              Built for agencies, brands, and premium campaigns.
            </span>
          </div>
        </div>

        <div className="mt-auto flex justify-center pt-8 md:pt-10">
          <HomeValueProps />
        </div>
      </div>
    </section>
  )
}
