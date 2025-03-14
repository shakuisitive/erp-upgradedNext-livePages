"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useApiFetch from "../../../../../../../customHook/useApiFetch"
import {setRefresh,setRefreshing} from "../../_redux/uowSlice"
// const Adduow = () => {
//     let [enabled,setEnabled]=useState(false);
//     let [addUow,setAddUow]=useState();
//     let [code,setCode]=useState(null);
//     let [error,sendRequest]=useApiFetch();
//     let username=useSelector(state=>state.uow.username);
//     let userID=useSelector(state=>state.uow.user_ID);
  
//     let refresh=useSelector(state=>state.uow.Refresh);
//     let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostUOW";
//     let codeUrl=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"InventoryWeb/GetCodeUniqueValidation"
//     let dispatch=useDispatch();
//     let payload={
        
//             data:{ 
//                     UOW_ID 		: "" ,
//                       CUS_ID 		: "" ,
//                       CODE  		: addUow ,
//                       DESCRIPTION 	: "" ,  
//                       ACTIVE_FLAG 	: "Y" 
//                   },
//             action: "Administration",
//         method: "PostUOW",
//             username: "admin",
//             type: "rpc",
//             tid: "144"
//           }
    
//     let validCodePayload
    
//     const token =
//     typeof localStorage !== "undefined"
//       ? localStorage.getItem("tokenSession")
//       : null;
//     const getCode=(data)=>{
//    SVGAnimatedBoolean
//         setCode(data?.Result[0].VALIDATION_RESULT);
//     }
//     console.log(code)
//     const getAllTask=(data)=>{
//      dispatch(setRefresh(!refresh))
//      setAddUow('')
//     }
    
    
//     const clickHandler=()=>{
//       setEnabled(true);
//     }
//     const changeHandler=(e)=>{
//      validCodePayload={
//         data: {
//           TYPE: "UOW_CODE",
//           CODE: e.target.value
//         },
//         action: "InventoryWeb",
//         method: "GetCodeUniqueValidation",
//         username: username,
//         type: "rpc",
//         tid: "144"
//       }
//         setAddUow(e.target.value)
//         sendRequest(codeUrl,"POST",validCodePayload,getCode,token);
    
        
//     }
    
//     const blurHandler=(e)=>{
//       if(addUow!=null && addUow!='' && code=='TRUE'){
//     sendRequest(url,"POST",payload,getAllTask,token);
    
//       }
//     }
//     const keyDownHandler=(e)=>{
//       if(e.key==='Enter' && addUow!=null && addUow!='' && code=='TRUE'){
//       sendRequest(url,"POST",payload,getAllTask,token);
//       }
//     }
    
//       return (
//         <div>
          
//           {
//             enabled?( <input
    
//               placeholder='New Uow'
//               className={`w-full h-7 text-center ${code=='FALSE'?'outline outline-2 outline-red-500':''}`}
//               value={addUow}
//               onKeyDown={keyDownHandler}
//                onChange={changeHandler}
//                onBlur={blurHandler}
//                autoFocus
              
    
//               />):(
//                 <button
//                   className='w-full h-7 text-center '
//                   onClick={clickHandler}
//                 >
//                   Add Uow+
//                 </button>
//               )
//           }
          
          
          
          
    
//         </div>
//       )
//     }
const Adduow = () => {                                                                                                                                                                                                                                                                                                                                                                                                                             
  let [enabled, setEnabled] = useState(false);
  let [addUow, setAddUow] = useState();
  let [code, setCode] = useState(null);
  let [error, sendRequest] = useApiFetch();
  let username = useSelector((state) => state.uow.username);
  let userID = useSelector((state) => state.uow.user_ID);

  let url =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostUOW";
  let codeUrl =
    process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL +
    "InventoryWeb/GetCodeUniqueValidation";
  let dispatch = useDispatch();
  let payload = {
    data: {
      UOW_ID 		: "" ,
      CUS_ID 		: "" ,
      CODE  		: addUow ,
    DESCRIPTION 	: "" ,  
      ACTIVE_FLAG 	: "Y" 
                        },
       action: "Administration",
     method: "PostUOW",
     username: "admin",
       type: "rpc",
        tid: "144"
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
    setAddUow("");
  };

  const clickHandler = () => {
    setEnabled(true);
  };
  const changeHandler = (e) => {
    validCodePayload = {
      data: {
        TYPE: "UOW_CODE",
         CODE: e.target.value
                },
            action: "InventoryWeb",
                method: "GetCodeUniqueValidation",
                username: username,
                type: "rpc",
                tid: "144"
    };
    setAddUow(e.target.value);
    sendRequest(codeUrl, "POST", validCodePayload, getCode, token);
  };

  const blurHandler = (e) => {
    if (addUow != null && addUow != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };
  const keyDownHandler = (e) => {
    if (e.key === "Enter" && addUow != null && addUow != "" && code == "TRUE") {
      sendRequest(url, "POST", payload, getAllTask, token);
    }
  };

  return (
    <div>
      {enabled ? (
        <input
          placeholder="New Uow"
          className={`w-full h-7 text-center ${
            code == "FALSE" ? "outline outline-2 outline-red-500" : ""
          }`}
          value={addUow}
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          onBlur={blurHandler}
          autoFocus
        />
      ) : (
        <button className="w-full h-7 text-center " onClick={clickHandler}>
          Add Uow +
        </button>
      )}
    </div>
  );
};
export default Adduow