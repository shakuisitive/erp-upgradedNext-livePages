import React from 'react'
import {
  IoIosAdd,
  IoIosArrowDown,
  
} from "react-icons/io";

const NewButton = ({handleClick,label}) => {
  return (
    <div>
      <div onClick = {handleClick} className="bg-[#0073ea] mr-3 ml-2 flex pl-3 w-[130px] justify-between rounded-md cursor-pointer ">
          <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
            <span>
              <IoIosAdd className="text-[20px] text-white" />
            </span>
            <span className="font-medium ">{label}</span>
          </div>
          <div className="text-white flex items-center px-2 ">
            <IoIosArrowDown className="text-[18px] " />
          </div>
        </div>
    </div>
  )
}

export default NewButton
