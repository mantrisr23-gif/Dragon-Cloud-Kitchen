"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Extremely subtle scroll movement for the image (-20px)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-20px"]);

  return (
    <section 
    id="story"
      ref={containerRef} 
      className="relative w-full bg-[#F5E6D3] text-[#3A2E26] pt-32 pb-24 overflow-hidden"
    >
      <div className="max-w-[1080px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* 1. Section Entrance */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#B85C29] uppercase mb-8"
          >
            The Dragon Experience
          </motion.div>
          
          {/* Line-by-Line Headline Reveal */}
          <div className="overflow-hidden pb-1">
            <motion.h2 
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[52px] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-dm-serif), serif' }}
            >
              Made with intention.
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h2 
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[52px] leading-[1.1] tracking-tight text-[#5C4D42]"
              style={{ fontFamily: 'var(--font-dm-serif), serif' }}
            >
              Served without compromise.
            </motion.h2>
          </div>
        </div>

        {/* 2 & 3. Hero Image Reveal & Parallax */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.08, y: 35, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden mb-24 md:mb-32 shadow-[0_30px_60px_rgba(58,46,38,0.15)]"
        >
          <motion.div style={{ y: imageParallax }} className="w-full h-full relative scale-[1.05]">
            <Image
              src="/images/experience/kitchen-prep-1.jpg" 
              alt="Dragon Kitchen Preparation"
              fill
              sizes="(max-width: 768px) 100vw, 1080px"
              className="object-cover object-center"
            />
            {/* Extremely subtle grade to enrich the photo */}
            <div className="absolute inset-0 bg-[#3A2E26]/5 mix-blend-multiply" />
          </motion.div>
        </motion.div>

        {/* 4. Three Principles Reveal (Individual triggers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 mb-32 md:mb-40">
          {[
            { num: "01", title: "FRESHLY MADE", desc: "Every order starts in the kitchen. Prepared fresh rather than sitting around waiting for an order." },
            { num: "02", title: "BOLD FLAVOURS", desc: "Spices that actually taste like something. Deep masala, aromatic rice and properly finished chicken." },
            { num: "03", title: "MADE FOR YOU", desc: "From our kitchen to your door. Freshly packed and sent out while it's still worth eating." }
          ].map((pillar) => (
            <motion.div 
              key={pillar.num} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              {/* Number (0.0s) */}
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="font-sans text-[12px] font-bold text-[#B85C29] tracking-[0.1em] mb-2"
              >
                {pillar.num}
              </motion.div>
              
              {/* Title (0.08s) */}
              <motion.h3 
                variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.08 } } }}
                className="font-sans text-[16px] font-bold tracking-[0.15em] text-[#3A2E26] mb-4"
              >
                {pillar.title}
              </motion.h3>
              
              {/* Description (0.18s) */}
              <motion.p 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, delay: 0.18 } } }}
                className="font-sans text-[15px] text-[#5C4D42] leading-[1.65] opacity-90 pr-4 mb-6"
              >
                {pillar.desc}
              </motion.p>

              {/* Animated Line (0.25s) */}
              <motion.div 
                variants={{ hidden: { width: 0 }, visible: { width: "100%", transition: { duration: 0.8, delay: 0.25, ease: "easeOut" } } }}
                className="h-[1px] bg-[#3A2E26]/15"
              />
            </motion.div>
          ))}
        </div>

        {/* 6. Closing Statement */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center flex flex-col items-center"
        >
          {/* Word-by-word reveal */}
          <h3 
            className="text-[28px] md:text-[36px] text-[#3A2E26] leading-[1.2] tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-dm-serif), serif' }}
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0 } } }} className="inline-block mr-2">Good food</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 } } }} className="inline-block mr-2">doesn&apos;t need</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } } }} className="inline-block">an introduction.</motion.span>
          </h3>

          {/* CTA delayed by 250ms after the last word */}
          <motion.button 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.45 } } }}
            className="group font-sans text-[11px] font-bold tracking-[0.2em] text-[#C52D22] uppercase hover:text-[#A31D14] transition-colors flex items-center justify-center gap-2"
          >
            See what&apos;s next
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-[14px]">→</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};