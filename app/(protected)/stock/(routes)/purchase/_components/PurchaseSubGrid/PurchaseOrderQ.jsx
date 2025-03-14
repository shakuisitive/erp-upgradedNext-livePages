"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  updatePurchaseOrdQnt,
  onNextFocus,
  subOrderQuantityChange,
  readySubGridPayLoad,
  setRefresh,
  addNewRowSubData,
  setSubProductId,
} from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const PurchaseOrderQ = ({ data, index, rowData, id, obj }) => {
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const focRef = useRef(null);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const getPurchaseOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
  const [changeValue, setChangeValue] = useState();
  const [newRow, setNewRow] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const addNewRowFlag = useSelector(
    (state) => state.PurchaseSlices.addNewRowFlag
  );
  const dispatch = useDispatch();
  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getProdectDetailRes = (data) => {
    setIsSend(false)
    if (data.CODE == "SUCCESS" && addNewRowFlag == true) {
      dispatch(addNewRowSubData(false));
      dispatch(setSubProductId({POId: id, PId: data.Result}))
      // dispatch(setRefresh(true));
    }
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
    if (isSend == true) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payload.formPayload,
        getAllTaskPOrder,
        token
      );
    }
  }, [isSend]);

  useEffect(() => {
    setChangeValue(data);
  }, [data, rowData]);

  // useEffect(() => {
  //   if(focRef.current && focRef.current.value == 0) {
  //     focRef.current.focus();
  //   }
  // }, []);

  const setChange = (e) => {
    setChangeValue(Number(e.target.value));
    if (rowData.PURORDDET_ID == "") {
      dispatch(addNewRowSubData(true));
    }
    data = {
      qnt: Number(e.target.value),
      ordId: rowData.id,
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
    };
    dispatch(subOrderQuantityChange(data));
  };

  const OnBlurApi = () => {
    if (changeValue != 0) {
      dispatch(readySubGridPayLoad({ id: id }));
      setIsSend(true)
    } else {
      setEMessage("Order quantity must be greater than 0");
      setIsErrorMessage(true);
    }
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
    <div className={`w-full flex items-center ${rowData.QUANTITY == 0 ? "border border-red-600" : "" } px-[3px] justify-center `}>
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
        onDoubleClick={(e) => e.target.select()}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PurchaseOrderQ;
