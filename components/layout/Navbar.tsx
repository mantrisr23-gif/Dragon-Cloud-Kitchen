"use client";

import React from "react";
import PillNav from "./PillNav";
import { useCart } from "../../hooks/useCart";

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();

  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "Delivery", href: "#delivery" },
    { label: `Bag ${itemCount > 0 ? `(${itemCount})` : ''}`, href: "#cart" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <PillNav 
        logoText="DRAGON"
        items={navItems}
        baseColor="#A66A25"            
        pillColor="#141310"            
        pillTextColor="#F1EDE5"        
        hoveredPillTextColor="#090807" 
      />
    </div>
  );
};