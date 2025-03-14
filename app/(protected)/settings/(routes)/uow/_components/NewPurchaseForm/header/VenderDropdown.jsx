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
} from "../../../redux/Purchase.slice";
import moment from "moment";
const VenderDropdown = () => {
  const dispatch = useDispatch();
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderList
  );
  const UpdateNotes = useSelector(
    (state) => state.PurchaseSlices.newPurchaseForm
  );
  const UpdateRef = useSelector(
    (state) => state.PurchaseSlices.NewpostPurchaseOrder
  );

  // // console.log("check not redux madiha new post purchase order form madiha", UpdateRef);

  const options = [
    {
      SUPPLIER: "CL - Nutranex",
      VEN_ID: "NC3016",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Magnesium 2030",
      VEN_ID: "NC4017",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Magnesium 2230",
      VEN_ID: "NC5018",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Magnesium 2430",
      VEN_ID: "NC6019",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Nutranex",
      VEN_ID: "NC7016",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Pakistani-Supplier",
      VEN_ID: "NC8016",
      EMAIL: "ali",
    },
    {
      SUPPLIER: "Ncat",
      VEN_ID: "NC8016",
      EMAIL: "ali",
    },
  ];

  const payload = {
    data: {
      ETA_DATE: "",
      FNZ_USE_ID: "2694",
      PO_DATE: "",
      NOTES: UpdateNotes,
      REFERENCE_NUMBER: UpdateRef,
      PREPARED_DATE: "",
      PURORD_ID: "",
      TERMS_CONDITION: "",
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: "",
      VOID_FLAG: "",
      VOID_NOTES: "3117",
      WAR_ID: "",
    },
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const issuePayload = [
    {
      APPROVED_FLAG: "Y",
      // COMPLETE_FLAG :  "N" ,
      ETA_DATE: null,
      FNZ_FLAG: "N",
      FNZ_USE_ID: "2694",
      NOTES: null,
      PO_DATE: "",
      PREPARED_DATE: "",
      PURORD_ID: "",
      REFERENCE_NUMBER: null,
      // TERMS_CONDITION: null ,
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: "",
      VOID_FLAG: "",
      VOID_NOTES: null,
      WAR_ID: "",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [newOption, setNewOption] = useState(null);

  const handleCreateNewOption = (newOption) => {
    setNewOption(newOption)
    // console.log("checking new option on click parent", newOption);
  }

  const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);
    // // console.log("checking selected value on click parent", option);

    if (option.VEN_ID != undefined) {
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss±HH:mm");
      const currentDate = moment().format("YYYY-MM-DD");

    //   payload.data.VEN_ID = option.VEN_ID;
    //   payload.data.PO_DATE = currentDateTime;
    //   payload.data.PREPARED_DATE = currentDate;

    //   issuePayload[0].VEN_ID = option.VEN_ID;
    //   issuePayload[0].PO_DATE = currentDateTime;
    //   issuePayload[0].PREPARED_DATE = currentDate;

      const vendorData = {
        ven_id : option.VEN_ID,
        po_date: currentDateTime,
        prepared_date: currentDate,
      };
      // // console.log('slected select' , payload);
      dispatch(newPurchase());
      dispatch(setSelectedVeNid(vendorData));
      // setIsModalOpen(true);
      // sendRequest(apiUrl, 'POST', payload, getAllTask, token)
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
    <div>
      <Dropdown
        options={checkUpdatelist}
        optionKey1="SUPPLIER"
        optionKey2="VEN_ID"
        // showValue="VEN_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        onNewOption={handleCreateNewOption}
        placeholder="+ Add Vendor*"
        inputClassName=" w-[250px] focus:outline-none w-full hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="bg-white lgdesktop:w-[380px] desktop:w-[200px] laptop:w-[200px] border  border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey = "z"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        
        onHandleBlur={handleOnBlur}
      />
    </div>
  );
};

export default VenderDropdown;
