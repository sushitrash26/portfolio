import React from 'react'

const Skills = () => {
  return (
    <div className='w-full grid gap-2 mt-6'>
      <div className='flex justify-center items-center'>
        <h1 className='text-xl sm:text-2xl font-bold font-manrope'>Skills</h1>
      </div>
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center p-2 sm:p-4 gap-2 font-manrope'>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed tracking-tight text-xs sm:text-sm'>Web Development</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>AI Engineer</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>WebPentesting</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>Figma</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>Cloud Engineer</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>Adobe</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>Machine Learning</div>
        <div className='h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed text-xs sm:text-sm'>Fine-tuning</div>
      </div>
    </div>
  )
}

export default Skills
