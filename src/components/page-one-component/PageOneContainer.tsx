import React from 'react'
import LocationBadge from './LocationBadge'
import SocialMedia from './SocialMedia'
import AvailableBadge from './AvailableBadge'
import MainHeading from './MainHeading'
import TechStackMarquee from './TechStackMarquee'
import SubHeading from './SubHeading'
import HireMeButton from './HireMeButton'
import { Meteors } from '../magicui/meteors'



const PageOneContainer = () => {
    
  return (
    
      <div className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[75vw] max-w-7xl bg-white mx-auto rounded-xl sm:rounded-2xl overflow-hidden p-4 sm:p-6 relative">

        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={15} />
        </div>
        
      
        <div className="relative z-10">
          <div className="w-full h-10 flex justify-between ">
            <LocationBadge />
            <div className="w-32"></div>
          </div>
          <AvailableBadge />
          <MainHeading />
          <SubHeading/>
          <TechStackMarquee/>
          <HireMeButton/>
        </div>
        
      </div>
   
  );
}

export default PageOneContainer
