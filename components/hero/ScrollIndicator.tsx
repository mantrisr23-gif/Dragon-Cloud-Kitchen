"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollIndicatorProps {
  delay?: number;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ delay = 1.4 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      className="absolute bottom-6 md:bottom-10 left-6 md:left-12 z-40 flex flex-col items-center gap-3 pointer-events-none hidden md:flex"
    >
      <span className="font-accent text-[10px] tracking-[0.2em] text-sand/60 uppercase" style={{ writingMode: 'vertical-rl' }}>
        Scroll
      </span>
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-sand/60 text-xs"
      >
        ↓
      </motion.div>
    </motion.div>
  );
};