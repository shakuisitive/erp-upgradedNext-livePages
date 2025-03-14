"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setPartNameOverride } from "../../../../redux/pmSlice";

const CustMoreOption = ({ index, rowData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

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
    setIsOpen(false);
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
        VEN_ID: rowData?.VEN_ID,
        CODE: rowData?.CODE,
        ACTIVE_FLAG: "N",
        DELETED_FLAG: "Y",
        CUS_ID: rowData?.CUS_ID,
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
    }
  }, [isSend]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const onDelete = () => {
    setIsSend(true);
  };
  return (
    <div className="size-full relative">
      <div className={` px-[10px] bg-white flex justify-center items-center `}>
        <span
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

export default CustMoreOption;
