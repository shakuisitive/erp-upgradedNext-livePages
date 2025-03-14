"use client";
import React, { useState } from "react";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { newPurchase, setSelectedWarid } from "../../../redux/Purchase.slice";

const WarehouseDropdown = () => {
  const dispatch = useDispatch();
     const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.WareHouse
  );
  const WarehouseList = checkUpdatelist.Result
  // console.log("check warehouse list", WarehouseList);

const [selectedOption, setSelectedOption] = useState(null);


 


  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };
   const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);
    // const War_id = 
    dispatch(newPurchase())
    dispatch(setSelectedWarid(option))


        // // console.log("checking selected War_id",option)
  };
// lgdesktop:w-[327px] laptop:w-[135px]
  return (
    <div>
      <Dropdown
        options={WarehouseList}
        optionKey1="WAREHOUSE"
        optionKey2="WAR_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Add Warehouse"
        inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName=" bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey = "w"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput = "NC-Main Inventory"
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
    </div>
  );
};

export default WarehouseDropdown;
