import display160x600 from "../../assets/display_160x600.png"
import display300x250 from "../../assets/display_300x250.png"
import display300x600 from "../../assets/display_300x600.png"
import display320x50 from "../../assets/display_320x50.png"
import display336x280 from "../../assets/display_336x280.png"
import display728x90 from "../../assets/display_728x90.png"
import display970x90 from "../../assets/display_970x90.png"
import { resolveCreativeForSlot } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import { officialAdFormats2026 } from "../../data/globalAdSpecs2026"
import CreativeSpecsPopover from "./CreativeSpecsPopover"

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
  const spec = officialAdFormats2026.find(
    (format) =>
      format.section === "display" &&
      format.dimensions?.some((dimension) => dimension.startsWith(size))
  )
  const isMobileSlot = slotId.startsWith("mobile_")
  const deviceLabel = isMobileSlot
    ? "Mobile"
    : spec?.devices?.includes("Mobile") && spec?.devices?.includes("Desktop")
      ? "Desktop"
      : spec?.devices?.join(" · ") || "Desktop"

  return (
    <div className="w-full flex justify-center">
      <CreativeSpecsPopover
        title={spec?.name || "Display banner"}
        size={size}
        device={deviceLabel}
        rows={[
          {
            label: "Accepted formats",
            value: [
              "Third-party tags via HTTPS",
              "JPG, PNG or GIF",
              "HTML5 as a complete ZIP",
            ],
          },
          { label: "Animation", value: "Up to 15 seconds and 3 loops" },
        ]}
        note="General commercial guidance. Confirm final delivery with Ad Ops."
      >
        <div
          className="relative overflow-hidden rounded-md border border-neutral-200 shadow-sm max-w-full"
          style={{ width: w, height: h }}
        >
          <img
            src={src}
            alt={`${spec?.name || "Display banner"} ${size}`}
            className={isLeaderboard ? "w-full h-full object-contain bg-neutral-50" : "w-full h-full object-cover"}
          />

          <div className="absolute left-2 top-2 rounded border border-white/10 bg-black/45 px-2 py-[3px] text-[9px] tracking-wide text-white/90 backdrop-blur-sm">
            {size}
          </div>
        </div>
      </CreativeSpecsPopover>
    </div>
  )
}
