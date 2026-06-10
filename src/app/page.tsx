'use client'

import PageFourContainer from "@/components/page-four-component/PageFourContainer";
import PageOneContainer from "@/components/page-one-component/PageOneContainer";
import PageThreeContainer from "@/components/page-three-component/PageThreeContainer";
import PageTwoContainer from "@/components/page-two-components/PageTwoContainer";
import SocialMedia from "@/components/page-one-component/SocialMedia";
import { VectorFieldBackground } from "@/components/ui/vector-field-background";

export default function Home() {
  return (
    <div className="relative bg-neutral-950 text-black min-h-screen overflow-x-hidden cursor-none">
      {/* Interactive WebGL/Canvas Vector Field Background */}
      <VectorFieldBackground />

      {/* Floating Header Actions (X, LinkedIn, Resume, Contact) */}
      <SocialMedia />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 grid justify-center items-center gap-4 sm:gap-6 scrollbar-hide">
        <PageOneContainer />
        <PageTwoContainer />
        <PageThreeContainer />
        <PageFourContainer />
      </div>
    </div>
  );
}
