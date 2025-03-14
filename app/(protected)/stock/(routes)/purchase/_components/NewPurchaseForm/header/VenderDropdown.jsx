"use client";
import React, { useState } from "react";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  setRefresh,
  newPurchaseOrder,
  newPurchase,
  setSelectedVeNid,
  openNModall,
  setVenid,
} from "../../../redux/Purchase.slice";
import moment from "moment";
const VenderDropdown = () => {
  const dispatch = useDispatch();
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderList
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [newOption, setNewOption] = useState(null);

  const handleCreateNewOption = (newOption) => {
    setNewOption(newOption);
    // console.log("checking new option on click parent", newOption);
  };

  const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);
    console.log("checking selected value on click parent", option);

    if (option.VEN_ID != undefined) {
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss±HH:mm");
      const currentDate = moment().format("YYYY-MM-DD");

      const vendorData = {
        ven_id: option.VEN_ID,
        po_date: currentDateTime,
        prepared_date: currentDate,
      };
      // // console.log('slected select' , payload);
      dispatch(newPurchase());
      dispatch(setVenid(vendorData));
      dispatch(setSelectedVeNid(vendorData));
      dispatch(setVenid(vendorData));
    }
  };

  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };
  // lgdesktop:w-[380px] desktop:w-[200px] laptop:w-[200px]
  return (
    <div className="w-full">
      <Dropdown
        options={checkUpdatelist}
        optionKey1="SUPPLIER"
        optionKey2="VEN_ID"
        // showValue="VEN_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        onNewOption={handleCreateNewOption}
        placeholder="+ Add Vendor*"
        inputClassName="focus:outline-none w-full hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="bg-white  border  border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey="v"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
    </div>
  );
};

export default VenderDropdown;
