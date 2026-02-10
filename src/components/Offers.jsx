import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import Card from "./Card"
import FormatDetailsModal from "./FormatDetailsModal"
import { endemicCatalog } from "../data/endemicCatalog"
import { nonEndemicCatalog } from "../data/nonEndemicCatalog"
import {
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

  useEffect(() => {
    if (incomingSegment === segment) return

    const next = new URLSearchParams(location.search)
    next.set("segment", segment)
    navigate(`/${region}?${next.toString()}`, { replace: true })
  }, [incomingSegment, location.search, navigate, region, segment])

  const displayedItems = segment === "endemic" ? endemicCatalog : nonEndemicCatalog

  useEffect(() => {
    if (!openItem) return
    const stillExists = displayedItems.some((item) => item.formatId === openItem.formatId)
    if (!stillExists) setOpenItem(null)
  }, [displayedItems, openItem])

  const handleSegmentChange = (nextSegment) => {
    if (nextSegment === segment) return
    const next = new URLSearchParams(location.search)
    next.set("segment", nextSegment)
    navigate(`/${region}?${next.toString()}`)
  }

  const openPreview = (item) => {
    navigate(`/${region}/${segment}/preview/${item.formatId}`, {
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
        <Motion.div className="flex justify-center gap-4 md:gap-20 py-5 border-b border-t border-gray-300 mb-10">
          <button
            type="button"
            onClick={() => handleSegmentChange("non-endemic")}
            className={`border border-green-600 rounded-3xl px-4 py-2.5 text-sm transition-all ${
              segment === "non-endemic"
                ? "bg-green-600 text-white scale-105"
                : "bg-white text-green-600"
            }`}
          >
            Non-Endemic
          </button>

          <button
            type="button"
            onClick={() => handleSegmentChange("endemic")}
            className={`border border-green-600 rounded-3xl px-4 py-2.5 text-sm transition-all ${
              segment === "endemic"
                ? "bg-green-600 text-white scale-105"
                : "bg-white text-green-600"
            }`}
          >
            Endemic
          </button>
        </Motion.div>

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
        segment={segment}
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
