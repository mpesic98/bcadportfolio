import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterscrollerLayer from "../../components/previews/InterscrollerLayer"
import { useLocation } from "react-router-dom"

export default function InterscrollerPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (isMobile && slotId === "mobile_inline_300x600") {
      return <InterscrollerLayer slotId={slotId} size="300x600" autoScrollIntoView />
    }

    if (!isMobile && slotId === "inline_300x600") {
      return <InterscrollerLayer slotId={slotId} size="300x600" autoScrollIntoView />
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
