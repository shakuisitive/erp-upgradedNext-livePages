import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateKitItemPurGroID } from "../../../../../redux/pmSlice";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";

const PMKitPurchaseG = ({ rowData, data }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [colorCode, setColorCode] = useState("");
  const getPurchaseG = useSelector((state) => state.commonSlices.getPurchaseG);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setSelectedOption(data);
  }, [data]);
  const handleSelectedOptionChange = (option) => {
    setColorCode(option.COLOR_CODE);
    const data = {
      id: rowData.PAR_ID,
      purGroId: option.PURGRO_ID,
      color: option.COLOR_CODE,
      Code: option.CODE,
    };
    dispatch(updateKitItemPurGroID(data));
  };
  const handleOnFocus = () => {};
  const handleOnBlur = () => {};
  // style={{
  //         borderBottom: `4px solid ${colorCode}`,
  //       }}
  return (
    <>
    {rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
    <div
      className="border-l-[6px] w-full solid top-[5px] "
      style={{ borderColor: colorCode }}
    >
        <Dropdown
          options={getPurchaseG}
          optionKey1="CODE"
          optionKey2="PURGRO_ID"
          onSelectedOptionChanged={handleSelectedOptionChange}
          placeholder={`+ Add Item`}
          inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
          customFocusKey1="ctrlKey"
          customFocusKey="p"
          isDisabled={false}
          onClearInputValue={true}
          onHandleFocus={handleOnFocus}
          onHandleBlur={handleOnBlur}
          onDefaultInput={data ? data : ""}
          forwardedRef={dropdownRef}
          isCreateOption={false}
        />
       
    </div>
      ): (
        <div className="flex items-center justify-center w-full">
          <Tooltip content="non-stock item dont need purchase group">
            <FaCircleInfo className=" fill-blue-700" />
          </Tooltip>
        </div>
      )}
      </>
  );
};

export default PMKitPurchaseG;
