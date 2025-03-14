"use client";
import React, { useState, useEffect , useRef } from "react";
import { updatePurchaseCost , onNextFocus } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseGridCost = ({ data , index , rowData }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null)

    const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
    const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
    const purchseSubGridActF = useSelector((state) => state.PurchaseSlices.purchseSubGridActF);

    // // console.log("check orderQuantity" , rowData );

    useEffect(() => {

      if (purchseSubGridActF.index == index   && purchseSubGridActF.field == 'cost') {
    
      
          // event.preventDefault(); 
           focRef.current.focus();
    
        
      }
    }, [purchseSubGridActF]);

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

  const keyPressed = (e) =>{
    // // console.log("key presed" , e.key);
    if(e.key == "Enter"){
    dispatch(onNextFocus({index:index + 1 , field:'OrdQ'}))
    }
      }
  return (
    <div className="w-full flex items-center justify-center ">
      {/* <p className='text-[14px] text-gray-500'>$ {result}</p> */}
      <input
        className="w-full outline-none text-center"
        type="text"
        onChange={setChange}
        value={changeValue}
        ref={focRef}
        disabled={ FormStatus == "Initiated" || FormStatus == "Issued to Vendor" || FormStatus == "New"  ? false : true}
        onKeyPress={keyPressed}

      />
    </div>
  );
};

export default PurchaseGridCost;
