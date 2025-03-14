'use client'
import React,{useState} from "react";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import {
  IoIosSearch,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import HeaderDropDown from "../../receiving/_components/FormHeaderDropdown";
// import InputTextEut from "../../../../../../components/misc/textinput/InputTextEut";
import InputTextEut from "../../../../../../components/misc/pureComponents/textinput/InputTextEut";

const ReceivingDrawer = ({ suplier, btnText }) => {
  const [colaps, setColaps] = useState(false);

  return (
    <>
    <div className="flex w-full justify-between bg-white mb-2 rounded-t-md">
      <div className="  flex   ">
        <button className="bg-cyan-700 rounded-md py-1 px-2 text-white text-sm">
          {" "}
          {btnText}
        </button>
        <div className="flex ml-4">
          <div className="bg-green-400 flex mr-2 p-[2px] h-full"></div>
            {/* <CreatableDropdown value={options} handleCreateOption={handleCreateOption}/> */}
        </div>
      </div>
      <div className=" lg:flex md:hidden sm:hidden hidden  justify-end ">
        <div className="flex ">
          <div className="flex gap-4">
            <div className="hedden lg:flex md:hidden sm:hidden items-center gap-2">
              <IoIosSearch className="text-[18px]" />
              Search
            </div>
            <div className="hidden items-center gap-2 lg:flex md:hidden sm:hidden">
              <BiSortAlt2 className="text-[18px]" />
              Sort
            </div>
          </div>
        </div>
         <div className="flex w-[17%]  min-w-fit justify-end gap-2">
        <div className="flex items-center">
          <div className="flex items-center gap-2 lg:hidden md:flex sm:flex mt-1">
            <HeaderDropDown />
          </div>
        </div>
        <div className="flex items-center p-1">
          <FiFilter className="text-[18px]" />
        </div>

        <div className="flex items-center p-1">
          <IoSettingsOutline className="text-[18px]" />
        </div>
      </div>
      </div>
     
    </div>
    <div className="flex gap-6 bg-gray-50 pt-3 pl-3 ">     
             <InputTextEut placeHolder='Ref '/>
             <InputTextEut placeHolder='Comments '/>
        </div>
    </>
    
    
  );
};

export default ReceivingDrawer;
