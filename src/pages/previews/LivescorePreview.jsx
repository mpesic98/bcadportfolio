import LivescoreRotator from "../../components/previews/LivescoreRotator"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"

export default function LivescorePreview() {
  const contentMaxWidth = 1100

  const slots300x600 = new Set(["inline_300x600", "mobile_inline_300x600"])
  const slots300x250 = new Set([
    "sidebar_300x250_1",
    "sidebar_300x250_2",
    "inline_300x250_3",
    "mobile_inline_300x250_1",
    "mobile_inline_300x250_2",
  ])

  const renderAd = (slotId) => {
    if (slots300x600.has(slotId)) return <LivescoreRotator size="300x600" />
    if (slots300x250.has(slotId)) return <LivescoreRotator size="300x250" />
    return null
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
