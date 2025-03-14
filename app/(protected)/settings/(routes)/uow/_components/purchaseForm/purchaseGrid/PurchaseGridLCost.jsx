"use client";
import React, { useState, useEffect , useRef } from "react";
import { updatePurchaseCost } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseGridLCost = ({ data , index , rowData }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null)

    const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
    const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
    // const purchseSubGridActF = useSelector((state) => state.PurchaseSlices.purchseSubGridActF);

    // // console.log("check orderQuantity" , rowData );

    // useEffect(() => {

    //   if (purchseSubGridActF.index == index   && purchseSubGridActF.field == 'cost') {
    
      
    //       // event.preventDefault(); 
    //        focRef.current.focus();
    
        
    //   }
    // }, [purchseSubGridActF]);

// // console.log('checkUpdatedlist' , checkUpdatelist);
  const dispatch = useDispatch()
  function formatNumber(number) {
    return parseFloat(number).toFixed(2);
  }

  const result = formatNumber(data);
  useEffect(() => {
    // console.log('check result' , data);
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
    <div className="w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ">
      {/* <p className='text-[14px] text-gray-500'>$ {result}</p> */}
      <input
        className="w-full outline-none bg-white text-center py-[3px]"
        type="text"
        onChange={setChange}
        value={changeValue}
        ref={focRef}
        disabled={ FormStatus == "Initiated" || FormStatus == "Issued to Vendor" || FormStatus == "New"  ? false : true}
      />
    </div>
  );
};

export default PurchaseGridLCost;
