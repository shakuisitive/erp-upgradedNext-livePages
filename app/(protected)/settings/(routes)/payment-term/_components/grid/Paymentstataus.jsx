import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefreshing } from "../../_redux/paymentTermSlice";
const paymentstataus = ({ rowData, data }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);
  let [error, sendRequest] = useApiFetch();

  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isTooltipVisible]);
  const dispatch = useDispatch();
  const onSubmit = () => {
    setTooltipVisible(!isTooltipVisible);
  };
  const handlePostPartCat = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setRefreshing(true));
      setTooltipVisible(false);
    }
  };
  const handleActive = () => {
    const payloadA = {
      data: {
      
                  PAYTER_ID: rowData.PAYTER_ID,
                  CODE: rowData.CODE || "",
                  NAME: rowData.NAME,
                  DESCRIPTION: rowData.DESCRIPTION,
                  ACTIVE_FLAG: "Y",
                  DURATION_IN_DAYS: rowData.DURATION_IN_DAYS,
                  CUS_ID: "",
                },
                action: "Administration",
                method: "PostPaymentTerm",
                username: "admin",
                type: "rpc",
                tid: "144",
           

   
    };

    sendRequest(
      Administration.PostPaymentTerm,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
    );
  };
  const handleInActive = () => {
    const payloadIn = {
      data: {
        PAYTER_ID: rowData.PAYTER_ID,
        CODE: rowData.CODE || "",
        NAME: rowData.NAME,
        DESCRIPTION: rowData.DESCRIPTION,
        ACTIVE_FLAG: "N",
        DURATION_IN_DAYS: rowData.DURATION_IN_DAYS,
        CUS_ID: "",
      },
      action: "Administration",
      method: "PostPaymentTerm",
      username: "admin",
      type: "rpc",
      tid: "144",

    };
    sendRequest(
      Administration.PostPaymentTerm,
      "POST",
      payloadIn,
      handlePostPartCat,
      Token
    );
  };

  return (
    <div className="size-full relative">
      <button
        onClick={() => onSubmit()}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          rowData.ACTIVE_FLAG == "Y" ? "bg-green-500" : "bg-red-500"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {rowData.ACTIVE_FLAG == "Y" ? "Active" : "InActive"}
        </p>
      </button>
      {isTooltipVisible && (
        <div
          className="absolute z-[112] text-white  bg-white w-full p-1 text-sm shadow-lg rounded"
          ref={tooltipRef}
        >
          {rowData.ACTIVE_FLAG == "Y" && (
            <>
              <div
                onClick={() => handleActive()}
                className={` cursor-pointer bg-green-500`}
              >
                <p className="p-1 w-full m-1">Active</p>
              </div>
              <div
                onClick={() => handleInActive()}
                className={` cursor-pointer bg-red-500`}
              >
                <p className="p-1 w-full m-1">InActive</p>
              </div>
            </>
          )}
          {rowData.ACTIVE_FLAG == "N" && (
            <>
              <div
                onClick={() => handleActive()}
                className={` cursor-pointer bg-green-500`}
              >
                <p className="p-1 w-full m-1">Active</p>
              </div>
              <div
                onClick={() => handleInActive()}
                className={` cursor-pointer bg-red-500`}
              >
                <p className="p-1 w-full m-1">InActive</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default paymentstataus;
