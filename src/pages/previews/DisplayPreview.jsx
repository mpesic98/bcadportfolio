import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import DisplayCreative from "../../components/previews/DisplayCreative"
import { useLocation } from "react-router-dom"

export default function DisplayPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (slotId === "inline_preroll_730x330") return null

    const sizes = {
      rail_left_160x600: "160x600",
      rail_right_160x600: "160x600",
      top_1070x27: "970x90",
      sidebar_300x250_1: "300x250",
      sidebar_300x250_2: "300x250",
      inline_300x600: "300x600",
      mobile_sticky_320x50: "320x50",
      mobile_inline_300x250_1: "300x250",
      mobile_inline_300x250_2: "300x250",
      mobile_inline_300x600: "300x600",
      inline_300x250_3: "300x250",
    }

    return <DisplayCreative slotId={slotId} size={sizes[slotId] || "300x250"} />
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} mobileStickyMode="fixed" showDesktopRails={!isMobile} />
    </PreviewFrame>
  )
}
