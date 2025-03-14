"use client";
import React, { useState, useEffect , useRef } from "react";
// import { updatePurchaseCost , onNextFocus } from "../../../redux/Purchase.slice";
import { updatePurchaseCost , onNextFocus, updateSubGridCost , readySubGridPayLoad } from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseSGridCost = ({ data , index , rowData , id , obj }) => {
  const [changeValue, setChangeValue] = useState();
  const focRef = useRef(null)

    // const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
    // const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
    const purchseSubGridActF = useSelector((state) => state.PurchaseSlices.purchseSubGridActF);
    const purchseSubData = useSelector((state) => state.PurchaseSlices.subData);
    const purchsesubPayload = useSelector((state) => state.PurchaseSlices.subPayload);

    // // console.log("check PurchaseOrderQ" , rowData );
  // console.log('check log for subCost', purchsesubPayload );


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
//   // console.log('check id for comp' , obj , rowData );

  const setChange = (e) => {




const updatedData = purchseSubData.map((data) => {
    if (data.id == id) {
        return {
            ...data,
            product: data.product.map((Pdata) => {
                if (Pdata.PURORDDET_ID === rowData.PURORDDET_ID) {
                    return { ...Pdata, COST: parseFloat(e.target.value)};
                }
                return Pdata;
            })
        };
    }
    return data;
});

// // console.log('check log for map', updatedData , obj);



    setChangeValue(e.target.value);
  const  dataC = {
      cost: e.target.value,
    PurId: obj.id,
      porID: rowData.PURORDDET_ID
    };
    // dispatch(updateSubGridCost(dataC));
    dispatch(updateSubGridCost(updatedData));
  };

//   const keyPressed = (e) =>{
//     // // console.log("key presed" , e.key);
//     if(e.key == "Enter"){
//     dispatch(onNextFocus({index:index + 1 , field:'OrdQ'}))
//     }
//       }

const hitAPi = () =>{
    dispatch(readySubGridPayLoad({id:id}))
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
        disabled={ (obj?.statusId == "Initiated" || obj?.statusId == "Issued to Vendor" || obj?.statusId == "New" ) ? false : true}
        // onKeyPress={keyPressed}
        onBlur={hitAPi}

      />
    </div>
  );
};

export default PurchaseSGridCost;
