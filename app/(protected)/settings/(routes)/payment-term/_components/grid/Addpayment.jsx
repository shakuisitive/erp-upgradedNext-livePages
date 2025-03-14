"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useApiFetch from '../../../../../../../customHook/useApiFetch';
import {setRefresh,setRefreshing} from "../../_redux/paymentTermSlice"

// const Addpayment   = () => {
//     let [enabled,setEnabled]=useState(false);
//     let [Addpayment  ,setAddpayment]=useState();
//     let [code,setCode]=useState(null);
//     let [error,sendRequest]=useApiFetch();
//     let username=useSelector(state=>state.paymentTerm.username);
//     let userID=useSelector(state=>state.paymentTerm.user_ID);
//     let refresh=useSelector(state=>state.paymentTerm.Refresh);
//     let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostPaymentTerm";
//     let codeUrl=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"InventoryWeb/GetCodeUniqueValidation"
//     let dispatch=useDispatch();
//     let payload={
//       data: {
//         PAYTER_ID: "",
//         CODE: "",
//         NAME:"",
//         DESCRIPTION: "",
//         ACTIVE_FLAG: "Y",
//         DURATION_IN_DAYS: "",
//         CUS_ID:"3"
//     },
//     action: "Administration",
//     method: "PostPaymentTerm",
//     username: "admin",
//     type: "rpc",
//     tid: "144"
//     }
    
//     let validCodePayload
//     const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;
//     const getCode=(data)=>{
//       console.log(data)
//         setCode(data?.Result[0].VALIDATION_RESULT);
//     }
//     console.log(code)
//     const getAllTask=(data)=>{
//      dispatch(setRefresh(!refresh))
//      setAddTax('')
//     }
    
    
//     const clickHandler=()=>{
//       setEnabled(true);
//     }
//     const changeHandler=(e)=>{
//      validCodePayload={
//         data: {
//           TYPE: " PAYTER_ID",
//           CODE: e.target.value
//         },
//         action: "InventoryWeb",
//         method: "GetCodeUniqueValidation",
//         username: username,
//         type: "rpc",
//         tid: "144"
//       }
//         setAddTax(e.target.value)
//         sendRequest(codeUrl,"POST",validCodePayload,getCode,token);
    
        
//     }
    
//     const blurHandler=(e)=>{
//       if(Addpayment!=null && Addpayment!='' && code=='TRUE'){
//     sendRequest(url,"POST",payload,getAllTask,token);
    
//       }
//     }
//     const keyDownHandler=(e)=>{
//       if(e.key==='Enter' && Addpayment!=null && Addpayment!='' && code=='TRUE'){
//       sendRequest(url,"POST",payload,getAllTask,token);
//       }
//     }
    
//       return (
//         <div>
          
//           {
//             enabled?( <input
    
//               placeholder='New payment'
//               className={`w-full h-7 text-center ${code=='FALSE'?'outline outline-2 outline-red-500':''}`}
//               value={Addpayment}
//               onKeyDown={keyDownHandler}
//                onChange={changeHandler}
//                onBlur={blurHandler}
//                autoFocus
              
    
//               />):(
//                 <button
//                   className='w-full h-7 text-center'
//                   onClick={clickHandler}
//                 >
//                   Add payment term+
//                 </button>
//               )
//           }
          
          
          
          
    
//         </div>
//       )
//     }
const Addpayment = () => {
  let [enabled, setEnabled] = useState(false);
  let [addPayment  , setaddPayment

] = useState();
  let [code, setCode] = useState(null);
  let [error, sendRequest] = useApiFetch();
  let username = useSelector((state) => state.paymentTerm.username);
  let userID = useSelector((state) => state.paymentTerm.user_ID);

  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostPaymentTerm";
  let codeUrl =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL +
    "InventoryWeb/GetCodeUniqueValidation";
  let dispatch = useDispatch();
  let payload = {
    data: {
      PAYTER_ID: "",
      CUS_ID:"",
      ACTIVE_FLAG: "Y",
      CODE: addPayment,
      DESCRIPTION: "",
   DURATION_IN_DAYS: "",
            NAME:"",
   
},
    method: "PostPaymentTerm",
   tid: "144",
   type: "rpc",
   username: "admin"
  };

  let validCodePayload;

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const getCode = (data) => {
    SVGAnimatedBoolean;
    setCode(data?.Result[0].VALIDATION_RESULT);
  };
 
  console.log(code);
  const getAllTask = (data) => {
    dispatch(setRefreshing(true));
    setaddPayment("");
  };
  console.log("-------getAllTask",getAllTask);
  const clickHandler = () => {
    setEnabled(true);
  };
  const changeHandler = (e) => {
    validCodePayload = {
      data: {
        TYPE: " PAYTER_ID",
          CODE: e.target.value
        },
        action: "InventoryWeb",
        method: "GetCodeUniqueValidation",
        username: username,
        type: "rpc",
        tid: "144"
      //   TYPE: "PAYTER_CODE",
      //   CODE: e.target.value,
      // },
      // action: "InventoryWeb",
      // method: "GetCodeUniqueValidation",
      // username: username,
      // type: "rpc",
      // tid: "144",
  
    };
    setaddPayment(e.target.value);
    sendRequest(codeUrl, "POST", validCodePayload, getCode, token);
  };

  const blurHandler = (e) => {
    if (addPayment


   != null && addPayment

   != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter" && addPayment

   != null && addPayment

   != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };

  return (
    <div>
      {enabled ? (
        <input
          placeholder="New payment"
          className={`w-full h-7 text-center ${
            code == "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addPayment

  }
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
         Add payment +
        </button>
      )}
    </div>
  );
};

export default Addpayment
  