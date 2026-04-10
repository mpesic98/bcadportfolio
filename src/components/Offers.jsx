import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import Card from "./Card"
import FormatDetailsModal from "./FormatDetailsModal"
import { endemicCatalog } from "../data/endemicCatalog"
import { nonEndemicCatalog } from "../data/nonEndemicCatalog"
import {
  getSegmentUrlValue,
  normalizeSegment,
  resolveRegionFromPath,
} from "../data/regionConfig"

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
}

function Offers() {
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
    navigate(`/${region}?${next.toString()}`, { replace: true })
  }, [incomingSegment, location.search, navigate, region, segmentUrlValue])

  const displayedItems = segment === "endemic" ? endemicCatalog : nonEndemicCatalog

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mt-10">
        <AnimatePresence mode="wait">
          <Motion.div
            key={segment}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {displayedItems.map((item) => (
              <Motion.div key={item.formatId} variants={cardItemVariants}>
                <Card
                  item={item}
                  onOpen={(entry) => setOpenItem(entry)}
                  onPreview={openPreview}
                />
              </Motion.div>
            ))}
          </Motion.div>
        </AnimatePresence>
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

export default Offers
