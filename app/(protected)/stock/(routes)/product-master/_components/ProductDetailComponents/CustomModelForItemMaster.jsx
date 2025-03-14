import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import NewPurchaseFormHeader from '../../../purchase/_components/NewPurchaseForm/header/NewPurchaseFormHeader';

const CustomModalForItemMaster = ({
  isOpen,
  onClose,
  tabs,
  heading,
  number,
  date,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(true);

  if (!isOpen) {
    return null;
  }

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (

    <div className="fixed   inset-0 z-50  bg-black bg-opacity-50 flex">
      <div className="relative p-6 bg-white h-[97vh] w-[99%] mx-auto mt-3 rounded-md flex flex-col">
        <div className="h-fit ">
          {/* headin and cross icon */}
          <div className="flex items-start  flex-col gap-1">
            <div className="flex items-center justify-between w-[100%]">
              <h1 className="poppins font-medium text-[20px] lgdesktop:text-[32px] lgdesktop:leading-10  text-customblack">
                {heading}
              </h1>
              <div className="flex items-center gap-1">
                <button
                  className="text-gray-600 border border-gray-200 rounded-full"
                  onClick={onClose}
                >
                  <SlArrowDown className="p-1 text-2xl hover:bg-customLightGray rounded-full" />
                </button>
                <button
                  className="flex-col text-gray-600 hover:bg-customLightGray rounded-md"
                  onClick={onClose}
                >
                  <RxCross1 className="p-1 text-2xl" />
                </button>
              </div>
            </div>
            <div className="flex text-xs text-gray-400">
              <div className="flex flex-col">
                <p className="flex items-center gap-1">
                  {isUnlocked ? (
                    <AiFillUnlock
                      className=" text-customgreen justify-center text-lg cursor-pointer"
                      onClick={() => setIsUnlocked(false)}
                    />
                  ) : (
                    <AiFillLock
                      className=" text-customgreen justify-center text-lg cursor-pointer"
                      onClick={() => setIsUnlocked(true)}
                    />
                  )}
                  <span className="font-semibold text-grayBlack text-[12px] leading-6 lgdesktop:text-lg">
                    {!isUnlocked ? (
                      "This product is currently unlocked"
                    ) : (
                      <div className=" flex items-center gap-3">
                        <p className="m-0 font-semibold text-grayBlack text-[12px] leading-6">
                          This product is currently locked
                        </p>
                        <span className=" text-gray-300">|</span>
                        <p className="text-[12px] font-normal m-0  text-gray-400">
                          Field with red asteric (
                          <span className="text-red-600">*</span>) are mandatory
                        </p>
                      </div>
                    )}
                  </span>
                </p>
                {/* <p className="text-grayBlack text-[14px] leading-6 lgdesktop:text-lg">
                Fields with a red asterisk (<span className="text-red-600">*</span>) are mandatory
            </p> */}
              </div>
              <div className="flex-none mr-[45px] my-1">
                <h2 className="text-customblack text-[24px] leading-[24px] font-normal ">
                  {number}
                </h2>
                <p className="text-[#6b7280] text-[14px] leading-[24px] font-normal text-right">
                  {date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="w-full mx-auto border-b-[1px] border-gray-300">
              <div className="flex items-center justify-between">
                {/* tabs */}
                <div className="flex gap-1 ">
                  {tabs.map((tab, index) => (
                    <React.Fragment key={index}>
                      <div
                        className={`${activeTab === index
                          ? "border-b-customblue border-b-[2px] pb-[3px]"
                          : ""
                          }`}
                      >
                        <button
                          className={`flex items-center ${activeTab === index
                            ? "text-[14px]  relative pl-0 p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                            : "text-[14px] pl-0 relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
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

                {/* buttons */}
                <div className="flex gap-1 items-center pb-[3px]">
                  <div className="flex justify-end items-center mt-2 space-x-2">
                    {/* {CustomComponent ? <CustomComponent /> : null} */}
                    {/* <button
                      onClick={onClickApply}
                      className="bg-customgreen hover:bg-btnHoverGreen text-white text-[14px] leading-[24px] px-4 py-1 rounded-[4px]"
                    >
                      Apply
                    </button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* hr line */}
            {/* <hr className="w-auto text-gray-300" /> */}

            {/* tagline */}
          </div>
          <NewPurchaseFormHeader />
        </div>
        {/* modal body */}
        <div className="bg-gray-100 grow  overflow-auto ">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>

  );
};

export default CustomModalForItemMaster;
