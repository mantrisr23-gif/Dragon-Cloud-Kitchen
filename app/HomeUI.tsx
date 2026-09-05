"use client";

import { useState } from "react";
import { Hero } from "@/components/hero/Hero";
import { DragonPicks } from "@/components/menu/DragonPicks";
import { Experience } from "@/components/experience/Experience";
import { Delivery } from "@/components/delivery/DeliverySection";
import { Bag } from "@/components/ui/Bag";
import PillNav from "@/components/layout/PillNav";
import { CartProvider } from "@/hooks/useCart";

export default function HomeUI({ liveMenu }: { liveMenu: any[] }) {
  const [isBagOpen, setIsBagOpen] = useState(false);

  const navItems = [
    { label: 'MENU', href: '#menu' },
    { label: 'OUR STORY', href: '#story' },
    { label: 'DELIVERY', href: '#delivery' },
    { label: 'BAG', href: '#' }
  ];

  return (
    <CartProvider>
      <main className="relative min-h-screen bg-[#F5E6D3]">
        {/* FIXED NAV WRAPPER */}
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none [&>*]:pointer-events-auto">
          <PillNav
            logoText="Dragon"
            items={navItems}
            onOpenBag={() => setIsBagOpen(true)}
          />
        </div>

        {/* Page Sections */}
        <Hero />

        {/* We pass the bag trigger AND the live database menu! */}
        <DragonPicks 
          onOpenBag={() => setIsBagOpen(true)} 
          menuItems={liveMenu} 
        />

        <Experience />
        <Delivery />

        {/* The Slide-in Bag Drawer */}
        <Bag
          isOpen={isBagOpen}
          onClose={() => setIsBagOpen(false)}
        />
      </main>
    </CartProvider>
  );
}