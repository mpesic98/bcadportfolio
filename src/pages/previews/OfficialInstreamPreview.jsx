import { useEffect, useMemo, useState } from "react"
import InstreamPlayerCreative from "../../components/previews/InstreamPlayerCreative"
import PreviewFrame from "../../components/previews/PreviewFrame"
import PreviewVariantSwitcher from "../../components/previews/PreviewVariantSwitcher"
import { usePreviewViewport } from "../../components/previews/previewViewport.jsx"
import BaseNewsMock from "./BaseNewsMock"
import YouTubeWatchMock from "../../components/previews/YouTubeWatchMock"

const DESKTOP_SLOT = "inline_preroll_730x330"
const MOBILE_SLOT = "mobile_preroll"

function OfficialInstreamContent({ formatData }) {
  const { vp } = usePreviewViewport()
  const isMobile = vp === "mobile"
  const specs = useMemo(
    () => (formatData?.officialSpecs || []).filter((spec) => spec.section === "video"),
    [formatData?.officialSpecs]
  )
  const initialSpecId = specs.some((spec) => spec.id === formatData?.formatId)
    ? formatData.formatId
    : specs[0]?.id
  const [selectedSpecId, setSelectedSpecId] = useState(initialSpecId)
  const spec = specs.find((item) => item.id === selectedSpecId) || specs[0]

  useEffect(() => {
    setSelectedSpecId(initialSpecId)
  }, [initialSpecId])

  const variants = specs.map((item) => ({
    value: item.id,
    label: item.skippable ? "Skippable" : "Non-skippable",
  }))

  const switcher = variants.length > 1 ? (
    <PreviewVariantSwitcher
      value={spec?.id}
      options={variants}
      onChange={setSelectedSpecId}
      label="In-stream video behavior"
      positionClassName="instream-variant-switcher bottom-4 right-4"
    />
  ) : null

  if (spec?.playerStyle === "youtube") {
    return (
      <>
        {switcher}
        <YouTubeWatchMock spec={spec} />
      </>
    )
  }

  const renderAd = (slotId) => {
    if ((!isMobile && slotId === DESKTOP_SLOT) || (isMobile && slotId === MOBILE_SLOT)) {
      return (
        <InstreamPlayerCreative
          spec={spec}
          compact={isMobile}
          autoScrollIntoView={!isMobile}
          sticky={!isMobile}
        />
      )
    }
    return null
  }

  return (
    <>
      {switcher}
      <BaseNewsMock
        renderAd={renderAd}
        hideMobileVideoMock={isMobile}
        showMobilePrerollSlot={isMobile}
        desktopPrerollPosition="early"
      />
    </>
  )
}

export default function OfficialInstreamPreview({ formatData }) {
  const isYouTube = formatData?.officialSpecs?.some(
    (spec) => spec.playerStyle === "youtube"
  )

  return (
    <PreviewFrame
      maxWidth={isYouTube ? 1600 : 1100}
      controlsMaxWidth={1100}
      lockPageScroll={isYouTube}
      disablePreviewScroll={isYouTube}
    >
      <OfficialInstreamContent formatData={formatData} />
    </PreviewFrame>
  )
}
