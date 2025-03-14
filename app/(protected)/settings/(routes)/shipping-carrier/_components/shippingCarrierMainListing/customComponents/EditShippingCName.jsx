import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../../_redux/shippingCSlice";

const EditShippingCName = ({ data, rowData }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const payload = {
    data: {
      SHIP_CARRIER_ID: rowData?.SHIP_CARRIER_ID,
      CODE: rowData?.CODE,
      NAME: input,
      DESCRIPTION: rowData?.DESCRIPTION,
      NOTES: rowData?.NOTES,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
    },
    action: "InventoryWeb",
    method: "PostShipCarrier",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostPartCat = (data) => {
    if (data.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const onBlurHandler = () => {
    if (input !== rowData?.NAME) {
      sendRequest(
        Administration.PostShipCarrier,
        "POST",
        payload,
        handlePostPartCat,
        token
      );
    }
  };
  useEffect(() => {
    setInput(data);
  }, [data, rowData]);

  return (
    <div className="text-gray-500 text-[14px] flex w-full justify-center items-center">
      {
        <input
          type="text"
          className="w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg"
          value={input}
          onChange={handleChange}
          onBlur={onBlurHandler}
          disabled={rowData?.ACTIVE_FLAG == "Y" ? false : true}
        />
      }
    </div>
  );
};

export default EditShippingCName;
