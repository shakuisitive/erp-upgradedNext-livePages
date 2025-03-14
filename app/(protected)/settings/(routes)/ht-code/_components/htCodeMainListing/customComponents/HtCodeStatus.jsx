import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { setRefreshing } from "../../../_redux/htCodeSlice";


const HtCodeStatus = ({ rowData, data }) => {
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
        USE_ID: rowData.USE_ID,
        CUS_ID:  rowData.CUS_ID || null,
        HT_CODE_ID: rowData.HT_CODE_ID,
        CODE:  rowData.CODE,
        NAME:  rowData.NAME,
        DESCRIPTION:  rowData.DESCRIPTION,
        DUTY_LC_CODE:  rowData.DUTY_LC_CODE,
        FOREX: rowData .FOREX,
        TRANSPORATION_FEE:  rowData.TRANSPORATION_FEE,
        OVERHEADS:  rowData .OVERHEADS,
        NOTES: rowData.NOTES,
        ACTIVE_FLAG: "Y",
      },
    action: "Administration",
    method: "PostHarmonizedTarrifCode",
    username: "admin",
    type: "rpc",
    tid: "144",
    };

    sendRequest(
      Administration.PostHarmonizedTarrifCode,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
    );
  };
  const handleInActive = () => {
    const payloadIn = {
      data: {
        USE_ID: rowData.USE_ID,
        CUS_ID:  rowData.CUS_ID || null,
        HT_CODE_ID: rowData.HT_CODE_ID,
        CODE:  rowData.CODE,
        NAME:  rowData.NAME,
        DESCRIPTION:  rowData.DESCRIPTION,
        DUTY_LC_CODE:  rowData.DUTY_LC_CODE,
        FOREX: rowData .FOREX,
        TRANSPORATION_FEE:  rowData.TRANSPORATION_FEE,
        OVERHEADS:  rowData .OVERHEADS,
        NOTES: rowData.NOTES,
        ACTIVE_FLAG: "N",
      },
    action: "Administration",
    method: "PostHarmonizedTarrifCode",
    username: "admin",
    type: "rpc",
    tid: "144",
    };
    sendRequest(
      Administration.PostHarmonizedTarrifCode,
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

export default HtCodeStatus;
