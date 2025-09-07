import React from "react";
import Link from "next/link";

const BentoSecond = () => {
  return (
    <div className="shadow-[inset_-12px_-8px_40px_#46464620] border h-[12rem] sm:h-[15rem] border-neutral-300 rounded-lg bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-2 sm:p-4">
      <div className="w-full h-8 sm:h-10 flex gap-2 sm:gap-4 items-center">
        <div className="w-28 sm:w-36 font-manrope h-6 sm:h-8 rounded-full bg-red-500/50 hover:cursor-pointer hover:bg-red-500/70 flex items-center px-3 sm:px-4 gap-1 sm:gap-2">
          <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500"></div>
          <p className="text-xs sm:text-sm">Completed</p>
        </div>
      </div>
      <p className="text-lg sm:text-xl font-manrope font-bold mt-1">
        Full-Stack Developer
      </p>
      <div className="flex gap-2 sm:gap-4 justify-between font-bold font-manrope mt-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="globefile.svg" alt="" className="w-6 h-6 sm:w-8 sm:h-8" />
          <Link
            href="https://audivo.tech"
            className="border-b border-neutral-400 text-sm sm:text-base"
          >
            Audivo
          </Link>
        </div>
        <div>
          <div className="flex justify-end gap-1 sm:gap-2 items-center">
            <svg
              width="7%"
              height="7%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="w-20 sm:w-24 h-6 sm:h-8 bg-black rounded-full divide-x flex items-center px-1 sm:px-2">
              <div className="text-white w-[40%] text-xs sm:text-sm">06</div>
              <div className="text-white ml-1 text-xs sm:text-sm">2025</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center font-manrope font-bold mt-2 text-xs sm:text-sm leading-relaxed">
        Developed a fully interactive video editing frontend with Zustand state
        management and Framer Motion micro-animations, powering 10+ timeline
        components, 50+ subtitle overlays, and seamless audio playback for
        smooth editing.
      </div>
    </div>
  );
};

export default BentoSecond;
