'use client'
import React , {useEffect, useState} from 'react'
import { BiHide, BiSortAlt2 } from 'react-icons/bi'
import { BsPersonCircle } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'
import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoIosSearch } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import HeaderDropDown from './FormHeaderDropdown'
import useApiFetch from '../../../../../../customHook/useApiFetch'
import { useDispatch, useSelector } from 'react-redux'
import {setRestock, setSave, setcloseModal,setRefresh} from '../redux/receivingSlices'

const ReceivingFormHeader = ({supplier , index}) => {
   let [error, sendRequest] = useApiFetch()

  const dispatch = useDispatch()
const [changeflag,setChangeFlag] = useState([])

const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);
 const finalize = useSelector((state) => state.receivingSlices.postFinalize)
 const sales = useSelector((state) => state.receivingSlices.postSales)
  const formData = useSelector((state) => state.receivingSlices.postReceiving)
  const postRByPO = useSelector((state) => state.receivingSlices.postRByPO)
  const gridData = useSelector((state) => state.receivingSlices.postReceivingDetail)
  const checkUpdatedQty = useSelector((state) => state.receivingSlices.subGridState)




  //for form data
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecieving`
//   //for grid data
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingDetail`
  const apiUrlFinalized = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostFinalizedRecieving`
  const apiUrlSales = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostAutoStockOrder`
  const apiUrlByPo = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingByPO`

  // finalized payload
const payloadFinalized = {
  data: finalize,
  action: "InventoryWeb",
  method: "PostFinalizedRecieving",
  username: "admin",
  type: "rpc",
  tid: "144",
    }

    const payloadSales = {
      data: sales,
      action: "InventoryWeb",
      method: "PostFinalizedRecieving",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    

 const payloadDetails = {
  data:  gridData,
  action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
	username: "admin",
    type: "rpc",
    tid: "144"
} 

//form data payload
  const payload = {
  data:  formData[0],
  action: "InventoryWeb",
  method: "PostRecieving",
  username: "admin",
  type: "rpc",
  tid: "144"
}  
const payloadByPO = {
  data : postRByPO,
 action: "InventoryWeb",
method: "PostRecievingByPO",
username: "admin",
tid: "144",
type: "rpc",
}
   
const token = localStorage.getItem('tokenSession')
// function for grid
  const postRecevingDetail = (data) =>{
  dispatch(setRefresh(true))

// if(data?.CODE == "SUCCESS"){
//     //  sendRequest(apiUrlByPo, 'POST', payloadByPO,postRecByPO, token);
//   }
    }
    
    const postRecevingDetailPO = (data) =>{
if(data?.CODE == "SUCCESS"){
     sendRequest(apiUrlByPo, 'POST', payloadByPO,postRecByPO, token);
  }
    }
    

    const postRecByPO = (data) => {

    }

  const postRecevingDetailR = (data) =>{
if(data?.CODE == "SUCCESS"){
     sendRequest(apiUrlFinalized, 'POST', payloadFinalized,postRecevingFinalized, token);
  }
    }

    // function for finalized api
     const postRecevingFinalized = (data) =>{
if(data?.CODE == "SUCCESS"){
    // console.log("checkin response detail",data?.CODE)
    sendRequest(apiUrlSales, 'POST', payloadSales,postRecevingSales, token);
  }
    }

   // function for finalized api 
     const postRecevingSales = (data) =>{
if(data?.CODE == "SUCCESS"){
    console.log("checkin response detail",data?.CODE)
  }
    }

const getAllTask = (data ) => {
    if(data?.CODE == "SUCCESS"){
        sendRequest(apiUrlDetails, 'POST', payloadDetails,postRecevingDetail, token);
  dispatch(setRefresh(true))

        // dispatch(setcloseModal(true));
    }
    
}
const getAllTaskPO = (data ) => {
    if(data?.CODE == "SUCCESS"){
        sendRequest(apiUrlDetails, 'POST', payloadDetails,postRecevingDetailPO, token);
        dispatch(setcloseModal(true));
    }
    
}

const getAllTaskR = (data ) => {
  if(data?.CODE == "SUCCESS"){
     sendRequest(apiUrlDetails, 'POST', payloadDetails,postRecevingDetailR, token);
  //    console.log("checking Sales not redux",payloadSales)
  // console.log("checking finalize not redux",payloadFinalized)
  }
}

const handleRestock = () => {
    // console.log("redux gridData after restock hit mapping:", gridData);
    
//     const newArr = gridData.map((obj) => ({...obj, READY_FOR_RESTOCK_FLAG: "Y" }));
//     // console.log("redux newArr after mapping:", newArr);
//     const payloadDetails = {
//   data:  newArr,
//   action: "InventoryWeb",
//     method: "PostPurchaseOrderDetails",
// 	username: "admin",
//     type: "rpc",
//     tid: "144"
// } 
//  sendRequest(apiUrl, 'POST', payload, (data) => getAllTask(data, payloadDetails), token);
        // sendRequest(apiUrl, 'POST', payload, getAllTask, token);

        
   dispatch(setRestock())
console.log("not redux handle restock working")

}
const handleSave = () => {
  dispatch(setSave())
//  sendRequest(apiUrl, 'POST', payload, getAllTask, token);

//   console.log("redux gridData before restock hit mapping:", gridData);
//         const newArr = gridData.map((obj) => ({...obj, READY_FOR_RESTOCK_FLAG: "Y" }));
//     console.log("redux newArr after mapping:", newArr);
//     const payloadDetails = {
//   data:  newArr,
//   action: "InventoryWeb",
//     method: "PostPurchaseOrderDetails",
// 	username: "admin",
//     type: "rpc",
//     tid: "144"
// } 
//  sendRequest(apiUrl, 'POST', payload, (data) => getAllTask(data, payloadDetails), token);
console.log("not redux handle save working")
}

useEffect (() => {
  //  const BOQuantity = checkUpdatedQty[index]?.BO_QUANTITY;
  //   const Quantity = checkUpdatedQty[index]?.QUANTITY;
if(formData[0]?.RELEASED_FLAG == 'Y' && gridData[0]?.READY_FOR_RESTOCK_FLAG == 'N'  ){
 sendRequest(apiUrl, 'POST', payload, getAllTask, token);

//     console.log("redux gridData before restock hit mapping:", gridData);
//         const newArr = gridData.map((obj) => ({...obj, READY_FOR_RESTOCK_FLAG: "Y" }));
//     console.log("redux newArr after mapping:", newArr);
//     const payloadDetails = {
//   data:  newArr,
//   action: "InventoryWeb",
//     method: "PostPurchaseOrderDetails",
// 	username: "admin",
//     type: "rpc",
//     tid: "144"
// } 
//  sendRequest(apiUrl, 'POST', payload, (data) => getAllTask(data, payloadDetails), token);
  // sendRequest(apiUrl, 'POST', payload, getAllTask, token)
}
    // else if(Quantity < BOQuantity){
    //   sendRequest(apiUrl, 'POST', payload, getAllTaskPO, token);
    // }
},[formData,gridData])

useEffect (() => {
  if(gridData[0]?.READY_FOR_RESTOCK_FLAG == 'Y'){
console.log("not redux ready for restock effect working",gridData)

  sendRequest(apiUrl, 'POST', payload, getAllTaskR, token)
  }

},[gridData])

  return (
    <div className='flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md'>
    <div className='  flex w-[40%] py-2 '>
      <button onClick={handleSave} className={`bg-customgreen hover:bg-btnHoverGreen rounded-[4px] leading-[24px] p-2 lgdesktop:w-[150px] w-[120px] text-white ${FormStatus == 'NEW' ? 'block' : 'hidden'}`}> Save</button>
      <button onClick={handleRestock} className={`bg-customgreen hover:bg-btnHoverGreen rounded-[4px] leading-[24px] p-2 lgdesktop:w-[150px] w-[120px] text-white ${FormStatus == 'IN PROCESS' ? 'block' : 'hidden'}`}> Restock</button>
      <div className='flex ml-4'>
        <div className='bg-green-400 flex mr-2 p-[2px] h-full'>

        </div>
        <select className='w-[170px] border-b border-b-gray-300 shadow-sm outline-none' name="whereHouse" id="whereHouse">
          <option className="" value="volvo">{supplier}</option>
        </select>
      </div>
    </div>
     <div className=' lg:flex md:hidden sm:hidden hidden w-[100%]   justify-end '>
      <div className='flex '>
        <div className='flex gap-4'>
          <div className='hedden lg:flex md:hidden sm:hidden items-center gap-2'>

            <IoIosSearch className='text-[18px]' />
            Search
          </div>
          <div className='hidden items-center gap-2 lg:flex md:hidden sm:hidden'>
            <BiSortAlt2 className='text-[18px]' />
            Sort
          </div>
          <div className='hidden items-center gap-2 lg:flex mr-1 md:hidden sm:hidden'>
            <BiHide className='text-[18px]' />
            Hide
          </div>
         
        </div>
      </div>


    </div>
    <div className='flex w-[17%]  min-w-fit justify-end gap-2'>
      <div className='flex items-center'>
      <div className='flex items-center gap-2 lg:hidden md:flex sm:flex mt-1'>
            {/* <IoIosMore className='text-[18px]' /> */}
            <HeaderDropDown/>
          </div>
        <div className='border h-fit flex items-center p-1'>

          <IoIosArrowDown className='text-[18px]' />

        </div>
      </div>
      <div className='flex items-center'>
        <div className='border flex items-center h-fit p-1'>

          <IoIosArrowUp className='text-[18px]' />

        </div>
      </div>
      <div className='flex items-center p-1'>

        <FiFilter className='text-[18px]' />

      </div>

      <div className='flex items-center p-1'>

        <IoSettingsOutline className='text-[18px]' />

      </div>
      
    </div>
  </div>
  )
}

export default ReceivingFormHeader