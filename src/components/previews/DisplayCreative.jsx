import adA from "../../assets/300x250.jpg"
import adB from "../../assets/320x50.jpg"
import adC from "../../assets/300x250.jpg"
import adD from "../../assets/300x600.jpg"
import adE from "../../assets/300x250.jpg"
import adF from "../../assets/728x90.jpg"
import railL from "../../assets/sideskin.png"
import railR from "../../assets/sideskin.png"
import { resolveCreativeForSlot } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

export default function DisplayCreative({ slotId, size = "300x250" }) {
  const { campaign } = usePreviewCampaign()
  const map = {
    rail_left_160x600: railL,
    rail_right_160x600: railR,
    top_1070x27: adF,
    sidebar_300x250_1: adA,
    sidebar_300x250_2: adC,
    inline_300x600: adD,
    inline_300x250_1: adE,
    inline_300x250_3: adE,
    mobile_inline_300x600: adD,
    mobile_inline_300x250_1: adA,
    mobile_inline_300x250_2: adC,
    mobile_inline_300x250_3: adE,
    mobile_sticky_320x50: adB,
  }

  const [rawW, rawH] = size.split("x").map(Number)
  const w = Number.isFinite(rawW) ? rawW : 300
  const h = Number.isFinite(rawH) ? rawH : 250
  const fallbackSrc = map[slotId] || adA
  const src = resolveCreativeForSlot(campaign, slotId, fallbackSrc)
  const isLeaderboard = slotId === "top_1070x27"

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative overflow-hidden rounded-md border border-neutral-200 shadow-sm max-w-full"
        style={{ width: w, height: h }}
      >
        <img
          src={src}
          alt={slotId}
          className={isLeaderboard ? "w-full h-full object-contain bg-neutral-50" : "w-full h-full object-cover"}
        />

        <div className="absolute top-2 left-2 text-[9px] tracking-wide px-2 py-[3px] rounded backdrop-blur-sm bg-black/40 text-white/90 border border-white/10">
          {slotId} - {w}x{h}
        </div>
      </div>
    </div>
  )
}
