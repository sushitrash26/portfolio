import React from 'react'
import PageFourHeading from './PageFourHeading'
import PageFourText from './PageFourText'
import Skills from './Skills'
import MyImage from './MyImage'
import { SmoothCursor } from '../ui/smooth-cursor'

const PageFourContainer = () => {
  return (
  
    <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 cursor-none">
      {/* <BackgroundBeamsWithCollision> */}
        <SmoothCursor/>
        <PageFourHeading/>
        <div className='w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-0'>
            <div className='w-full lg:w-[60%] flex flex-col justify-start mb-2'>
               <PageFourText/>
               <Skills/>
               <div className='flex justify-center items-center mt-8 sm:mt-12'>
                 <div className='w-48 sm:w-52 flex cursor-none transition-all justify-center items-center font-manrope h-10 sm:h-12 border border-neutral-200 rounded-full hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]'>
                   <h1 className='text-base sm:text-lg font-bold'>Buy me a coffee</h1>
                 </div>
               </div>
            </div>
            <div className='w-full lg:w-[40%] flex justify-center'>
              <MyImage/>
            </div>
        </div>
        {/* </BackgroundBeamsWithCollision> */}
    </div>
 
  )
}

export default PageFourContainer
