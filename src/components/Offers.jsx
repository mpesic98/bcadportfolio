import { useEffect, useState, useCallback } from "react";
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

function Offers() {
  const [openItem, setOpenItem] = useState(null);

  const navigate = useNavigate(); // ✅ FIX

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpenItem(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <div className="max-w-[1440px] items-center justify-center mx-auto px-6 md:px-16 mt-16 md:mt-30">
        <div className="flex items-center justify-center gap-10 mx-auto py-15 border-b-1 border-t-1 border-gray-300 mb-10">
          <button className="cursor-pointer">Endemic</button>
          <button className="cursor-pointer">Non-Endemic</button>
        </div>
        <div className="justify-items-center mt-50 gap-10 md:gap-10 grid grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              backgroundImg={item.image}
              hoverColor={sharedHoverColor}
              title={item.title}
              onOpen={() => setOpenItem(item)}
            />
          ))}
        </div>
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
