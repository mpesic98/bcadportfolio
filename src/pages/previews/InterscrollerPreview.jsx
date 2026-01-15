import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import InterscrollerLayer from "../../components/previews/InterscrollerLayer"

export default function InterscrollerPreview() {
  const contentMaxWidth = 1100

  const renderAd = (slotId) => {
    const sizes = {
      inline_300x600: "300x600",
      inline_300x250_1: "300x250",
      sidebar_300x250_1: "300x250",
      sidebar_300x250_2: "300x250"
    }

    if (!sizes[slotId]) return null

    return <InterscrollerLayer slotId={slotId} size={sizes[slotId]} />
  }

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <div className="mx-auto max-w-[1100px] px-6">
        <BaseNewsMock renderAd={renderAd} />
      </div>
    </PreviewFrame>
  )
}
