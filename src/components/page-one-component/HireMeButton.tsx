import React from 'react'
import { Button } from '../ui/button'
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'

const HireMeButton = () => {
  return (
    <div className='w-full flex justify-center items-center h-10 sm:h-12 mt-4 sm:mt-0'>
      <InteractiveHoverButton className='cursor-none text-lg sm:text-xl'>Hire me !</InteractiveHoverButton>
    </div>
  )
}

export default HireMeButton
