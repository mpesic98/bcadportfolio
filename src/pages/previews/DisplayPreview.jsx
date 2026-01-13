import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"

export default function DisplayPreview() {
  const contentMaxWidth = 1100

  return (
    <PreviewFrame maxWidth={contentMaxWidth}>
      <div className="mx-auto max-w-[1100px] px-6">
        <BaseNewsMock />
      </div>
    </PreviewFrame>
  )
}
