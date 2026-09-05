"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

interface BagProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Bag: React.FC<BagProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, cartTotal, cartCount } = useCart();
  
  // States for Checkout Flow
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: ''
  });

  // Handle closing and resetting the view
  const handleClose = () => {
    onClose();
    setTimeout(() => setView('cart'), 400); // Reset view after drawer slides out
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Popup-Blocker-Proof WhatsApp Generator
  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Build the Order Section
    let message = `Hello Dragon Cloud Kitchen!\n\nI'd like to place an order.\n\nORDER\n────────────────\n`;
    items.forEach(item => {
      message += `${item.name} × ${item.quantity}   ₹${item.price * item.quantity}\n`;
    });
    message += `\nSubtotal: ₹${cartTotal}\nDelivery: ₹0\nTotal: ₹${cartTotal}\n\n`;

    // 2. Build the Customer Section
    message += `CUSTOMER\n────────────────\nName: ${formData.name}\nPhone: ${formData.phone}\n\n`;

    // 3. Build the Delivery Section
    message += `DELIVERY\n────────────────\nAddress: ${formData.address}\n`;
    if (formData.landmark) {
      message += `Landmark: ${formData.landmark}\n`;
    }
    message += `\nPlease confirm my order.`;

    // 4. Encode and Open WhatsApp IMMEDIATELY (Bypasses popup blockers)
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "918926155795"; // <-- REPLACE WITH YOUR ACTUAL PHONE NUMBER!
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Use location.href for foolproof mobile deep-linking
    window.open(whatsappUrl, "_blank") || (window.location.href = whatsappUrl);
    
    handleClose(); // Close bag after sending
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#1A1512]/40 backdrop-blur-[6px] z-[90]"
          />

          {/* The Bag Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[92vw] md:w-[460px] bg-[#F5E7D0] z-[100] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-8 pt-10 pb-6 border-b border-[#B85C29]/15 bg-[#F5E7D0] z-20">
              <div>
                <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-[#B85C29] uppercase mb-1">
                  Dragon Cloud Kitchen
                </span>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-[24px] text-[#3A2E26] tracking-tight" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
                    {view === 'cart' ? 'Your Bag' : 'Checkout'}
                  </h2>
                  {view === 'cart' && (
                    <span className="font-sans text-[12px] text-[#5C4D42] opacity-80">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-[32px] text-[#3A2E26] font-light leading-none hover:text-[#C52D22] transition-colors pb-2"
              >
                ×
              </button>
            </div>

            {/* Sliding Content Container */}
            <div className="relative flex-1 w-full overflow-hidden">
              <AnimatePresence initial={false} custom={view}>
                
                {/* ===================== VIEW 1: THE CART ===================== */}
                {view === 'cart' && (
                  <motion.div 
                    key="cart-view"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
                      {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center mt-[-10vh]">
                          <span className="text-[#C52D22] text-[32px] mb-6 opacity-80">🐉</span>
                          <h3 className="text-[20px] text-[#3A2E26] mb-3" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
                            Your bag is waiting.
                          </h3>
                          <p className="font-sans text-[14px] text-[#5C4D42] leading-[1.6] mb-8">
                            Nothing here yet.<br/>Something delicious is waiting.
                          </p>
                          <button onClick={handleClose} className="font-sans text-[11px] font-bold tracking-[0.15em] text-[#B85C29] uppercase border-b border-[#B85C29]/30 pb-1 hover:text-[#C52D22] transition-colors">
                            Explore the menu →
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-8">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-5 items-center group">
                              <div className="relative w-[85px] h-[85px] rounded-lg overflow-hidden bg-[#E8D5BE] shrink-0 border border-[#3A2E26]/5">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className="font-sans text-[15px] font-bold text-[#3A2E26] tracking-tight">{item.name}</h4>
                                  <span className="font-sans text-[15px] font-semibold text-[#B85C29]">₹{item.price}</span>
                                </div>
                                <div className="flex items-center justify-between border border-[#B85C29]/30 rounded-full px-3 py-1 w-[90px] bg-white/40 mt-3">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="text-[#B85C29] hover:text-[#C52D22] px-1 text-[16px] leading-none">−</button>
                                  <span className="font-sans text-[12px] font-bold text-[#3A2E26]">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="text-[#B85C29] hover:text-[#C52D22] px-1 text-[16px] leading-none">+</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cart Footer */}
                    {items.length > 0 && (
                      <div className="bg-[#F5E7D0] border-t border-[#B85C29]/15 px-8 py-8 shadow-[0_-10px_40px_rgba(245,231,208,0.9)] z-20">
                        <div className="flex justify-between items-end mb-8">
                          <span className="font-sans text-[16px] font-bold text-[#3A2E26] uppercase tracking-[0.1em]">Subtotal</span>
                          <span className="text-[24px] font-bold text-[#3A2E26]">₹{cartTotal}</span>
                        </div>
                        <button 
                          onClick={() => setView('checkout')}
                          className="w-full bg-[#3A2E26] text-white font-sans text-[12px] font-bold tracking-[0.15em] uppercase py-5 rounded-sm hover:bg-[#2A211B] transition-colors flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(58,46,38,0.25)]"
                        >
                          PROCEED TO CHECKOUT →
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ===================== VIEW 2: CHECKOUT FORM ===================== */}
                {view === 'checkout' && (
                  <motion.div 
                    key="checkout-view"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                    className="absolute inset-0 flex flex-col bg-[#F5E7D0]"
                  >
                    <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
                      
                      <button onClick={() => setView('cart')} className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#5C4D42] uppercase mb-6 flex items-center gap-2 hover:text-[#C52D22] transition-colors">
                        ← Back to Bag
                      </button>

                      <form id="checkout-form" onSubmit={submitOrder} className="flex flex-col gap-6">
                        
                        {/* Section: Your Details */}
                        <div>
                          <h3 className="font-sans text-[12px] font-bold tracking-[0.1em] text-[#3A2E26] uppercase mb-4 border-b border-[#B85C29]/20 pb-2">Your Details</h3>
                          <div className="flex flex-col gap-4">
                            <input required type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/50 border border-[#B85C29]/30 px-4 py-3 rounded-sm font-sans text-[14px] text-[#3A2E26] focus:outline-none focus:border-[#C52D22] placeholder:text-[#5C4D42]/50 transition-colors" />
                            <input required type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full bg-white/50 border border-[#B85C29]/30 px-4 py-3 rounded-sm font-sans text-[14px] text-[#3A2E26] focus:outline-none focus:border-[#C52D22] placeholder:text-[#5C4D42]/50 transition-colors" />
                          </div>
                        </div>

                        {/* Section: Delivery */}
                        <div>
                          <div className="flex items-center justify-between mb-4 border-b border-[#B85C29]/20 pb-2">
                            <h3 className="font-sans text-[12px] font-bold tracking-[0.1em] text-[#3A2E26] uppercase">Delivery</h3>
                            <span className="font-sans text-[10px] text-[#C52D22] font-bold tracking-[0.05em] uppercase bg-[#C52D22]/10 px-2 py-1 rounded">10 KM Radius</span>
                          </div>
                          <div className="flex flex-col gap-4">
                            <input required type="text" name="address" placeholder="Delivery Address" value={formData.address} onChange={handleInputChange} className="w-full bg-white/50 border border-[#B85C29]/30 px-4 py-3 rounded-sm font-sans text-[14px] text-[#3A2E26] focus:outline-none focus:border-[#C52D22] placeholder:text-[#5C4D42]/50 transition-colors" />
                            <input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleInputChange} className="w-full bg-white/50 border border-[#B85C29]/30 px-4 py-3 rounded-sm font-sans text-[14px] text-[#3A2E26] focus:outline-none focus:border-[#C52D22] placeholder:text-[#5C4D42]/50 transition-colors" />
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-4 bg-[#E8D5BE]/40 p-5 rounded-md border border-[#B85C29]/10">
                          <h3 className="font-sans text-[11px] font-bold tracking-[0.1em] text-[#3A2E26] uppercase mb-4">Your Order</h3>
                          <div className="flex flex-col gap-2 mb-4 border-b border-[#B85C29]/10 pb-4">
                            {items.map(item => (
                              <div key={item.id} className="flex justify-between font-sans text-[13px] text-[#5C4D42]">
                                <span>{item.name} <span className="text-[#B85C29]">× {item.quantity}</span></span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between font-sans text-[13px] text-[#5C4D42] mb-1">
                            <span>Delivery</span>
                            <span className="text-[#B85C29] font-bold uppercase">Free</span>
                          </div>
                          <div className="flex justify-between font-sans text-[16px] font-bold text-[#3A2E26] mt-2 pt-2 border-t border-[#B85C29]/10">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                          </div>
                        </div>

                      </form>
                    </div>

                    {/* Checkout Footer */}
                    <div className="bg-[#F5E7D0] border-t border-[#B85C29]/15 px-8 py-6 shadow-[0_-10px_40px_rgba(245,231,208,0.9)] z-20">
                      <button 
                        type="submit"
                        form="checkout-form"
                        className="group relative w-full bg-[#C52D22] text-white font-sans text-[12px] font-bold tracking-[0.15em] uppercase py-5 rounded-sm hover:bg-[#A31D14] hover:-translate-y-[2px] transition-all duration-300 shadow-[0_8px_20px_rgba(197,45,34,0.25)] flex items-center justify-center gap-3"
                      >
                        ORDER ON WHATSAPP 
                        <span className="group-hover:translate-x-1 transition-transform duration-300 text-[16px] leading-none">→</span>
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};