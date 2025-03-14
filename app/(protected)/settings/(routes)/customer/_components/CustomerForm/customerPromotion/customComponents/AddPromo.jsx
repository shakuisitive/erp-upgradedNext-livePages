import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import {
  setClearPromoPayload,
  setClearTaxPayload,
  setPromoDetails,
  setPromoPayload,
  setTaxDetails,
  setTaxPayload,
} from "../../../../_redux/customerSlice";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const AddPromo = ({ title, id }) => {
  let [error, sendRequest] = useApiFetch();
  const [isSend, setIsSend] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const promotionList = useSelector(
    (state) => state.customerSlice.promotionList
  );
  const promoPayload = useSelector((state) => state.customerSlice.promoPayload);
  const promoDetails = useSelector((state) => state.customerSlice.promoDetails);
  const formIndex = useSelector((state) => state.customerSlice.formIndex);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const getCustomer = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setPromoDetails(data.Result));
    }
    setIsSend(false);
  };
  const getPayload = {
    data: {
      CUS_ID: formIndex?.CUS_ID,
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetCustomerPromosList",
    type: "rpc",
    tid: "144",
  };
  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Administration.GetCustomerPromosList,
        "POST",
        getPayload,
        getCustomer,
        token
      );
    }
  };
  const getDetailPayload = {
    data: promoPayload,
    action: "Administration",
    method: "PostPromotions",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Administration.PostCustomerPromos,
        "POST",
        getDetailPayload,
        getDetail,
        token
      );
      dispatch(setClearPromoPayload());
    }
  }, [isSend]);
  const handleSelectedOptionChange = (option) => {
    const data = {
      PROMO_ID: option.PROMO_ID,
      //   TAX_PERCENTAGE_RATE: option.TAX_PERCENTAGE_RATE,
    };
    dispatch(setPromoPayload(data));
    setIsSend(true);
  };

  const handleOnFocus = () => {
    // dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    // dispatch(getFocused({ title: "Items", focus: false }));
  };

  const getAvailableOptions = (list) => {
    return promotionList.filter((item) => {
      return !promoDetails?.some(
        (selectedItem) => selectedItem.NAME === item.NAME
      );
    });
  };

  const availableTaxList = getAvailableOptions();
  return (
    <div className="m-2 ">
      <Dropdown
        options={availableTaxList}
        optionKey1="NAME"
        optionKey2="NAME"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder={`+ Add Promo`}
        inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
        customFocusKey1="ctrlKey"
        customFocusKey="p"
        onClearInputValue={true}
        onHandleFocus={handleOnFocus}
        onHandleBlur={handleOnBlur}
        forwardedRef={dropdownRef}
        isCreateOption={false}
      />
    </div>
  );
};

export default AddPromo;
