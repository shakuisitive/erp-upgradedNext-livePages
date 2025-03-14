import React from 'react'
import { IoIosArrowDown, IoIosArrowUp,  } from "react-icons/io";

const GridNavigator = () => {
  return (
    <div  className="flex gap-2">
    <div className="flex items-center">
                  <div className="border cursor-pointer hover:bg-customHover rounded-[4px]  border-transparent h-fit flex items-center p-1">
                    <IoIosArrowDown className="text-[18px] text-customIcon" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="border cursor-pointer hover:bg-customHover rounded-[4px]  border-transparent flex items-center h-fit p-1">
                    <IoIosArrowUp className="text-[18px] text-customIcon" />
                  </div>
                </div>
    </div>
  )
}

export default GridNavigator
