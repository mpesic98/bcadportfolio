import { useEffect, useMemo } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Usa from "../pages/USA"
import Latam from "../pages/LATAM"
import Europe from "../pages/Europe"
import {
  DEFAULT_SEGMENT,
  buildLandingPath,
  getSegmentUrlValue,
  normalizeRegion,
  normalizeSegment,
} from "../data/regionConfig"

const regionComponentMap = {
  usa: Usa,
  latam: Latam,
  europe: Europe,
}

export default function RegionLandingResolver() {
  const { region: regionParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const normalizedRegion = useMemo(
    () => normalizeRegion(regionParam),
    [regionParam]
  )

  useEffect(() => {
    const search = new URLSearchParams(location.search)
    const incomingSegment = search.get("segment")
    const normalizedSegment = normalizeSegment(incomingSegment)
    const segmentUrlValue = getSegmentUrlValue(normalizedSegment)
    const hasRegionInPath = Boolean(regionParam)
    const normalizedPath = hasRegionInPath ? `/${normalizedRegion}` : buildLandingPath(normalizedRegion)

    const requiresPathFix = location.pathname !== normalizedPath

    const requiresSegmentFix = incomingSegment !== segmentUrlValue

    if (!requiresPathFix && !requiresSegmentFix) return

    search.set("segment", segmentUrlValue || getSegmentUrlValue(DEFAULT_SEGMENT))
    navigate(`${normalizedPath}?${search.toString()}`, { replace: true })
  }, [location.pathname, location.search, navigate, normalizedRegion, regionParam])

  const regionKey = normalizeRegion(regionParam || "usa")
  const RegionPage = regionComponentMap[regionKey] || Usa

  return <RegionPage />
}
