import ContentWidgetCreative from "../../components/previews/ContentWidgetCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import { resolveCreativeAsset } from "../../features/proposals/creativeResolver"
import { usePreviewCampaign } from "../../features/proposals/PreviewCampaignContext"
import BaseNewsMock from "./BaseNewsMock"

const SLOTS_300X600 = new Set(["inline_300x600", "mobile_inline_300x600"])
const SLOTS_300X250 = new Set([
  "sidebar_300x250_1",
  "sidebar_300x250_2",
  "inline_300x250_3",
  "mobile_inline_300x250_1",
  "mobile_inline_300x250_2",
])

function ContentWidgetPreviewContent() {
  const { campaign } = usePreviewCampaign()
  const campaignAsset = resolveCreativeAsset(campaign, "content_widget")

  const renderAd = (slotId) => {
    if (SLOTS_300X600.has(slotId)) {
      return <ContentWidgetCreative width={300} height={600} imageUrl={campaignAsset} />
    }

    if (SLOTS_300X250.has(slotId)) {
      return <ContentWidgetCreative width={300} height={250} imageUrl={campaignAsset} />
    }

    return null
  }

  return <BaseNewsMock renderAd={renderAd} />
}

export default function ContentWidgetPreview() {
  return (
    <PreviewFrame maxWidth={1100}>
      <ContentWidgetPreviewContent />
    </PreviewFrame>
  )
}
