'use client'

import PageFourContainer from "@/components/page-four-component/PageFourContainer";
import PageOneContainer from "@/components/page-one-component/PageOneContainer";
import PageThreeContainer from "@/components/page-three-component/PageThreeContainer";
import PageTwoContainer from "@/components/page-two-components/PageTwoContainer";
import SocialMedia from "@/components/page-one-component/SocialMedia";
import { TracingBeam } from "@/components/ui/tracing-beam";




export default function Home() {
  return (
    <div className="bg-black min-h-screen">
     
      
      <SocialMedia />
     
      
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 grid justify-center items-center gap-4 sm:gap-6 scrollbar-hide">
      {/* <TracingBeam className=""> */}
        <PageOneContainer/>
        <PageTwoContainer/>
        <PageThreeContainer/>
        <PageFourContainer/>
        {/* </TracingBeam> */}
      </div>
      
    </div>
  );
}
