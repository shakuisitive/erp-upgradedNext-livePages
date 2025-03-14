"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "./../../../../../../../../customHook/useApiFetch";
import { SplitsetLot, SplitsetLotChange, splitLotCreateToggle } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import LotCreateDrawer from "../LotCreateDrawer";

const SplitLot = ({ data, rowData, index }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const splitLotCreate = useSelector((state) => state.PurchaseSlices.splitLotCreate);
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
  const splitPostPurcahseDetail = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );
  const arr2 = useSelector(
    (state) => state.PurchaseSlices.splitpurchaseOrderDetails
  );
  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  //console.log(lotList, 'lotlist drowpdowm')
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

  const getAvailableOptions = (list) => {
    return list.filter((item) => {
      return !lotSelectedArr.some(
        (selectedItem) => selectedItem.INVPARLOT_ID === item.INVPARLOT_ID
      );
    });
  };

  const availableLotList = getAvailableOptions(lotList);

  const handleSelectedOptionChange = (option) => {
    let expDate = "";
    let invId = "";

    availableLotList.forEach((data) => {
      if (data.LOT_NUMBER == option.LOT_NUMBER) {
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
    const isOptionExist = arr.some((item) => item.inv === option.INVPARLOT_ID);

    if (!isOptionExist) {
      // Add new selected option to arr
      setArr((prevArr) => [...prevArr, updatedData]);
    }
    // Update Redux state
    dispatch(SplitsetLot(updatedData));

    // Set new selectedOption
    //setSelectedOption(option);
  };

  const createNewLot = (option) => {
    dispatch(splitLotCreateToggle(true));
  }

  const onChangeLot = () => {
    const updatedData = {
      id: rowData?.id,
      indexR: index,
    };
    dispatch(SplitsetLotChange(updatedData))
  }

  const handleCloseDrawer = () => {
    dispatch(splitLotCreateToggle(false));
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
        onDefaultInput={data}
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

export default SplitLot;
