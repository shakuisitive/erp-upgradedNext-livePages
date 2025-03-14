import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefreshing } from "../../_redux/chartSlice";
import {Inventory}  from "../../../../../../../components/misc/pureComponents/constants/apiConstant"


const ChartStatus = ({ rowData, data }) => {
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
        ACTIVE_FLAG: "Y",
  BUDGET_DESCRIPTION:rowData.BUDGET_DESCRIPTION,
  CODE: rowData.CODE,
  CURRENT_BUDGET: rowData.CURRENT_BUDGET,
  DESCRIPTION: rowData.DESCRIPTION,
  GLACCGRO_ID:rowData.GLACCGRO_ID,
  GLACC_CAT_ID: rowData.GLACC_CAT_ID,
  GLACC_ID:rowData.GLACC_ID,
  PROPOSED_BUDGET:rowData.PROPOSED_BUDGET,
  USE_ID: rowData.USE_ID
      },
    action: "InventoryWeb",
    method: "PostShipingCharges",
    username: "admin",
    type: "rpc",
    tid: "144",
    };

    sendRequest(
      Inventory.PostGlAccounts,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
    );
  };
  const handleInActive = () => {
    const payloadIn = {
      data: {
        ACTIVE_FLAG: "N",
        BUDGET_DESCRIPTION:rowData.BUDGET_DESCRIPTION,
        CODE: rowData.CODE,
        CURRENT_BUDGET: rowData.CURRENT_BUDGET,
        DESCRIPTION: rowData.DESCRIPTION,
        GLACCGRO_ID:rowData.GLACCGRO_ID,
        GLACC_CAT_ID: rowData.GLACC_CAT_ID,
        GLACC_ID:rowData.GLACC_ID,
        PROPOSED_BUDGET:rowData.PROPOSED_BUDGET,
        USE_ID: rowData.USE_ID
      },
    action: "InventoryWeb",
    method: "PostShipingCharges",
    username: "admin",
    type: "rpc",
    tid: "144",
    };
    sendRequest(
      Inventory.PostGlAccounts,
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

export default ChartStatus;
