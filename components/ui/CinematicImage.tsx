"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

interface CinematicImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "portrait";
  className?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt,
  aspectRatio = "video",
  className = "",
}) => {
  const ratios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <motion.div 
      className={`relative w-full overflow-hidden bg-warmBlack ${ratios[aspectRatio]} ${className}`}
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  );
};