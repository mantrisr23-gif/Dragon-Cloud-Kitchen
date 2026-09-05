"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScaleReveal } from "../motion/ScaleReveal";
import { Price } from "../ui/Price";
import { IconButton } from "../ui/IconButton";
import { MenuItem } from "../../types/menu";

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
  onAdd: (item: MenuItem, quantity: number) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onClick, onAdd }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the detail sheet
    if (!item.isAvailable) return;
    
    setIsAdded(true);
    onAdd(item, 1);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onClick(item)}
      className="group flex flex-col gap-3 p-3 rounded-xl bg-warmBlack hover:bg-warmBlack/80 border border-ivory/5 hover:border-ivory/10 transition-colors duration-300 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.name}`}
    >
      {/* Image */}
      <ScaleReveal scale={1.05} duration={0.7} blur="2px" className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-charcoal">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Veg/Non-Veg Indicator Layer */}
        <div className="absolute top-2 left-2 bg-obsidian/60 backdrop-blur-md px-2 py-1 rounded-sm flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-dragonRed"}`} />
          <span className="font-accent text-[10px] tracking-wider text-ivory">{item.isVeg ? "VEG" : "NON-VEG"}</span>
        </div>
      </ScaleReveal>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-display text-xl md:text-2xl text-ivory mb-1 truncate">{item.name}</h3>
        <p className="font-sans text-sand text-xs line-clamp-2 min-h-[2rem] mb-3">{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <Price amount={item.price} className="text-lg" />
          
          {item.isAvailable ? (
            <IconButton 
              aria-label={`Add ${item.name}`}
              onClick={handleAdd}
              className={`w-9 h-9 ${isAdded ? "bg-whatsapp text-obsidian" : "bg-charcoal text-ivory hover:text-gold"}`}
            >
              {isAdded ? "✓" : "+"}
            </IconButton>
          ) : (
            <span className="font-accent text-xs tracking-widest text-dragonRed border border-dragonRed/30 px-2 py-1 rounded-sm">
              SOLD OUT
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};