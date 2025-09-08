'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MorphingPopover,MorphingPopoverTrigger} from '../../../components/motion-primitives/morphing-popover'
import { MorphingPopoverContent } from '../../../components/motion-primitives/morphing-popover'

const SocialMedia = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className='h-8 sm:h-10 flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start fixed top-4 right-4 z-50'>
      {/* Desktop View */}
      <div className='hidden sm:flex items-center gap-2 lg:gap-4 '>
        <div className='text-xs bg-white lg:text-sm font-manrope flex items-center gap-1 lg:gap-2 rounded-md border border-neutral-300 hover:shadow-md transition-shadow p-1 lg:p-2 px-2 lg:px-4'>
          <Link href='' className='px-2 lg:px-4 hover:bg-neutral-400/35 transition-shadow rounded-sm cursor-none whitespace-nowrap'>X</Link>
          <Link href='' className='px-1 lg:px-2 hover:bg-neutral-400/35 transition-shadow rounded-sm cursor-none whitespace-nowrap'>LinkedIn</Link>
          <Link href='' className='px-1 lg:px-2 hover:bg-neutral-400/35 transition-shadow rounded-md cursor-none whitespace-nowrap'>Resume</Link>
        </div>
        
        
        <MorphingPopover open={contactOpen} onOpenChange={setContactOpen} className=' '>
          <MorphingPopoverTrigger>
          <Button className='h-full p-1 lg:p-2 px-2 lg:px-4 cursor-none font-manrope text-xs lg:text-sm whitespace-nowrap border border-white active:scale-94 '>Contact</Button>
          </MorphingPopoverTrigger>
          <MorphingPopoverContent className='w-80 p-4 bg-white text-black dark:bg-zinc-700 dark:text-white rounded-md'>
            <form className='grid gap-3' onSubmit={(e) => { e.preventDefault(); setContactOpen(false); }}>
              <div className='grid gap-1'>
                <label className='text-sm'>Name</label>
                <input className='rounded-md border px-3 py-2 bg-white text-black dark:bg-zinc-800 dark:text-white' name='name' required />
              </div>
              <div className='grid gap-1'>
                <label className='text-sm'>Email</label>
                <input type='email' className='rounded-md border px-3 py-2 bg-white text-black dark:bg-zinc-800 dark:text-white' name='email' required />
              </div>
              <div className='grid gap-1'>
                <label className='text-sm'>Message</label>
                <textarea className='rounded-md border px-3 py-2 bg-white text-black dark:bg-zinc-800 dark:text-white' name='message' rows={4} required />
              </div>
              <button type='submit' className='mt-2 rounded-md bg-black text-white px-4 py-2 dark:bg-white dark:text-black'>Send</button>
            </form>
          </MorphingPopoverContent>
        </MorphingPopover>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='sm:hidden'>
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-10 h-10 flex flex-col justify-center items-center gap-1 bg-white rounded-lg border border-neutral-300 shadow-md hover:shadow-lg transition-shadow'
        >
          <div className={`w-5 h-0.5 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className='absolute top-12 right-0 bg-white rounded-lg border border-neutral-300 shadow-lg p-4 min-w-[200px]'>
            <div className='flex flex-col gap-3'>
              <Link 
                href='' 
                className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope'
                onClick={() => setIsOpen(false)}
              >
                X
              </Link>
              <Link 
                href='' 
                className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope'
                onClick={() => setIsOpen(false)}
              >
                LinkedIn
              </Link>
              <Link 
                href='' 
                className='px-3 py-2 hover:bg-neutral-100 transition-colors rounded-md cursor-none text-sm font-manrope'
                onClick={() => setIsOpen(false)}
              >
                Resume
              </Link>
              <div className='border-t border-neutral-200 my-1'></div>
              <Button 
                className='w-full justify-start px-3 py-2 h-auto cursor-none font-manrope text-sm'
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialMedia
