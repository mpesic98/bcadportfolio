import { useMemo } from "react"
import MobileSliderLayer from "../../components/previews/MobileSliderLayer"
import PreviewFrame from "../../components/previews/PreviewFrame"
import BaseNewsMock from "./BaseNewsMock"

export default function MobileSliderPreview() {
  const renderNoAds = useMemo(() => () => null, [])

  return (
    <PreviewFrame maxWidth={1100}>
      <MobileSliderLayer />
      <BaseNewsMock renderAd={renderNoAds} />
    </PreviewFrame>
  )
}
