"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const Delivery: React.FC = () => {
  return (
    <section id="delivery" className="relative w-full bg-[#F5E6D3] text-[#3A2E26] py-32 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Typography */}
        <div className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="font-sans text-[11px] font-bold tracking-[0.2em] text-[#B85C29] uppercase mb-6"
          >
            Delivery, The Dragon Way
          </motion.div>
          
          <div className="overflow-hidden mb-1">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[52px] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-dm-serif), serif' }}
            >
              Hot food.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[36px] md:text-[52px] leading-[1.1] tracking-tight text-[#5C4D42]"
              style={{ fontFamily: 'var(--font-dm-serif), serif' }}
            >
              Straight to your door.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">
          
          {/* Left Column: Logistics Metrics */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {[
              { top: "10 KM", bottom: "DELIVERY RADIUS" },
              { top: "10 AM — 8 PM", bottom: "EVERY DAY" },
              { top: "DANDAMUNDA", bottom: "CHANDAHANDI" }
            ].map((metric, i) => (
              <motion.div 
                key={metric.top}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col"
              >
                <span className="font-sans text-[24px] md:text-[28px] font-bold tracking-tight text-[#3A2E26] mb-1">
                  {metric.top}
                </span>
                <span className="font-sans text-[11px] font-bold tracking-[0.15em] text-[#B85C29] uppercase">
                  {metric.bottom}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right Column: The Interactive Map Dashboard */}
          <div className="lg:col-span-8 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full aspect-square md:aspect-[16/9] bg-[#1A1512] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(58,46,38,0.15)]"
            >
              {/* The Art-Directed Map Asset */}
              <Image
                src="/images/delivery/chandahandi-map.jpg" 
                alt="Dragon Delivery Radius"
                fill
                className="object-cover opacity-80"
              />
              
              {/* SVG Animation Overlay */}
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="xMidYMid slice">
                
                {/* Glowing 10 KM Radius (Anchored DEAD CENTER to Dandamunda) */}
                <motion.circle
                  cx="400" cy="225" r="160"
                  stroke="#B85C29" strokeWidth="1" strokeDasharray="6 6" fill="rgba(184,92,41,0.08)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* The Delivery Route Line (Routing directly to Chandahandi) */}
                <motion.path
                  d="M400 225 Q 320 260 240 190"
                  fill="transparent"
                  stroke="#C52D22"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Dragon Kitchen Origin Dot (Dandamunda) */}
                <motion.circle
                  cx="400" cy="225" r="6" fill="#F5E6D3" stroke="#3A2E26" strokeWidth="2"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                />
                
                {/* Destination Arrival Dot (Chandahandi) */}
                <motion.circle
                  cx="240" cy="190" r="6" fill="#C52D22"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 3.3 }}
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* The Journey Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-20"
        >
          {['YOUR ORDER', 'DRAGON KITCHEN', 'ON THE ROAD', 'YOUR DOOR'].map((step, index, array) => (
            <React.Fragment key={step}>
              <span className="font-sans text-[10px] md:text-[12px] font-bold tracking-[0.15em] text-[#5C4D42] uppercase">
                {step}
              </span>
              {index < array.length - 1 && (
                <span className="text-[#B85C29] text-[14px]">→</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* The Closer & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="font-sans text-[20px] md:text-[24px] font-bold tracking-tight text-[#3A2E26] mb-8">
            FAST WHEN IT MATTERS. FRESH WHEN IT ARRIVES.
          </h3>
          <button className="bg-[#C52D22] text-white font-sans text-[12px] font-semibold tracking-[0.15em] uppercase px-10 py-4 rounded-full hover:bg-[#A31D14] transition-all shadow-[0_8px_24px_rgba(197,45,34,0.3)] flex items-center justify-center gap-3">
            <span className="text-[16px]">◉</span>
            Order For Delivery <span className="ml-2 text-[18px] leading-none">→</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};