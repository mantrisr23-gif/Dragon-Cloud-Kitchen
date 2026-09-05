"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { CartItemCard } from "./CartItemCard";
import { OrderSummary } from "./OrderSummary";
import { Button } from "../ui/Button";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceed }) => {
  const { items, subtotal, itemCount } = useCart();

  // Escape to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            initial={{ x: "100%", y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.4 }}
            className="relative w-full md:w-[480px] h-[90dvh] md:h-full mt-[10dvh] md:mt-0 bg-warmBlack md:border-l border-ivory/10 flex flex-col shadow-2xl rounded-t-2xl md:rounded-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ivory/10 shrink-0">
              <div>
                <h2 id="cart-heading" className="font-display text-2xl text-ivory tracking-wider">YOUR ORDER</h2>
                <span className="font-accent text-xs text-sand uppercase tracking-widest">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-charcoal text-ivory hover:text-dragonRed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dragonRed"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {/* Scrollable Items Area */}
            <div className="flex-1 overflow-y-auto px-6 py-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-ivory/10 hover:[&::-webkit-scrollbar-thumb]:bg-ivory/20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <span className="font-display text-3xl text-dragonRed mb-2">YOUR DRAGON IS HUNGRY.</span>
                  <p className="font-sans text-sand text-sm mb-6">Add something delicious to your order.</p>
                  <Button variant="secondary" onClick={onClose}>EXPLORE MENU</Button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map(item => <CartItemCard key={item.id} item={item} />)}
                </AnimatePresence>
              )}
            </div>

            {/* Footer Area */}
            {items.length > 0 && (
              <div className="shrink-0 p-6 bg-obsidian border-t border-ivory/10 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                <OrderSummary subtotal={subtotal} />
                <div className="flex flex-col gap-3 mt-4">
                  <Button variant="primary" size="lg" className="w-full shadow-xl shadow-dragonRed/20" onClick={onProceed}>
                    PROCEED TO ORDER →
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-sand hover:text-ivory" onClick={onClose}>
                    CONTINUE BROWSING
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};