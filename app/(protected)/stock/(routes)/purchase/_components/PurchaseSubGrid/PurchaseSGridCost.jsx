"use client";
import React, { useState, useEffect, useRef } from "react";
// import { updatePurchaseCost , onNextFocus } from "../../../redux/Purchase.slice";
import {
  updatePurchaseCost,
  onNextFocus,
  updateSubGridCost,
  readySubGridPayLoad,
  setRefresh,
} from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const PurchaseSGridCost = ({ data, index, rowData, id, obj }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null);
  const [isSend, setIsSend] = useState(false);
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );
  const purchseSubData = useSelector((state) => state.PurchaseSlices.subData);
  const purchsesubPayload = useSelector(
    (state) => state.PurchaseSlices.subPayload
  );
  

  useEffect(() => {
    if (
      purchseSubGridActF.index == index &&
      purchseSubGridActF.field == "cost"
    ) {
      focRef.current.focus();
    }
  }, [purchseSubGridActF]);

  const dispatch = useDispatch();
  function formatNumber(number) {
    return parseFloat(number).toFixed(2);
  }

  const result = formatNumber(data);
  useEffect(() => {
    if (data == null) {
      setChangeValue(0.0);
    } else {
      setChangeValue(result);
    }
  }, [result]);

  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getProdectDetailRes = (data) => {
    setIsSend(false);
    // if (data.CODE == "SUCCESS") {
    //   // dispatch(addNewRowSubData(false));
    //   dispatch(setRefresh(true));
    // }
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

  const setChange = (e) => {
    const updatedData = purchseSubData.map((data) => {
      if (data.id == id) {
        return {
          ...data,
          product: data.product.map((Pdata) => {
            if (Pdata.PURORDDET_ID === rowData.PURORDDET_ID) {
              return { ...Pdata, COST: parseFloat(e.target.value) };
            }
            return Pdata;
          }),
        };
      }
      return data;
    });

    setChangeValue(e.target.value);
    const dataC = {
      cost: e.target.value,
      PurId: obj.id,
      porID: rowData.PURORDDET_ID,
    };
    // dispatch(updateSubGridCost(dataC));
    dispatch(updateSubGridCost(updatedData));
  };

  const hitAPi = () => {
    dispatch(readySubGridPayLoad({ id: id }));
    setIsSend(true)
  };

  return (
    <div className="w-full flex items-center justify-center ">
      {/* <p className='text-[14px] text-gray-500'>$ {result}</p> */}
      <input
        className="w-full outline-none text-center"
        type="number"
        onChange={setChange}
        value={changeValue}
        ref={focRef}
        disabled={
          rowData?.QUANTITY == 0 ? true : 
          obj?.statusId == "Initiated" ||
          obj?.statusId == "Issued to Vendor" ||
          obj?.statusId == "New" 
            ? false
            : true
        }
        // onKeyPress={keyPressed}
        onBlur={hitAPi}
        onDoubleClick={(e) => e.target.select()}
      />
    </div>
  );
};

export default PurchaseSGridCost;
