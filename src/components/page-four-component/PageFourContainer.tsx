import React from 'react'

const PageFourContainer = () => {
  return (
    <div className="w-[75vw] bg-white mx-auto rounded-2xl overflow-hidden p-6  ">
        <div className='w-full flex justify-center  items-center text-2xl font-bold font-manrope    '>
                    Developer. Security. Full-time Wanderlust.
                </div>
        <div className='w-full  flex justify-between items-center'>
            <div className='w-[60%] '>
                
                <div className=' flex justify-center items-center  font-manrope text-lg text-center '>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis assumenda veritatis sit veniam cupiditate aliquam ipsam animi expedita, placeat voluptatum alias dicta libero nesciunt, recusandae maiores! Voluptatem, sequi architecto, illum consequatur blanditiis sed maiores temporibus dolorum vel sapiente placeat aliquam, in debitis ullam itaque culpa autem odit. Architecto quisquam asperiores et non.
                </div>
                <div className='w-full grid gap-2 mt-6 '>
                    <h1 className='text-2xl '>Skills</h1>
                    <div className='w-full  grid grid-cols-4 items-center p-4 gap-2 font-manrope  '>
                        <div className=' h-8 border-2  p-1 px-2 rounded-md flex justify-center items-center border-dashed '>Web Developer</div>
                        <div className=' h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed '>AI Engineer</div>
                        <div className=' h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed '>WebPentesting</div>
                        <div className=' h-8 border-2 p-1 px-2 rounded-md flex justify-center items-center border-dashed '>Figma</div>
                       
                    </div>

                </div>
            </div>
            <div className='flex-1 grid justify-center items-center'>
                <div className='w-[25rem] h-[30rem] border mt-10 bg-cover   rounded-2xl '
                    style={{
                        background:"url('/wapic.jpg')",
                        backgroundSize:"cover"
                    }}
                ></div>
            </div>

        </div>
    </div>
  )
}

export default PageFourContainer
