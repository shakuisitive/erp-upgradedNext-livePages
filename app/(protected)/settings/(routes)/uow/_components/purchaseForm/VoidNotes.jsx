"use client";
import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";

import useApiFetch from '../../../../../../../customHook/useApiFetch'
import { useSelector, useDispatch } from "react-redux";
import {setVoidStatus, updatePurchaseNotes, updatePurchaseNotesV} from '../../redux/Purchase.slice'
import TextArea from "../../../../../../../components/misc/pureComponents/textinput/TextArea";





function VoidNotes({ isOpen, onClose, heading }) {

    const dispatch = useDispatch()
  // const [data, setData] = useState();
  
  let [error, sendRequest] = useApiFetch()
 
  const [notes , setNotes] = useState()

  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder)
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`
  const payloadPOrder = {
    data:  data[0]
    ,
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144"
  }  
  // const token = localStorage.getItem('tokenSession')
  const token =  typeof  window !== "undefined"
  ? localStorage.getItem("tokenSession")
  : null;
  const getAllTaskVorder = (data , key) =>{
    if(data.CODE == 'SUCCESS' && key == 'Void'){
       onClose()
          }
  }
 // console.log('check data in void' , data);
  useEffect(()=>{
    if(data[0]?.APPROVED_FLAG == 'Y' && data[0]?.VOID_FLAG == 'Y'){
      sendRequest(apiUrlPOrder, 'POST', payloadPOrder, getAllTaskVorder, token , 'Void')
     
    }
    // // console.log('check issue status2' , data[0]?.APPROVED_FLAG );

  },[data])

  if (!isOpen) {
    return null;
  }
  

  

  
  
 

  const handleInputChangeNotes = (e) =>{
    setNotes(e.target.value)

    dispatch(updatePurchaseNotesV(e.target.value))
  }

  const postVoid = () =>{
    
    
      dispatch(setVoidStatus())
    
   
      }

  return (
    
    <div className="fixed inset-0 z-30 bg-gray-50 backdrop-blur-sm backdrop-filter bg-opacity-50 opacity-100 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-[90vw] h-auto  mx-auto my-6 border border-gray-200 rounded-lg">
        <div className="bg-white p-4 rounded-md shadow-lg ">
          {/* hedder for modal */}
          <div className="flex items-start justify-between border-b-[1px] border-gray-300 ">
            <h3 className="poppins text-customblack text-[24px] leading-[30px]">{heading}</h3>
            <div className="flex items-center justify-between mb-2">
              <button
              // bg-[#6DB4B3] custom modal apply green
              // bg-[#007f9b] monday green
            onClick={postVoid}
                className=" bg-customgreen hover:bg-btnHoverGreen  text-sm text-white border p-2 mr-2 border-gray-200 rounded-[4px] "
             
              >
                Continue
              </button>
              <button
                className="  flex-col text-gray-600 hover:bg-customGray rounded-md "
                onClick={onClose}
              >
                <RxCross1 className="p-2 text-4xl "/>
              </button>
            </div>
          </div>
          {/* body of modal */}
          <div className="h-[40vh]">
         
          <TextArea label="Comments" initialValue="" onChange={handleInputChangeNotes} value={notes} placeHolder='Comments' />
      </div>
    </div>
    </div>
    </div>
  );
}

export default VoidNotes;
