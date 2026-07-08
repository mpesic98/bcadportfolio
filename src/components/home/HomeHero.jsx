import logo from "../../assets/Logo-3.png"
import desktopHeroVideo from "../../assets/video/V2_Web-Front-Page-Video_LOW-Quality.mp4"
import mobileHeroVideo from "../../assets/video/50-8bit-420-mobile.webm"

const salesEmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  "sales@bettercollective.com"
)}&su=${encodeURIComponent("Advertising inquiry")}&body=${encodeURIComponent(
  `Hi Better Collective team,

I'm interested in learning more about your advertising solutions.

Brand / company:
Market or region:
Campaign timing:
Formats of interest:

Please get in touch so we can discuss the campaign.

Best,`
)}`

export default function HomeHero() {
  return (
    <section className="home-hero relative left-1/2 min-h-screen w-screen -translate-x-1/2 px-4 pb-10 pt-8 md:px-6 md:pb-10 md:pt-10">
      <div className="home-hero__backdrop pointer-events-none absolute inset-x-0 top-0 opacity-30 md:opacity-27">
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
        className="home-hero__backdrop pointer-events-none absolute inset-x-0 top-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(1,91,73,0.94) 0%, rgba(1,91,73,0.82) 36%, rgba(1,91,73,0.58) 70%, rgba(1,91,73,0.76) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="home-hero__backdrop pointer-events-none absolute inset-x-0 top-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(1,91,73,0.5) 0%, rgba(1,91,73,0.04) 42%, rgba(1,72,58,0.68) 100%)",
        }}
      />

      <div className="home-hero__inner relative z-10 mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-[1240px] flex-col">
        <img
          src={logo}
          alt="Better Collective"
          className="h-10 w-auto shrink-0 self-start object-contain md:h-12"
        />
        <div className="home-hero__copy mt-[7vh] max-w-[780px] md:mt-0 md:max-w-[68%]">
          <h1 className="max-w-[760px] text-4xl font-semibold leading-[1.04] text-white md:text-[2.35rem] lg:text-[2.7rem]">
            Premium sports media for brands that want to move with culture.
          </h1>

          <p className="mt-4 max-w-[700px] text-base leading-relaxed text-white/72 md:text-base">
            Connect with engaged sports audiences through high-impact advertising
            experiences across Better Collective&apos;s global media network.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={salesEmailUrl}
              target="_blank"
              rel="noreferrer"
              className="bc-button bc-button--hero"
            >
              Contact sales
            </a>
            <span className="text-sm font-medium text-white/54">
              Built for agencies, brands, and premium campaigns.
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
