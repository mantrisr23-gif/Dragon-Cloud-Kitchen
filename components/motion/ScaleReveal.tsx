"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScaleRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  blur?: string;
  once?: boolean;
  className?: string;
}

export const ScaleReveal: React.FC<ScaleRevealProps> = ({
  children,
  delay = 0,
  duration = 1.0, // Cinematic reveal
  scale = 1.08,
  blur = "8px",
  once = true,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: shouldReduceMotion ? 1 : scale, 
        filter: shouldReduceMotion ? "blur(0px)" : `blur(${blur})` 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)" 
      }}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};