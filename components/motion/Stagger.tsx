"use client";

import React from "react";
import { motion } from "framer-motion";

interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  className = "",
}) => {
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};