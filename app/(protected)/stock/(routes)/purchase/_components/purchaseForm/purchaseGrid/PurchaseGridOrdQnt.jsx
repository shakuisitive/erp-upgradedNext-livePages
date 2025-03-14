"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  updatePurchaseOrdQnt,
  onNextFocus,
} from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseGridOrdQnt = ({ data, index, rowData }) => {
  const focRef = useRef(null);

  const [changeValue, setChangeValue] = useState();

  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const purchseSubGridActF = useSelector(
    (state) => state.PurchaseSlices.purchseSubGridActF
  );

  // useEffect(() => {

  //   if (purchseSubGridActF.index == index   && purchseSubGridActF.field == 'OrdQ') {

  //        focRef.current.focus();

  //   }
  // }, [purchseSubGridActF]);

  const dispatch = useDispatch();
  // function formatNumber(number) {
  //   return parseFloat(number).toFixed(2);
  // }

  useEffect(() => {
    setChangeValue(data ? data : changeValue);
  }, [data, rowData]);

  const setChange = (e) => {
    setChangeValue(Number(e.target.value));
    data = {
      qnt: Number(e.target.value),
      indexR: index,
    };
    dispatch(updatePurchaseOrdQnt(data));
  };

  const keyPressed = (e) => {
    
  };
  return (
    <div
      className={`${
        rowData?.QUANTITY == 0 ? " border border-red-600" : ""
      } flex justify-center items-center bg-[#E1EFF2] px-[3px] w-full text-[14px] text-customblack `}
    >
      {/* <p className='text-[14px] text-gray-500'>$ {result}</p> */}
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={setChange}
        onDoubleClick={(e) => e.target.select()}
        value={changeValue}
        disabled={
          rowData.PAR_ID != 0 && FormStatus == "Initiated"
            ? false
            : rowData.PAR_ID != 0 && FormStatus == "New"
            ? false
            : true
        }
        ref={focRef}
        onKeyPress={keyPressed}
      />
    </div>
  );
};

export default PurchaseGridOrdQnt;
