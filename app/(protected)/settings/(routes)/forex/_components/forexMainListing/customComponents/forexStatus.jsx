import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { setRefreshing } from "../../../_redux/htCodeSlice";
import { setRefreshing } from "../../../_redux/forexSlice";


const ForexStatus = ({ rowData, data }) => {
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
        CONVERSION_VALUE: rowData?.CONVERSION_VALUE,
        CURRENCY:  rowData?.CURRENCY,
        CURRENCY_CODE: rowData?.CURRENCY_CODE,
        DEFAULT_CHANNEL:  rowData?.DEFAULT_CHANNEL,
        DEFAULT_CURRENC:  rowData?.DEFAULT_CURRENC,
        DESCRIPTION:  rowData.DESCRIPTION,
        EFFECTIVE_DATE:  rowData?.EFFECTIVE_DATE,
        FOREXDET_ID: rowData?.FOREXDET_ID,
        FOREX_CODE:  rowData?.FOREX_CODE,
        FOREX_NAME:  rowData?.FOREX_NAME,
        USE_ID: rowData?.USE_ID,
        ACTIVE_FLAG: "Y",
      },
    action: "AdministrationWeb",
    method: "PostAdmForexDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
    };

    sendRequest(
      Administration.PostAdmForexDetails,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
    );
  };
  const handleInActive = () => {
    const payloadIn = {
      data: {
        CONVERSION_VALUE: rowData?.CONVERSION_VALUE,
        CURRENCY:  rowData?.CURRENCY,
        CURRENCY_CODE: rowData?.CURRENCY_CODE,
        DEFAULT_CHANNEL:  rowData?.DEFAULT_CHANNEL,
        DEFAULT_CURRENC:  rowData?.DEFAULT_CURRENC,
        DESCRIPTION:  rowData.DESCRIPTION,
        EFFECTIVE_DATE:  rowData?.EFFECTIVE_DATE,
        FOREXDET_ID: rowData?.FOREXDET_ID,
        FOREX_CODE:  rowData?.FOREX_CODE,
        FOREX_NAME:  rowData?.FOREX_NAME,
        USE_ID: rowData?.USE_ID,
        ACTIVE_FLAG: "N",
      },
    action: "AdministrationWeb",
    method: "PostAdmForexDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
    };
    sendRequest(
      Administration.PostAdmForexDetails,
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
  // console.log("customer status", rowData);

  // const getBackgroundColor = (status) => {
  //   switch (status) {
  //     case "Y":
  //       return "bg-[#4ade80]";
  //     case "N":
  //       return "bg-[#FF0000]";
  //     default:
  //       return "";
  //   }
  // };

  // return (
  //   <div className="w-full">
  //     <div
  //       className={`${getBackgroundColor(
  //         rowData?.ACTIVE_FLAG
  //       )} h-full w-full text-white flex items-center justify-center text-center`}
  //     >
  //       <p className="py-1 text-[14px] text-white">
  //         {rowData?.ACTIVE_FLAG == "Y" ? "Active" : "Inactive"}
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default ForexStatus;
