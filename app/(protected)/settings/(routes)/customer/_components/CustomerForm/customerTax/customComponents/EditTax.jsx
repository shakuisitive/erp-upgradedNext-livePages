import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { setTaxDetails, setTaxPayload } from "../../../../_redux/customerSlice";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const EditTax = ({ index, rowData, data }) => {
  let [error, sendRequest] = useApiFetch();
  const [isSend, setIsSend] = useState(false);
  const [editTax, setEditTax] = useState({});
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const taxList = useSelector((state) => state.customerSlice.taxes);
  const taxDetails = useSelector((state) => state.customerSlice.taxDetails);
  const formIndex = useSelector((state) => state.customerSlice.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getCustomer = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setTaxDetails(data.Result));
    }
    setIsSend(false);
  };
  const getPayload = {
    data: {
      CUS_ID: formIndex?.CUS_ID,
    },
    action: "Administration",
    method: "GetTaxesList",
    type: "rpc",
    tid: "144",
  };
  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Administration.GetCustomerARTaxes,
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
        CUSARTAX_ID: rowData?.CUSARTAX_ID,
        CUS_ID: formIndex?.CUS_ID,
        TAX_ID: editTax.TAX_ID,
        REGISTRATION_NUMBER: null,
        TAX_PERCENTAGE_RATE: editTax.TAX_PERCENTAGE_RATE,
        TAX_EXEMPT_FLAG: "N",
        ACTIVE_FLAG: "Y",
        EXEMPTION_ID: "",
      },
    ],
    action: "Administration",
    method: "PostCustomerARTaxes",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Administration.PostCustomerARTaxes,
        "POST",
        getDetailPayload,
        getDetail,
        token
      );
    }
  }, [isSend]);
  const handleSelectedOptionChange = (option) => {
    const data = {
      TAX_ID: option.TAX_ID,
      TAX_PERCENTAGE_RATE: option.TAX_PERCENTAGE_RATE,
    };
    setEditTax(data);
    setIsSend(true);
  };
  //   console.log("edit Tax", editTax);
  const handleOnFocus = () => {};
  const handleOnBlur = () => {};

  const getAvailableOptions = (list) => {
    return taxList.filter((item) => {
      return !taxDetails?.some(
        (selectedItem) => selectedItem.CODE === item.TAX_CODE
      );
    });
  };

  const availableTaxList = getAvailableOptions();

  return (
    <div className="m-2 ">
      <Dropdown
        options={availableTaxList}
        optionKey1="TAX_CODE"
        optionKey2="TAX_CODE"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder={`+ Add Tax`}
        inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        onClearInputValue={true}
        onDefaultInput={data ? data : ""}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
    </div>
  );
};

export default EditTax;
