/*created by Madiha Shaikh 24-Apr-2024 
 This is a global component you need to pass tabs array object mandatory exportProp object and Refresh function is optional detail code is in the end of code */
"use client";
import React, { useState } from "react";
import Refresh from "../../misc/refresh/Refresh";
import Export from "../../misc/export/Export";
// import ArrowNavigator from "../arrowNavigator/ArrowNavigator";
// import ArrowNavigator from "../GridNavigator"

const Tabs = ({ tabs, exportProps, onRefresh  }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="flex flex-col  ">
      <div className="flex justify-between border-b border-gray-200 mx-[27px]">
        <div className="flex gap-1  font-normal">
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
                      ? "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
                      : "text-[14px] relative p-[8px] hover:bg-customLightGray rounded-[4px] text-customblack gap-2 after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid after:border-[#d0d4e4] after:absolute after:right-[0px]"
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

        {/* right side content */}
        <div className="flex items-center justify-between gap-6 ">
          <div className="flex items-center gap-2">
            {onRefresh && <Refresh onRefresh={onRefresh} onRefreshHandle={onRefresh?.onRefreshHandle} />}
            {exportProps ? (
              <div className="h-[30px] w-[180px] flex justify-center items-center">
                <Export exportProps={exportProps} />
              </div>
            ) : null}
          </div>
          {/* <ArrowNavigator /> */}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white grow mt-3 overflow-auto">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;

// method to call
{
  /* 
 const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <div>this is channel</div>,
    },
    { 
      label: "Channel",
      content: <div>this is channel</div>,
    }, 
  ];
  if you want to see export  only pass this to tabs component
   const exportProps = {
    fileName: "",
    fileExtension: "xls",
   }
if you want to see refresher icon only pass this to tabs component
  const onRefresh = () => {
  }
<Tabs tabs={tabs} exportProps={exportProps} onRefresh={onRefresh}/> */
}
