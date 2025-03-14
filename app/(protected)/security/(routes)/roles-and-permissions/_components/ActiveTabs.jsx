"use client";
import { useState, useRef, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { PiExportLight } from "react-icons/pi";
import { FiFilter } from "react-icons/fi";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { SlRefresh } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setEditHead, setHeadReduxT } from "../redux/Role.slice";

function TabsNav() {
  const [showNav, setShowNav] = useState(true);
  const [currTab, setCurrTab] = useState("main-tab");
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [test, setTest] = useState(false);
  const [testT, setTestT] = useState(true);
  const [fHead, setFHead] = useState([]);
  const [foc, setFoc] = useState(false);
  const roleHead = useSelector(
    (state) => state.RoleSlice.RoleHead
  );
  const defHead = useSelector((state) => state.RoleSlice.defHead);

  //   console.log('check head redux' , roleHead);

  const dispatch = useDispatch();

  function handleClickOutside(event) {
    console.log(searchContainerRef.current);
    if (
      searchContainerRef.current &
      !searchContainerRef.current.contains(event.target)
    ) {
      setToggleSearch(false); // Close the dropdown
      //   console.log("I am called");
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
  const setFilter = (e) => {
    const fil = roleHead.filter((data) =>
      data.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFHead(fil);
    console.log("check out filter", e.target.value, fil);
  };

  useEffect(() => {
    setFHead(roleHead);
  }, [roleHead]);

  const EditHead = (i) => {
    dispatch(setEditHead(i));
  };

  const setTitleR = (index, titleP) => {
    const check = roleHead.findIndex((data) => data.title == titleP);
    dispatch(setHeadReduxT({ index: check, cat: false }));
    console.log("check index in tabs", check);
  };
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
                    <img className="w-[30px] p-[6px]" src="/icons/xls.png" />
                  </div>

                  <div className=" relative">
                    <div className="hexagon w-full h-full absolute  "></div>
                    <img className="w-[30px] p-[6px]" src="/icons/csv.png" />
                  </div>

                  <div className=" relative flex items-start justify-center">
                    <div className="hexagon w-full h-full absolute  "></div>
                    <img
                      className="w-[30px] object-contain p-[6px]"
                      src="/icons/pdf.png"
                    />
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
