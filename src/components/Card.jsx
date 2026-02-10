import { useState } from "react"
import { motion as Motion } from "framer-motion"

import arrow from "../assets/arrow.svg"
import arrowDown from "../assets/arrowDown.svg"
import exampleImg from "../assets/displaybanner.png"

function Card({ item, onOpen, onPreview }) {
  const [isHovered, setIsHovered] = useState(false)
  const title = item?.title || "Format"
  const backgroundImg = item?.cardImage
  const hoverImg = item?.hoverImage || exampleImg

  return (
    <Motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${title} details`}
      onClick={() => onOpen(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen(item)
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative w-[400px] h-[500px] rounded-xl overflow-hidden cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: "spring", stiffness: 150, damping: 22 }}
    >
      <Motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <Motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hoverImg})`,
          filter: "blur(4px) brightness(85%)",
        }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] select-none text-center px-4">
          {title}
        </h1>
      </div>

      <Motion.div
        className="absolute bottom-0 left-0 right-0 text-black rounded-b-lg backdrop-blur-2xl"
        variants={{
          rest: { height: 0, backgroundColor: "rgba(255,255,255,0.40)" },
          hover: { height: 170, backgroundColor: "rgba(255,255,255,0.65)" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="tracking-wide h-[50px] flex items-center font-medium">
            {title}
          </h2>

          <div className="relative w-6 h-6">
            <Motion.img
              src={arrow}
              className="absolute inset-0 w-6 h-6"
              variants={{
                rest: { opacity: 1, x: 0 },
                hover: { opacity: 0, x: -6 },
              }}
            />
            <Motion.img
              src={arrowDown}
              className="absolute inset-0 w-6 h-6"
              variants={{
                rest: { opacity: 0, x: 6 },
                hover: { opacity: 1, x: 0 },
              }}
            />
          </div>
        </div>

        <Motion.div
          className="px-4 pb-4 text-base text-black/80"
          initial={{ opacity: 0 }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.1 }}
        >
          <p className="leading-relaxed text-black/90 mt-1">
            Visualise how your assets will appear in a live environment.
          </p>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onPreview(item)
              }}
              onKeyDown={(event) => event.stopPropagation()}
              aria-label={`Preview ${title}`}
              className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-neutral-800 transition-colors"
            >
              See Preview
            </button>
          </div>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  )
}

export default Card
