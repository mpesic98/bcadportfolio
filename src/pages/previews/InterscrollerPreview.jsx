import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterscrollerLayer from "../../components/previews/InterscrollerLayer"
import { useLocation } from "react-router-dom"
import DisplayCreative from "../../components/previews/DisplayCreative"

export default function InterscrollerPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (isMobile) {
      if (slotId === "mobile_sticky_320x50") {
        return <DisplayCreative slotId={slotId} size="320x50" />
      }

      if (slotId === "mobile_inline_300x600") {
        return <InterscrollerLayer slotId={slotId} size="300x600" />
      }

      if (slotId === "mobile_inline_300x250_1" || slotId === "mobile_inline_300x250_2") {
        return <DisplayCreative slotId={slotId} size="300x250" />
      }

      return null
    }

    if (slotId === "inline_300x600" || slotId === "inline_300x250_1") {
      const size = slotId === "inline_300x600" ? "300x600" : "300x250"
      return <InterscrollerLayer slotId={slotId} size={size} />
    }

    if (slotId === "top_1070x27" || slotId === "sidebar_300x250_1" || slotId === "sidebar_300x250_2") {
      const size = slotId === "top_1070x27" ? "1070x27" : "300x250"
      return <DisplayCreative slotId={slotId} size={size} />
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
