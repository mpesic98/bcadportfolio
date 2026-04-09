import display160x600 from "../../assets/display_160x600.png"
import display300x250 from "../../assets/display_300x250.png"
import display300x600 from "../../assets/display_300x600.png"
import display320x50 from "../../assets/display_320x50.png"
import display336x280 from "../../assets/display_336x280.png"
import display728x90 from "../../assets/display_728x90.png"
import display970x90 from "../../assets/display_970x90.png"
import { resolveCreativeForSlot } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const slotFallbacks = {
  rail_left_160x600: display160x600,
  rail_right_160x600: display160x600,
  top_1070x27: display970x90,
  sidebar_300x250_1: display300x250,
  sidebar_300x250_2: display300x250,
  inline_300x600: display300x600,
  inline_300x250_1: display300x250,
  inline_300x250_3: display300x250,
  mobile_inline_300x600: display300x600,
  mobile_inline_300x250_1: display300x250,
  mobile_inline_300x250_2: display300x250,
  mobile_inline_300x250_3: display300x250,
  mobile_sticky_320x50: display320x50,
}

const sizeFallbacks = {
  "160x600": display160x600,
  "300x250": display300x250,
  "300x600": display300x600,
  "320x50": display320x50,
  "336x280": display336x280,
  "728x90": display728x90,
  "970x90": display970x90,
}

export default function DisplayCreative({ slotId, size = "300x250" }) {
  const { campaign } = usePreviewCampaign()

  const [rawW, rawH] = size.split("x").map(Number)
  const w = Number.isFinite(rawW) ? rawW : 300
  const h = Number.isFinite(rawH) ? rawH : 250
  const fallbackSrc = slotFallbacks[slotId] || sizeFallbacks[size] || display300x250
  const src = resolveCreativeForSlot(campaign, slotId, fallbackSrc)
  const isLeaderboard = w >= 728 && h <= 90

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
