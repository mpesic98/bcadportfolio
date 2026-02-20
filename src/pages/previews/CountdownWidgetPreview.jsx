import CountdownCreative from "../../components/previews/CountdownCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"

const COUNTDOWN_IMAGE_300X600 = "https://tpc.googlesyndication.com/simgad/10200231783928757156?"
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

  const renderAd = (slotId) => {
    if (SLOTS_300X600.has(slotId)) {
      return (
        <div className="mx-auto" style={{ width: 300, height: 600, overflow: "hidden" }}>
          <CountdownCreative width={300} height={600} imageUrl={COUNTDOWN_IMAGE_300X600} />
        </div>
      )
    }

    if (SLOTS_300X250.has(slotId)) {
      return (
        <div className="mx-auto" style={{ width: 300, height: 250, overflow: "hidden" }}>
          <CountdownCreative width={300} height={250} />
        </div>
      )
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
