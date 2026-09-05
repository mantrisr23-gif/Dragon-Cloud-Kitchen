"use client";

import React from "react";

interface FeaturedCarouselProps {
  children: React.ReactNode;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 min-w-max md:min-w-0">
        {React.Children.map(children, (child) => (
          <div className="snap-center shrink-0 w-[82vw] sm:w-[60vw] md:w-auto">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};