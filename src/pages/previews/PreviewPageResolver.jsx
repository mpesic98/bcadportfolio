import { Navigate, useLocation, useParams } from "react-router-dom"
import { endemicCatalog, endemicById } from "../../data/endemicCatalog"
import { nonEndemicCatalog, nonEndemicById } from "../../data/nonEndemicCatalog"
import { normalizeRegion, normalizeSegment } from "../../data/regionConfig"
import ContentWidgetPreview from "./ContentWidgetPreview"
import CubePreview from "./CubePreview"
import DisplayPreview from "./DisplayPreview"
import CountdownWidgetPreview from "./CountdownWidgetPreview"
import GenericFormatPreview from "./GenericFormatPreview"
import InterstitialPreview from "./InterstitialPreview"
import InterscrollerPreview from "./InterscrollerPreview"
import LeadgenPreview from "./LeadgenPreview"
import LivescorePreview from "./LivescorePreview"
import NativePreview from "./NativePreview"
import PreRollPreview from "./PreRollPreview"
import SkinPreview from "./SkinPreview"
import VideoBannerPreview from "./VideoBannerPreview"

const aliasMap = {
  display: "display-banners",
  videobanner: "video-banners",
  preroll: "pre-roll-video",
  countdown: "countdown-widget",
  content: "content-widget",
}

export default function PreviewPageResolver() {
  const { region, segment, formatId } = useParams()
  const location = useLocation()

  const normalizedRegion = normalizeRegion(region)
  const normalizedSegment = normalizeSegment(segment)

  const requestedId = formatId || ""
  const canonicalId = aliasMap[requestedId] || requestedId
  const searchSuffix = location.search || ""

  if (region !== normalizedRegion || segment !== normalizedSegment || requestedId !== canonicalId) {
    return (
      <Navigate
        to={`/${normalizedRegion}/${normalizedSegment}/preview/${canonicalId}${searchSuffix}`}
        replace
      />
    )
  }

  if (canonicalId === "interscroller") {
    return <InterscrollerPreview />
  }

  const catalog = normalizedSegment === "endemic" ? endemicCatalog : nonEndemicCatalog
  const formatById = normalizedSegment === "endemic" ? endemicById : nonEndemicById
  const formatData = formatById[canonicalId]

  if (!formatData) {
    const fallbackId = catalog[0]?.formatId || "display-banners"
    return (
      <Navigate
        to={`/${normalizedRegion}/${normalizedSegment}/preview/${fallbackId}${searchSuffix}`}
        replace
      />
    )
  }

  if (canonicalId === "livescore") return <LivescorePreview />
  if (canonicalId === "countdown-widget") return <CountdownWidgetPreview />
  if (canonicalId === "leadgen") return <LeadgenPreview />
  if (canonicalId === "cube") return <CubePreview />
  if (canonicalId === "native") return <NativePreview />
  if (canonicalId === "content-widget") return <ContentWidgetPreview />
  if (formatData.previewKind === "display") return <DisplayPreview />
  if (formatData.previewKind === "skin") return <SkinPreview />
  if (formatData.previewKind === "interstitial") return <InterstitialPreview />
  if (formatData.previewKind === "interscroller") return <InterscrollerPreview />
  if (formatData.previewKind === "video-banners") return <VideoBannerPreview />
  if (formatData.previewKind === "pre-roll") return <PreRollPreview formatData={formatData} />

  return <GenericFormatPreview formatData={formatData} />
}
