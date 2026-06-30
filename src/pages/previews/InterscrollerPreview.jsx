import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterscrollerLayer from "../../components/previews/InterscrollerLayer"
import PreviewVariantSwitcher from "../../components/previews/PreviewVariantSwitcher"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const VARIANTS = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
]

export default function InterscrollerPreview() {
  const contentMaxWidth = 1100
  const location = useLocation()
  const [variant, setVariant] = useState("image")
  const isMobile = new URLSearchParams(location.search).get("vp") === "mobile"

  const renderAd = (slotId) => {
    if (isMobile && slotId === "mobile_inline_300x600") {
      return (
        <InterscrollerLayer
          slotId={slotId}
          size="300x600"
          autoScrollIntoView
          mediaType={variant}
        />
      )
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <PreviewVariantSwitcher
        value={variant}
        options={VARIANTS}
        onChange={setVariant}
        label="Interscroller creative type"
      />
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
