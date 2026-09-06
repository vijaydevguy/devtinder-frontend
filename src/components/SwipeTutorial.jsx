import React from "react";
import { motion } from "framer-motion";

const SwipeTutorial = () => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/70 rounded-2xl overflow-hidden backdrop-blur-sm">
      
      {/* Left side hint */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90">
        <motion.div 
          animate={{ x: [-5, -15, -5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white text-4xl font-extralight mb-1"
        >
          &larr;
        </motion.div>
        <span className="text-white text-xs font-light text-center w-20">Swipe Left to Ignore</span>
      </div>

      {/* Right side hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-90">
        <motion.div 
          animate={{ x: [5, 15, 5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white text-4xl font-extralight mb-1"
        >
          &rarr;
        </motion.div>
        <span className="text-white text-xs font-light text-center w-20">Swipe Right to Accept</span>
      </div>

      <div className="text-white text-center px-4 mt-20">
        <div className="relative w-full h-32 flex items-center justify-center mb-4">
          <motion.div
            animate={{
              x: [0, 60, 0, -60, 0],
              rotate: [0, 8, 0, -8, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-7xl drop-shadow-2xl"
          >
            👆
          </motion.div>
        </div>
        <h3 className="text-2xl font-light tracking-widest drop-shadow-md opacity-80">SWIPE</h3>
      </div>
      
    </div>
  );
};

export default SwipeTutorial;
