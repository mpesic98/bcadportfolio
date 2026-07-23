import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormatDetailsModal from "../FormatDetailsModal"
import { publicCatalog } from "../../data/publicCatalog"
import PortfolioPage from "../portfolio/PortfolioPage"

const PACKAGE_FORMAT_IDS = new Set([
  "high-impact-latam-takeover",
  "high-impact-nam-takeover",
  "high-impact-emea-takeover",
])
const HIDDEN_DISCOVERY_FORMAT_IDS = new Set([
  "pre-roll-video",
  "video-instream-nonskippable-onsite",
  "video-instream-nonskippable-youtube",
])

const FORMAT_GROUPS = [
  {
    id: "high-impact",
    title: "High Impact",
    ids: ["skin", "interscroller", "interstitial"],
  },
  {
    id: "display",
    title: "Display",
    ids: [
      "display-banners",
      "native",
      "mobile-slider",
      "livescore",
      "countdown-widget",
      "cube",
      "content-widget",
      "leadgen",
    ],
  },
  {
    id: "video",
    title: "Video",
    ids: [
      "video-banners",
      "video-instream-skippable-onsite",
      "video-instream-skippable-youtube",
    ],
  },
  {
    id: "betsense",
    title: "Betsense",
    ids: ["betsense-countdown", "betsense-three-way-odds"],
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
  const navigate = useNavigate()
  const [openItem, setOpenItem] = useState(null)
  const displayedItems = publicCatalog
  const visibleItems = displayedItems.filter(
    (item) => !HIDDEN_DISCOVERY_FORMAT_IDS.has(item.formatId)
  )
  const packageItems = visibleItems.filter((item) => PACKAGE_FORMAT_IDS.has(item.formatId))
  const browseItems = visibleItems.filter(
    (item) => !PACKAGE_FORMAT_IDS.has(item.formatId)
  )
  const formatGroups = buildFormatGroups(browseItems)

  useEffect(() => {
    if (!openItem) return
    const stillExists = displayedItems.some((item) => item.formatId === openItem.formatId)
    if (!stillExists) setOpenItem(null)
  }, [displayedItems, openItem])

  const openPreview = (item) => {
    const previewPath = `/preview/${item.formatId}`
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
        formatGroups={formatGroups}
        packageItems={packageItems}
        onPreview={openPreview}
        onOpenDetails={setOpenItem}
      />

      <FormatDetailsModal
        open={Boolean(openItem)}
        formatData={openItem}
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
