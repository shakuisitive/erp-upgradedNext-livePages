import React, { useState } from "react";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch } from "react-redux";
import { setUpdate, setRefreshing } from "../../_redux/GLGroupSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Inventory } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const PayableAndReceivable = ({ data, rowData }) => {
  const prOptions = ["PAYABLE", "RECEIVABLE"]; 
  const [groupType, setGroupType] = useState(rowData?.GROUP_TYPE === "" ? "" : rowData?.GROUP_TYPE);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const handleSP = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
      dispatch(setUpdate(true));
    }
  };

  const handleSelectedOptionChange = (option) => {
    setGroupType(option.label);
    sendRequest(
        Inventory.PostGlAccountGroup,
        "POST",
        preparePayload(option.label),
        handleSP,
        token
      );
  };

  const preparePayload = (groupType) => {
    return {
        data: {
          GLACCGRO_ID: rowData?.GLACCGRO_ID,
          GROUP_TYPE: groupType || "",
          DESCRIPTION: rowData?.DESCRIPTION,
          CODE: rowData?.CODE,
          ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
          USE_ID: rowData?.USE_ID,
        },
        action: "InventoryWeb",
        method: "PostGlAccountGroup",
        username: "SALES",
        type: "rpc",
        tid: "144",
      }
  }

  const handleCreateNewOption = (newOption) => {
    console.log("checking new option on click parent", newOption);
  };

  const handleOnFocus = () => {};
  const handleOnBlur = () => {};

  return (
    <div className="flex items-center mx-6">
      <Dropdown
        options={prOptions.map(option => ({ value: option, label: option }))}
        optionKey1="label"
        optionKey2="value"
        showValue={groupType || ""}
        onSelectedOptionChanged={handleSelectedOptionChange}
        onNewOption={handleCreateNewOption}
        placeholder="+ Please Select"
        inputClassName="w-[300px] focus:outline-customLightBlue hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal text-center"
        dropdownClassName="w-[200px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400"
        customFocusKey="m"
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput={data}
      />
    </div>
  );
};

export default PayableAndReceivable;