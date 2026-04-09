import { useState } from "react"
import { motion as Motion } from "framer-motion"

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
      className="relative w-[400px] h-[500px] rounded-xl overflow-hidden cursor-pointer shadow-[0_0_18px_rgba(0,0,0,0.18)]"
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
          filter: "blur(4px) brightness(100%)",
        }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <Motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] select-none text-center px-4">
          {title}
        </h1>
      </Motion.div>

      <Motion.div
        className="absolute bottom-0 left-0 right-0 text-black rounded-b-lg backdrop-blur-2xl"
        variants={{
          rest: { height: 0, backgroundColor: "rgba(255,255,255,0.40)" },
          hover: { height: 170, backgroundColor: "rgba(255,255,255,0.65)" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center px-4">
          <h2 className="tracking-wide h-[50px] flex items-center text-lg md:text-xl font-semibold">
            {title}
          </h2>
        </div>

        <Motion.div
          className="px-4 pb-4 text-base text-black/80 h-[120px] flex flex-col"
          initial={{ opacity: 0 }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.1 }}
        >
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onPreview(item)
              }}
              onKeyDown={(event) => event.stopPropagation()}
              aria-label={`Preview ${title}`}
              className="bc-button bc-button--dark bc-button--sm"
            >
              See Preview
            </button>
          </div>

          <p className="mt-auto text-[11px] leading-snug text-neutral-500 text-center">
            Visualise how your assets will appear in a live environment.
          </p>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  )
}

export default Card
