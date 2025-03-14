import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillUnlock } from "react-icons/ai";
import { SlArrowDown } from "react-icons/sl";

const NewCustomModal = ({
  isOpen,
  onClose,
  tabs,
  heading,
  CustomComponent,
  tooltipContent,
  btnText,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) {
    return null;
  }

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const handleClose = () => {
    setActiveTab(0);
    onClose();
  };
  return (
    //Main div
    <div className="fixed   inset-0 z-[502]  bg-black bg-opacity-50 flex">
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
                onClick={handleClose}
              >
                <SlArrowDown className="p-1 text-2xl hover:bg-customLightGray rounded-full" />
              </button>
              <button
                className="flex-col text-gray-600 hover:bg-customLightGray rounded-md"
                onClick={handleClose}
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
              </div>
            </div>
          </div>
        </div>
        {/* modal body */}
        <div className="bg-gray-100 grow overflow-auto mt-2">
          {tabs[activeTab]?.content}
        </div>
      </div>
    </div>
  );
};

export default NewCustomModal;

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
//
//   ];
// const handleApply=()=>{

// }
// const handleIssue=()=>{

// }
// const handleReady=()=>{

// }

// after return()

{
  /* <button onClick={handleOpenModal}>Open Modal</button>
      <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} tabs={tabs} heading="" onClickApply={handleApply}
  onClickLock={handleLock} /> */
}

//***************Modal with tabs********************* */
