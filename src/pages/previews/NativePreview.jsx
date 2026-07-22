import NativeCreative from "../../components/previews/NativeCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"
import BaseNewsMock from "./BaseNewsMock"

const NATIVE_SLOTS = new Set(["sidebar_300x250_1", "mobile_inline_300x250_1"])

function NativePreviewContent() {
  const { vp } = usePreviewViewport()
  const isMobile = vp === "mobile"

  const renderAd = (slotId) => {
    if (!NATIVE_SLOTS.has(slotId)) return null
    return <NativeCreative width={300} height={250} />
  }

  const handlePreventScroll = (event) => {
    event.preventDefault()
  }

  return (
    <div
      style={{
        height: isMobile ? "100%" : "calc(100dvh - var(--preview-header-height, 72px))",
        overflow: "hidden",
        touchAction: "none",
        overscrollBehavior: "contain",
      }}
      onWheel={handlePreventScroll}
      onTouchMove={handlePreventScroll}
    >
      <BaseNewsMock renderAd={renderAd} />
    </div>
  )
}

export default function NativePreview() {
  return (
    <PreviewFrame maxWidth={1100} lockPageScroll>
      <NativePreviewContent />
    </PreviewFrame>
  )
}
