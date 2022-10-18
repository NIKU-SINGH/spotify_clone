import Image from 'next/image'
import React from 'react'
import { ThreeBounce, ChasingDots } from "better-react-spinkit"; 

function Loader() {
  return (
    <div className="h-screen bg-black">
      <div className="pt-40 flex flex-col items-center space-y-4">
        <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
          <Image
            src="https://rb.gy/y9mwtb"
            layout="fill"
            objectFit="contain"
            className="animate-pulse"
          />
        </span>
        <ChasingDots size={23} color="#15883e" />
      </div>
    </div>
  )
}

export default Loader