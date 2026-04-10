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
import HomeValueProps from "./HomeValueProps"
import actionLaptop from "../../assets/action-laptop.png"

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
  const heroImage = actionLaptop

  useEffect(() => {
    if (!openItem) return
    const stillExists = displayedItems.some((item) => item.formatId === openItem.formatId)
    if (!stillExists) setOpenItem(null)
  }, [displayedItems, openItem])

  const openPreview = (item) => {
    navigate(`/${region}/${segmentUrlValue}/preview/${item.formatId}`, {
      state: {
        title: item.title,
        leftImg: item.leftImg || null,
        rightImg: item.rightImg || null,
        clickUrl: item?.cta?.url || null,
      },
    })
  }

  return (
    <>
      <div className="relative overflow-x-hidden bg-gradient-to-b from-[#0F141B] to-[#0B0D10]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(680px circle at 70% 20%, rgba(0,167,103,0.14), transparent 62%)",
          }}
        />

        <div className="relative mx-auto max-w-[1120px] px-4 pb-16 pt-3 md:px-6 md:pb-20">
          <HomeHero
            heroImage={heroImage}
            onExplore={() =>
              document.getElementById("featured-solutions")?.scrollIntoView({ behavior: "smooth" })
            }
          />

          <div className="mt-14 md:mt-20">
            <HomeValueProps />
          </div>

          <div id="featured-solutions" className="mt-14 md:mt-20">
            <HomeFeatured items={featuredItems} region={region} onPreview={openPreview} />
          </div>

          <div id="browse-all-formats" className="mt-14 md:mt-20">
            <HomeFormatsGrid
              items={displayedItems}
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
