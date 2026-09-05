"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define what a single cart item looks like
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  desc?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add a new item, or increase quantity if it already exists
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) => 
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  // Increase (+1) or Decrease (-1) an item's quantity
  const updateQuantity = (id: string | number, delta: number) => {
    setItems((prev) => prev.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter((item) => item.quantity > 0)); // Automatically removes if quantity hits 0
  };

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};