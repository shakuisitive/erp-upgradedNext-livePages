"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  updatePurchaseOrdQnt,
  onNextFocus,
  
  subOrderQuantityChange , 
  readySubGridPayLoad,
} from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const PurchaseOrderQ = ({ data, index, rowData, id, obj }) => {
  const focRef = useRef(null);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const [changeValue, setChangeValue] = useState();
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const dispatch = useDispatch();
  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getProdectDetailRes = (data) => {
    // dispatch(setRefresh(true));
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payload.detailPayload,
        getProdectDetailRes,
        token
      );
    }
  };

  useEffect(() => {
    if (payload != null) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payload.formPayload,
        getAllTaskPOrder,
        token
      );
    }
  }, [payload]);

  useEffect(() => {
    setChangeValue(data);
  }, [data, rowData]);

  const setChange = (e) => {
    setChangeValue(Number(e.target.value));
    data = {
      qnt: Number(e.target.value),
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
    };
    dispatch(subOrderQuantityChange(data));
  };

  const OnBlurApi = () => {
    dispatch(readySubGridPayLoad({ id: id }));
  };

  // console.log(obj, "obj data")

  // const keyPressed = (e) => {
  //   // // console.log("key presed" , e.key);
  //   // console.log(rowData, "Order Id");
  //   if (e.key == "Enter" && changeValue != undefined) {
  //     dispatch(onNextFocus({ index: index, field: "cost" }));
  //     // console.log("purchseSubGridActF key pressed", changeValue);
  //   }
  // };
  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ">
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={setChange}
        value={changeValue}
        onBlur={OnBlurApi}
        disabled={ 
          rowData.PAR_ID != 0 && obj?.statusId == "Initiated"
            ? false
            : rowData.PAR_ID != 0 && obj?.statusId == "New"
            ? false
            : true
        }
        ref={focRef}
      />
    </div>
  );
};

export default PurchaseOrderQ;
