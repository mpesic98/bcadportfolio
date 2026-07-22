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

const FEATURED_FORMAT_IDS = ["skin", "interscroller", "interstitial"]
const PACKAGE_FORMAT_IDS = new Set([
  "high-impact-latam-takeover",
  "high-impact-nam-takeover",
  "high-impact-emea-takeover",
])
const HIDDEN_DISCOVERY_FORMAT_IDS = new Set([
  "leadgen",
  "pre-roll-video",
  "video-instream-nonskippable-onsite",
  "video-instream-nonskippable-youtube",
])

const FORMAT_GROUPS = [
  {
    id: "core-formats",
    title: "Core Formats",
    ids: [
      "display-banners",
      "video-banners",
      "native",
    ],
  },
  {
    id: "interactive-formats",
    title: "Interactive Formats",
    ids: [
      "mobile-slider",
      "livescore",
      "countdown-widget",
      "cube",
      "content-widget",
    ],
  },
  {
    id: "instream-video",
    title: "In-stream Video",
    ids: [
      "video-instream-skippable-onsite",
      "video-instream-skippable-youtube",
    ],
  },
]

function buildFormatGroups(items) {
  const itemById = Object.fromEntries(items.map((item) => [item.formatId, item]))
  return FORMAT_GROUPS.map((group) => ({
    ...group,
    items: group.ids.map((id) => itemById[id]).filter(Boolean),
  })).filter((group) => group.items.length)
}

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
  const visibleItems = displayedItems.filter(
    (item) => !HIDDEN_DISCOVERY_FORMAT_IDS.has(item.formatId)
  )
  const featuredItems = segment === "endemic"
    ? visibleItems.slice(0, 3)
    : FEATURED_FORMAT_IDS.map((id) => visibleItems.find((item) => item.formatId === id)).filter(Boolean)
  const featuredIds = new Set(featuredItems.map((item) => item.formatId))
  const packageItems = segment === "endemic"
    ? []
    : visibleItems.filter((item) => PACKAGE_FORMAT_IDS.has(item.formatId))
  const browseItems = visibleItems.filter(
    (item) => !featuredIds.has(item.formatId) && !PACKAGE_FORMAT_IDS.has(item.formatId)
  )
  const formatGroups = segment === "endemic"
    ? [{ id: "catalog", title: "Formats", items: browseItems }]
    : buildFormatGroups(browseItems)

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
        formatGroups={formatGroups}
        packageItems={packageItems}
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
