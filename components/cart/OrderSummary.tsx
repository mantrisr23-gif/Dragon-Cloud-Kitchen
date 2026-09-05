"use client";

import React from "react";
import { Price } from "../ui/Price";

interface OrderSummaryProps {
  subtotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal }) => {
  return (
    <div className="flex items-center justify-between py-4 border-t border-ivory/10">
      <span className="font-sans text-sand text-sm uppercase tracking-widest">Subtotal</span>
      <Price amount={subtotal} className="text-2xl text-ivory" />
    </div>
  );
};