import React, { useEffect, useRef, useState } from "react";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Inventory } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import { setRefreshing } from "../../_redux/GLGroupSlice";

const GLGroupStatus = ({ rowData, data }) => {
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
      dispatch(setRefreshing());
    }
  };
  const handleActive = () => {
    const payloadA = {
      data: {
        GLACCGRO_ID: rowData?.GLACCGRO_ID,
        GROUP_TYPE: rowData?.GROUP_TYPE,
        DESCRIPTION: rowData?.DESCRIPTION,
        CODE: rowData?.CODE,
        ACTIVE_FLAG: "Y",
        USE_ID: rowData?.USE_ID,
      },
      action: "InventoryWeb",
      method: "PostGlAccountGroup",
      username: "SALES",
      type: "rpc",
      tid: "144",
    };
    sendRequest(
      Inventory.PostGlAccountGroup,
      "POST",
      payloadA,
      handlePostPartCat,
      Token
      );
    };
  const handleInActive = () => {
    const payloadIn = {
      data: {
        GLACCGRO_ID: rowData?.GLACCGRO_ID,
        GROUP_TYPE: rowData?.GROUP_TYPE,
        DESCRIPTION: rowData?.DESCRIPTION,
        CODE: rowData?.CODE,
        ACTIVE_FLAG: "y",
        USE_ID: rowData?.USE_ID,
      },
      action: "InventoryWeb",
      method: "PostGlAccountGroup",
      username: "SALES",
      type: "rpc",
      tid: "144",
    };
    sendRequest(
      Inventory.PostGlAccountGroup,
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
        <p className="text-[14px] leading-normal line-clamp-1 text-white">
          {rowData.ACTIVE_FLAG == "Y" ? "Active" : "InActive"}
        </p>
      </button>
      {isTooltipVisible && (
        <div
          className="absolute z-[112] text-white bg-white w-full p-1 text-sm shadow-lg rounded"
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
          {rowData.ACTIVE_FLAG == "y" && (
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

export default GLGroupStatus;
