import React from 'react'
import LocationBadge from './LocationBadge'
import SocialMedia from './SocialMedia'
import AvailableBadge from './AvailableBadge'
import MainHeading from './MainHeading'
import TechStackMarquee from './TechStackMarquee'
import SubHeading from './SubHeading'
import HireMeButton from './HireMeButton'



const PageOneContainer = () => {
    
  return (
    
      <div className="w-[75vw] bg-white mx-auto rounded-2xl overflow-hidden p-6 ">
        <div className="w-full h-10 flex justify-between ">
          <LocationBadge />
          <SocialMedia />
        </div>
        <AvailableBadge />
        <MainHeading />
        <SubHeading/>
        <TechStackMarquee/>
        <HireMeButton/>
        
      </div>
   
  );
}

export default PageOneContainer
