import React, { useEffect, useRef, useState } from "react";

import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Administration,Inventory,ItemMaster } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing } from "../../_redux/ShipingConfigSlice";

const ShippConStatus = ({ rowData, data }) => {
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
        setTooltipVisible(false);1
      }
    };
    const handleActive = () => {
      const payloadA = {
        data: {
            SHIP_CARRIER_DET_ID:rowData?.SHIP_CARRIER_DET_ID,
            SHIP_CARRIER_ID:rowData?.SHIP_CARRIER_ID,
              CODE: rowData?.CODE,
              DESCRIPTION:rowData?.DESCRIPTION,
              CHARGE_TYPE:rowData?.CHARGE_TYPE,
              CHARGE_VALUE:rowData?.CHARGE_VALUE,
              SHIPPING_TIME: rowData?.SHIPPING_TIME,
              SHIPPING_DAYS:rowData?.SHIPPING_DAYS,
              NOTES:rowData?.NOTES,
              ACTIVE_FLAG: "Y"
               
            },
            action: "Administration",
            method: "PostAdmShipCarrierDetail",
            username:"SALES",
            type: "rpc",
            tid: "144",
      };
  
      sendRequest(
        Administration.PostAdmShipCarrierDetail,
        "POST",
        payloadA,
        handlePostPartCat,
        Token
      );
    };
    const handleInActive = () => {
      const payloadIn = {
        data: {
            SHIP_CARRIER_DET_ID:rowData?.SHIP_CARRIER_DET_ID,
            SHIP_CARRIER_ID:rowData?.SHIP_CARRIER_ID,
              CODE: rowData?.CODE,
              DESCRIPTION:rowData?.DESCRIPTION,
              CHARGE_TYPE:rowData?.CHARGE_TYPE,
              CHARGE_VALUE:rowData?.CHARGE_VALUE,
              SHIPPING_TIME: rowData?.SHIPPING_TIME,
              SHIPPING_DAYS:rowData?.SHIPPING_DAYS,
              NOTES:rowData?.NOTES,
              ACTIVE_FLAG: "N"
               
            },
            action: "Administration",
            method: "PostAdmShipCarrierDetail",
            username:"SALES",
            type: "rpc",
            tid: "144",
      };
      sendRequest(
        Administration.PostAdmShipCarrierDetail,
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
  
  export default ShippConStatus;
  