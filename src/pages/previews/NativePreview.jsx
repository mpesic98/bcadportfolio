import NativeCreative from "../../components/previews/NativeCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"
import BaseNewsMock from "./BaseNewsMock"

const NATIVE_SLOTS = new Set(["sidebar_300x250_1", "mobile_inline_300x250_1"])

export default function NativePreview() {
  const contentMaxWidth = 1100
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
    <PreviewFrame maxWidth={contentMaxWidth}>
      <div
        style={{
          height: isMobile ? "100%" : "calc(100vh - 72px)",
          overflow: "hidden",
          touchAction: "none",
          overscrollBehavior: "contain",
        }}
        onWheel={handlePreventScroll}
        onTouchMove={handlePreventScroll}
      >
        <BaseNewsMock renderAd={renderAd} />
      </div>
    </PreviewFrame>
  )
}
