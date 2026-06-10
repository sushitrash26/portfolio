'use client'
import React, { useState, useRef, useEffect } from 'react'
import { InteractiveHoverButton } from '../magicui/interactive-hover-button'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a66c2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-black">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.951-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
)

const HireMeDialog = ({ onClose }: { onClose: () => void }) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className='fixed inset-0 z-[998] flex items-center justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)' }}
    >
      <motion.div
        ref={dialogRef}
        data-cursor-native
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
        className='relative w-[340px] bg-white border border-neutral-300 rounded-2xl shadow-[inset_-12px_-8px_40px_#46464620] overflow-hidden'
        style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      >
        <div className='p-6'>
          {/* Header */}
          <div className='flex items-start justify-between mb-1'>
            <div>
              <h2 className='text-base font-bold tracking-tight font-manrope text-black'>Hire me</h2>
              <p className='text-xs text-neutral-500 mt-0.5 font-manrope'>Visit my profiles below</p>
            </div>
            <button
              onClick={onClose}
              className='text-neutral-400 hover:text-black transition-colors leading-none cursor-pointer p-1'
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className='w-full h-px bg-neutral-200 my-4' />

          {/* Social Buttons */}
          <div className='flex flex-col gap-2.5'>
            <Link
              href='https://github.com/sushitrash26'
              target='_blank'
              className='flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 hover:border-neutral-400 hover:shadow-sm transition-all duration-200 group cursor-pointer'
            >
              <GithubIcon />
              <div className='flex flex-col flex-1'>
                <span className='text-sm font-semibold font-manrope text-black'>GitHub</span>
                <span className='text-xs text-neutral-400 font-manrope'>@sushitrash26</span>
              </div>
              <ArrowIcon />
            </Link>

            <Link
              href='https://www.linkedin.com/in/astitvapathak/'
              target='_blank'
              className='flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 hover:border-neutral-400 hover:shadow-sm transition-all duration-200 group cursor-pointer'
            >
              <LinkedInIcon />
              <div className='flex flex-col flex-1'>
                <span className='text-sm font-semibold font-manrope text-black'>LinkedIn</span>
                <span className='text-xs text-neutral-400 font-manrope'>Astitva Pathak</span>
              </div>
              <ArrowIcon />
            </Link>

            <Link
              href='https://x.com/astitvapathak'
              target='_blank'
              className='flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/80 border border-neutral-200 hover:border-neutral-400 hover:shadow-sm transition-all duration-200 group cursor-pointer'
            >
              <XIcon />
              <div className='flex flex-col flex-1'>
                <span className='text-sm font-semibold font-manrope text-black'>X</span>
                <span className='text-xs text-neutral-400 font-manrope'>@astitvapathak</span>
              </div>
              <ArrowIcon />
            </Link>
          </div>

          <div className='w-full h-px bg-neutral-200 my-4' />

          {/* Resume CTA */}
          <Link
            href='https://drive.google.com/file/d/1IxkEMgRKXEke_IKkY1ig-jCYFf49cpe_/view?usp=drive_link'
            target='_blank'
            className='flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-95 transition-all font-manrope cursor-pointer'
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            View Resume
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

const HireMeButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full flex justify-center items-center h-10 sm:h-12 mt-4 sm:mt-0'>
      <div onClick={() => setOpen(true)}>
        <InteractiveHoverButton className='cursor-none text-lg sm:text-xl'>
          Hire me !
        </InteractiveHoverButton>
      </div>

      <AnimatePresence>
        {open && <HireMeDialog onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default HireMeButton
