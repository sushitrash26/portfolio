import BentoGrid from './BentoGrid'
import Heading from './Heading'
import React from 'react'

const PageTwoContainer = () => {
  return (
    
    <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 pb-6 sm:pb-10">
     <Heading/>
     <BentoGrid/>
    </div>
  
  )
}

export default PageTwoContainer
