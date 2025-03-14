import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {RiUserAddLine} from "react-icons/ri"
import { CiStar } from "react-icons/ci";
import { FaUserCircle} from "react-icons/fa";

const CycleCountMHead = ({heading,ptext}) => {
  return (
    <div className='flex flex-col mt-2'>

         {/* 1st part */}
         <div>
          <div className="py-1 flex items-center justify-between w-[95%] mx-auto">
            {/* 1st portion */}
            <div className="flex  items-center">
              <p className="poppins font-medium text-customblack text-[24px] leading-7 lgdesktop:text-[32px] lgdesktop:leading-10">{heading}</p>
              <div className="p-2 relative group rounded-md cursor-pointer font-bold text-customblack text-2xl hover:bg-[#DCDFEC] transition-all duration-300">
                <IoIosInformationCircleOutline />
                <div className=" hidden group-hover:flex absolute z-50 whitespace-normal  rounded-md bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                  show board discription
                </div>
              </div>

              <div className="p-2 relative group rounded-md cursor-pointer font-bold text-2xl hover:bg-[#DCDFEC] transition-all duration-300">
                <CiStar />
                <div className=" hidden group-hover:flex absolute z-50 whitespace-normal  rounded-md bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none">
                  Add to favroite
                </div>
              </div>
            </div>
            {/* 2nd portion */}
            <div className="flex items-center gap-2">
              <div className="flex items-center hover:bg-[#DCDFEC] px-3 rounded-md py-1 cursor-pointer gap-2 group">
                <p className=" text-customblack font-normal leading-6 text-sm">Activity</p>
                <FaUserCircle className='text-customblack text-2xl border rounded-full border-white'/>

              </div>
              {/* 2nd button */}
              <div className="flex items-center hover:bg-[#DCDFEC] px-3 rounded-md py-1 cursor-pointer gap-2 group border border-gray">
                {/* <Image
                  src="/icons/invite-member.png"
                  alt="invite"
                  height={20}
                  width={20}
                /> */}
                <RiUserAddLine className='text-customblack text-xl '/>
                <p className="text-customblack font-normal leading-6 text-sm">Invite / 1</p>
              </div>
              {/* icon */}
              <div
                title="options"
                className="p-2 relative group rounded-md cursor-pointer font-bold text-2xl hover:bg-[#DCDFEC] transition-all duration-300"
              >
                <BsThreeDots className='text-customblack text-[17px]'/>
                {/* <PiDotsThreeBold className='text-customblack'/> */}
              </div>
            </div>
          </div>
          <div className=" w-[95%] mx-auto cursor-pointer">
            <p className='text-grayBlack text-sm font-normal leading-5 mb-3'>
            {ptext}
              <span className="text-customblue">Read more</span>
            </p>
          </div>
        </div>
    </div>
  )
}

export default CycleCountMHead
