import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Card from "./Card"

import slider from "../assets/slider.png"
import displayBanner from "../assets/displaybanner.png"
import adtype3 from "../assets/adtype3.png"
import skinl from "../assets/skinl.png"
import skinr from "../assets/skinr.png"


const sharedHoverColor = "#00a666"
let globalHasVisited = false

const items = [
  { title: "Display Banners", image: slider, format: "display" },
  { title: "Skin",image: displayBanner,format: "skin",leftImg: skinl,rightImg: skinr,},
  { title: "Interscroller", image: adtype3, format: "interscroller" },
  { title: "Interstitial", image: slider, format: "interstitial" },
  { title: "Video Banners", image: displayBanner, format: "videobanner" },
  { title: "Pre-Roll Video", image: adtype3, format: "preroll" },
  { title: "Leadgen", image: slider, format: "display" },
  { title: "Cube", image: displayBanner, format: "display" },
  { title: "Native", image: adtype3, format: "display" },
  { title: "Content", image: slider, format: "display" },
  { title: "Sticky Glide", image: displayBanner, format: "display" },
  { title: "Glide", image: adtype3, format: "display" },
  { title: "Scratch", image: slider, format: "display" },
  { title: "Top Scroll", image: displayBanner, format: "display" },
  { title: "Compare", image: adtype3, format: "display" },
]

const items2 = [
  { title: "Bet Boost", image: slider, format: "display" },
  { title: "Pro Acca", image: slider, format: "display" },
  { title: "Countdown", image: slider, format: "display" },
  { title: "M3-Way", image: slider, format: "display" },
  { title: "Multi-Event", image: slider, format: "display" },
  { title: "X-Operator", image: slider, format: "display" },
  { title: "Bet Offer", image: slider, format: "display" },
  { title: "Two Way", image: slider, format: "display" },
  { title: "Game Center", image: slider, format: "display" },
  { title: "Horse Racing", image: slider, format: "display" },
  { title: "Predictor", image: slider, format: "display" },
  { title: "Tickets", image: slider, format: "display" },
  { title: "Absences", image: slider, format: "display" },
  { title: "Transfers", image: slider, format: "display" },
  { title: "Line-Ups", image: slider, format: "display" },
]

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
}

function Offers() {
  const [openItem, setOpenItem] = useState(null)
  const [selected, setSelected] = useState("success")
  const navigate = useNavigate()
  const isMounting = useRef(true)

  useEffect(() => {
    isMounting.current = false
    globalHasVisited = true
  }, [])

  const displayedItems = selected === "success" ? items : items2

  const handleFullPreview = (item) => {
    setOpenItem(null)

    navigate(`/preview/${item.format || "display"}`, {
      state: {
        leftImg: item.leftImg || null,
        rightImg: item.rightImg || null,
        title: item.title,
      },
    })
  }

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mt-10">
        {/* Toggle */}
        <motion.div className="flex justify-center gap-20 py-5 border-b border-t border-gray-300 mb-10">
          <button
            onClick={() => setSelected("success")}
            className={`border border-green-600 rounded-3xl px-4 py-2.5 text-sm transition-all ${
              selected === "success"
                ? "bg-green-600 text-white scale-105"
                : "bg-white text-green-600"
            }`}
          >
            Non-Endemic
          </button>

          <button
            onClick={() => setSelected("endemic")}
            className={`border border-green-600 rounded-3xl px-4 py-2.5 text-sm transition-all ${
              selected === "endemic"
                ? "bg-green-600 text-white scale-105"
                : "bg-white text-green-600"
            }`}
          >
            Endemic
          </button>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="grid grid-cols-3 gap-10 justify-items-center"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {displayedItems.map((item) => (
              <motion.div key={item.title} variants={cardItemVariants}>
                <Card
                  backgroundImg={item.image}
                  title={item.title}
                  format={item.format}
                  leftImg={item.leftImg}
                  rightImg={item.rightImg}
                  onOpen={() => setOpenItem(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openItem && (
          <motion.div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpenItem(null)}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[80%] max-w-[1200px] h-[700px] bg-white rounded-2xl overflow-hidden">
                <img
                  src={openItem.image}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-3xl mb-4">
                    {openItem.title}
                  </h3>

                  <button
                    onClick={() => handleFullPreview(openItem)}
                    className="px-6 py-3 bg-white rounded-xl"
                  >
                    Open Full Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Offers
