import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

// ASSETS
import slider from "../assets/ad-types/slider.png";
import displayBanner from "../assets/ad-types/displaybanner.png";
import adtype3 from "../assets/ad-types/adtype3.png";

const sharedHoverColor = "#00a666";
let globalHasVisited = false;

// NOTE: Add leftImg/rightImg paths here to see them on the preview page
const items = [
  { title: "Display Banners", image: slider, leftImg: null, rightImg: null },
  { title: "Skin", image: displayBanner, leftImg: "/assets/skin-left.png", rightImg: "/assets/skin-right.png" },
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

// --- ANIMATION VARIANTS ---
const cardItemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } } };
const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const modalVariants = { hidden: { opacity: 0, y: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }, exit: { opacity: 0, y: 16, transition: { duration: 0.3, ease: "easeIn" } } };

function Offers() {
  const [openItem, setOpenItem] = useState(null);
  const [selected, setSelected] = useState("success");
  const navigate = useNavigate();
  const isMounting = useRef(true);

  useEffect(() => {
    isMounting.current = false;
    globalHasVisited = true;
  }, []);

  const shouldSkipAnimation = isMounting.current && globalHasVisited;
  const displayedItems = selected === "success" ? items : items2;

  const handleFullPreview = (item) => {
    setOpenItem(null); // Close modal
    navigate("/preview", { state: { leftImg: item.leftImg, rightImg: item.rightImg, title: item.title } });
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: shouldSkipAnimation ? 0 : 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="max-w-[1440px] items-center justify-center mx-auto px-6 md:px-16 mt-10 md:mt-30">
        {/* Toggle Buttons */}
        <motion.div className="flex items-center justify-center gap-20 mx-auto py-5 border-b border-t border-gray-300 mb-10">
          <button onClick={() => setSelected("success")} className={`border border-green-600 font-medium rounded-3xl text-sm px-4 py-2.5 cursor-pointer transition-all ${selected === "success" ? "bg-green-600 text-white shadow-md scale-105" : "bg-white text-green-600 hover:bg-green-50"}`}>Non-Endemic</button>
          <button onClick={() => setSelected("endemic")} className={`border border-green-600 font-medium rounded-3xl text-sm px-4 py-2.5 cursor-pointer transition-all ${selected === "endemic" ? "bg-green-600 text-white shadow-md scale-105" : "bg-white text-green-600 hover:bg-green-50"}`}>Endemic</button>
        </motion.div>

        {/* Grid Display */}
        <AnimatePresence mode="wait">
          <motion.div key={selected} className="justify-items-center mt-20 gap-10 grid grid-cols-3" variants={gridContainerVariants} initial={shouldSkipAnimation ? "show" : "hidden"} animate="show" exit="exit">
            {displayedItems.map((item) => (
              <motion.div key={item.title} variants={cardItemVariants}>
                <Card
                  backgroundImg={item.image}
                  leftImg={item.leftImg}
                  rightImg={item.rightImg}
                  hoverColor={sharedHoverColor}
                  title={item.title}
                  onOpen={() => setOpenItem(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal View */}
      <AnimatePresence>
        {openItem && (
          <motion.div className="fixed inset-0 z-50" variants={backdropVariants} initial="hidden" animate="visible" exit="exit">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setOpenItem(null)} />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div variants={modalVariants} className="relative w-[80%] max-w-[1200px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white/95" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-full">
                  <img src={openItem?.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 px-8 py-10 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-4">
                    <h3 className="text-white text-3xl font-semibold">{openItem?.title}</h3>
                    <button
                      onClick={() => handleFullPreview(openItem)}
                      className="w-fit px-6 py-3 bg-white text-black font-medium rounded-xl shadow hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      Open Full Preview
                    </button>
                  </div>
                  <button onClick={() => setOpenItem(null)} className="cursor-pointer absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white shadow p-2">✕</button>
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