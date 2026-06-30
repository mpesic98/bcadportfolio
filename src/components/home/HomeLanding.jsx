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
import HomeFeatured from "./HomeFeatured"
import HomeFormatsGrid from "./HomeFormatsGrid"
import HomeHero from "./HomeHero"

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
      item.formatId === "interscroller"
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
      <div className="relative overflow-x-hidden bg-[var(--bc-green)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(1,91,73,0.98) 0%, rgba(1,72,58,0.96) 42%, rgba(8,33,28,0.98) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-3 md:px-6 md:pb-20">
          <HomeHero />

          <div id="featured-solutions" className="mt-14 md:mt-16">
            <HomeFeatured items={featuredItems} region={region} onPreview={openPreview} />
          </div>

          <div id="browse-all-formats" className="mt-14 md:mt-20">
            <HomeFormatsGrid
              items={browseItems}
              region={region}
              onPreview={openPreview}
              onOpenDetails={setOpenItem}
            />
          </div>
        </div>
      </div>

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
