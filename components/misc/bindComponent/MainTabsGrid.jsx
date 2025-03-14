"use client";

import React, { useEffect, useRef, useState } from "react";
// import Refresh from "../../misc/refresh/Refresh";
// import Export from "../../misc/export/Export";
import Refresh from "../refresh/Refresh";
import Export from "../export/Export";
import MainGrid from "./MainGrid";
import { checkNull } from "../../../utils/utils";

const MainTabsGrid = ({
  tabs,
  exportProps,
  onRefresh,
  tabsShow = true,
  gridHeader = true,
  scroll,
  refArray,
  handleTabs,
  collapse,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  // const [referenceArr, setReferenceArr] = useState(refArray ?? []);
  // const [gridsArray, setGridsArray] = useState(
  //   tabs?.[activeTab]?.Gridcontent?.gridArr ?? []
  // );
  // const refs = useRef(gridsArray?.map(() => React.createRef(null)));

  // useEffect(() => {
  //   if (
  //     checkNull(refArray) &&
  //     !checkNull(tabs?.[activeTab]?.Gridcontent?.gridArr)
  //   ) {
  //     const gridsArray = [...tabs?.[activeTab]?.Gridcontent?.gridArr];
  //     const newGridsArr = gridsArray.map((i, index) => ({
  //       ...i,
  //       ref: refs.current[index],
  //     }));
  //     setReferenceArr(refs.current);
  //     setGridsArray(newGridsArr);
  //   }
  // }, [refArray]);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (handleTabs) {
      handleTabs(tabIndex);
    }
  };
  return (
    <div>
      <div
        className={`flex justify-between border-b border-gray-200 mx-[27px] ${
          gridHeader == false && "hidden"
        }`}
      >
        <div className="flex gap-1  font-normal">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <div
                className={`${
                  activeTab === index
                    ? "border-b-customblue border-b-[2px] pb-[3px]"
                    : ""
                } ${tabsShow == false ? "hidden" : ""}`}
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
        <div className="flex items-center justify-between gap-6  ">
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Refresh
                onRefresh={onRefresh}
                onRefreshHandle={onRefresh?.onRefreshHandle}
              />
            )}
            {exportProps ? (
              <div className="h-[30px] w-[180px] flex justify-center items-center">
                <Export exportProps={exportProps} />
              </div>
            ) : null}
          </div>
          {/* <ArrowNavigator /> */}
        </div>
      </div>
      <div className="bg-white grow mt-3 overflow-auto ">
        {tabs[activeTab]?.Gridcontent ? (
          // <div>holla</div>
          <MainGrid
            gridArr={tabs?.[activeTab]?.Gridcontent?.gridArr}
            setGridArr={tabs?.[activeTab]?.Gridcontent?.setGridArr}
            handleApi={tabs?.[activeTab]?.Gridcontent?.handleApi}
            defColmn={tabs?.[activeTab]?.Gridcontent?.defColmn}
            setDefColmn={tabs?.[activeTab]?.Gridcontent?.setDefColmn}
            filterTabs={tabs?.[activeTab]?.Gridcontent?.filterTabs}
            refresh={tabs?.[activeTab]?.Gridcontent?.refresh}
            setRefresh={tabs?.[activeTab]?.Gridcontent?.setRefresh}
            toolBar={tabs?.[activeTab]?.Gridcontent?.toolBar}
            refArray={refArray}
            scroll={scroll}
            collapse={collapse}
          />
        ) : (
          tabs?.[activeTab]?.content
        )}
      </div>
    </div>
  );
};

export default MainTabsGrid;

// Pass tabsShow = { false } to hide tabs
