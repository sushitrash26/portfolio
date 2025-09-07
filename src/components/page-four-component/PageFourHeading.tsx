import React from 'react'
import { TextGenerateEffect } from '../ui/text-generate-effect'
const PageFourHeading = () => {
  const words = `Developer. Security. Full-time Wanderlust.`
  return (
    <div className='w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tighter font-bold font-manrope text-center px-4'>
      <TextGenerateEffect words={words} />
    </div>
  )
}

export default PageFourHeading
