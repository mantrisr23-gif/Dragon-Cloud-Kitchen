"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem } from "../../types/menu";
import { MenuCard } from "./MenuCard";
import { Button } from "../ui/Button";

interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  onAdd: (item: MenuItem, quantity: number) => void;
  onClearFilters: () => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onItemClick, onAdd, onClearFilters }) => {
  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full py-16 flex flex-col items-center justify-center text-center bg-warmBlack/30 rounded-2xl border border-ivory/5"
      >
        <span className="font-display text-3xl text-sand mb-2">NOTHING ON THE FIRE YET.</span>
        <p className="font-sans text-sand/70 mb-6">Please check another category.</p>
        <Button variant="secondary" onClick={onClearFilters}>VIEW ALL</Button>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <MenuCard 
            key={item.id} 
            item={item} 
            onClick={onItemClick}
            onAdd={onAdd}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};