import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import VideoBannerCreative from "../../components/previews/VideoBannerCreative"
import DisplayCreative from "../../components/previews/DisplayCreative"
import { useLocation } from "react-router-dom"

export default function VideoBannerPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (isMobile && slotId === "top_1070x27") return null

    if (slotId === "top_1070x27") {
      return <DisplayCreative slotId={slotId} size="1070x27" />
    }

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

    return <VideoBannerCreative slotId={slotId} size={sizes[slotId] || "300x250"} />
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
