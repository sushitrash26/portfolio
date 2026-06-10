import Link from "next/link";
import Image from "next/image";
import React from "react";
import { LinkPreview } from "../ui/link-preview";

const BentoFirst = () => {
  return (
    <div className="w-full shadow-[inset_-12px_-8px_40px_#46464620] rounded-lg border border-neutral-300 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-3 sm:p-5 flex flex-col justify-between hover:shadow-[inset_-12px_-8px_40px_#46464625,0_8px_30px_rgb(0_0_0_/_4%)] hover:border-neutral-400 hover:-translate-y-0.5 transition-all duration-300 ease-out">
      <div>
        <div className="w-full h-8 sm:h-10 flex items-center">
          <div className="w-28 sm:w-32 h-6 sm:h-8 rounded-full bg-neutral-300 flex items-center px-3 sm:px-4 gap-2 sm:gap-3 font-manrope tracking-wider hover:cursor-none hover:bg-neutral-300/50 transition-all duration-100">
            <div className="h-3 w-3 sm:h-4 sm:w-4 bg-green-500 rounded-full"></div>
            <p className="text-xs sm:text-sm">Active</p>
          </div>
        </div>
        <div className="w-full grid items-center font-manrope tracking-wide font-bold mt-3 sm:mt-4 gap-3 sm:gap-4 px-1 sm:px-2">
          <h1 className="text-lg sm:text-xl md:text-2xl">Software Engineer I</h1>
          <div className="flex items-center gap-2 sm:gap-4 justify-between flex-wrap">
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                src="/globefile.svg"
                alt=""
                width={32}
                height={32}
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
              <LinkPreview
                url="https://rayvector.com"
                className="border-b border-neutral-400 text-sm sm:text-base cursor-none"
              >
                Rayvector Technologies
              </LinkPreview>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="w-20 sm:w-24 h-6 sm:h-8 bg-black rounded-full divide-x flex items-center px-1 sm:px-2">
                <div className="text-white w-[40%] text-xs sm:text-sm">05</div>
                <div className="text-white ml-1 text-xs sm:text-sm">2026</div>
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <p className="text-xs sm:text-sm leading-relaxed font-normal text-neutral-700">
              Built streaming, recording, and real-time inference pipeline; cut inference time by 50%. Wrote end-to-end Nvidia hardware tool in C++ using Deepstream and GStreamer with a queue-based alarm system; rebuilt prior architecture in half the original time.
            </p>
          </div>
          <div className="flex justify-between items-center w-full border border-neutral-400 rounded-md p-1 sm:p-2 gap-1 sm:gap-2 overflow-x-auto">
            {/* C++ SVG */}
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#00599C"/>
              <path d="M25 15H17C15.8954 15 15 15.8954 15 17V31C15 32.1046 15.8954 33 17 33H25C26.1046 33 27 32.1046 27 31V29H24V30H18V18H24V19H27V17C27 15.8954 26.1046 15 25 15Z" fill="white"/>
              <path d="M30 22H33V20H30V17H28V20H25V22H28V25H30V22Z" fill="#659AD2"/>
              <path d="M37 22H40V20H37V17H35V20H32V22H35V25H37V22Z" fill="#659AD2"/>
            </svg>

            {/* NVIDIA SVG */}
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM24 38C16.268 38 10 31.732 10 24C10 16.268 16.268 10 24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38Z" fill="#76B900"/>
              <path d="M24 14C18.477 14 14 18.477 14 24C14 29.523 18.477 34 24 34C29.523 34 34 29.523 34 24C34 22 33 20 31 18.5C29 17 26.5 16.5 24 16.5V19.5C25.5 19.5 27 20 28 21C29 22 29.5 23 29.5 24C29.5 27.037 27.037 29.5 24 29.5C20.963 29.5 18.5 27.037 18.5 24C18.5 20.963 20.963 18.5 24 18.5V14Z" fill="#76B900"/>
            </svg>

            {/* Python SVG */}
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M24.16 4C17.3 4 15.65 6.95 15.65 9.9V14.65H24.3V15.9H12.35C8.85 15.9 6 18.3 6 22.3C6 26.35 8.5 28.5 12 28.5H14.15V25.55C14.15 21.6 17.3 18.45 21.25 18.45H29.9V9.9C29.9 6.95 28.25 4 24.16 4ZM20.25 7.8A1.1 1.1 0 1 1 20.25 10A1.1 1.1 0 1 1 20.25 7.8Z" fill="#3776AB"/>
              <path d="M23.84 44C30.7 44 32.35 41.05 32.35 38.1V33.35H23.7V32.1H35.65C39.15 32.1 42 29.7 42 25.7C42 21.65 39.5 19.5 36 19.5H33.85V22.45C33.85 26.4 30.7 29.55 26.75 29.55H18.1V38.1C18.1 41.05 19.75 44 23.84 44ZM27.75 40.2A1.1 1.1 0 1 1 27.75 38A1.1 1.1 0 1 1 27.75 40.2Z" fill="#FFE873"/>
            </svg>

            {/* Linux / Shell SVG */}
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect width="40" height="34" x="4" y="7" rx="4" fill="#212121" />
              <path d="M12 18L18 24L12 30" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 30H32" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round"/>
            </svg>

            {/* GStreamer / Video Streaming SVG */}
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <circle cx="24" cy="24" r="20" fill="#FF5722"/>
              <path d="M19 16V32L32 24L19 16Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full h-8 sm:h-10 flex justify-center items-center mt-4 sm:mt-5">
        <Link
          href="https://rayvector.com"
          target="_blank"
          className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-none flex items-center justify-center active:scale-95"
        >
          Visit Site!
        </Link>
      </div>
    </div>
  );
};

export default BentoFirst;
