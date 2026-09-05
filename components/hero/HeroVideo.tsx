"use client";

import React from "react";
import Image from "next/image";
import { Parallax } from "../motion/Parallax";

interface HeroVideoProps {
  src: string;
  poster: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ src, poster }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-obsidian overflow-hidden z-0">
      <Parallax speed={0.15} className="w-full h-full">
        {/* Video Element */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[75%_center] scale-[1.02]"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
          <Image 
            src={poster} 
            alt="Dragon Biryani" 
            fill 
            className="object-cover object-center md:object-[75%_center]" 
            priority 
          />
        </video>

        {/* Cinematic Overlays */}
        {/* Mobile: Strong bottom gradient pushing up to protect stacked text */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent/20 md:hidden z-10" />
        
        {/* Desktop: Heavy left gradient fading to right, leaving the right-side food vibrant */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent w-full md:w-[80%] hidden md:block z-10" />
        
        {/* Global subtle dim to guarantee WCAG contrast on extreme highlights */}
        <div className="absolute inset-0 bg-obsidian/10 mix-blend-multiply z-20" />
      </Parallax>
    </div>
  );
};