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


  const options = [
    {
      WAREHOUSE: "NC - Main Inventory",
      WAR_ID: 2190,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "FD - Fraser Direct",
      WAR_ID: 2191,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "FC - Fulfillment Center",
      WAR_ID: 2192,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "QT - Quarantine",
      WAR_ID: 3024,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "UN - Unassigned",
      WAR_ID: 3909,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "WR-Warehouse 1",
      WAR_ID: "NC3016",
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "MW - Manufacturer",
      WAR_ID: 3910,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "TW - Test Warehouse",
      WAR_ID: 262047,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "TW2 - Testing Warehouse 2",
      WAR_ID: 262055,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "TW5 - Test Warehouse 5",
      WAR_ID: 267734,
      EMAIL: "ali",
    },
    {
      WAREHOUSE: "TW6 - Test Warehouse 6",
      WAR_ID: 268665,
      EMAIL: "ali",
    },
  ];


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
        dropdownClassName="lgdesktop:w-[327px] laptop:w-[135px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey = "w"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput = "NC-Main Inventory"
        // showValue=""
        onHandleBlur={handleOnBlur}
      />
    </div>
  );
};

export default WarehouseDropdown;
