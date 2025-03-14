import React, { useState } from "react";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setRefreshing } from "../../_redux/purchaseGSlice";
import { useDispatch, useSelector } from "react-redux";

function PGColor({ rowData }) {
  const initialColor = rowData?.COLOR_CODE;
  const [color, setColor] = useState(initialColor);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const refreshing = useSelector((state) => state.purchaseGSlice.refreshing);
  console.log("refreshing: ", refreshing);
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const handleChange = (event) => {
    setColor(event.target.value);
  };
  const handlePostPartCat = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setRefreshing(true));
    }
  };
  const payload = {
    data: {
      PURGRO_ID: rowData?.PURGRO_ID,
      CODE: rowData?.CODE,
      DESCRIPTION: rowData?.DESCRIPTION,
      CYCLE_START_DAYS: rowData?.CYCLE_START_DAYS,
      CYCLE_END_DAYS: rowData?.CYCLE_END_DAYS,
      COLOR_CODE: color,
      MINIMUM_QUANTITY: rowData?.MINIMUM_QUANTITY,
      MAXIMUM_QUANTITY: rowData?.MAXIMUM_QUANTITY,
      SEQ_NUMBER: rowData?.SEQ_NUMBER,
      ACTIVE_FLAG: rowData?.ACTIVE_FLAG,
    },
    action: "InventoryWeb",
    method: "PostPurchaseGroup",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleOnBlur = () => {
    if (color !== initialColor) {
      sendRequest(
        Administration.PostPurchaseGroup,
        "POST",
        payload,
        handlePostPartCat,
        Token
      );
    }
  };
  // console.log("color:", color);
  return (
    <div className="flex justify-center items-center line-clamp-1 px-2 w-full h-full  text-[14px] ">
      <input
        type="color"
        value={color}
        onChange={handleChange}
        onBlur={handleOnBlur}
        className=" w-full bg-white cursor-pointer"
      />
    </div>
  );
}

export default PGColor;
