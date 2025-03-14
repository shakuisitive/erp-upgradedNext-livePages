"use client";

import React, { useState, useEffect, useRef } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { updatePurchaseLot, SplitsetLot, lotCreateToggal, SplitsetLotChange, onFormSplitLotCraete } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import LotCreateDrawer from "../../PurchaseSubGrid/LotCreateDrawer";

const SiplitLot = ({ data, rowData, index }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const lotSelectedArr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );

  const arr2 = useSelector(
    (state) => state.PurchaseSlices.splitpurchaseOrderDetails
  );

  const splitLotCreate = useSelector((state) => state.PurchaseSlices.formOnSplitLotCreate);

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
      if (data.LOT_NUMBER === option.LOT_NUMBER) {
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

  const setNewLot = (lotData) => {
    let expDate = "";
    let invId = "";

  
    lotData.data.forEach((data) => {
      if (data.LOT_NUMBER === lotData.newLot) {
        expDate = data.EXPIRY_DATE;
        invId = data.INVPARLOT_ID;
      }
    });

  
    const updatedData = {
      id: lotData.newLot,
      inv: invId,
      indexR: index,
      exp: expDate,
    };

  
    // Check if option already exists in arr
    const isOptionExist = arr.some((item) => item.inv === invId);
  
    if (!isOptionExist) {
      // Add new selected option to arr
      setArr((prevArr) => [...prevArr, updatedData]);
    }
  
    // Update Redux state
    dispatch(SplitsetLot(updatedData));
  
    // Set new selectedOption
    //setSelectedOption(option);
  };
  const getAvailableOptions = (list) => {
    return list.filter((item) => {
      return !lotSelectedArr.some((selectedItem) => selectedItem.LOT_NUMBER === item.LOT_NUMBER);
    });
  };
  
  const availableLotList = getAvailableOptions(lotList);
  const createNewLot = (option) => {
    dispatch(onFormSplitLotCraete(true));
  }

  const onChangeLot = () => {
    const updatedData = {
      id: rowData?.id,
      indexR: index,
    };
    dispatch(SplitsetLotChange(updatedData))
  }

  const handleCloseDrawer = () => {
    dispatch(onFormSplitLotCraete(false));
  };

  const tabs = [
    {
      label: "Create Lot",
      content: <LotCreateDrawer rowData={arr2[0]} newLotNumber={setNewLot} />,
    },
  ];

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
        onDefaultInput={rowData.LOT_NUMBER}
        forwardedRef={dropdownRef}
        onNewOption={createNewLot}
        onClearValue={onChangeLot}
        isCreateOption={true}
      />
      <div>
        <RightDrawer
          isOpen={splitLotCreate}
          onClose={handleCloseDrawer}
          heading="Purchase Order"
          tabs={tabs}
        />
      </div>
    </div>
  );
};

export default SiplitLot;
