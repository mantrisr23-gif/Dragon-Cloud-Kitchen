"use client";

import React from "react";
import { MenuCategory } from "../../types/menu";

interface MenuTabsProps {
  categories: MenuCategory[];
  activeCategory: MenuCategory;
  onSelect: (category: MenuCategory) => void;
}

export const MenuTabs: React.FC<MenuTabsProps> = ({ categories, activeCategory, onSelect }) => {
  return (
    <div 
      className="w-full overflow-x-auto snap-x snap-mandatory pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      role="tablist"
      aria-label="Menu Categories"
    >
      <div className="flex items-center gap-6 min-w-max">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(category)}
              className={`relative pb-2 font-accent tracking-widest text-sm md:text-base uppercase transition-colors duration-300 snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm
                ${isActive ? "text-ivory" : "text-sand hover:text-ivory/80"}
              `}
            >
              {category}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-dragonRed rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};