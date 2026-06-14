'use client'
import React, { useState } from "react";
import PageFourHeading from "./PageFourHeading";
import PageFourText from "./PageFourText";
import Skills from "./Skills";
import MyImage from "./MyImage";
import { motion } from 'motion/react'
import { BuyMeCoffeeModal } from "./BuyMeCoffeeModal";

const PageFourContainer = () => {
  const [hovered, setHovered] = useState(false);
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);

  return (
    <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white/95 mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 cursor-none">
      <PageFourHeading />
      <div className="w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
        <div className="w-full lg:w-[60%] flex flex-col justify-start mb-2">
          <PageFourText />
          <Skills />
          <div className="flex justify-center items-center mt-8 sm:mt-12">
            <button
              onClick={() => setIsCoffeeOpen(true)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-48 active:scale-95 sm:w-52 gap-2 flex cursor-none transition-all justify-center items-center font-manrope h-10 sm:h-12 border border-neutral-200 rounded-full hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] bg-transparent text-black outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-coffee"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />

                {/* Steam wisp 1 */}
                <motion.path
                  d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
                  animate={
                    hovered
                      ? {
                          opacity: [0, 1, 0],
                          pathLength: [0, 1, 1],
                          pathOffset: [1, 0, 0],
                          y: [0, -2, -4],
                          x: [0, -0.6, 0.6, 0],
                          transition: {
                            duration: 2.4,
                            times: [0, 0.35, 1],
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 0.4,
                          },
                        }
                      : {
                          opacity: 0,
                          pathLength: 0,
                          pathOffset: 1,
                          y: 0,
                          x: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        }
                  }
                />

                {/* Steam wisp 2 */}
                <motion.path
                  d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"
                  animate={
                    hovered
                      ? {
                          opacity: [0, 1, 0],
                          pathLength: [0, 1, 1],
                          pathOffset: [1, 0, 0],
                          y: [0, -1, -3],
                          x: [0, 0.6, -0.6, 0],
                          transition: {
                            duration: 2.8,
                            times: [0, 0.35, 1],
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 0.6,
                          },
                        }
                      : {
                          opacity: 0,
                          pathLength: 0,
                          pathOffset: 1,
                          y: 0,
                          x: 0,
                          transition: { duration: 0.3, ease: "easeOut" },
                        }
                  }
                />

                <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
                <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
              </svg>
              <h1 className="text-base sm:text-lg font-bold">
                Buy me a coffee
              </h1>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[40%] flex justify-center">
          <MyImage />
        </div>
      </div>

      {/* Buy Me Coffee Payment Dialog */}
      <BuyMeCoffeeModal
        isOpen={isCoffeeOpen}
        onClose={() => setIsCoffeeOpen(false)}
      />
    </div>
  );
};

export default PageFourContainer;
