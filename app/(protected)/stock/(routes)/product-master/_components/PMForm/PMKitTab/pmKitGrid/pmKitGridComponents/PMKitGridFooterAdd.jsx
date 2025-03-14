import React, { useRef } from "react";
import Dropdown from "../../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setAddKitItem } from "../../../../../redux/pmSlice";

const PMKitGridFooterAdd = () => {
  const partList = useSelector((state) => state.pmSlices.partList);
  const selectedWarId = useSelector(
    (state) => state.pmSlices.selectedKitWAR_ID
  );
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const handleSelectedOptionChange = (option) => {
    console.log('options add footer', option)
    const data = {
      id: option,
    };

    dispatch(setAddKitItem(data));
  };

  const handleOnFocus = () => {};
  const handleOnBlur = () => {};
  return (
    <div>
      {selectedWarId ? (
        <Dropdown
          options={partList}
          optionKey1="PAR_CODE"
          optionKey2="PAR_ID"
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
          forwardedRef={dropdownRef}
          isCreateOption={false}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PMKitGridFooterAdd;
