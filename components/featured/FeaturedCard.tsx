"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleReveal } from "../motion/ScaleReveal";
import { Price } from "../ui/Price";
import { IconButton } from "../ui/IconButton";
import { MenuItem } from "../../types/menu";

interface FeaturedCardProps {
  item: MenuItem;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } 
  }
};

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ item, index }) => {
  const [isAdded, setIsAdded] = useState(false);
  const formattedNumber = String(index + 1).padStart(2, "0");

  const handleAdd = () => {
    setIsAdded(true);
    // Future integration: addItemToCart(item)
    setTimeout(() => setIsAdded(false), 2000); // Temporary visual reset
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="group relative flex flex-col gap-4 p-4 rounded-xl hover:-translate-y-1 transition-transform duration-300 ease-out bg-warmBlack/0 hover:bg-warmBlack/30"
    >
      {/* Editorial Food Image */}
      <ScaleReveal scale={1.08} duration={0.9} blur="4px" className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-warmBlack">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-110" 
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 25vw"
        />
      </ScaleReveal>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <span className="font-accent text-gold/70 tracking-widest text-sm mb-1">
          {formattedNumber}
        </span>
        
        <h3 className="font-display text-2xl md:text-3xl text-ivory">
          {item.name}
        </h3>
        
        <p className="font-sans text-sand/80 text-sm line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>

        {/* Commerce Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-ivory/5">
          <Price amount={item.price} className="text-xl text-ivory" />
          
          <IconButton 
            aria-label={`Add ${item.name} to order`} 
            variant={isAdded ? "primary" : "secondary"}
            onClick={handleAdd}
            className={`transition-colors duration-300 ${isAdded ? "bg-whatsapp text-obsidian hover:bg-[#20b858]" : ""}`}
          >
            {isAdded ? "✓" : "+"}
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
};