"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  "aria-label": string;
  variant?: "primary" | "secondary" | "ghost";
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "secondary",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none";
  
  const variants = {
    primary: "bg-dragonRed text-ivory hover:bg-deepDragon",
    secondary: "bg-warmBlack text-ivory hover:text-gold",
    ghost: "bg-transparent text-sand hover:text-ivory",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className={`${baseStyles} ${variants[variant]} p-3 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};