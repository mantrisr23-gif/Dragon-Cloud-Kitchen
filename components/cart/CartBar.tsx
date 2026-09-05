"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { Price } from "../ui/Price";
import { CartDrawer } from "./CartDrawer";

export const CartBar: React.FC = () => {
  const { itemCount, subtotal } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Future integration boundary
  const handleProceedToCheckout = () => {
    console.log("[Phase 5B Boundary] Proceed to Checkout Triggered.");
    // TODO in Phase 5C: Open CheckoutSheet
  };

  return (
    <>
      <AnimatePresence>
        {itemCount > 0 && !isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 z-50 md:w-80"
          >
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full flex items-center justify-between bg-charcoal border border-ivory/20 px-5 py-4 rounded-xl shadow-2xl shadow-obsidian/50 hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group"
              aria-label={`Open cart with ${itemCount} items totaling ${subtotal} rupees`}
            >
              <div className="flex items-center gap-3">
                {/* Minimalist accessible SVG icon instead of emoji */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dragonRed">
                  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="font-accent text-sm tracking-widest text-sand uppercase">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Price amount={subtotal} className="text-ivory text-lg" />
                <span className="text-dragonRed group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onProceed={handleProceedToCheckout} 
      />
    </>
  );
};