import CountdownCreative from "../../components/previews/CountdownCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import PreviewVariantSwitcher from "../../components/previews/PreviewVariantSwitcher"
import countdown300x250 from "../../assets/300x250_countdown.png"
import countdown300x600 from "../../assets/300x600_countdown.png"
import BaseNewsMock from "./BaseNewsMock"
import { useState } from "react"

const VARIANTS = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
]

const SLOTS_300X600 = new Set(["inline_300x600", "mobile_inline_300x600"])
const SLOTS_300X250 = new Set([
  "sidebar_300x250_1",
  "sidebar_300x250_2",
  "inline_300x250_3",
  "mobile_inline_300x250_1",
  "mobile_inline_300x250_2",
])

export default function CountdownWidgetPreview() {
  const contentMaxWidth = 1100
  const [variant, setVariant] = useState("image")

  const renderAd = (slotId) => {
    if (SLOTS_300X600.has(slotId)) {
      return (
        <div className="mx-auto" style={{ width: 300, height: 600, overflow: "hidden" }}>
          <CountdownCreative
            width={300}
            height={600}
            imageUrl={countdown300x600}
            mediaType={variant}
          />
        </div>
      )
    }

    if (SLOTS_300X250.has(slotId)) {
      return (
        <div className="mx-auto" style={{ width: 300, height: 250, overflow: "hidden" }}>
          <CountdownCreative
            width={300}
            height={250}
            imageUrl={countdown300x250}
            mediaType={variant}
          />
        </div>
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
        label="Countdown widget creative type"
      />
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
