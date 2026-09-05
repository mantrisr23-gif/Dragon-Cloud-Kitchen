"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "../../types/menu";
import { Price } from "../ui/Price";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";

interface FoodDetailSheetProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: MenuItem, quantity: number) => void;
}

export const FoodDetailSheet: React.FC<FoodDetailSheetProps> = ({ item, isOpen, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when opened
  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.4 }}
            className="relative w-full max-w-md bg-warmBlack rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-obsidian/50 text-ivory hover:bg-obsidian backdrop-blur-md transition-colors"
              aria-label="Close details"
            >
              ×
            </button>

            <div className="relative w-full aspect-video bg-charcoal">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-500" : "bg-dragonRed"}`} aria-hidden="true" />
                  <span className="font-accent text-xs tracking-widest text-sand uppercase">
                    {item.isVeg ? "VEG" : "NON-VEG"}
                  </span>
                </div>
                <h2 id="dialog-title" className="font-display text-3xl text-ivory mb-2">{item.name}</h2>
                <p className="font-sans text-sand text-sm">{item.description}</p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-ivory/5">
                <Price amount={item.price * quantity} className="text-2xl" />
                
                {item.isAvailable ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-charcoal rounded-full p-1 border border-ivory/10">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-ivory hover:text-gold disabled:opacity-50"
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="font-sans font-medium text-ivory w-4 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-ivory hover:text-gold"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                ) : (
                  <span className="font-accent text-dragonRed tracking-widest">SOLD OUT</span>
                )}
              </div>

              {item.isAvailable && (
                <Button 
                  variant="primary" 
                  className="w-full mt-2 py-4"
                  onClick={() => {
                    onAdd(item, quantity);
                    onClose();
                  }}
                >
                  ADD TO ORDER
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};