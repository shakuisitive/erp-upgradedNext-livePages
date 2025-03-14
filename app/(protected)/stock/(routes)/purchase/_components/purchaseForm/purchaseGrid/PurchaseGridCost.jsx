"use client";
import React, { useState, useEffect, useRef } from "react";
import { updatePurchaseCost, onNextFocus } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseGridCost = ({ data, index, rowData }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null);

  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );

  // // console.log("check orderQuantity" , rowData );

  useEffect(() => {
    if (
      purchseSubGridActF.index == index &&
      purchseSubGridActF.field == "cost"
    ) {
      // event.preventDefault();
      focRef.current.focus();
    }
  }, [purchseSubGridActF]);

  // // console.log('checkUpdatedlist' , checkUpdatelist);
  const dispatch = useDispatch();
  function formatNumber(number) {
    return parseFloat(number).toFixed(2);
  }

  const result = formatNumber(data);
  useEffect(() => {
    // console.log('check result' , data);
    if (data == null) {
      setChangeValue(0.0);
    } else {
      setChangeValue(result);
    }
  }, [result]);

  const setChange = (e) => {
    setChangeValue(Number(e.target.value));
    data = {
      cost: Number(e.target.value),
      indexR: index,
    };
    dispatch(updatePurchaseCost(data));
  };

  const keyPressed = (e) => {
    // // console.log("key presed" , e.key);
    if (e.key == "Enter") {
      dispatch(onNextFocus({ index: index + 1, field: "OrdQ" }));
    }
  };
  return (
    <div className="flex justify-center items-center bg-[#E1EFF2] px-[3px] w-full text-[14px] text-customblack ">
      {/* <span className=" absolute left-[2px]">$</span> */}
      <input
        className="w-full outline-none text-center py-1"
        type="number"
        onChange={setChange}
        value={changeValue}
        ref={focRef}
        disabled={
          rowData.PAR_ID != 0 && FormStatus == "Initiated"
            ? false
            : rowData.PAR_ID != 0 && FormStatus == "New"
            ? false
            : rowData.PAR_ID != 0 && FormStatus == "Issued to Vendor"
            ? false
            : true
        }
        onKeyPress={keyPressed}
        onDoubleClick={(e) => e.target.select()}
      />
      
    </div>
  );
};

export default PurchaseGridCost;
