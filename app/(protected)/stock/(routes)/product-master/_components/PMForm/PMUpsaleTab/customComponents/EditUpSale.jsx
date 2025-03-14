import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

import {
  Administration,
  ItemMaster,
} from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setGetUpsale, setPartNameOverride } from "../../../../redux/pmSlice";

const EditUpSale = ({ rowData, data }) => {
  let [error, sendRequest] = useApiFetch();
  const [upSale, setUpSale] = useState("");

  const [isSend, setIsSend] = useState(false);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const partList = useSelector((state) => state.pmSlices.partList);
  const getUpsale = useSelector((state) => state.pmSlices.getUpsale);
  //   const custPartPayload = useSelector(
  //     (state) => state.pmSlices.custPartPayload
  //   );

  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getCustomer = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setGetUpsale(data?.Result));
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
        ItemMaster.GetRelatedProductList,
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
        REL_PAR_ID: rowData?.REL_PAR_ID,
        CHILD_PAR_ID: upSale,
        ACTIVE_FLAG: "Y",
        PARENT_PAR_ID: rowData?.PARENT_PAR_ID,
      },
    ],
    action: "Administration",
    method: "PostRelatedProduct",
    username: "SALES",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        ItemMaster.PostRelatedProduct,
        "POST",
        getDetailPayload,
        getDetail,
        token
      );
    }
  }, [isSend]);

  const handleSelectedOptionChange = (option) => {
    setUpSale(option?.PAR_ID);
    setIsSend(true);
  };

  const handleOnFocus = () => {
    // dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    // dispatch(getFocused({ title: "Items", focus: false }));
  };

  const getAvailableOptions = (list) => {
    return partList.filter((item) => {
      return !getUpsale?.some(
        (selectedItem) => selectedItem.CODE === item.PAR_CODE
      );
    });
  };

  const availableTaxList = getAvailableOptions();
  return (
    <div className="m-2 ">
      <Dropdown
        options={availableTaxList}
        optionKey1="PAR_CODE"
        optionKey2="PAR_CODE"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder={`+ Add Upsale`}
        inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        onClearInputValue={true}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        onDefaultInput={data ? data : ""}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
    </div>
  );
};

export default EditUpSale;
