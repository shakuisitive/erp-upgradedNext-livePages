"use client";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import React from "react";
import { PiPlugLight } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";


// const handleTabClick = (index) => {
//   setActiveNavTab(index);
// };

function TabsNav() {
    // const [activeNavTab, setActiveNavTab] = useState(1);
const [showNav, setShowNav] = useState(true);
  return (
    <div className="w-full mx-auto p-2">
      <div className="flex items-center justify-between">
        <div >
          <button
            className={`flex items-center gap-2 rounded-sm hover:bg-gray-200 
              border-b-2  pb-2 px-2 py-2 border-[#007f9b]`}
            // onClick={() => handleTabClick()}
          >
            <GoHome /> Main Tab
          </button>
        </div>
        {/* 2nd  */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#DBDEEB] cursor-pointer rounded-lg">
            <PiPlugLight className="-rotate-90 text-xl" /> <p>Integrate</p>
          </div>
          <div className="flex items-center px-4 gap-2 py-2 hover:bg-[#DBDEEB] cursor-pointer rounded-lg">
            <RiRobot2Line className="text-xl" /> <p>Automate / 10</p>
          </div>
          <div className="rounded-full p-1 cursor-pointer border border-black"
          onClick={()=>setShowNav(!showNav)}
          >
          <IoIosArrowDown className={`${showNav?"rotate-180":''}`} />
          </div>
        </div>
      </div>
      <hr className="w-[100%] h-[100%] border border-gray-300" />
    </div>
  );
}

export default TabsNav;
