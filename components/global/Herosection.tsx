import React from "react";

import Header from "@/components/global/Header";
import Email_Card from "./Email_Card";

function HeroSection() {



  return (
    <div className="w-full h-screen relative">
      <Header />
      <div className="absolute inset-0  top-[5px] z-10 h-screen overflow-hidden text-white opacity-20 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
              patternTransform="translate(0 -1)"
            >
              <circle cx="7" cy="7" r="4" fill="currentColor"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"></rect>
        </svg>
      </div>
      <div className="h-screen relative w-full flex items-center justify-center">
        <Email_Card />
      </div>
    </div>
  );
}

export default HeroSection;
