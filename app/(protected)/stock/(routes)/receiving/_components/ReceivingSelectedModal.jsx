"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { GoArchive } from "react-icons/go";
import { IoMdCopy } from "react-icons/io";
import { IoClose, IoExtensionPuzzleOutline } from "react-icons/io5";
import { PiArrowBendRightDown } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

function ReceivingSelectedModal({ isOpen, closeModal , checkedItems }) {
  return (
    <div className={`fixed w-[100vw]  bottom-10 ${isOpen ? "block" : "hidden"}`}>
      <div className=" w-[800px] h-[63px] bg-white overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex m-auto">
        <div className="text-[24px] text-white w-[63px] flex justify-center items-center bg-[#0073EA]">
       { checkedItems}
        </div>
        <div className="grow flex ">
          <div className="text-customblack text-[20px] font-thin h-full flex items-center pl-[20px] w-[256px]">
            Receiving Selected
          </div>
          <div className="flex w-[71px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <IoMdCopy className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Duplicate</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <CiFileOn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Export</span>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <GoArchive className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Archive</span>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <RiDeleteBin6Line className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Delete</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <PiArrowBendRightDown className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Convert</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <BsArrowRightCircle className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Move to</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px]">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <IoExtensionPuzzleOutline className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">App</span>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-l-2 border-l-[#c3c6d4] w-[63px] text-[24px] text-customblack flex justify-center items-center">
          <IoClose />
        </div>
      </div>
    </div>
  );
}

export default ReceivingSelectedModal;
