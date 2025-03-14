"use client";

import React, { useState, useEffect, useRef } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { updatePurchaseLot, SplitsetLot } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

const SiplitLot = ({ data, rowData, index }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const lotSelectedArr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );

  const handleOnFocus = () => {};
  const handleOnBlur = () => {};

  const handleRefocusDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.focus();
    }
  };

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  console.log(lotList, 'lotlist drowpdowm')
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const payload = {
    data: {
      PURORD_ID: rowData.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  // const token = localStorage.getItem("tokenSession");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const handleSelectedOptionChange = (option) => {
    let expDate = "";
    let invId = "";
  
    lotList.forEach((data) => {
      if (data.LOT_NUMBER === option) {
        expDate = data.EXPIRY_DATE;
        invId = data.INVPARLOT_ID;
      }
    });
  
    const updatedData = {
      id: option?.LOT_NUMBER,
      inv: invId,
      indexR: index,
      exp: expDate,
    };
  
    // Check if option already exists in arr
    const isOptionExist = arr.some((item) => item.id === option);
  
    if (!isOptionExist) {
      // Add new selected option to arr
      setArr((prevArr) => [...prevArr, updatedData]);
    }
  
    // Update Redux state
    dispatch(SplitsetLot(updatedData));
  
    // Set new selectedOption
    setSelectedOption(option);
  };
  const getAvailableOptions = (list) => {
    return list.filter((item) => {
      return !lotSelectedArr.some((selectedItem) => selectedItem.LOT_NUMBER === item.LOT_NUMBER);
    });
  };
  
  const availableLotList = getAvailableOptions(lotList);

  return (
    <div className="w-full h-full flex justify-center items-center">

     
      <Dropdown
        options={availableLotList}
        optionKey1="LOT_NUMBER"
        optionKey2="PAR_ID"
        showValue=""
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Select Lot"
        inputClassName="w-[200px] focus:outline-customLightBlue hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[200px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        customFocusKey="m"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput=""
        forwardedRef={dropdownRef}
      />
    </div>
  );
};

export default SiplitLot;
