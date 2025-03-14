"use client";
import React, { useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { GrExpand } from "react-icons/gr";
import { IoMdCopy } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";

const MoreOption = ({ index, rowData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="size-full relative">
      <div className={` px-[10px] bg-white flex justify-center items-center `}>
        <span
          // onClick={() => selectedRow(rowI, rowData)}
          onClick={togglePopover}
          className={` ${isOpen == false && "bg-transparent"}  ${
            isOpen ? "bg-[#cce5ff]" : "hover:bg-[#dcdfec]"
          } p-1 cursor-pointer  rounded-md`}
        >
          <TfiMoreAlt
            className={`text-[14px] ${isOpen == false && "text-transparent"} ${
              isOpen == true
                ? "text-customblack"
                : "group-hover:text-customblack"
            } `}
          />
        </span>
      </div>
      {isOpen && (
        <div className=" absolute -right-[260px] -top-[25px] mt-2 w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 ">
          <div className="p-4">
            <div className="  items-center mr-2 text-customblack text-[14px] flex cursor-pointer  p-1 hover:bg-gray-100 rounded-md w-full ">
              <GrExpand className="mr-3 text-[16px] " />
              Open Project
            </div>
            <div className="  items-center mr-2 text-customblack text-[14px] flex cursor-pointer  p-1 hover:bg-gray-100 rounded-md w-full ">
              <BsArrowRightCircle className="mr-3 text-[16px]  " />
              Move to
            </div>
            <div className="  items-center mr-2 text-customblack text-[14px] flex cursor-pointer  p-1 hover:bg-gray-100 rounded-md w-full ">
              <IoMdCopy className="mr-3 text-[16px]  " />
              Duplicate
            </div>
            <div className="  items-center mr-2 text-customblack text-[14px] flex cursor-pointer  p-1 hover:bg-gray-100 rounded-md w-full ">
              <RiDeleteBin6Line className="mr-3 text-[16px]  " />
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreOption;
