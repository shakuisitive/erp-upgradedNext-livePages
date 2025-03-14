"use client";
import React, { useState, useEffect , useRef } from "react";
import { updatePurchaseOrdQnt ,  onNextFocus } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";


const PurchaseGridOrdQnt = ({ data , index , rowData }) => {

  const focRef = useRef(null)

  // // console.log('check new ord qunt rowData' , rowData);
  const [changeValue, setChangeValue] = useState();

    // const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
    const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
    const purchseSubGridActF = useSelector((state) => state.PurchaseSlices.purchseSubGridActF);

// console.log('purchseSubGridActF' , purchseSubGridActF);
//     useEffect(()=>{
//       if(purchseSubGridActF.index == index + 1 && purchseSubGridActF.field == 'OrdQ' ){
// focRef.current.focus()
//       }
//     },[purchseSubGridActF])

useEffect(() => {

  if (purchseSubGridActF.index == index   && purchseSubGridActF.field == 'OrdQ') {
  // // console.log("check orderQuantity" , purchseSubGridActF , FormStatus );

  
      // event.preventDefault(); 
       focRef.current.focus();

    
  }
}, [purchseSubGridActF]);
// // console.log('ist' , checkUpdatelist);
  const dispatch = useDispatch()
  function formatNumber(number) {
    return parseFloat(number).toFixed(2);
  }

//   const result = formatNumber(data);
  useEffect(() => {
    setChangeValue(data);
  }, [data , rowData]);

  const setChange = (e) => {
    setChangeValue(Number(e.target.value));
    data = {
      qnt: Number(e.target.value),
      indexR: index,
    };
    dispatch(updatePurchaseOrdQnt(data));
  };

  const keyPressed = (e) =>{
    
// // console.log("key presed" , e.key);
if(e.key == "Enter" && changeValue != undefined ){
dispatch(onNextFocus({index:index , field:'cost'}))
// console.log('purchseSubGridActF key pressed' , changeValue);
}
  }
  return (
    <div className="w-full flex items-center bg-[#E1EFF2] px-[3px] justify-center ">
      {/* <p className='text-[14px] text-gray-500'>$ {result}</p> */}
      <input
        className="w-full outline-none text-center bg-white py-[3px]"
        type="number"
        onChange={setChange}
        value={changeValue}
        disabled={rowData.PAR_ID != 0 && FormStatus == "Initiated"  ? false : rowData.PAR_ID != 0 && FormStatus == "New" ? false :  true}

        ref={focRef}
        onKeyPress={keyPressed}
      />
    </div>
  );
};

export default PurchaseGridOrdQnt;
