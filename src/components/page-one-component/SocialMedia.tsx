import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'


const SocialMedia = () => {
  return (
    <div className='h-10  flex items-center gap-4  '>
                <div className='text-sm font-manrope  flex items-center gap-2 rounded-md border border-neutral-300 hover:shadow-md transition-shadow   p-2 px-4   '>
                <Link href='' className='px-4 hover:bg-neutral-400/35 transition-shadow rounded-sm  '>X</Link>
                <Link href='' className='px-2 hover:bg-neutral-400/35 transition-shadow rounded-sm  '>LinkedIn</Link>
                <Link href='' className='px-2 hover:bg-neutral-400/35 transition-shadow rounded-md  '>Resume</Link>
                </div>
                
                <Button className='h-full p-2 px-4  hover:cursor-pointer font-manrope '>Contact</Button>
            </div>
  )
}

export default SocialMedia
