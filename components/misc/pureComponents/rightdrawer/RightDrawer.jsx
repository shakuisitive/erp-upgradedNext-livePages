"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { FaFileExport } from "react-icons/fa";

import { TiPlus } from "react-icons/ti";
import { BiSolidBadgeCheck } from "react-icons/bi";
// import { callback } from "chart.js/dist/helpers/helpers.core";

const RightDrawer = ({
  isOpen,
  onClose,
  tabs,
  heading,
  children,
  handleApply,
  handleReport,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) {
    return null;
  }
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-y-0 !top-[60px]  -mt-4 right-0 z-[502]">
            <div className="absolute bg-white h-full inset-y-0 right-0 w-[40vh] tablet:w-[70vw] laptop:w-[70vw] desktop:w-[60vw] lgdesktop:w-[55vw]  shadow-md shadow-gray-400">
              {/* heading and cross icon */}
              <div className="flex flex-col">
                <div className="pl-6 pt-5 flex items-center mb-2">
                  <button
                    className="text-gray-600 hover:bg-gray-200 rounded-md"
                    onClick={onClose}
                  >
                    <RxCross1 className="p-1 text-2xl" />
                  </button>
                </div>
              </div>

              {/* Drawer content */}
              <div className="pl-6 flex flex-col gap-8 pr-5 h-full">
                <div className="flex justify-between ">
                  <h2 className="poppins text-[18px] text-customblack font-medium">
                    {heading}
                  </h2>
                  <div className="icons flex items-center gap-1">
                    <div className="profile relative">
                      <div className="text-white  rounded-full text-[14px] w-[25px] h-[25px] flex items-center justify-center bg-yellow-500">
                        M
                      </div>
                      <div className="bg-sky-500 rounded-full top-[25%] font-extrabold left-[-40%] flex absolute items-ceter justify-center">
                        <TiPlus className="text-white text-[14px]" />
                      </div>
                    </div>
                    <p className="border-l mx-2 h-5 bg-gray-300"></p>
                    <div className="menu">
                      <div className="hover:bg-customHover p-1 rounded-[4px]">
                        <BsThreeDots className="text-[18px] text-customIcon" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  {/* tabs and buttons  */}

                  <div className="flex justify-between pr-5 items-center border-b-[1px] border-gray-300 ">
                    <div className="flex gap-2 items-center">
                      {tabs.map((tab, index) => (
                        <React.Fragment key={index}>
                          <div
                            className={`${
                              activeTab === index
                                ? "border-b-customblue border-b-[2px] pb-[3px]"
                                : ""
                            }`}
                          >
                            <button
                              className={`flex items-center ${
                                activeTab === index
                                  ? "text-[14px]  relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                                  : "text-[14px]  relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                              }`}
                              onClick={() => handleTabClick(index)}
                            >
                              {tab.icon}
                              {tab.label}
                            </button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {handleApply ? (
                      <div className="flex gap-4">
                        <button
                          onClick={handleApply}
                          className="bg-[#0073EA]   text-white font-bold py-2 px-4 rounded-[6px]"
                        >
                          Update
                        </button>

                        <div className="hover:bg-customHover p-1 rounded-[4px]">
                          <FaFileExport
                            className="text-[26px] text-yellow-400 "
                            onClick={handleReport}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* drawer body */}

                  <div className="bg-white grow  mb-2 overflow-auto ">
                    {tabs[activeTab].content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RightDrawer;

// method to call
// const [isDrawer, setIsDrawer] = useState(false);
// const handleOpenDrawer = () => {
//   setIsDrawer(true);
// };
//  const handleCloseDrawer = () => {
//   setIsDrawer(false);
// };

//  const tabs = [
//   {
//     label: "Updates",
//     icon: <GrHomeRounded  className="text-customIcon text-[14px]"/>,
//     content: <ConversationTab/>
//   },
//   {
//     label: "Files",
//     content: <File/>
//   },
//   {
//     label: "Activity Log",
//      content: <div>this is activity content</div>
//   }
// ]

// after Return()

//       <RightDrawer isOpen={isDrawer} onClose={handleCloseDrawer} heading="New Purchase" tabs={tabs} />
