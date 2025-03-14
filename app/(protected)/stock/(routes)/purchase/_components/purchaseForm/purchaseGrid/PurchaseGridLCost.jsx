"use client";
import React, { useState, useEffect , useRef } from "react";
import { updatePurchaseCost } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseGridLCost = ({ data , index , rowData }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null)

    const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  
  const dispatch = useDispatch()
  function formatNumber(number) {
    return parseFloat(number).toFixed(2);
  }

  const result = formatNumber(data);
  useEffect(() => {
    if(data == null){
    setChangeValue(0.00);

    }else{
      setChangeValue(result);

    }
  }, [result]);

  const setChange = (e) => {
    setChangeValue(e.target.value);
    data = {
      cost: e.target.value,
      indexR: index,
    };
    dispatch(updatePurchaseCost(data));
  };
  // bg-[#E1EFF2]
  return (
    <div className="w-full flex items-center  px-[3px] justify-center ">
  
      <input
        className="w-full outline-none bg-white text-center py-[3px]"
        type="number"
        onChange={setChange}
        value={changeValue}
        ref={focRef}
        onDoubleClick={(e) => e.target.select()}
        disabled={ FormStatus == "Initiated" || FormStatus == "Issued to Vendor" || FormStatus == "New"  ? true : false}
      />
    </div>
  );
};

export default PurchaseGridLCost;
