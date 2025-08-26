'use client'
import React from 'react'
import { CometCard } from '../ui/comet-card'

const Cards = () => {
  return (
    <div className='w-full mt-10 '>
      <div className='flex justify-between items-center'>
        <CometCard className='flex justify-between items-center'>
            <div 
            className='w-[30rem] h-80 rounded-xl bg-black p-4'
            >
              <div className='bg-white w-full h-full rounded-xl bg-cover bg-center '
              style={{
                backgroundImage: "url('/showcaseone.svg')",
              }}
              ></div>
                
            </div>
            
        </CometCard>
        <CometCard className='flex justify-between items-center'>
            <div 
            className='w-[35rem] h-80 rounded-xl bg-black p-4'
            >
              <div className='bg-white w-full h-full rounded-xl bg-cover  '
              style={{
                backgroundImage: "url('/showcasetwo.svg')",
              }}
              ></div>
                
            </div>
            
        </CometCard>
        
        </div> 
        <div className='w-full flex justify-center items-center mt-5 '>
        <CometCard className='flex justify-between items-center'>
            <div 
            className='w-[35rem] h-80 rounded-xl bg-black p-4'
            >
              <div className='bg-white w-full h-full rounded-xl bg-cover  '
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
