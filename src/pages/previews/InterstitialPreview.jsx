import PreviewFrame from "../../components/previews/PreviewFrame"
import InterstitialLayer from "../../components/previews/InterstitialLayer"
import BaseNewsMock from "./BaseNewsMock"

export default function InterstitialPreview() {
  return (
    <PreviewFrame>
      <InterstitialLayer />
      <div className="mx-auto max-w-[1100px] px-6">
        <BaseNewsMock />
      </div>
    </PreviewFrame>
  )
}
