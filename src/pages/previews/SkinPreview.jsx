import PreviewFrame from "../../components/previews/PreviewFrame"
import SkinRails from "../../components/previews/SkinRails"
import BaseNewsMock from "./BaseNewsMock"

export default function SkinPreview() {
  const railWidth = 160
  const gap = 24
  const contentMaxWidth = 1052

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
    <SkinRails railWidth={railWidth} topBarHeight={108} contentMaxWidth={contentMaxWidth} /> 

<div className="mx-auto" style={{ maxWidth: `${contentMaxWidth + railWidth * 2 + 48}px` }}>
  <div
    style={{
      paddingLeft: railWidth + 24,
      paddingRight: railWidth + 24
    }}
  >
    <BaseNewsMock />
  </div>
</div>
    </PreviewFrame>
  )
}
