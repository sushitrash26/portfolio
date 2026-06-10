'use client'
import React from 'react'
import { CometCard } from '../ui/comet-card'

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
            <video
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_three.webm'
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </CometCard>
      </div>

      {/* Card 3: showcase_labs.webm (Col Span: 6 of 11 ~ 54.6% width) */}
      <div className='md:col-span-6 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <video
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_labs.webm'
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </CometCard>
      </div>

      {/* Card 4: showcase_four.webm (Col Span: 5 of 11 ~ 45.4% width) */}
      <div className='md:col-span-5 flex w-full'>
        <CometCard className='flex justify-center items-center w-full'>
          <div className='w-full h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <video
              className='w-full h-full object-cover rounded-xl bg-white'
              src='/showcase_four.webm'
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </CometCard>
      </div>
    </div>
  )
}

export default Cards
