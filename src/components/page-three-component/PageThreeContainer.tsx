import React from 'react'
import PageThreeHeading from './PageThreeHeading'
import Cards from './Cards'


const PageThreeContainer = () => {
  return (
    <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white/95 mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6">
        <PageThreeHeading/>
        <Cards/>
        <div className='w-full grid justify-center items-center mt-6 sm:mt-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-manrope font-bold mx-auto px-4 text-center'>
          <span>Interactive video editing web application for content creators,</span>
          <span className='w-full flex justify-center items-center'>music producers, and filmmakers.</span>
        </div>

        
    </div>
  )
}

export default PageThreeContainer
