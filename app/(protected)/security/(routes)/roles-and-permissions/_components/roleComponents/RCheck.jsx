import React from 'react'
import { FaCheck } from "react-icons/fa6";

const RCheck = () => {
  return (
    <div  className='size-full relative'>
        <div   className={`w-full h-full flex items-center cursor-pointer justify-center`}>
        
        <p className='text-[14px] leading-normal  line-clamp-1 text-green-500'><FaCheck /></p>

        </div>
    </div>
  )
}

export default RCheck