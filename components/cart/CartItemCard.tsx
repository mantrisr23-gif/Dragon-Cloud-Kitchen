"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CartItem } from "../../types/cart";
import { Price } from "../ui/Price";
import { QuantityControl } from "./QuantityControl";
import { useCart } from "../../hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-4 py-4 border-b border-ivory/5 last:border-0"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 shrink-0 bg-charcoal rounded-md overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        <div className="absolute top-1 left-1 bg-obsidian/80 backdrop-blur-md p-1 rounded-sm">
          <span className={`block w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-500" : "bg-dragonRed"}`} aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between py-0.5">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-display text-lg text-ivory leading-tight">{item.name}</h4>
            <Price amount={item.price} className="text-sand/70 text-xs" />
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-sand/50 hover:text-dragonRed text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dragonRed rounded-sm px-1"
            aria-label={`Remove ${item.name} from order`}
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <QuantityControl
            quantity={item.quantity}
            itemName={item.name}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
          />
          <Price amount={item.lineTotal} className="text-base text-gold" />
        </div>
      </div>
    </motion.div>
  );
};