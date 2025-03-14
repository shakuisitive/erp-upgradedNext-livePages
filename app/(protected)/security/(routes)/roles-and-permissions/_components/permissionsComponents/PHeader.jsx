import React, { useState, useRef } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiFilter } from "react-icons/fi";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { IoIosArrowDown, IoIosMore, IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const PHeader = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  return (
    <div className="flex w-full justify-between  px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="  flex w-[50%]  py-2  ">
        <div className="  flex  py-2  "></div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0073ea] mr-3 ml-2 flex pl-3 w-[130px] justify-between rounded-md ">
            <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
              <span className="font-medium ">New Deal</span>
            </div>
            <div className="text-white flex items-center px-2 ">
              <IoIosArrowDown className="text-[18px] " />
            </div>
          </div>
          <div
            className={` ${
              toggleSearch ? "!border-[#0073ea] " : "hover:bg-customLightGray"
            }  border cursor-pointer rounded-[4px]  border-transparent lg:flex  p-[2px] items-center gap-2`}
          >
            <div
              className={`${
                toggleSearch
                  ? "w-[240px] px-2 relative  after:absolute after:right-[0px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-grayBlack"
                  : "w-0 px-0"
              } transition-all duration-200 text-customblack flex items-center justify-between`}
            >
              <input
                type="text"
                className={`h-full w-full focus:outline-none ${
                  toggleSearch ? "" : "hidden"
                } text-[14px] text-customblack`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchRef}
                placeholder="Search this board"
              />
              {search && (
                <div
                  onClick={() => setSearch("")}
                  className={`${
                    toggleSearch ? "flex" : "hidden"
                  } hover:border-gray-200 border cursor-pointer  border-transparent items-center h-fit`}
                >
                  <RxCross2 className="text-[14px]" />
                </div>
              )}
            </div>
            <div
              onClick={() => setToggleSearch((pre) => !pre)}
              className=" text-customblack text-[14px] transition-all flex duration-1000 items-center gap-2 cursor-pointer"
            >
              <IoIosSearch className="text-[18px] text-customblack" />
              {toggleSearch ? "" : "Search"}
            </div>
          </div>
          {/* <div className="flex items-center gap-3 lg:hidden md:flex sm:flex mt-1">
            <HeaderDropDown />
          </div> */}
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <HiOutlineUserCircle className="text-[18px] text-grayBlack" />
            Person
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <FiFilter className="text-[15px] text-grayBlack" />
            Filter
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <BiSortAlt2 className="text-[18px] text-grayBlack" />
            Sort
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <BiHide className="text-[18px] text-grayBlack" />
            Hide
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <IoIosMore className="text-[18px] text-grayBlack" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHeader;
