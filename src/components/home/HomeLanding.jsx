import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FormatDetailsModal from "../FormatDetailsModal"
import { endemicCatalog } from "../../data/endemicCatalog"
import { nonEndemicCatalog } from "../../data/nonEndemicCatalog"
import {
  buildLandingPath,
  getSegmentUrlValue,
  normalizeSegment,
  resolveRegionFromPath,
} from "../../data/regionConfig"
import PortfolioPage from "../portfolio/PortfolioPage"

export default function HomeLanding() {
  const location = useLocation()
  const navigate = useNavigate()
  const [openItem, setOpenItem] = useState(null)

  const region = useMemo(
    () => resolveRegionFromPath(location.pathname),
    [location.pathname]
  )

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  )
  const incomingSegment = searchParams.get("segment")
  const segment = normalizeSegment(incomingSegment)
  const segmentUrlValue = getSegmentUrlValue(segment)

  useEffect(() => {
    if (incomingSegment === segmentUrlValue) return

    const next = new URLSearchParams(location.search)
    next.set("segment", segmentUrlValue)
    navigate(`${buildLandingPath(region)}?${next.toString()}`, { replace: true })
  }, [incomingSegment, location.search, navigate, region, segmentUrlValue])

  const displayedItems = segment === "endemic" ? endemicCatalog : nonEndemicCatalog
  const featuredItems = displayedItems.slice(0, 3)
  const featuredIds = new Set(featuredItems.map((item) => item.formatId))
  const browseItems = displayedItems.filter((item) => !featuredIds.has(item.formatId))

  useEffect(() => {
    if (!openItem) return
    const stillExists = displayedItems.some((item) => item.formatId === openItem.formatId)
    if (!stillExists) setOpenItem(null)
  }, [displayedItems, openItem])

  const openPreview = (item) => {
    const previewPath = `/${region}/${segmentUrlValue}/preview/${item.formatId}`
    const previewSearch =
      item.formatId === "interscroller" || item.formatId === "mobile-slider"
        ? "?vp=mobile"
        : item.formatId === "skin"
          ? "?vp=desktop"
          : ""

    navigate(`${previewPath}${previewSearch}`, {
      state: {
        title: item.title,
        leftImg: item.leftImg || null,
        rightImg: item.rightImg || null,
        clickUrl: null,
      },
    })
  }

  return (
    <>
      <PortfolioPage
        featuredItems={featuredItems}
        browseItems={browseItems}
        region={region}
        onPreview={openPreview}
        onOpenDetails={setOpenItem}
      />

      <FormatDetailsModal
        open={Boolean(openItem)}
        formatData={openItem}
        region={region}
        onClose={() => setOpenItem(null)}
        onOpenFullPreview={() => {
          if (!openItem) return
          openPreview(openItem)
          setOpenItem(null)
        }}
      />
    </>
  )
}
