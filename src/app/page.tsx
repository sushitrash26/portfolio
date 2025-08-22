'use client'
import Plasma from "@/components/Plasma";
import SplitText from "@/components/SplitText";
import Image from "next/image";

export default function Home() {
  return (
  <div className="bg-black w-screen h-screen">
      <div className="bg-black w-screen max-w-screen-4xl h-screen container mx-auto relative">
    <Plasma 
    color="#9c9c9c"
    speed={1}
    direction="forward"
    scale={2.0}
    opacity={1}
    mouseInteractive={false}
  >
  </Plasma>
  
  <div className="absolute w-full h-full  inset-0 z-10 flex  justify-center items-center ">
    <div className="w-4xl  h-screen">
      <div className="name w-full h-[20%] flex justify-center items-center">
        <h1 className="text-white" style={{ fontFamily: "'Sigmar One', cursive" }}>Astitva Pathak</h1>
      </div>
    </div>
  </div>
  
</div>
</div>  

  );
}
