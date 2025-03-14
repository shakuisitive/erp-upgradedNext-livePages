import React, { useState } from "react";
import DropdownMenu from "../pureComponents/buttons/DropdownMenu";
import Search from "../pureComponents/search/Search";
import GridSort from "../../Ui/gridSort/GridSort";
import Popup from "../wraper/Popup";
import GridFiltercomp from "../../Ui/gridFilter/GridFilter";
import GridTabHide from "../../Ui/gridTabHide/GridTabHide";
import GridNavigator from "../../Ui/gridNavigator/GridNavigator";
const FilterTabs = ({
  tabs,
  filterTool = true,
  searchShow = true,
  filterShow = true,
  hideShow = true,
  sortShow = true,
  navigatorShow = true,
}) => {
  const [openPopup, setOpenPopup] = useState();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full mx-auto mt-2 mb-2  text-[14px] text-customblack font-normal">
      <div className="flex items-center ">
        <div className={`${tabs?.actionBtn.option ? "block" : "hidden"}`}>
          <DropdownMenu
            options={tabs?.actionBtn?.option}
            label={tabs?.actionBtn?.label}
            Icon={tabs?.actionBtn?.icon}
            handleClick={tabs?.actionBtn?.onClick}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        {/* 2nd  */}
        <div
          className={`flex text-[14px] gap-[30px] ${
            filterTool == false && "hidden"
          } `}
        >
          <div className=" flex gap-2">
            <div className={`${searchShow == false && "hidden"}`}>
              <Search
                handleSearch={tabs?.search?.handleSearch}
                resetSearch={tabs?.search?.resetSearch}
                setResetSearch={tabs?.search?.setResetSearch}
              />
            </div>

            <div className={`${sortShow == false && "hidden"}`}>
              <GridSort />
            </div>

            <div className={`  ${filterShow == false && "hidden"}`}>
              <Popup
                Icon={tabs?.filter?.popup?.icon}
                lable={tabs?.filter?.popup?.lable}
                wid={tabs?.filter?.popup?.wid}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                id={"filter"}
              >
                <GridFiltercomp
                  setIsOpen={setOpenPopup}
                  handleFilter={tabs?.filter?.handleFilter}
                  FilterComp={tabs?.filter?.FilterComp}
                />
              </Popup>
            </div>

            <div className={`${hideShow == false && "hidden"}`}>
              <Popup
                Icon={tabs?.hide?.popup?.icon}
                lable={tabs?.hide?.popup?.lable}
                wid={tabs?.hide?.popup?.wid}
                id={"hide"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              >
                <GridTabHide
                  Value={tabs?.hide?.Value}
                  handleHidden={tabs?.hide?.handleHidden}
                  defaultVal={tabs?.hide?.defaultVal}
                />
              </Popup>
            </div>
            <div className={`${navigatorShow == false && "hidden"}`}>
              <GridNavigator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;

//filterTool to hide filterTools      filterTool=false
