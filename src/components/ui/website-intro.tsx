"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Eye, ArrowRight } from "lucide-react";

interface CodeToken {
  text: string;
  color: string;
}

const introHighlighting: CodeToken[][] = [
  [
    { text: "import ", color: "text-purple-600 font-semibold" },
    { text: "React ", color: "text-blue-600" },
    { text: "from ", color: "text-purple-600" },
    { text: '"react"', color: "text-emerald-600" },
    { text: ";", color: "text-neutral-400" },
  ],
  [
    { text: "import ", color: "text-purple-600 font-semibold" },
    { text: "Portfolio ", color: "text-blue-600" },
    { text: "from ", color: "text-purple-600" },
    { text: '"@/astitva-pathak"', color: "text-emerald-600" },
    { text: ";", color: "text-neutral-400" },
  ],
  [],
  [
    { text: "const ", color: "text-purple-600 font-semibold" },
    { text: "App ", color: "text-blue-600 font-medium" },
    { text: "= () => {", color: "text-neutral-500" },
  ],
  [
    { text: "  return (", color: "text-neutral-500" },
  ],
  [
    { text: "    <", color: "text-neutral-400" },
    { text: "Portfolio", color: "text-blue-600 font-semibold" },
  ],
  [
    { text: "      developer", color: "text-amber-600" },
    { text: '="Astitva Pathak"', color: "text-emerald-600" },
  ],
  [
    { text: "      features", color: "text-amber-600" },
    { text: '={["3D", "Verlet", "60fps"]}', color: "text-blue-500" },
  ],
  [
    { text: "    />", color: "text-neutral-400" },
  ],
  [
    { text: "  );", color: "text-neutral-500" },
  ],
  [
    { text: "};", color: "text-neutral-500" },
  ],
  [
    { text: "export default ", color: "text-purple-600 font-semibold" },
    { text: "App", color: "text-blue-600" },
    { text: ";", color: "text-neutral-400" },
  ],
];

const rawIntroStrings = introHighlighting.map((tokens) =>
  tokens.map((t) => t.text).join("")
);

export const WebsiteIntro = ({ 
  onReveal, 
  onComplete 
}: { 
  onReveal: () => void;
  onComplete: () => void;
}) => {
  // Phase: "cursor_enter" | "typing_link" | "cursor_submit" | "click" | "scale_editor" | "code_typing" | "flip" | "morph"
  const [phase, setPhase] = useState<
    | "cursor_enter"
    | "typing_link"
    | "cursor_submit"
    | "click"
    | "scale_editor"
    | "code_typing"
    | "flip"
    | "morph"
  >("cursor_enter");

  const [typedInput, setTypedInput] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  const cursorCoords = {
    start: { x: 250, y: 200 },
    inputText: { x: -140, y: 0 },
    submitBtn: { x: 195, y: 0 },
  };

  const targetLink = "get.me.instead"; 

  // Snappy timeline state manager
  useEffect(() => {
    if (phase === "cursor_enter") {
      const timeout = setTimeout(() => {
        setPhase("typing_link");
      }, 450);
      return () => clearTimeout(timeout);
    }

    if (phase === "typing_link") {
      if (typedInput.length < targetLink.length) {
        const charTimeout = setTimeout(() => {
          setTypedInput(targetLink.slice(0, typedInput.length + 1));
        }, 20);
        return () => clearTimeout(charTimeout);
      } else {
        const doneTimeout = setTimeout(() => {
          setPhase("cursor_submit");
        }, 150);
        return () => clearTimeout(doneTimeout);
      }
    }

    if (phase === "cursor_submit") {
      const timeout = setTimeout(() => {
        setPhase("click");
      }, 250);
      return () => clearTimeout(timeout);
    }

    if (phase === "click") {
      const timeout = setTimeout(() => {
        setPhase("scale_editor");
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (phase === "scale_editor") {
      const timeout = setTimeout(() => {
        setPhase("code_typing");
      }, 400);
      return () => clearTimeout(timeout);
    }

    if (phase === "code_typing") {
      if (currentLine < rawIntroStrings.length) {
        const lineTimeout = setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, 65);
        return () => clearTimeout(lineTimeout);
      } else {
        const doneTimeout = setTimeout(() => {
          setPhase("flip");
        }, 300);
        return () => clearTimeout(doneTimeout);
      }
    }

    if (phase === "flip") {
      const timeout = setTimeout(() => {
        setPhase("morph");
        onReveal(); // Tell parent page.tsx to fade in and scale up the live portfolio
        
        const completeTimeout = setTimeout(() => {
          onComplete(); // Remove preloader elements entirely once morph ends
        }, 800); 
        return () => clearTimeout(completeTimeout);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [phase, typedInput, currentLine, onReveal, onComplete]);

  // Coordinates helper
  const getCursorPos = () => {
    if (phase === "cursor_enter") return cursorCoords.start;
    if (phase === "typing_link") return cursorCoords.inputText;
    return cursorCoords.submitBtn;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden pointer-events-none">
      {/* Background overlay that fades to transparent during morph */}
      <motion.div
        animate={{
          backgroundColor: phase === "morph" ? "rgba(10, 10, 10, 0)" : "rgba(10, 10, 10, 1)",
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 z-0 bg-neutral-950"
      />

      {/* Storyboard Cursor */}
      {(phase === "cursor_enter" ||
        phase === "typing_link" ||
        phase === "cursor_submit" ||
        phase === "click") && (
        <motion.div
          animate={getCursorPos()}
          transition={{
            duration: phase === "cursor_enter" ? 0.45 : 0.25,
            ease: [0.25, 1, 0.5, 1],
          }}
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          className="absolute z-[10000] pointer-events-none origin-top-left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <path
              d="M4.5 3.5L20.5 12.5L12.5 14.5L8.5 20.5L4.5 3.5Z"
              fill="#f97316"
              stroke="white"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Toggle Tab */}
      <motion.div 
        animate={{ opacity: phase === "morph" ? 0 : (phase === "code_typing" || phase === "flip" ? 1 : 0) }}
        transition={{ duration: 0.3 }}
        className="absolute top-8 sm:top-12 z-10 flex flex-col items-center pointer-events-none"
      >
        <div className="relative bg-white/90 p-1 rounded-full flex gap-1 border border-neutral-200 shadow-2xl backdrop-blur-md">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold font-manrope transition-all duration-200 ${
              phase !== "flip"
                ? "bg-black text-white font-bold"
                : "text-neutral-400"
            }`}
          >
            <Code size={11} />
            Code
          </div>
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold font-manrope transition-all duration-300 ${
              phase === "flip"
                ? "bg-black text-white font-bold shadow-md"
                : "text-neutral-400"
            }`}
          >
            <Eye size={11} />
            Preview
          </div>
        </div>
      </motion.div>

      {/* Grid canvas background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <motion.div
          animate={{
            rotateX:
              phase === "cursor_enter" ||
              phase === "typing_link" ||
              phase === "cursor_submit" ||
              phase === "click"
                ? 0
                : 55,
            rotateZ:
              phase === "cursor_enter" ||
              phase === "typing_link" ||
              phase === "cursor_submit" ||
              phase === "click"
                ? 0
                : 12,
            translateY:
              phase === "cursor_enter" ||
              phase === "typing_link" ||
              phase === "cursor_submit" ||
              phase === "click"
                ? "0%"
                : "-25%",
            opacity: phase === "morph" ? 0 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-[200%] origin-center"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transformStyle: "preserve-3d",
          }}
        />
      </div>

      {/* Core Animation Card Area */}
      <div className="relative flex items-center justify-center w-full max-w-md h-[380px] z-10 px-4">
        <AnimatePresence mode="wait">
          {/* STAGE 1: Quick Search Bar */}
          {(phase === "cursor_enter" ||
            phase === "typing_link" ||
            phase === "cursor_submit" ||
            phase === "click") && (
            <motion.div
              key="input-box"
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
              }}
              className="relative flex items-center bg-white border border-neutral-200 rounded-xl p-1.5 w-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)]"
            >
              <div className="flex-1 px-3 py-2 text-left text-neutral-400 font-mono text-xs overflow-hidden whitespace-nowrap">
                {typedInput ? (
                  <span className="text-black font-semibold">{typedInput}</span>
                ) : (
                  <span className="text-neutral-400">Search another overhyped dev portfolio...</span>
                )}
                <span className="inline-block w-1.5 h-3.5 bg-neutral-900 animate-pulse ml-0.5 align-middle" />
              </div>
              <motion.button
                animate={{ scale: phase === "click" ? 0.9 : 1 }}
                transition={{ duration: 0.1 }}
                className="bg-black text-white font-bold p-2.5 rounded-lg cursor-none hover:bg-neutral-800"
              >
                <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          )}

          {/* STAGE 2: IDE Editor Panel (Rotates and Morph-Expands) */}
          {(phase === "scale_editor" ||
            phase === "code_typing" ||
            phase === "flip" ||
            phase === "morph") && (
            <motion.div
              key="editor-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ 
                scale: phase === "morph" ? 3.0 : 1, 
                opacity: phase === "morph" ? 0 : 1 
              }}
              transition={{ 
                duration: phase === "morph" ? 0.8 : 0.4, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              className="relative w-full h-[340px]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                animate={{ rotateY: (phase === "flip" || phase === "morph") ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front: High-Speed Code Compilation */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 border-b border-neutral-200">
                    <div className="flex gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">AstitvaPortfolio.tsx</span>
                    <div className="w-4" />
                  </div>

                  <div className="flex-1 p-4 font-mono text-[10px] leading-snug overflow-hidden text-left text-neutral-800 select-none">
                    {rawIntroStrings.map((line, idx) => {
                      if (idx > currentLine) return null;

                      const isCurrentlyTyping = idx === currentLine;

                      return (
                        <div
                          key={idx}
                          className={`flex gap-3 items-start relative px-2 py-0.5 rounded transition-all duration-150 ${
                            isCurrentlyTyping
                              ? "bg-neutral-50 shadow-[inset_2px_0_0_#4f46e5]"
                              : ""
                          }`}
                        >
                          <span className="w-3 text-right select-none text-neutral-400 text-[9px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="flex-1 whitespace-pre overflow-x-auto scrollbar-none">
                            {introHighlighting[idx].map((token, tIdx) => (
                              <span key={tIdx} className={token.color}>
                                {token.text}
                              </span>
                            ))}
                            {isCurrentlyTyping && (
                              <span className="inline-block w-1 h-3 ml-0.5 bg-indigo-600 animate-pulse align-middle" />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Back: MINI WEBSITE PREVIEW (Matches PageOneContainer / First Section EXACTLY) */}
                <div
                  className="absolute inset-0 w-full h-full bg-white border border-neutral-200 rounded-2xl shadow-2xl p-5 flex flex-col justify-between text-neutral-800"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative flex-1 flex flex-col justify-between h-full w-full">
                    {/* Top Row: Location Badge Replica */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 bg-neutral-500/20 px-2 py-1 rounded text-[8px] font-semibold text-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Bengaluru, IN
                      </div>
                      <div className="w-10" />
                    </div>

                    {/* Middle Row: Available Work Pill Replica */}
                    <div className="flex justify-center mt-1">
                      <div className="bg-green-800 px-3.5 py-0.5 text-[8px] rounded-full text-teal-400 font-bold tracking-wider leading-none">
                        Available for work
                      </div>
                    </div>

                    {/* Title Heading Replica (Exact Text of MainHeading) */}
                    <div className="text-center mt-2 flex flex-col gap-0.5 font-manrope">
                      <span className="text-[9px] text-neutral-500 block">Hello, I&apos;m Astitva.</span>
                      <span className="text-[11px] font-bold text-black leading-tight block">
                        Providing services for development
                      </span>
                      <span className="text-[11px] font-bold text-black leading-tight block">
                        and scaleable AI systems.
                      </span>
                    </div>

                    {/* Subheading Replica */}
                    <div className="text-center mt-2 text-neutral-500 font-bold text-[7px] tracking-wider uppercase font-manrope">
                      EXPERTISE IN THESE TECHSTACK
                    </div>

                    {/* Tech Stack Representation */}
                    <div className="flex justify-center gap-1 overflow-hidden py-1 opacity-70">
                      {["React", "Next.js", "TypeScript", "Tailwind", "Python", "AI"].map((tech, i) => (
                        <span key={i} className="text-[7px] bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-600 font-medium whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Hire Me Button Replica */}
                    <div className="flex justify-center mt-1">
                      <div className="bg-black text-white text-[8px] font-bold px-4 py-1.5 rounded-full border border-black shadow">
                        Hire me !
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
