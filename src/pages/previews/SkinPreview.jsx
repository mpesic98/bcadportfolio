import PreviewFrame from "../../components/previews/PreviewFrame"
import SkinRails from "../../components/previews/SkinRails"
import BaseNewsMock from "./BaseNewsMock"
import DisplayCreative from "../../components/previews/DisplayCreative"
import { useLocation } from "react-router-dom"

export default function SkinPreview() {
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"
  const railWidth = 160
  const railGap = 24
  const contentMaxWidth = 1100
  const frameMaxWidth = contentMaxWidth + (railWidth + railGap) * 2

  const renderAd = (slotId) => {
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

    return <DisplayCreative slotId={slotId} size={sizes[slotId] || "300x250"} />
  }

  if (isMobile) {
    return (
      <PreviewFrame maxWidth={1100} controlsMaxWidth={1100}>
        <div aria-hidden="true" className="h-0" />
      </PreviewFrame>
    )
  }

  return (
    <PreviewFrame maxWidth={frameMaxWidth} controlsMaxWidth={1100}>
      <SkinRails railWidth={railWidth} railGap={railGap} topBarHeight={72} contentMaxWidth={contentMaxWidth} />

      <div className="mx-auto" style={{ maxWidth: frameMaxWidth }}>
        <div style={{ paddingLeft: railWidth + railGap, paddingRight: railWidth + railGap }}>
          <BaseNewsMock renderAd={renderAd} />
        </div>
      </div>
    </PreviewFrame>
  )
}
