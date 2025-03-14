import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import Image from "next/image";
import TabsNav from './TabsNav';

function DashbordNav({heading,ptext}) {
  return (
    <div className=' flex-col   h-full mt-2'>

         {/* 1st part */}
         <div className='h-[80%]  '>
          <div className="py-1 flex items-center justify-between w-[95%] m-auto">
            {/* 1st portion */}
            <div className="flex  items-center">
              <p className="font-medium lgdesktop:text-5xl btdesktop:text-4xl desktop:text-4xl laptop:text-3xl tablet:text-3xl ">{heading}</p>
              <div className="p-2  relative group rounded-lg cursor-pointer font-bold text-2xl hover:bg-[#DCDFEC] transition-all duration-300">
                <IoIosInformationCircleOutline />
                <div className=" hidden group-hover:flex absolute z-50 whitespace-normal  rounded-lg bg-black py-1.5 px-3 font-sans text-md font-normal text-white focus:outline-none">
                  show board discription
                </div>
              </div>

              <div className="p-2 relative group rounded-lg cursor-pointer font-bold text-2xl hover:bg-[#DCDFEC] transition-all duration-300">
                <CiStar />
                <div className=" hidden group-hover:flex absolute z-50 whitespace-normal  rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                  Add to favroite
                </div>
              </div>
            </div>
            {/* 2nd portion */}
            <div className="flex items-center gap-2">
              <div className="flex items-center hover:bg-[#DCDFEC] px-3 rounded-lg py-1 cursor-pointer gap-2 group">
                <p className="font-extralight text-lg">Activity</p>
                <div className="px-2 py-1 rounded-[50%] bg-red-500 group-hover:border brder-white text-white font-semibold">
                  Ai
                </div>
              </div>
              {/* 2nd button */}
              <div className="flex items-center hover:bg-[#DCDFEC] px-3 rounded-lg py-1 cursor-pointer gap-2 group border border-gray">
                <Image
                  src="/icons/invite-member.png"
                  alt="invite"
                  height={20}
                  width={20}
                />
                <p className="font-extralight text-lg">Invite / 1</p>
              </div>
              {/* icon */}
              <div
                title="options"
                className="p-2  relative group rounded-lg cursor-pointer font-bold text-2xl hover:bg-[#DCDFEC] transition-all duration-300"
              >
                <BsThreeDots />
              </div>
            </div>
          </div>
          <div className=" w-[95%] m-auto lgdesktop:text-lg btdesktop:text-lg desktop:text-[14px] text-gray-500 laptop:text-md tablet:text-md cursor-pointer">
            <p>
            {ptext}
              <span className="text-blue-700">Read more</span>
            </p>
          </div>
        </div>
         {/* 2nd part */}
         <div className="w-[97%] h-[20%] pb-1    m-auto flex items-end   ">
          <TabsNav />
        </div>
    </div>
  )
}

export default DashbordNav