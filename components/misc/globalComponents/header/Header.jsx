"use client";
import React, { useEffect, useRef, useState } from "react";

import { TbGridDots } from "react-icons/tb";
import { GoBell } from "react-icons/go";

import TopCards from "./TopCards";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderTooltip } from "./HeaderTooltip";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { RiQuestionMark } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { TbUserPlus } from "react-icons/tb";
import { setlogout } from "../../../../app/(auth)/login/_components/redux/AuthSlice";
import { useDispatch } from "react-redux";
import { redirect, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { clearUser } from "../../../../redux/user/userSlice";

// import { BsFillArrowLeftSquareFill } from "react-icons/bs";
const Header = () => {
  const [showCard, setShowCard] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const showCardRef = useRef(null);

  const dispatch = useDispatch();

  const handleAvatarClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (showCardRef.current && !showCardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, showCardRef]);

  const route = usePathname();
  const showHeader = route == "/login" ? false : true;

  return (
    <div
      className={`${
        showHeader ? "flex" : "hidden"
      } bg-[#E1EFF2]  px-3 mb-1 lg:h-[7vh]   md:[7vh] sm:[7vh] h-[7vh] fixed top-0 w-full z-40 `}
    >
      <div className="flex items-center justify-between w-[97%]  m-auto">
        <div
          className="relative"
          ref={showCardRef}
          onClick={() => setShowCard((prev) => !prev)}
        >
          <div className="cursor-pointer hover:bg-slate-100 p-2 rounded-sm">
            <TbGridDots className="text-xl font-bold" />
          </div>
          {showCard && (
            <div ref={showCardRef}>
              <TopCards />
            </div>
          )}
        </div>

        <div className="flex sm:gap-1 sm:justify-end md:gap-2 lg:gap-2 md:justify-end  items-center">
          {/* logos */}
          <div className="flex items-center justify-between">
            <HeaderTooltip content={"notification"} position={"bottom"}>
              <div className="p-2 relative cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-sm text-lg ">
                <GoBell color={"#323338"} className="font-bold customblack" />
                <span className="absolute left-[1.2rem] bottom-4">
                  <div className="inline-flex items-center px-1.5 py-0.5  rounded-full text-xs font-semibold leading-4 bg-red-500 text-white  top-2">
                    6
                  </div>
                </span>
              </div>
            </HeaderTooltip>
            <HeaderTooltip position={"bottom"} content={"Update Feed"}>
              <div className=" p-2  relative cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-sm text-lg">
                <GoInbox color={"#323338"} size={20} />
                <span className="absolute left-[1.2rem] bottom-4">
                  <div className="inline-flex items-center px-1.5 py-0.5  rounded-full text-xs font-semibold leading-4 bg-white text-black  top-2">
                    6
                  </div>
                </span>
              </div>
            </HeaderTooltip>
            <HeaderTooltip position={"bottom"} content={"Invite Member"}>
              <div className="md:2 lg:p-2 cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-sm text-lg ">
                <TbUserPlus size={20} color={"#323338"} />
              </div>
            </HeaderTooltip>
            <HeaderTooltip content={"Eut marketplace"} position={"bottom"}>
              <div className="m:2 lg:p-2 customblack  cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-sm text-lg ">
                <IoExtensionPuzzleOutline color={"#323338"} size={20} />
              </div>
            </HeaderTooltip>
            <div className="h-[35px] w-[1.3px]  m-1 bg-[#DBDEEB]" />
            <HeaderTooltip content={"Help"} position={"bottom"}>
              <div className="m:2 lg:p-2  cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-md text-lg ">
                <IoIosSearch color={"#323338"} size={20} />
              </div>
            </HeaderTooltip>
            <HeaderTooltip content={"Search everything"} position={"bottom"}>
              <div className="m:2 lg:p-2  cursor-pointer hover:bg-[#DBDEEB] transition-all duration-150 rounded-md text-lg ">
                <RiQuestionMark color={"#323338"} />
              </div>
            </HeaderTooltip>
          </div>
          {/* profile */}
          <div>
            <div
              className="flex justify-center items-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <FaUserCircle
                color={"#323338"}
                size={31}
                className="object-fit"
              />
            </div>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg dark:bg-gray-700 z-10"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
