"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../motion/Reveal";
import { FadeIn } from "../motion/FadeIn";
import StrokeText from "../motion/StrokeText";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Subtle cinematic background scale
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] min-h-[720px] bg-[#F5E6D3] overflow-hidden">
      
      {/* 1. Cinematic Background & Readability Gradient */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full z-0 origin-center">
        <Image
          src="/images/hero/bg-warm.png" 
          alt="Warm Kitchen Background"
          fill
          priority
          className="object-cover object-center" 
        />
        {/* Subtle cream-to-transparent overlay for text readability without turning black */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF9F1]/80 via-[#FDF9F1]/30 to-transparent" />
      </motion.div>

     {/* 2. Animated Transparent Biryani Asset (Right Side Anchor) */}
      <motion.div 
        initial={{ opacity: 0, x: 200, y: 150, rotate: 15 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{ 
          duration: 1.6, 
          ease: [0.16, 1, 0.3, 1], // Custom cinematic deceleration
          delay: 0.3 
        }}
        className="absolute z-10 right-[-10vw] lg:right-[2vw] bottom-[-2%] w-[85vw] lg:w-[55vw] max-w-[820px] drop-shadow-[0_35px_70px_rgba(139,69,19,0.25)] pointer-events-none"
      >
        <Image
          src="/images/hero/biryani-handi.png"
          alt="Dragon Signature Biryani"
          width={820}
          height={600}
          priority
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* 3. Strict Editorial Grid (Left Column) */}
      <div className="absolute z-20 left-[7vw] top-[28%] w-full max-w-[500px] flex flex-col items-start m-0">
        
        {/* Location Eyebrow */}
        <FadeIn delay={0.2} duration={0.8}>
          <div className="font-sans text-[11px] tracking-[0.18em] text-[#B85C29] uppercase font-medium mb-[30px] flex items-center gap-2">
            <span className="text-[14px]">⌖</span>
            Dandamunda · Chandahandi
          </div>
        </FadeIn>

        {/* Main Animated Heading */}
        <div className="w-full -ml-1 drop-shadow-[0_4px_16px_rgba(255,255,255,0.4)]">
           <StrokeText 
              text="DRAGON" 
              strokeColor="#A66A25" 
              fillColor="#1A1814" // Deep dark brown/black for contrast against bright BG
              fontSize={110} 
              drawDuration={1.8} 
              letterSpacing={-4}
           />
        </div>

        {/* Descriptor */}
        <Reveal direction="up" duration={1.2} delay={1.8}>
          <h2 className="font-sans text-[clamp(34px,3.5vw,58px)] font-medium text-[#3A2E26] leading-[0.95] mt-1 mb-[28px]">
            Cloud Kitchen
          </h2>
        </Reveal>

        {/* Tagline */}
        <FadeIn delay={2.0} duration={0.8}>
          <p className="font-sans text-[20px] text-[#5C4D42] font-normal leading-[1.5] max-w-[280px] mb-[42px]">
            Biryani that makes<br />you come back.
          </p>
        </FadeIn>

        {/* Primary CTA */}
        <FadeIn delay={2.2} duration={0.6}>
          <button className="bg-[#C52D22] text-white font-sans text-[12px] font-semibold tracking-[0.15em] uppercase w-[300px] h-[58px] rounded-full hover:bg-[#A31D14] transition-all shadow-[0_8px_24px_rgba(197,45,34,0.3)] flex items-center justify-center gap-3 mb-[32px]">
            <span className="text-[16px]">◉</span>
            Order on WhatsApp <span className="ml-2 text-[18px] leading-none">→</span>
          </button>
        </FadeIn>

        {/* Delivery Metadata */}
        <FadeIn delay={2.4} duration={0.8}>
          <div className="flex items-center text-[11px] font-sans text-[#3A2E26] tracking-[0.08em] uppercase whitespace-nowrap opacity-90">
            <span className="text-[#C52D22] mr-2">●</span>
            <span className="font-bold mr-1">10 KM</span> Delivery
            <span className="mx-5 text-[#3A2E26]/20">|</span>
            <span className="text-[#C52D22] text-[14px] mr-2">◷</span>
            <span className="font-bold mr-1">10 AM — 8 PM</span>
          </div>
        </FadeIn>
      </div>

      {/* 4. Scroll Indicator */}
      <FadeIn delay={2.8} duration={1}>
        <div className="absolute right-[4vw] bottom-[28px] flex flex-col items-center gap-2 text-[#5C4D42] text-[10px] tracking-[0.2em] font-semibold">
          SCROLL
          <span className="animate-bounce">↓</span>
        </div>
      </FadeIn>
    </section>
  );
};