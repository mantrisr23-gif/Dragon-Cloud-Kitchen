"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0, x: 0, y: 0 };
    switch (direction) {
      case "up": return { y: "100%", opacity: 0 };
      case "down": return { y: "-100%", opacity: 0 };
      case "left": return { x: "100%", opacity: 0 };
      case "right": return { x: "-100%", opacity: 0 };
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={getInitial()}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once, margin: "-50px" }}
        transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }} // Snappy yet smooth
      >
        {children}
      </motion.div>
    </div>
  );
};