"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, Code, Eye, RefreshCw } from "lucide-react";

// Pre-tokenized code lines for syntax highlighting (removes parsing overhead)
interface CodeToken {
  text: string;
  color: string;
}

const codeHighlighting: CodeToken[][] = [
  [
    { text: "import ", color: "text-pink-500 font-semibold" },
    { text: "React ", color: "text-sky-300" },
    { text: "from ", color: "text-pink-500" },
    { text: '"react"', color: "text-emerald-400" },
    { text: ";", color: "text-neutral-400" },
  ],
  [
    { text: "import ", color: "text-pink-500 font-semibold" },
    { text: "{ AudioWave } ", color: "text-sky-300" },
    { text: "from ", color: "text-pink-500" },
    { text: '"@/components/audio"', color: "text-emerald-400" },
    { text: ";", color: "text-neutral-400" },
  ],
  [],
  [
    { text: "export ", color: "text-pink-500 font-semibold" },
    { text: "const ", color: "text-pink-500" },
    { text: "AudivoPlayer ", color: "text-yellow-300 font-medium" },
    { text: "= () => {", color: "text-neutral-300" },
  ],
  [
    { text: "  const ", color: "text-pink-500" },
    { text: "[volume, setVolume] = React.", color: "text-neutral-300" },
    { text: "useState", color: "text-blue-400" },
    { text: "(75);", color: "text-amber-300" },
  ],
  [
    { text: "  const ", color: "text-pink-500" },
    { text: "[playing, setPlaying] = React.", color: "text-neutral-300" },
    { text: "useState", color: "text-blue-400" },
    { text: "(false);", color: "text-amber-300" },
  ],
  [],
  [
    { text: "  return (", color: "text-neutral-300" },
  ],
  [
    { text: "    <", color: "text-neutral-500" },
    { text: "div ", color: "text-sky-300 font-semibold" },
    { text: "className", color: "text-purple-300" },
    { text: '="p-6 bg-white border"', color: "text-emerald-400" },
    { text: ">", color: "text-neutral-500" },
  ],
  [
    { text: "      <", color: "text-neutral-500" },
    { text: "AudioWave ", color: "text-yellow-300" },
    { text: "volume", color: "text-purple-300" },
    { text: "={volume} ", color: "text-neutral-300" },
    { text: "active", color: "text-purple-300" },
    { text: "={playing} />", color: "text-neutral-300" },
  ],
  [
    { text: "      <", color: "text-neutral-500" },
    { text: "Slider ", color: "text-yellow-300" },
    { text: "value", color: "text-purple-300" },
    { text: "={volume} ", color: "text-neutral-300" },
    { text: "onChange", color: "text-purple-300" },
    { text: "={setVolume} />", color: "text-neutral-300" },
  ],
  [
    { text: "    </", color: "text-neutral-500" },
    { text: "div", color: "text-sky-300 font-semibold" },
    { text: ">", color: "text-neutral-500" },
  ],
  [
    { text: "  );", color: "text-neutral-300" },
  ],
  [
    { text: "};", color: "text-neutral-300" },
  ],
];

const rawCodeStrings = codeHighlighting.map(tokens => 
  tokens.map(t => t.text).join("")
);

export const InteractiveShowcase = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Typing state
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  
  // Waveform bars
  const [waveHeights, setWaveHeights] = useState<number[]>(new Array(18).fill(10));
  const waveTimerRef = useRef<number | null>(null);

  // Audio wave animation loop (simulated editor playback)
  useEffect(() => {
    if (isPlaying) {
      waveTimerRef.current = window.setInterval(() => {
        setWaveHeights(prev =>
          prev.map(() => {
            const base = 5 + (volume / 100) * 45;
            const fluctuation = Math.random() * (volume / 100) * 20;
            return Math.max(4, base + fluctuation - 10);
          })
        );
      }, 80);
    } else {
      if (waveTimerRef.current) {
        clearInterval(waveTimerRef.current);
      }
      setWaveHeights(new Array(18).fill(8));
    }

    return () => {
      if (waveTimerRef.current) clearInterval(waveTimerRef.current);
    };
  }, [isPlaying, volume]);

  // Code editor typing speed loop
  useEffect(() => {
    if (typingComplete) return;

    const timer = setTimeout(() => {
      const lineText = rawCodeStrings[currentLine];
      
      if (lineText === undefined) {
        setTypingComplete(true);
        return;
      }

      if (currentChar < lineText.length) {
        setCurrentChar(prev => prev + 1);
      } else {
        // Move to next line
        if (currentLine < rawCodeStrings.length - 1) {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        } else {
          setTypingComplete(true);
        }
      }
    }, rawCodeStrings[currentLine]?.length === 0 ? 50 : 25); // Faster typing on blank lines

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, typingComplete]);

  const restartTyping = () => {
    setTypingComplete(false);
    setCurrentLine(0);
    setCurrentChar(0);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 3D Scene Perspective Container */}
      <div className="w-full flex justify-between items-center mb-6 z-10 px-2 sm:px-6">
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest font-manrope">Live Demonstration</span>
          <h4 className="text-lg sm:text-xl font-bold font-manrope text-neutral-800">Audivo Interactive Player</h4>
        </div>
        
        {/* Toggle Controls */}
        <div className="relative bg-neutral-100 p-1 rounded-full flex gap-1 shadow-inner border border-neutral-200">
          <button
            onClick={() => setIsPreview(false)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-manrope transition-all cursor-none ${
              !isPreview 
                ? "bg-neutral-900 text-white shadow-md" 
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <Code size={13} />
            Code
          </button>
          <button
            onClick={() => {
              setIsPreview(true);
              // Trigger play automatically when toggling to preview to make it look active
              setIsPlaying(true);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-manrope transition-all cursor-none ${
              isPreview 
                ? "bg-neutral-900 text-white shadow-md" 
                : "text-neutral-500 hover:text-neutral-800"
            }`}
          >
            <Eye size={13} />
            Preview
          </button>
        </div>
      </div>

      {/* Grid Canvas Wrapper with camera rotate/tilt effect */}
      <div className="relative w-full aspect-video sm:h-[450px] flex items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950/5">
        {/* Animated Perspective Grid Background */}
        <motion.div 
          animate={{
            rotateX: 55,
            translateY: "-15%",
            rotateZ: isPreview ? -12 : 12,
            scale: isPreview ? 1.05 : 0.95
          }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-[200%] opacity-25 pointer-events-none origin-center"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            transformStyle: "preserve-3d"
          }}
        />

        {/* 3D Rotating Card Container */}
        <div 
          className="relative w-[92%] sm:w-[500px] h-[340px] z-10" 
          style={{ perspective: 1200 }}
        >
          <motion.div
            animate={{ rotateY: isPreview ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FRONT FACE: Code Editor */}
            <div 
              className="absolute inset-0 w-full h-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* IDE Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] font-mono text-neutral-500">AudivoPlayer.tsx</span>
                <button 
                  onClick={restartTyping}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors p-0.5 rounded cursor-none"
                  title="Replay code typing"
                >
                  <RefreshCw size={12} className={!typingComplete ? "animate-spin" : ""} />
                </button>
              </div>

              {/* IDE Code Area */}
              <div className="flex-1 p-4 sm:p-5 font-mono text-[10px] sm:text-xs leading-relaxed overflow-y-auto text-left text-neutral-300">
                {rawCodeStrings.map((line, idx) => {
                  if (idx > currentLine) return null;

                  const isCurrentlyTyping = idx === currentLine;
                  const visibleText = isCurrentlyTyping ? line.slice(0, currentChar) : line;

                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-4 items-start relative px-2 py-0.5 rounded transition-all duration-300 ${
                        isCurrentlyTyping ? "bg-white/5 shadow-[inset_2px_0_0_#6366f1]" : ""
                      }`}
                    >
                      {/* Line Numbers */}
                      <span className="w-4 text-right select-none text-neutral-600 text-[9px] mt-0.5">{idx + 1}</span>
                      
                      {/* Code Tokens */}
                      <span className="flex-1 whitespace-pre overflow-x-auto scrollbar-none">
                        {isCurrentlyTyping ? (
                          <>
                            <span className="text-white">{visibleText}</span>
                            <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-indigo-500 animate-pulse align-middle" />
                          </>
                        ) : (
                          codeHighlighting[idx].map((token, tIdx) => (
                            <span key={tIdx} className={token.color}>{token.text}</span>
                          ))
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BACK FACE: Component Preview */}
            <div 
              className="absolute inset-0 w-full h-full bg-white border border-neutral-200 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col justify-between text-neutral-800"
              style={{ 
                backfaceVisibility: "hidden", 
                transform: "rotateY(180deg)" 
              }}
            >
              {/* App UI Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold font-manrope text-neutral-500 uppercase tracking-wider">Preview Sandbox</span>
                </div>
                <div className="px-2 py-0.5 bg-indigo-50 text-[10px] font-bold text-indigo-600 rounded">Audivo Core v1.0</div>
              </div>

              {/* App Core: Interactive Audio Widget */}
              <div className="flex-1 flex flex-col justify-center gap-4 my-2">
                <div className="flex flex-col text-left">
                  <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider font-manrope">Now Playing</span>
                  <h5 className="font-bold text-base font-manrope text-neutral-900 leading-tight">AI Ambient Generative.wav</h5>
                </div>

                {/* Animated Waveform Bars */}
                <div className="h-16 flex items-end justify-between px-4 bg-neutral-50 rounded-xl border border-neutral-100">
                  {waveHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: h }}
                      transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      className="w-1.5 rounded-t bg-gradient-to-t from-indigo-500 to-indigo-400"
                    />
                  ))}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-3 bg-neutral-50/50 p-2.5 rounded-lg border border-neutral-100/50">
                  <Volume2 size={15} className="text-neutral-400 flex-shrink-0" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-none accent-indigo-600 outline-none"
                  />
                  <span className="text-xs font-mono font-bold text-neutral-500 w-8 text-right">{volume}%</span>
                </div>
              </div>

              {/* Widget Footer Actions */}
              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                <div className="text-[10px] text-neutral-400 font-semibold font-manrope">React Native Rendering</div>
                
                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-manrope shadow-sm transition-all cursor-none ${
                    isPlaying 
                      ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100/60" 
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={12} fill="currentColor" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={12} fill="currentColor" />
                      Play
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
