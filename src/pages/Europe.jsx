import exampleImg from "../assets/exampleImg.png";
import Offers from "../components/Offers.jsx";
import { motion } from "framer-motion";



function Europe() {
  return (
    <div className="bg-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-16 md:mt-30">
        <div className="max-w-full md:max-w-[700px] text-center md:text-left">
          <motion.span
            className="uppercase text-white text-xs tracking-[0.3em] font-semibold px-5 py-1 rounded-full bg-gradient-to-r from-green-700 to-green-400 shadow-md inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn", delay: 3 }}
          >
            Europe
          </motion.span>

          <motion.h1
            className="relative inline-block text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn", delay: 0.5 }}
          >

            <motion.span
              className="absolute left-0 top-1 h-3 bg-green-200 rounded-xl z-0 pointer-events-none w-[485px] h-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
              style={{ transformOrigin: "left" }}
            />

            <span className="relative z-10">
              Launch ad campaigns that
              <br className="hidden sm:block" />
              authentically connect with your
              <br className="hidden sm:block" />
              target audience.
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed border-t border-gray-200 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn", delay: 2 }}
          >
            Contextual advertising that allows you to reach your audience across
            the websites, newsletters, and podcasts they engage with.
          </motion.p>

          <motion.button
            className="mt-8 sm:mt-10 px-6 py-3 border border-black rounded-md font-semibold text-sm sm:text-base hover:bg-black hover:text-white transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 2.5 }}
          >
            💬 ADVERTISE WITH US
          </motion.button>
        </div>

        <motion.img
          src={exampleImg}
          alt="exampleImg"
          className="w-[300px] sm:w-[350px] md:w-[400px] h-auto object-contain mb-8 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeIn", delay: 0.7 }}
        />
      </div>
      <Offers />
    </div>
  );
}

export default Europe;
