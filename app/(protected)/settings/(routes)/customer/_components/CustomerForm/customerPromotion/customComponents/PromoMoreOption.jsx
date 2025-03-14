"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  setPromoDetails,
  setClearPromoPayload,
} from "../../../../_redux/customerSlice";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";

const PromoMoreOption = ({ index, rowData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  console.log("rowData", rowData);
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
    data: [
      {
        CUSPROMO_ID: rowData.PROMOCUS_ID,
        PROMO_ID: rowData.PROMO_ID,
        CUS_ID: rowData.CUS_ID,
        ACTIVE_FLAG: "N",
      },
    ],
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
      setIsOpen(false);

      //   dispatch(setClearPromoPayload());
    }
  }, [isSend]);
  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const onDelete = () => {
    setIsSend(true);
    // dispatch(onDeleteRow({ index: index }));
  };
  return (
    <div className="size-full relative">
      <div className={` px-[10px] bg-white flex justify-center items-center `}>
        <span
          // onClick={() => selectedRow(rowI, rowData)}
          onClick={togglePopover}
          className={` ${isOpen == false && "bg-transparent"}  ${
            isOpen ? "bg-[#cce5ff]" : "hover:bg-[#dcdfec]"
          } p-1 cursor-pointer  rounded-md`}
        >
          <TfiMoreAlt
            className={`text-[14px] ${isOpen == false && "text-transparent"} ${
              isOpen == true
                ? "text-customblack"
                : "group-hover:text-customblack"
            } `}
          />
        </span>
      </div>
      {isOpen && (
        <div className=" absolute -right-[260px] -top-[25px] mt-2 w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 ">
          <div className="p-4">
            <div
              onClick={onDelete}
              className="  items-center mr-2 text-customblack text-[14px] flex cursor-pointer  p-1 hover:bg-gray-100 rounded-md w-full "
            >
              <RiDeleteBin6Line className="mr-3 text-[16px]  " />
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoMoreOption;
