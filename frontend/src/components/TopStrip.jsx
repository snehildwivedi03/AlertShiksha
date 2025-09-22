import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TopStrip = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setShow(false);
      else setShow(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={false}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#90f6ff] text-gray text-sm py-2 text-center fixed top-0 z-50"
        >
          Preparing students for disasters, one drill at a time!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopStrip;
