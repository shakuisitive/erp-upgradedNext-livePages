import React, { useState } from 'react'
import {
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import PMCostLeft from './Header/PMCostLeft';
import PMCostRight from './Header/PMCostRight';
const PMCost = () => {
  const [isHeader, setIsHeader] = useState(true);

  return (
      <div className="">
            <div className="ml-[58px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex px-4 mr-2 gap-4  ">
                  <div className="w-1/2">
                    <PMCostLeft/>
                  </div>
                  <div className="w-1/2">
                    <PMCostRight />
                  </div>
                </div>
              </div>
            )}
          </div>
  )
}

export default PMCost
