'use client'
import React, { useEffect, useRef, useState } from 'react'
import { CometCard } from '../ui/comet-card'

const HoverVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isHovered) {
      video.play().catch(() => {})
    } else {
      video.pause()
      // Reset video to starting frame to act as a static placeholder when idle
      video.currentTime = 0
    }
  }, [isHovered])

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-xl cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className={`${className} transition-opacity duration-300`}
        src={src}
        loop
        muted
        playsInline
        preload="auto"
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // Force GPU layer creation
        }}
      />
      
      {/* Sarcastic/Interactive Play Button Indicator when Idle */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 pointer-events-none transition-opacity duration-300">
          <div className="bg-white/90 text-black p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center backdrop-blur-sm border border-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="black"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-0.5"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

const Cards = () => {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-[repeat(11,_minmax(0,_1fr))] gap-4 lg:gap-6 mt-6 sm:mt-10'>
      {/* Card 1: showcaseone.svg (Col Span: 5 of 11 ~ 45.4% width) */}
      <div className='md:col-span-5 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <div className='bg-white w-full h-full rounded-xl bg-cover bg-center'
              style={{
                backgroundImage: "url('/showcaseone.svg')",
              }}
            ></div>
          </div>
        </CometCard>
      </div>

      {/* Card 2: showcase_three.webm (Col Span: 6 of 11 ~ 54.6% width) */}
      <div className='md:col-span-6 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <HoverVideo
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_three.webm'
            />
          </div>
        </CometCard>
      </div>

      {/* Card 3: showcase_labs.webm (Col Span: 6 of 11 ~ 54.6% width) */}
      <div className='md:col-span-6 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <HoverVideo
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_labs.webm'
            />
          </div>
        </CometCard>
      </div>

      {/* Card 4: showcase_four.webm (Col Span: 5 of 11 ~ 45.4% width) */}
      <div className='md:col-span-5 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <HoverVideo
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_four.webm'
            />
          </div>
        </CometCard>
      </div>
    </div>
  )
}

export default Cards
