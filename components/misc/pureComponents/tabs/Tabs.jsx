"use client";
import React, { useState } from "react";

const Tabs = (props) => {
  const [tabList, setTabList] = useState(props?.tabList ?? []);

  const handleTabClick = (index, tab) => {
    if (tabList?.length < 2) {
      return;
    }
    const newList = tabList?.map((i, id) =>
      id === index ? { ...i, selected: true } : { ...i, selected: false }
    );
    setTabList(newList);
    props?.onChange({ ...tab, selected: true });
  };

  return (
    // <div className="w-full mx-auto p-2 bg-black">
    <div className="flex gap-1">
      {tabList?.map((tab, index) => (
        <React.Fragment key={index}>
          <div
            className={`${
              tab?.selected ? "border-b-[#0073ea] border-b-[2px]" : ""
            }  pb-[3px] mt-[2px]`}
          >
            <button
              className={`flex items-center text-[14px] w-[100px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover 
               after:absolute after:right-[0px]`}
              onClick={() => handleTabClick(index, tab)}
            >
              {tab?.iconComp ?? ""}
              {tab?.label ?? ""}
            </button>
          </div>
          {/* {index < tabList.length - 1 && (
            <div className="border-l border-gray-200 h-8 mx-2"></div>
          )} */}
        </React.Fragment>
      ))}
    </div>
    //   <hr className="w-auto  border border-gray-300" />
    //   {/* <div className="mt-4 bg-white w-auto">{tabs[activeTab].content}</div> */}
    // </div>
  );
};

export default Tabs;

{
  /* <button
              className={`flex items-center rounded-sm hover:bg-gray-200 ${
                tab?.selected ? "border-b-2 border-[#007f9b]" : ""
              }`}
              onClick={() => handleTabClick(index, tab)}
            > */
}
