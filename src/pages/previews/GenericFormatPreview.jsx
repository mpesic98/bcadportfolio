import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import {
  assetLooksLikeVideo,
  resolveCreativeAsset,
  resolveFormatPreviewAsset,
} from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"

const sizeMap = {
  rail_left_160x600: "160x600",
  rail_right_160x600: "160x600",
  top_1070x27: "970x90",
  sidebar_300x250_1: "300x250",
  sidebar_300x250_2: "300x250",
  inline_300x600: "300x600",
  inline_300x250_1: "300x250",
  mobile_sticky_320x50: "320x50",
  mobile_inline_300x250_1: "300x250",
  mobile_inline_300x250_2: "300x250",
  mobile_inline_300x250_3: "300x250",
  mobile_inline_300x600: "300x600",
}

const packageCreativeKeysBySlot = {
  rail_left_160x600: ["skin_left", "skin_background"],
  rail_right_160x600: ["skin_right", "skin_background"],
  top_1070x27: ["display_top", "leaderboard"],
  sidebar_300x250_1: ["display_sidebar", "mrec"],
  sidebar_300x250_2: ["display_sidebar", "mrec"],
  inline_300x600: ["halfpage", "display_sidebar"],
  inline_300x250_1: ["display_sidebar", "mrec"],
  inline_300x250_3: ["display_sidebar", "mrec"],
  mobile_sticky_320x50: ["mobile_sticky"],
  mobile_inline_300x250_1: ["display_sidebar", "mrec"],
  mobile_inline_300x250_2: ["display_sidebar", "mrec"],
  mobile_inline_300x250_3: ["display_sidebar", "mrec"],
  mobile_inline_300x600: ["halfpage", "display_sidebar"],
}

function GenericFormatContent({ formatData }) {
  const { campaign, proposalFormat } = usePreviewCampaign()
  const brandedPreview =
    resolveFormatPreviewAsset(proposalFormat, campaign) ||
    formatData?.cardImage ||
    formatData?.hoverImage ||
    formatData?.showcaseSlides?.[0]?.image ||
    ""
  const isPackage = formatData?.officialSpecs?.some((spec) => spec.section === "high-impact")
  const isEmeaPackage = formatData?.formatId === "high-impact-emea-takeover"

  const renderAd = (slotId) => {
    const size = isEmeaPackage && slotId === "top_1070x27" ? "970x250" : sizeMap[slotId]
    if (!size) return null

    const isMobileSlot = slotId.startsWith("mobile_")
    const isPrimarySlot = slotId === "sidebar_300x250_1" || slotId === "mobile_inline_300x250_1"
    if (!isPackage && !isPrimarySlot) return null

    const packageAsset = isPackage
      ? (packageCreativeKeysBySlot[slotId] || [])
          .map((key) => resolveCreativeAsset(campaign, key))
          .find(Boolean)
      : ""
    const creativeAsset = packageAsset || brandedPreview
    if (!creativeAsset) return null

    const [width, height] = size.split("x").map(Number)
    return (
      <div
        className="relative mx-auto overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 shadow-sm"
        style={{ width, height, maxWidth: "100%" }}
      >
        {assetLooksLikeVideo(creativeAsset) ? (
          <video
            src={creativeAsset}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={creativeAsset}
            alt={`${formatData?.title || "Format"} ${isMobileSlot ? "mobile" : "desktop"} creative`}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute left-2 top-2 rounded bg-black/65 px-2 py-1 text-[9px] font-semibold text-white">
          {formatData?.title}
        </span>
      </div>
    )
  }

  return (
    <BaseNewsMock
      renderAd={renderAd}
      showDesktopRails={isPackage && !isEmeaPackage}
      showMobileSticky={isPackage}
      desktopTopSlotHeight={isEmeaPackage ? 250 : 90}
    />
  )
}

export default function GenericFormatPreview({ formatData }) {
  return (
    <PreviewFrame maxWidth={1100}>
      <GenericFormatContent formatData={formatData} />
    </PreviewFrame>
  )
}
