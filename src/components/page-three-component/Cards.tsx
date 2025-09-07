'use client'
import React from 'react'
import { CometCard } from '../ui/comet-card'

const Cards = () => {
  return (
    <div className='w-full mt-6 sm:mt-10'>
      <div className='flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6'>
        <CometCard className='flex justify-center items-center w-full lg:w-auto'>
          <div className='w-full min-w-[280px] sm:min-w-[320px] lg:w-[30rem] h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <div className='bg-white w-full h-full rounded-xl bg-cover bg-center'
              style={{
                backgroundImage: "url('/showcaseone.svg')",
              }}
            ></div>
          </div>
        </CometCard>
        
        <CometCard className='flex justify-center items-center w-full lg:w-auto'>
          <div className='w-full min-w-[280px] sm:min-w-[350px] lg:w-[35rem] h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <div className='bg-white w-full h-full rounded-xl bg-cover'
              style={{
                backgroundImage: "url('/showcasetwo.svg')",
              }}
            ></div>
          </div>
        </CometCard>
      </div> 
      
      <div className='w-full flex justify-center items-center mt-4 sm:mt-5'>
        <CometCard className='flex justify-center items-center w-full lg:w-auto'>
          <div className='w-full min-w-[280px] sm:min-w-[350px] lg:w-[35rem] h-64 lg:h-80 rounded-xl bg-black p-3 lg:p-4'>
            <div className='bg-white w-full h-full rounded-xl bg-cover'
              style={{
                backgroundImage: "url('labs.svg')",
              }}
            ></div>
          </div>
        </CometCard>
      </div>
    </div>
  )
}

export default Cards
