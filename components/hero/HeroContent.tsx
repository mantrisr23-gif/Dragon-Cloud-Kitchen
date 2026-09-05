"use client";

import React from "react";
import { Reveal } from "../motion/Reveal";
import { FadeIn } from "../motion/FadeIn";
import { Button } from "../ui/Button";

export const HeroContent: React.FC = () => {
  return (
    <div className="relative z-30 flex flex-col justify-end md:justify-center w-full h-full pb-28 md:pb-0 px-6 lg:px-12 max-w-7xl mx-auto pointer-events-none">
      
      <div className="max-w-xl lg:max-w-2xl pointer-events-auto">
        {/* 0.2s - Eyebrow */}
        <FadeIn delay={0.2} y={10}>
          <span className="font-accent tracking-[0.25em] text-gold/90 text-xs md:text-sm uppercase mb-4 md:mb-6 block">
            DANDAMUNDA • CHANDAHANDI
          </span>
        </FadeIn>

        {/* 0.35s - Main Brand */}
        <Reveal direction="up" duration={1.1} delay={0.35}>
          <h1 className="font-display text-[clamp(4.5rem,12vw,9.5rem)] text-ivory leading-[0.85] tracking-tight">
            DRAGON
          </h1>
        </Reveal>
        
        {/* 0.55s - Subtitle */}
        <Reveal direction="up" duration={0.9} delay={0.55}>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-dragonRed leading-tight mb-4 md:mb-8">
            CLOUD KITCHEN
          </h2>
        </Reveal>

        {/* 0.8s - Tagline */}
        <FadeIn delay={0.8} duration={0.8}>
          <p className="font-sans text-lg md:text-2xl text-sand mb-8 md:mb-12 max-w-sm md:max-w-md">
            Biryani that makes you come back.
          </p>
        </FadeIn>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8 md:mb-10">
          {/* 1.05s - Primary CTA */}
          <FadeIn delay={1.05} duration={0.6} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl shadow-dragonRed/20 group">
              ORDER NOW 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </FadeIn>
          
          {/* 1.2s - Secondary CTA */}
          <FadeIn delay={1.2} duration={0.6} className="w-full sm:w-auto">
            <Button variant="ghost" size="md" className="w-full sm:w-auto border-b border-transparent hover:border-ivory/30 rounded-none px-2">
              EXPLORE MENU ↓
            </Button>
          </FadeIn>
        </div>

        {/* 1.05s - Supporting Info */}
        <FadeIn delay={1.05} duration={0.8}>
          <div className="flex items-center gap-3 font-accent tracking-widest text-xs md:text-sm text-ivory/60">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-whatsapp animate-pulse" />
              10 KM DELIVERY
            </span>
            <span className="text-sand/30">•</span>
            <span>10 AM – 8 PM</span>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};