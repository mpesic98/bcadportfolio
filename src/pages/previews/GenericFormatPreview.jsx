import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"
import DisplayCreative from "../../components/previews/DisplayCreative"

const sizeMap = {
  top_1070x27: "970x90",
  sidebar_300x250_1: "300x250",
  sidebar_300x250_2: "300x250",
  inline_300x600: "300x600",
  inline_300x250_1: "300x250",
  mobile_sticky_320x50: "320x50",
  mobile_inline_300x250_1: "300x250",
  mobile_inline_300x250_2: "300x250",
  mobile_inline_300x250_3: "300x250",
  mobile_inline_300x600: "300x600",
}

export default function GenericFormatPreview({ formatData }) {
  const renderAd = (slotId) => (
    <DisplayCreative slotId={slotId} size={sizeMap[slotId] || "300x250"} />
  )

  return (
    <PreviewFrame maxWidth={1100}>
      <div className="mx-auto max-w-[1100px] px-4 py-4">
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {formatData?.title || "Format"} - Placeholder Preview
          </div>
          <h1 className="mt-1 text-xl font-semibold text-neutral-900">
            Dedicated structure ready for final implementation
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            {formatData?.specs?.description ||
              "This format is scaffolded with placeholder creative blocks and can be replaced with final assets without changing routing."}
          </p>
        </div>
      </div>

      <BaseNewsMock renderAd={renderAd} />
    </PreviewFrame>
  )
}
