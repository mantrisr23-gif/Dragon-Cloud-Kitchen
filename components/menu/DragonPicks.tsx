"use client";

import { useCart } from "@/hooks/useCart";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface DragonPicksProps {
  onOpenBag?: () => void;
  menuItems: any[];
}

export const DragonPicks: React.FC<DragonPicksProps> = ({ onOpenBag, menuItems }) => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('ALL');
  
  const CATEGORIES = ['ALL', ...Array.from(new Set(menuItems.map(item => item.category)))];
  
  const handleAddClick = (foodItem: any) => {
    addToCart({
      id: foodItem.id,
      name: foodItem.title,
      price: foodItem.price,
      image: foodItem.image,
      desc: foodItem.desc
    });
    
    if (onOpenBag) onOpenBag(); 
  };

  const filteredItems = activeCategory === 'ALL' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // THE ARTIST FIX: Force the database to respect the visual layout.
  // This ensures the big 'featured' signature dishes are ALWAYS index 0 and 1 (Top Row),
  // and the smaller plates perfectly fill the rows below them.
  const visuallySortedItems = [...filteredItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <section id="menu" className="relative w-full min-h-screen bg-[#F5E6D3] pt-24 pb-32 overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(217,119,67,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(166,106,37,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-[#C52D22] font-sans text-[11px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            From The Kitchen
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[48px] md:text-[64px] text-[#3A2E26] leading-none tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-dm-serif), serif' }}
          >
            THE DRAGON PICKS
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-[16px] text-[#5C4D42] italic"
          >
            Our favourites, made fresh.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {CATEGORIES.map((cat: any) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#B85C29] text-white border-[#B85C29]' 
                  : 'bg-transparent text-[#5C4D42] border-[#3A2E26]/20 hover:border-[#B85C29]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-24">
          <AnimatePresence mode="popLayout">
            {visuallySortedItems.map((item: any, index: number) => {
              
              const colClass = item.featured ? 'md:col-span-3' : 'md:col-span-2';
              
              // Now that the array is perfectly sorted, index 5 will ALWAYS be the final centered item
              const isLastRowCenter = activeCategory === 'ALL' && index === 5;
              const finalGridClass = isLastRowCenter ? `${colClass} md:col-start-3` : colClass;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover="hover"
                  className={`relative flex flex-col items-center ${finalGridClass}`}
                >
                  
                  <motion.div 
                    variants={{ hover: { opacity: 1, scale: 1.1 } }} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,67,0.12)_0%,transparent_60%)] pointer-events-none top-[-25%] rounded-full z-0" 
                  />

                  <div className={`relative z-10 ${item.featured ? 'w-[280px] md:w-[360px] h-[280px] md:h-[360px]' : 'w-[200px] md:w-[240px] h-[200px] md:h-[240px]'} mb-6`}>
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [-0.5, 0.5, -0.5] }}
                      transition={{ repeat: Infinity, duration: Math.random() * 2 + 4, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      <motion.div variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full h-full relative">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-contain drop-shadow-[0_25px_35px_rgba(139,69,19,0.25)]" 
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div variants={{ hover: { y: -4 } }} transition={{ duration: 0.3 }} className="text-center z-10 w-full max-w-[280px]">
                    <h3 className={`text-[#3A2E26] ${item.featured ? 'text-[28px]' : 'text-[22px]'} leading-none mb-3`} style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-[#5C4D42] text-[13px] leading-[1.6] mb-5 h-[42px] opacity-80">
                      {item.desc}
                    </p>
                    
                    <div className="flex items-center justify-center gap-5">
                      <span className="font-sans font-bold text-[#C52D22] text-[18px]">
                        ₹{item.price}
                      </span>
                      
                      <motion.button
                        onClick={() => handleAddClick(item)} 
                        className="flex items-center justify-center bg-[#3A2E26] text-[#F5E6D3] rounded-full h-[36px] overflow-hidden shadow-md cursor-pointer"
                        variants={{ hover: { width: 90, backgroundColor: "#C52D22" } }}
                        initial={{ width: 36, backgroundColor: "#3A2E26" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <motion.span 
                          variants={{ hover: { display: "block", opacity: 1, width: "auto" } }} 
                          initial={{ display: "none", opacity: 0, width: 0 }} 
                          className="font-sans text-[11px] font-bold tracking-[0.05em] mr-1 whitespace-nowrap"
                        >
                          ADD
                        </motion.span>
                        <span className="text-[18px] leading-none mb-[2px]">+</span>
                      </motion.button>
                    </div>
                  </motion.div>
                  
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28 flex justify-center"
        >
          <button className="group flex items-center gap-4 bg-transparent border border-[#C52D22]/30 text-[#C52D22] px-8 py-4 rounded-full font-sans text-[11px] font-bold tracking-[0.15em] uppercase hover:border-[#C52D22] hover:bg-[#C52D22] hover:text-white hover:shadow-[0_4px_20px_rgba(197,45,34,0.3)] transition-all duration-300">
            View Full Menu 
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-[14px]">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};