import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import useApiFetch from "../../../../../../../customHook/useApiFetch";

import { Administration,Inventory,ItemMaster } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

import {setRefreshing } from "../../_redux/ShipingConfigSlice"

const EditShippingDayUpto = ({ data, rowData }) => {
  const [shipDay, setShipday] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
      console.log(token,"token");
      
  const payload = {
    data: {
     SHIP_CARRIER_DET_ID:rowData?.SHIP_CARRIER_DET_ID,
    SHIP_CARRIER_ID:rowData?.SHIP_CARRIER_ID,
      CODE: rowData?.CODE,
      DESCRIPTION:rowData?.DESCRIPTION,
      CHARGE_TYPE:rowData?.CHARGE_TYPE,
      CHARGE_VALUE:rowData?.CHARGE_VALUE,
      SHIPPING_TIME:rowData?.SHIPPING_TIME,
      SHIPPING_DAYS:shipDay,
      NOTES:rowData?.NOTES,
      ACTIVE_FLAG:rowData?.ACTIVE_FLAG
       
    },
    action: "Administration",
    method: "PostAdmShipCarrierDetail",
    username:"SALES",
    type: "rpc",
    tid: "144",
  };
console.log(data,"data");

  const handlePostPartCat = (data) => {
    if (data.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
  };
  const handleChange = (e) => {
    setShipday(e.target.value);
  };
  const onBlurHandler = () => {
    if (shipDay !== rowData?.SHIPPING_DAYS) {
      sendRequest(
        Administration.PostAdmShipCarrierDetail,
        "POST",
        payload,
        handlePostPartCat,
        token
      );
    }
  };
  useEffect(() => {
    setShipday(data);
  }, [data, rowData]);
 

  
  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          value={shipDay}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditShippingDayUpto;
