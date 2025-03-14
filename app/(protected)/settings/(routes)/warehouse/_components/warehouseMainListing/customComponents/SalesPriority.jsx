import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setPriority, setUpdateSP } from "../../../_redux/warehouseSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const SalesPriority = ({ data, index, rowData }) => {
  const [prOptions, setPrOptions] = useState([]);
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const [updateSalePrior, setUpdateSalePrior] = useState(false);
  const warehouseMainList = useSelector(
    (state) => state.warehouseSlice.warehouseMainList
  );
  const payloadSP = {
    data: warehouseMainList,
    action: "InventoryWeb",
    method: "PostInvWarehousesPriority",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleSP = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setUpdateSP(true));
    }
  };
  useEffect(() => {
    if (updateSalePrior) {
      sendRequest(
        Administration.PostInvWarehousesPriority,
        "POST",
        payloadSP,
        handleSP,
        token
      );
    }
  }, [updateSalePrior]);
  useEffect(() => {
    let totalOptions = warehouseMainList.length;
    let takenPrs = warehouseMainList.map((w) => w?.SALES_PRIORITY);
    let optionsArr = [];
    for (let i = 1; i <= totalOptions; i++) {
      if (!takenPrs.includes(i)) {
        optionsArr.push({
          value: i,
          label: i,
        });
      }
    }
    setPrOptions(optionsArr);
  }, [warehouseMainList]);

  const handleCreateNewOption = (newOption) => {
    console.log("checking new option on click parent", newOption);
  };
  const dispatch = useDispatch();
  const handleSelectedOptionChange = (option) => {
    const data = {
      id: rowData?.WAR_ID,
      ind: index,
      value: option?.value,
    };
    dispatch(setPriority(data));
    setUpdateSalePrior(true);
  };

  const handleOnFocus = () => {};
  const handleOnBlur = () => {};
  return (
    <div className="flex  items-center mx-6">
      <Dropdown
        options={prOptions}
        optionKey1="label"
        optionKey2="value"
        showValue=""
        onSelectedOptionChanged={handleSelectedOptionChange}
        onNewOption={handleCreateNewOption}
        placeholder="+ Please Select"
        inputClassName="w-[300px] focus:outline-customLightBlue hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal text-center"
        dropdownClassName="w-[200px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        customFocusKey="m"
        // isDisabled={data ? false : true}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput={data}
      />
    </div>
  );
};

export default SalesPriority;
