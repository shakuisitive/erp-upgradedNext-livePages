import React, { useEffect, useRef, useState } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing } from "../../../_redux/DiscountGroupSlice";

const DiscountGStatus = ({ rowData, data }) => {
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
      setTooltipVisible(false);
      dispatch(setRefreshing(true));
    }
  };
  const handleActive = () => {
    const payloadA = {
      data: {
        DISGRP_ID: rowData?.DISGRP_ID,
        CODE: rowData?.CODE,
        NAME: rowData?.NAME,
        DESCRIPTION: rowData?.DESCRIPTION,
        ACTIVE_FLAG: "Y",
        DISCOUNT_VALUE: rowData?.DISCOUNT_VALUE,
        DISCOUNT_PERCENTAGE: rowData?.DISCOUNT_PERCENTAGE,
      },
      action: "Administration",
      method: "PostDiscountGroup",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      Administration.PostDiscountGroup,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
    );
  };
 
  const handleInActive = () => {
    const payloadIn = {
      data: {
        DISGRP_ID: rowData?.DISGRP_ID,
        CODE: rowData?.CODE,
        NAME: rowData?.NAME,
        DESCRIPTION: rowData?.DESCRIPTION,
        ACTIVE_FLAG: "N",
        DISCOUNT_VALUE: rowData?.DISCOUNT_VALUE,
        DISCOUNT_PERCENTAGE: rowData?.DISCOUNT_PERCENTAGE,
      },
      action: "Administration",
      method: "PostDiscountGroup",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      Administration.PostDiscountGroup,
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

export default DiscountGStatus;
