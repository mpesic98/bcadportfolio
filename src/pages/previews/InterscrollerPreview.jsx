import PreviewFrame from "../../components/previews/PreviewFrame"
import InterscrollerLayer from "../../components/previews/InterscrollerLayer"
import BaseNewsMock from "./BaseNewsMock"

export default function InterscrollerPreview() {
  return (
    <PreviewFrame>
      <div className="mx-auto max-w-[1100px] px-6">
        <BaseNewsMock />
        <InterscrollerLayer />
      </div>
    </PreviewFrame>
  )
}
