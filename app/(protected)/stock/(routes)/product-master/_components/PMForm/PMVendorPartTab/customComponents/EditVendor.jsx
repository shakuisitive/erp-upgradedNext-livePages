import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setPartNameOverride } from "../../../../redux/pmSlice";

const EditVendor = ({ rowData, data }) => {
  let [error, sendRequest] = useApiFetch();
  const [isSend, setIsSend] = useState(false);
  const [venId, setVenId] = useState("");
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const venList = useSelector((state) => state.commonSlices.getVendor);
  //   const custPartPayload = useSelector(
  //     (state) => state.pmSlices.custPartPayload
  //   );
  const partNameOverride = useSelector(
    (state) => state.pmSlices.partNameOverride
  );
  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getCustomer = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setPartNameOverride(data.Result));
    }
    setIsSend(false);
  };
  const getPayload = {
    data: {
      PAR_ID: formIndex?.PAR_ID,
    },
    action: "Administration",
    method: "GetPartNameOverrides",
    type: "rpc",
    tid: "144",
  };
  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Administration.GetPartNameOverrides,
        "POST",
        getPayload,
        getCustomer,
        token
      );
    }
  };
  const getDetailPayload = {
    data: [
      {
        VEN_ID: venId,
        CODE: rowData?.CODE,
        ACTIVE_FLAG: "N",
        CUS_ID: "",
        PAR_ID: rowData?.PAR_ID,
        PARNAMEOVR_ID: rowData?.PARNAMEOVR_ID,
      },
    ],
    action: "Administration",
    method: "PostPartNameOverrides",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Administration.PostPartNameOverrides,
        "POST",
        getDetailPayload,
        getDetail,
        token
      );
      // dispatch(setClearTaxPayload());
    }
  }, [isSend]);

  const handleSelectedOptionChange = (option) => {
    setVenId(option?.VEN_ID);
    setIsSend(true);
  };

  const handleOnFocus = () => {
    // dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    // dispatch(getFocused({ title: "Items", focus: false }));
  };

  const getAvailableOptions = (list) => {
    return venList.filter((item) => {
      return !partNameOverride?.some(
        (selectedItem) => selectedItem.VENDOR_DESC === item.SUPPLIER
      );
    });
  };

  const availableTaxList = getAvailableOptions();
  return (
    <div className="m-2 ">
      <Dropdown
        options={availableTaxList}
        optionKey1="SUPPLIER"
        optionKey2="SUPPLIER"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder={`+ Add Vendor`}
        inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        onClearInputValue={true}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput={rowData?.VENDOR_DESC ? rowData?.VENDOR_DESC : ""}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
    </div>
  );
};

export default EditVendor;
