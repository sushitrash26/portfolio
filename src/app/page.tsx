'use client'

import { useState } from "react";
import PageFourContainer from "@/components/page-four-component/PageFourContainer";
import PageOneContainer from "@/components/page-one-component/PageOneContainer";
import PageThreeContainer from "@/components/page-three-component/PageThreeContainer";
import PageTwoContainer from "@/components/page-two-components/PageTwoContainer";
import SocialMedia from "@/components/page-one-component/SocialMedia";
import { WebsiteIntro } from "@/components/ui/website-intro";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [introRevealed, setIntroRevealed] = useState(false);

  return (
    <div className={`relative bg-neutral-950 text-black min-h-screen cursor-none ${
      !introComplete ? "overflow-hidden h-screen" : "overflow-x-hidden"
    }`}>
      {/* Global Custom Cursor */}
      {introComplete && <SmoothCursor />}

      {/* Website Intro Code-Reveal Screen */}
      {!introComplete && (
        <WebsiteIntro 
          onReveal={() => setIntroRevealed(true)}
          onComplete={() => setIntroComplete(true)} 
        />
      )}

      {/* Main Portfolio Content Reveal */}
      <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        introRevealed ? "opacity-100 translate-y-0 filter blur-0 scale-100" : "opacity-0 translate-y-8 filter blur-sm scale-[0.96] pointer-events-none"
      }`}>
        {/* Premium CSS-based Background overlay (0% CPU/GPU resources) */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-neutral-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,rgba(10,10,10,0)_75%)]" />
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{
              backgroundImage: `
                linear-gradient(to right, #ffffff 1px, transparent 1px),
                linear-gradient(to bottom, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px"
            }}
          />
        </div>

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
    </div>
  );
}
