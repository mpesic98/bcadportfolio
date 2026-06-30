import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import VideoBannerCreative from "../../components/previews/VideoBannerCreative"
import VideoCountdownBannerCreative from "../../components/previews/VideoCountdownBannerCreative"
import PreviewVariantSwitcher from "../../components/previews/PreviewVariantSwitcher"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const VARIANTS = [
  { value: "video", label: "Video" },
  { value: "countdown", label: "Countdown" },
]

export default function VideoBannerPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const [variant, setVariant] = useState("video")
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (slotId === "top_1070x27") return null

    if (
      isMobile &&
      (slotId === "sidebar_300x250_1" ||
        slotId === "sidebar_300x250_2" ||
        slotId === "inline_300x600" ||
        slotId === "inline_300x250_1")
    ) {
      return null
    }

    const sizes = {
      top_1070x27: "1070x27",
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

    const size = sizes[slotId] || "300x250"

    return variant === "countdown" ? (
      size === "300x250" || size === "300x600" ? (
        <VideoCountdownBannerCreative size={size} />
      ) : null
    ) : (
      <VideoBannerCreative slotId={slotId} size={size} />
    )
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <PreviewVariantSwitcher
        value={variant}
        options={VARIANTS}
        onChange={setVariant}
        label="Video banner creative type"
      />
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
