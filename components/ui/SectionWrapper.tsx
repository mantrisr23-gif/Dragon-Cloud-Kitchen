import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "obsidian" | "charcoal" | "warmBlack";
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = "",
  background = "obsidian",
}) => {
  const bgColors = {
    obsidian: "bg-obsidian",
    charcoal: "bg-charcoal",
    warmBlack: "bg-warmBlack",
  };

  return (
    <section id={id} className={`w-full py-16 md:py-24 ${bgColors[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};