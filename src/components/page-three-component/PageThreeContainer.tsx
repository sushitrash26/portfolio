import React from 'react'
import PageThreeHeading from './PageThreeHeading'
import Cards from './Cards'


const PageThreeContainer = () => {
  return (
    <div className="w-[75vw] bg-white mx-auto rounded-2xl overflow-hidden p-6 ">
        <PageThreeHeading/>
        <Cards/>
        <div className='w-full grid justify-center items-center  mt-10 text-3xl font-manrope font-bold mx-auto '>
          <span>Interactive video editing web application for content creators,</span>
          <span className='w-full flex justify-center items-center '>music producers, and filmmakers.</span>
        </div>

        
    </div>
  )
}

export default PageThreeContainer
