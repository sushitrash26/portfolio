import React from 'react'

const AvailableBadge = () => {
  return (
    <div className='w-full h-6 sm:h-7 mt-8 sm:mt-14 flex justify-center items-center'> 
      <div className='bg-green-800 p-1 w-44 sm:w-52 h-full text-xs sm:text-sm rounded-full text-teal-400 font-bold font-manrope flex justify-center items-center leading-1 tracking-wider'>
        Available for work
      </div>
    </div> 
  )
}

export default AvailableBadge
