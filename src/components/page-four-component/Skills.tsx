import React from 'react'

const Skills = () => {
  return (
    <div className='w-full grid gap-2 mt-6'>
      <div className='flex justify-center items-center'>
        <h1 className='text-xl sm:text-2xl font-bold font-manrope'>Skills</h1>
      </div>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center p-2 sm:p-4 gap-3 font-manrope'>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          C++ & Python
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          GStreamer & DeepStream
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          WebRTC & RTSP
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          React & Next.js
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          TypeScript & Node.js
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          DevOps & CI/CD
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          Agentic AI (n8n/LangGraph)
        </div>
        <div className='min-h-[2.25rem] py-1.5 px-3 border-2 rounded-md flex justify-center items-center text-center border-dashed tracking-tight text-xs sm:text-sm'>
          ML & LLM Fine-Tuning
        </div>
      </div>
    </div>
  )
}

export default Skills
