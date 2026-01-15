import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import VideoBannerCreative from "../../components/previews/VideoBannerCreative"

export default function VideoBannerPreview() {
  const contentMaxWidth = 1100

  const renderAd = (slotId) => {
    const sizes = {
      top_1070x27: "1070x27",
      sidebar_300x250_1: "300x250",
      sidebar_300x250_2: "300x250",
      inline_300x600: "300x600",
      inline_300x250_1: "300x250"
    }

    if (!sizes[slotId]) return null
    return <VideoBannerCreative slotId={slotId} size={sizes[slotId]} />
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <div className="mx-auto max-w-[1100px] px-6">
        <BaseNewsMock renderAd={renderAd} />
      </div>
    </PreviewFrame>
  )
}
