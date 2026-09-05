"use client";

import React from "react";
import { IconButton } from "../ui/IconButton";

interface QuantityControlProps {
  quantity: number;
  itemName: string;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  itemName,
  onIncrease,
  onDecrease,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-3 bg-charcoal rounded-full p-1 border border-ivory/10 w-fit">
      <button
        onClick={onDecrease}
        disabled={disabled}
        className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
        aria-label={`Decrease ${itemName} quantity`}
      >
        −
      </button>
      <span className="font-sans font-medium text-ivory w-4 text-center text-sm select-none">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={disabled || quantity >= 10}
        className="w-7 h-7 flex items-center justify-center text-ivory hover:text-gold disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
        aria-label={`Increase ${itemName} quantity`}
      >
        +
      </button>
    </div>
  );
};