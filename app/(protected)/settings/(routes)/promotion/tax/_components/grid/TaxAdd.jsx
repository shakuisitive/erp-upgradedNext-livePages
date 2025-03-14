"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useApiFetch from '../../../../../../../../customHook/useApiFetch';
import {setRefresh} from "../../redux/taxSlice"
const TaxAdd = () => {
let [enabled,setEnabled]=useState(false);
let [addTax,setAddTax]=useState();
let [code,setCode]=useState(null);
let [error,sendRequest]=useApiFetch();
let username=useSelector(state=>state.tax.username);
let userID=useSelector(state=>state.tax.user_ID);
let token=useSelector(state=>state.tax.token);
let refresh=useSelector(state=>state.tax.Refresh);
let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostTaxes";
let codeUrl=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"InventoryWeb/GetCodeUniqueValidation"
let dispatch=useDispatch();
let payload={
  data: {
    TAX_ID: "",
    CODE: addTax,
    DESCRIPTION: "",
    ACTIVE_FLAG: "Y",
    NOTES: "",
    SEQ_NUMBER: "",
    TAX_PERCENTAGE_RATE: "",
    USE_ID:userID,
    CUS_ID: null
  },
  action: "Administration",
  method: "PostTaxes",
  username:username,
  type: "rpc",
  tid: "144"
}

let validCodePayload

const getCode=(data)=>{
  console.log(data)
    setCode(data?.Result[0].VALIDATION_RESULT);
}
console.log(code)
const getAllTask=(data)=>{
 dispatch(setRefresh(!refresh))
 setAddTax('')
}


const clickHandler=()=>{
  setEnabled(true);
}
const changeHandler=(e)=>{
 validCodePayload={
    data: {
      TYPE: "TAX_CODE",
      CODE: e.target.value
    },
    action: "InventoryWeb",
    method: "GetCodeUniqueValidation",
    username: username,
    type: "rpc",
    tid: "144"
  }
    setAddTax(e.target.value)
    sendRequest(codeUrl,"POST",validCodePayload,getCode,token);

    
}

const blurHandler=(e)=>{
  if(addTax!=null && addTax!='' && code=='TRUE'){
sendRequest(url,"POST",payload,getAllTask,token);

  }
}
const keyDownHandler=(e)=>{
  if(e.key==='Enter' && addTax!=null && addTax!='' && code=='TRUE'){
  sendRequest(url,"POST",payload,getAllTask,token);
  }
}

  return (
    <div>
      
      {
        enabled?( <input

          placeholder='New Tax'
          className={`w-full h-7 text-center ${code=='FALSE'?'outline outline-2 outline-red-500':''}`}
          value={addTax}
          onKeyDown={keyDownHandler}
           onChange={changeHandler}
           onBlur={blurHandler}
           autoFocus
          

          />):(
            <button
              className='w-full h-7 text-center'
              onClick={clickHandler}
            >
              Add Tax+
            </button>
          )
      }
      
      
      
      

    </div>
  )
}

export default TaxAdd