import { useEffect, useState, useCallback, useRef } from "react";
import slider from "../assets/ad-types/slider.png";
import displayBanner from "../assets/ad-types/displaybanner.png";
import adtype3 from "../assets/ad-types/adtype3.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const sharedHoverColor = "#00a666";

const items = [
  { title: "Display Banners", image: slider },
  { title: "Skin", image: displayBanner },
  { title: "Interscroller", image: adtype3 },
  { title: "Interstitial", image: slider },
  { title: "Video Banners", image: displayBanner },
  { title: "Pre-Roll Video", image: adtype3 },
  { title: "Leadgen", image: slider },
  { title: "Cube", image: displayBanner },
  { title: "Native", image: adtype3 },
  { title: "Content", image: slider },
  { title: "Sticky Glide", image: displayBanner },
  { title: "Glide", image: adtype3 },
  { title: "Scratch", image: slider },
  { title: "Top Scroll", image: displayBanner },
  { title: "Compare", image: adtype3 },
];

const items2 = [
  { title: "Bet Boost", image: slider },
  { title: "Pro Acca", image: slider },
  { title: "Countdown", image: slider },
  { title: "M3-Way", image: slider },
  { title: "Multi-Event", image: slider },
  { title: "X-Operator", image: slider },
  { title: "Bet Offer", image: slider },
  { title: "Two Way", image: slider },
  { title: "Game Center", image: slider },
  { title: "Horse Racing", image: slider },
  { title: "Predictor", image: slider },
  { title: "Tickets", image: slider },
  { title: "Absences", image: slider },
  { title: "Transfers", image: slider },
  { title: "Line-Ups", image: slider },
];

// --- VARIANTS ---
const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.3, ease: "easeIn" } },
};

// GLOBAL VARIABLE: Persists during navigation, Resets on Refresh
let globalHasVisited = false;

function Offers() {
  const [openItem, setOpenItem] = useState(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("success");

  // REF: Tracks if the component is currently mounting
  const isMounting = useRef(true);

  useEffect(() => {
    // After first render, we set these flags
    isMounting.current = false;
    globalHasVisited = true;
  }, []);

  // LOGIC:
  // We only skip animation if we are mounting (fresh page load or back button)
  // AND we have visited before (global flag is true).
  // If we are just switching tabs (isMounting is false), we always animate.
  const shouldSkipAnimation = isMounting.current && globalHasVisited;

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpenItem(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const displayedItems = selected === "success" ? items : items2;

  // GRID VARIANTS
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // If skipping, 0 stagger. If normal animation, 0.1 stagger.
        staggerChildren: shouldSkipAnimation ? 0 : 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="max-w-[1440px] items-center justify-center mx-auto px-6 md:px-16 mt-10 md:mt-30">
        <motion.div
          className="flex items-center justify-center gap-20 mx-auto py-5 border-b-1 border-t-1 border-gray-300 mb-10"
          initial={globalHasVisited ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: globalHasVisited ? 0 : 0.3 }}
        >
          <button
            type="button"
            onClick={() => setSelected("success")}
            className={`
          border border-green-600 font-medium leading-5 rounded-3xl text-sm px-4 py-2.5 
          focus:outline-none cursor-pointer
          transition-all duration-200 ease-in-out active:scale-95
          ${
            selected === "success"
              ? "bg-green-600 text-white shadow-md transform scale-105"
              : "bg-white text-green-600 hover:bg-green-200 hover:text-green-900"
          }
        `}
          >
            Non-Endemic
          </button>

          <button
            type="button"
            onClick={() => setSelected("endemic")}
            className={`
          border border-green-600 font-medium leading-7 rounded-3xl text-sm px-4 py-2.5 
          focus:outline-none  cursor-pointer
          transition-all duration-200 ease-in-out active:scale-95
          ${
            selected === "endemic"
              ? "bg-green-600 text-white shadow-md transform scale-105"
              : "bg-white text-green-600 hover:bg-green-200 hover:text-green-900"
          }
        `}
          >
            Endemic
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            className="justify-items-center mt-20 gap-10 md:gap-10 grid grid-cols-3"
            variants={gridContainerVariants}
            initial={shouldSkipAnimation ? "show" : "hidden"}
            animate="show"
            exit="exit"
          >
            {displayedItems.map((item) => (
              <motion.div key={item.title} variants={cardItemVariants}>
                <Card
                  backgroundImg={item.image}
                  hoverColor={sharedHoverColor}
                  title={item.title}
                  onOpen={() => setOpenItem(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openItem && (
          <motion.div
            className="fixed inset-0 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm lg:backdrop-blur-md"
              onClick={() => setOpenItem(null)}
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center"
              >
                <div
                  onClick={() => setOpenItem(null)}
                  className="fixed inset-0 bg-black/50"
                />

                <div
                  className="relative w-[80%] md:w-[80%] max-w-[1200px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white/95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={openItem?.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-3">
                      <h3 className="text-white text-2xl md:text-3xl font-semibold drop-shadow-xl px-1">
                        {openItem?.title}
                      </h3>

                      <button
                        onClick={() => navigate(`/preview/${openItem?.title}`)}
                        className="w-fit px-5 py-2 bg-white text-black font-medium rounded-lg shadow hover:bg-gray-100 "
                      >
                        Open Full Preview
                      </button>
                    </div>

                    <button
                      onClick={() => setOpenItem(null)}
                      className="cursor-pointer absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow p-2 leading-none"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Offers;
