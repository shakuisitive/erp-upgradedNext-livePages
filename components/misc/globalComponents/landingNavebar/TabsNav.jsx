"use client";
import { useState, useRef, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { PiExportLight} from "react-icons/pi";
import { FiFilter } from "react-icons/fi";
import {BiSortAlt2 } from "react-icons/bi";
import { SlRefresh } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosSearch,
} from "react-icons/io";


function TabsNav() {
  const [showNav, setShowNav] = useState(true);
  const [currTab, setCurrTab] = useState("main-tab");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  useEffect(() => {
    toggleSearch ? searchRef.current.focus() : searchRef.current.blur();
  }, [toggleSearch]);

  function handleClickOutside(event) {
    console.log(searchContainerRef.current);
    if (
      searchContainerRef.current &
      !searchContainerRef.current.contains(event.target)
    ) {
      setToggleSearch(false); // Close the dropdown
      console.log("I am called");
    }
  }

  useEffect(() => {
    if (toggleSearch) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleSearch]);

  function handleClearSearch() {
    setSearch("");
    searchRef.current.focus();
  }


  function currTabHandler(tab) {
    setCurrTab(tab);
  }
  return (
    <div className="w-full mx-auto  border-b-[1px] border-gray-300 text-[14px] text-customblack font-normal">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 ">
          <div
            className={`${
              currTab == "main-tab" ? "border-b-[#0073ea] border-b-[2px]" : ""
            }  pb-[3px] mt-[2px]`}
          >
            <button
              className={`flex items-center text-[14px] w-[100px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover 
               after:absolute after:right-[0px]`}
              onClick={() => currTabHandler("main-tab")}
            >
              <GoHome className="text-[18px] text-customIcon" />
               Main Tab
            </button>
          </div>
          <div
            className={`${
              currTab == "table" ? "border-b-[#0073ea] border-b-[2px]" : ""
            } pb-[3px] mt-[2px]`}
          >
            <button
              className={`flex items-center text-[14px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover
               after:absolute after:right-[0px]`}
              onClick={() => currTabHandler("table")}
            >
              Table
            </button>
          </div>
        </div>
        {/* 2nd  */}
        <div className="flex text-[14px] gap-[30px] ">
          <div className=" flex gap-2">
            <div
             ref={searchContainerRef}
              className={` ${
                toggleSearch ? "!border-[#0073ea] " : "hover:bg-customHover"
              }   border cursor-pointer rounded-[4px]  relative border-transparent lg:flex  p-1 items-center gap-2`}
            >
              <div
               
                className={`${
                  toggleSearch
                    ? "w-[240px] px-2 relative text-customblack flex items-center justify-between  after:absolute after:right-[0px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-grayBlack"
                    : "w-0 p-0 m-0 absolute"
                } transition-all duration-200`}
              >
                <input
                  type="text"
                  className={` ${
                    toggleSearch ? "h-full w-full focus:outline-none text-[14px] text-customblack" : "hidden"
                  } `}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  ref={searchRef}
                  placeholder="Search this board"
                />
                
                  <div
                    onClick={handleClearSearch}
                    className={`${
                      toggleSearch ?`flex hover:border-gray-200 ${search?"":"invisible"} border cursor-pointer  border-transparent items-center h-fit` : "hidden"
                    } `}
                  >
                    <RxCross2 className={`${
                    toggleSearch ? " text-[18px] text-customIcon" : "hidden"
                  }`} />
                  </div>
                
               
              </div>
              <div
                onClick={() => setToggleSearch((pre) => !pre)}
                className=" text-customblack text-[14px] transition-all flex duration-1000 items-center gap-2 cursor-pointer"
              >
                <IoIosSearch className="text-[18px] text-customIcon" />
                {toggleSearch ? "" : "Search"}
              </div>
            </div>
            <div className=" border cursor-pointer text-14px text-customblack hover:bg-customHover rounded-[4px] border-transparent items-center gap-2 p-1 flex">
              <BiSortAlt2 className="text-[18px] text-customIcon" />
              Sort
            </div>
            <div className="border cursor-pointer text-14px hover:bg-customHover text-customblack rounded-[4px]  border-transparent flex gap-2 items-center p-1">
              <FiFilter className="text-[18px] text-customIcon" />
              Filter
            </div>
            
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
            <div className="flex items-center">
              <div className="border cursor-pointer hover:bg-customHover rounded-[4px]  border-transparent flex items-center h-fit p-1">
                <SlRefresh className="text-[18px] text-customIcon" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[30px] w-[180px] flex justify-center items-center">
              <div
                className={`h-full w-full flex items-center gap-2 px-2 hover:bg-customHover cursor-pointer rounded-[4px]`}
              >
                <PiExportLight className="text-[20px] text-customIcon" />
                <p>Export</p>
                <div className="flex">
                 
                  <div className=" relative">
                    <div className="hexagon w-full h-full absolute  "></div>
                    <img className="w-[30px] p-[6px]" src="/icons/xls.png"/>
                  </div>
                 
                  <div className=" relative">
                    <div className="hexagon w-full h-full absolute  "></div>
                    <img className="w-[30px] p-[6px]" src="/icons/csv.png"/>
                  </div>
                 
                  <div className=" relative flex items-start justify-center">
                    <div className="hexagon w-full h-full absolute  "></div>
                    <img className="w-[30px] object-contain p-[6px]" src="/icons/pdf.png"/>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-full p-1 cursor-pointer border text-customblack border-grayBlack"
              onClick={() => setShowNav(!showNav)}
            >
              <IoIosArrowDown className={`${showNav ? "rotate-180" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabsNav;
