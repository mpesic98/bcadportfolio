import { useState } from "react";
import { motion } from "framer-motion";
import arrow from "../assets/arrow.svg";
import arrowDown from "../assets/arrowDown.svg";

function Card({ backgroundImg, hoverImg, title, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[400px] h-[500px] rounded-xl overflow-hidden cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{ type: "spring", stiffness: 150, damping: 22 }}
    >
      {/* two layered divs for smooth crossfade */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* hover image becomes DEFAULT */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hoverImg})` }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 45%)",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 text-black-100 rounded-b-lg backdrop-blur-2xl"
        variants={{
          rest: { height: 64, backgroundColor: "rgba(255,255,255,0.40)" },
          hover: { height: 170, backgroundColor: "rgba(255,255,255,0.65)" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-3 md:px-4">
          <h2 className="tracking-wide h-[50px] flex items-center font-medium">
            {title}
          </h2>

          <div className="relative w-6 h-6">
            <motion.img
              src={arrow}
              className="absolute inset-0 w-6 h-6"
              variants={{
                rest: { opacity: 1, x: 0 },
                hover: { opacity: 0, x: -6 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.img
              src={arrowDown}
              className="absolute inset-0 w-6 h-6"
              variants={{
                rest: { opacity: 0, x: 6 },
                hover: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        <motion.div
          className="px-3 md:px-4 pb-4 text-base text-black/80"
          initial={{ opacity: 0 }}
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.1 }}
        >
          <p className="leading-relaxed text-black/90 mt-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="mt-3">
            <button className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
              See Preview
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Card;
