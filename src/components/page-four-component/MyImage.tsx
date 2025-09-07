import React from 'react'

const MyImage = () => {
  return (
    <div className='flex-1 grid justify-center items-center'>
                <div className='w-[25rem] h-[30rem] border mt-10 bg-cover  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  rounded-2xl '
                    style={{
                        background:"url('/wapic.jpg')",
                        backgroundSize:"cover"
                    }}
                ></div>
            </div>
  )
}

export default MyImage
