import Picture from "../assets/adImg.jpg";
import arrow from "../assets/arrow.svg";
import arrowDown from "../assets/arrowDown.svg";
import { motion } from "framer-motion";

const cardVariants = {
  rest: { y: 0, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
  hover: { y: -10, boxShadow: "0 18px 36px rgba(0,0,0,0.22)" },
};

const panelVariants = {
  rest: { height: 64, backgroundColor: "rgba(255,255,255,0.40)" },
  hover: { height: 220, backgroundColor: "rgba(255,255,255,0.65)" },
};

const arrowRest = { opacity: 1, x: 0 };
const arrowHover = { opacity: 0, x: -6 };
const arrowDownRest = { opacity: 0, x: 6 };
const arrowDownHover = { opacity: 1, x: 0 };

const items = ["Ad Example 1", "Ad Example 2", "Ad Example 3"];

function ModalDetails() {
  return (
    <div className="flex flex-wrap items-center justify-center mt-50 gap-10 md:gap-20">
      {items.map((title) => (
        <motion.div
          key={title}
          className="relative w-[400px] h-[500px] rounded-xl overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `url(${Picture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardVariants}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 45%)",
            }}
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 text-green-100 rounded-b-lg backdrop-blur-2xl"
            variants={panelVariants}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-3 md:px-4">
              <h2 className="tracking-wide h-[50px] flex items-center font-medium">
                {title}
              </h2>

              <div className="relative w-6 h-6">
                <motion.img
                  src={arrow}
                  alt="arrow"
                  className="absolute inset-0 w-6 h-6"
                  variants={{ rest: arrowRest, hover: arrowHover }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />

                <motion.img
                  src={arrowDown}
                  alt="arrow-hover"
                  className="absolute inset-0 w-6 h-6"
                  variants={{ rest: arrowDownRest, hover: arrowDownHover }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.div
              className="px-3 md:px-4 pb-4 text-base text-black/80 "
              initial={{ opacity: 0 }}
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.25 }}
            >
              <p className="leading-relaxed text-white/90 mt-1 p-b-2 p-r-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default ModalDetails;
