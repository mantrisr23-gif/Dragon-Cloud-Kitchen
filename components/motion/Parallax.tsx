"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g., 0.2 for 20% slower than scroll
  direction?: "up" | "down" | "left" | "right";
  offset?: [string, string];
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.2,
  direction = "up",
  offset = ["start end", "end start"],
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const yRange = direction === "up" ? ["0%", `${speed * 100}%`] : direction === "down" ? ["0%", `-${speed * 100}%`] : ["0%", "0%"];
  const xRange = direction === "left" ? ["0%", `${speed * 100}%`] : direction === "right" ? ["0%", `-${speed * 100}%`] : ["0%", "0%"];

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x, y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};