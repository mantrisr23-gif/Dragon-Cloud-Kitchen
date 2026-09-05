"use client";

import React, { useState, useMemo } from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { MenuTabs } from "./MenuTabs";
import { MenuGrid } from "./MenuGrid";
import { FoodDetailSheet } from "./FoodDetailSheet";
import { MenuCategory, MenuItem } from "../../types/menu";
import { fullMenu } from "../../data/menu";

const CATEGORIES: MenuCategory[] = ["ALL", "BIRYANI", "CHICKEN", "STARTERS", "CHINESE", "VEG"];

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("ALL");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Local filtering logic
  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL") return fullMenu;
    return fullMenu.filter(item => item.category.includes(activeCategory));
  }, [activeCategory]);

  // UI Boundary for future cart integration
  const handleAddToCart = (item: MenuItem, quantity: number) => {
    console.log(`[Boundary] Added ${quantity}x ${item.name} to cart.`);
    // TODO in Phase 5: cart.addItem(item, quantity);
  };

  return (
    <SectionWrapper background="obsidian" id="menu">
      <SectionHeading 
        eyebrow="The Menu"
        title="PICK YOUR FIRE."
        description="From slow-cooked biryani to crispy chicken, find your next craving."
      />

      <MenuTabs 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <MenuGrid 
        items={filteredItems}
        onItemClick={setSelectedItem}
        onAdd={handleAddToCart}
        onClearFilters={() => setActiveCategory("ALL")}
      />

      <FoodDetailSheet 
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onAdd={handleAddToCart}
      />
    </SectionWrapper>
  );
};