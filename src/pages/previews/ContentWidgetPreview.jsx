import ContentWidgetCreative from "../../components/previews/ContentWidgetCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"

const SLOTS_300X600 = new Set(["inline_300x600", "mobile_inline_300x600"])
const SLOTS_300X250 = new Set([
  "sidebar_300x250_1",
  "sidebar_300x250_2",
  "inline_300x250_3",
  "mobile_inline_300x250_1",
  "mobile_inline_300x250_2",
])

export default function ContentWidgetPreview() {
  const contentMaxWidth = 1100

  const renderAd = (slotId) => {
    if (SLOTS_300X600.has(slotId)) {
      return <ContentWidgetCreative width={300} height={600} />
    }

    if (SLOTS_300X250.has(slotId)) {
      return <ContentWidgetCreative width={300} height={250} />
    }

    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
