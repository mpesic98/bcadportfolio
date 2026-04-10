import logo from "../../assets/BClogo.png"

export default function HomeFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-[1120px] px-4 pb-8 pt-10 md:px-6 md:pt-12">
        <div className="flex items-center gap-6 md:gap-7">
          <img
            src={logo}
            alt="Better Collective"
            className="h-16 w-auto shrink-0 rounded-2xl md:h-[4.5rem]"
          />

          <div>
            <h2 className="text-lg font-semibold text-white">Better Collective Ads</h2>
            <p className="mt-3 max-w-[290px] text-sm leading-relaxed text-white/60">
              Commercial ad solutions built for agencies and brands that need scale,
              quality, and measurable business impact.
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          Copyright {new Date().getFullYear()} Better Collective Ads. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
