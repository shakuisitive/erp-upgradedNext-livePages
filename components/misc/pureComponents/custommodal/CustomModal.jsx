import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";
import { clearVenderListFormData } from "../../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";
import { useDispatch } from "react-redux";
// import TooltipStatus from "../../../app/(protected)/stock/(routes)/purchase/_components/PurchaseTooltip";

const CustomModal = ({
  isOpen,
  onClose,
  tabs,
  heading,
  onClickApply,
  number,
  date,
  CustomComponent,
  tooltipContent,
  btnText,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(true);
  const dispatch = useDispatch()


  if (!isOpen) {
    return null;
  }

  const handleCloseModl = () => {
    setActiveTab(0)
    onClose()
  }

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    //Main div
    <div className="fixed   inset-0 z-[502] bg-black bg-opacity-50 flex">
      <div className="relative p-6 bg-white h-[97vh] w-[99%] mx-auto mt-3 rounded-md flex flex-col">
        <div className="h-fit ">
          {/* headin and cross icon */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <h1 className="poppins font-medium text-[24px] leading-7 lgdesktop:text-[32px] lgdesktop:leading-10  text-customblack">
                {heading}
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                className="text-gray-600 border border-gray-200 rounded-full"
                onClick={handleCloseModl}
              >
                <SlArrowDown className="p-1 text-2xl hover:bg-customLightGray rounded-full" />
              </button>
              <button
                className="flex-col text-gray-600 hover:bg-customLightGray rounded-md"
                onClick={handleCloseModl}
              >
                <RxCross1 className="p-1 text-2xl" />
              </button>
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
            <div className="flex text-xs mt-2 text-gray-400 justify-between">
              <div className="flex-col">
                {/* <p className="flex items-center">
                  {isUnlocked ? (
                    <AiFillUnlock
                      className="mr-2 text-customgreen justify-center text-lg cursor-pointer"
                      onClick={() => setIsUnlocked(false)}
                    />
                  ) : (
                    <AiFillLock
                      className="mr-2 text-customgreen justify-center text-lg cursor-pointer"
                      onClick={() => setIsUnlocked(true)}
                    />
                  )}
                  <span className="font-semibold text-grayBlack text-[14px] leading-6 lgdesktop:text-lg">
                    {isUnlocked
                      ? "This product is currently unlocked"
                      : "This product is currently locked"}
                  </span>
                </p> */}
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
        </div>
        {/* modal body */}
        <div className="bg-gray-100 grow  overflow-auto ">
          {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

//***************Modal with tabs********************* */
// const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
// const tabs = [
//     {
//       icon: <GoHome />,
//       label: 'Details',
//       content: <div><PurchaseForm/></div>,
//     },
//     {
//       icon: <SlArrowDown className="pl-2 text-md" />,
//       label: 'More',
//       content: <div>Content for More</div>,
//     },
//   ];
// const handleApply=()=>{

// }
// const handleLock=()=>{

// }

// after return()

{
  /* <button onClick={handleOpenModal}>Open Modal</button>
        <CustomModal
        tabs={tabsC}
        isOpen={isModalOpenC}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Purchase Order"
        number="PO0000853"
        date="Mar 8th"
        
      />*/
}

//***************Modal with tabs********************* */
