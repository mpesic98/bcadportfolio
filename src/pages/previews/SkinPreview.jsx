import PreviewFrame from "../../components/previews/PreviewFrame"
import SkinRails from "../../components/previews/SkinRails"
import BaseNewsMock from "./BaseNewsMock"

export default function SkinPreview() {
  const railWidth = 160
  const gap = 24
  const contentMaxWidth = 1100

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
    <SkinRails railWidth={railWidth} topBarHeight={72} contentMaxWidth={contentMaxWidth} /> 

      <div
        className="mx-auto"
        style={{
          maxWidth: contentMaxWidth,
          width: `calc(100% - ${(railWidth + gap) * 2}px)`,
          paddingLeft: gap,
          paddingRight: gap,
        }}
      >
        <BaseNewsMock />
      </div>
    </PreviewFrame>
  )
}
