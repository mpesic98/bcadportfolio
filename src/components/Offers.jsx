import { useEffect, useState, useCallback } from "react";
import slider from "../assets/ad-types/slider.png";
import displayBanner from "../assets/ad-types/displaybanner.png";
import adtype3 from "../assets/ad-types/adtype3.png";
import hover from "../assets/adImg.jpg";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";

const items = [
  { title: "Display Banners", image: slider, hoverImage: hover },
  { title: "Skin", image: displayBanner, hoverImage: hover },
  { title: "Interscroller", image: adtype3, hoverImage: hover },
  { title: "Interstitial", image: slider, hoverImage: hover },
  { title: "Video Banners", image: displayBanner, hoverImage: hover },
  { title: "Pre-Roll Video", image: adtype3, hoverImage: hover },
  { title: "Leadgen", image: slider, hoverImage: hover },
  { title: "Cube", image: displayBanner, hoverImage: hover },
  { title: "Native", image: adtype3, hoverImage: hover },
  { title: "Content", image: slider, hoverImage: hover },
  { title: "Sticky Glide", image: displayBanner, hoverImage: hover },
  { title: "Glide", image: adtype3, hoverImage: hover },
  { title: "Scratch", image: slider, hoverImage: hover },
  { title: "Top Scroll", image: displayBanner, hoverImage: hover },
  { title: "Compare", image: adtype3, hoverImage: hover },
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

  useEffect(() => {
    if (openItem) {
      const prev = document.body.style.overflow;
      return () => (document.body.style.overflow = prev);
    }
  }, [openItem]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setOpenItem(null);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
    <div className="max-w-[1440px] items-center justify-center mx-auto">
      <div className="justify-items-center mt-50 gap-10 md:gap-10 grid grid-cols-3">
        {items.map((item) => (
          <Card
            key={item.title}
            backgroundImg={item.image}
            hoverImg={item.hoverImage}
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
              aria-hidden="true"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
  variants={modalVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  style={{ willChange: "opacity, transform" }}
  className="fixed inset-0 z-50 flex items-center justify-center"
>
  {/* Overlay for closing the modal */}
  <div
    onClick={() => setOpenItem(null)} // Close modal when clicking outside
    className="fixed inset-0 bg-black/50"
    aria-hidden="true"
  />

  {/* Modal Content */}
  <div
    className="relative w-[80%] md:w-[80%] max-w-[1200px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-white/95"
    onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing modal
  >
    <div className="relative h-full overflow-hidden">
      <img
        src={openItem?.image || displayBanner}
        alt=""
        className="w-full h-full object-cover overflow-hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <h3 className="absolute bottom-3 left-4 text-white text-2xl md:text-3xl font-semibold drop-shadow">
        {openItem?.title}
      </h3>

      <button
        onClick={() => setOpenItem(null)}
        className="cursor-pointer absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow p-2 leading-none"
        aria-label="Close"
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
