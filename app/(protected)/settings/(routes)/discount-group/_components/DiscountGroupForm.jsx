// 'use client'
// import React, { useEffect, useState } from 'react'

// import moment from 'moment'

// import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoIosSearch } from 'react-icons/io'
// import { BsPersonCircle } from 'react-icons/bs'
// import { FiFilter } from 'react-icons/fi'
// import { BiHide, BiSortAlt2 } from 'react-icons/bi'
// import { IoSettingsOutline } from 'react-icons/io5'
// import { MdEdit } from 'react-icons/md'
// import { FaRegEye } from "react-icons/fa";
// import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

// import ModalOpen from '../../../../../../components/misc/pureComponents/GridTable/ModalOpen'
// import Tooltip from '../../../../../../components/misc/pureComponents/tooltip/Tooltip'
// import InputTextEut from '../../../../../../components/misc/pureComponents/textinput/InputTextEut'
// import DiscountGroupFormHeader from './DiscountGroupFormHeader'
// import DiscountGroupGrid from './DiscountGroupGrid'
// import TextArea from '../../../../../../components/misc/pureComponents/textinput/TextArea'
// import { Switch } from '@headlessui/react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setFormData, setValidCode, validateCode } from '../_redux/DiscountGroupSlice'
// import { useRouter } from 'next/navigation'
// import useApiFetch from '../../../../../../customHook/useApiFetch'
// // import TooltipStatus from '../../../../stock/(routes)/purchase/_components/PurchaseTooltip'
// // import PhoneNumber from './GridTable/PhoneNumber'

// import DiscountGroupFormStatus from "./DiscountGroupFormStatus";
// const DiscountGroupForm = (prop) => {

//   let router=useRouter();

// let data=useSelector(state=>state.discountGroup.drawerFormData)

// let dispatch=useDispatch();
//   const [enabled, setEnabled] = useState(false);
//   const [enabledCode,setEnabledCode]=useState(true);

// const [code,setCode]=useState(data.CODE);

// const [name,setName]=useState(data.NAME);
// const [descountPercent,setDescountPercent]=useState(data.DISCOUNT_PERCENTAGE);

// const [desc,setDesc]=useState(data.DESCRIPTION);

// const [status,setStatus]=useState(data.ACTIVE_FLAG);

// const [dgrp,setDgrp]=useState(data.DISGRP_ID);

// let responseFormData=useSelector(state=>state.discountGroup.data);
// useEffect(()=>{

//   if(responseFormData.CODE==="SUCCESS"){
//    //
//   }
// },[])

//   const [head, setHead] = useState([{ title: 'SubItem', slector: 'SubItem', Wid: 250, customComp: ModalOpen }, { title: 'Part', slector: 'Part', Wid: 120 }, { title: 'Cost', slector: 'Cost', Wid: 100 }, { title: 'LastCost', slector: 'LastCost', Wid: 120 }, { title: 'OhQty', slector: 'OhQty', Wid: 120 }, { title: 'OrderQty', slector: 'OrderQty', Wid: 120 }, { title: 'UOM', slector: 'UOM', Wid: 120 }, { title: 'Conv', slector: 'Conv', Wid: 120 }, { title: 'CaseQty', slector: 'CaseQty', Wid: 120 }, { title: 'Split', slector: 'Split', Wid: 120 }, { title: 'Batch', slector: 'Batch', Wid: 120 }, { title: 'Expiry', slector: 'Expiry', Wid: 120 }])
//   const [row, setRow] = useState([{ SubItem: "item 1", Part: "NV325423", Cost: "$34.32", LastCost: '$25.34', OhQty: "500", OrderQty: "200", UOM: "EA", Conv: "12", CaseQty: "16.66", Split: "", Batch: "98569323", Expiry: "Jan 24 , 2026" }, { SubItem: "item 1", Part: "NV325423", Cost: "$34.32", LastCost: '$25.34', OhQty: "500", OrderQty: "200", UOM: "EA", Conv: "12", CaseQty: "16.66", Split: "", Batch: "98569323", Expiry: "Jan 24 , 2026" },])

//       const [item, setItem] = useState("Working on it");
//       const [itemPriority, setItemPriority] = useState("High")

//       //check if code valid or not
//       const [apiResponse,setApiResponse]=useState();
//       let [error,sendRequest]=useApiFetch();

//      let getAllTask=(data)=>{

//         setApiResponse(data);
//         dispatch(setValidCode(data));
//      }
//      let valideCode=useSelector(state=>state.discountGroup.code)
//      let loading=useSelector(state=>state.discountGroup.loading);
//      let value= !loading && valideCode.Result
//      console.log("code",value && value[0].VALIDATION_RESULT);

//       //changehandlers
//       const handleCodeChange = (e) => {

//         let newdata={
//           data: {
//               TYPE: "DISCOUNT_GROUP_CODE",
//               CODE:e.target.value
//           },
//           action: "InventoryWeb",
//           method: "GetCodeUniqueValidation",
//           username: "testuser",
//           type: "rpc",
//           tid: "144"
//       }
//      dispatch(validateCode(newdata));
//       setCode(e.target.value);

//       };

//       const handleNameChange = (e) => {
//         setName(e.target.value);
//       };

//       const handleDiscountPercentChange = (e) => {
//         setDescountPercent(e.target.value);
//       };

//       const handleDescChange = (e) => {
//         setDesc(e.target.value);
//       };

//       const handleStatusChange = (value) => {
//         setStatus(value);
//       };

//       const formData = {
//         CODE: code,
//         NAME: name,
//         DISCOUNT_PERCENTAGE: descountPercent,
//         DESCRIPTION: desc,
//         ACTIVE_FLAG: status,
//         DISGRP_ID: dgrp,
//       };
//       dispatch(setFormData(formData));

//       // Submit formData to your API

//    const newClickHandler=()=>{
//      setCode('');
//      setName('');
//      setDescountPercent('');
//      setDesc('');
//      setStatus('');
//      setEnabledCode(false);

//    }
//   return (
//     <div className='  h-[98%] mt-[4px] gap-2   flex     rounded-lg'>

//     <div className='  flex flex-col  border lgdesktop:w-[75%]   desktop:w-[70%] laptop:w-[60%] tablet:w-[50%] rounded-md bg-white' >

//     <DiscountGroupFormHeader onClick={newClickHandler}/>
//       <div className='py-1 w-full bg-gray-100'></div>

//       <div className='w-full  h-[20vh] bg-white grow overflow-auto  p-2'>

//           {/* <GridTable head={head} row={row} setHead={setHead} /> */}
//           <DiscountGroupGrid/>

//       </div>
//     </div>

//     <div className='px-4 border lgdesktop:w-[25%]  bg-white desktop:w-[30%] laptop:w-[40%] tablet:w-[50%]  rounded-md shadow-md shadow-gray-200 py-5'  >
//       <div className='flex items-center justify-between'>
//         <div className='flex gap-2'>
//           <Tooltip content='Edit'>
//             <MdEdit className='text-[30px] shadow-md text-gray-500  bg-white rounded-lg cursor-pointer p-1 hover:text-purple-500  hover:bg-purple-100' />
//           </Tooltip>
//           <Tooltip content='Perview'>
//             <FaRegEye className='text-[30px] rounded-lg shadow-md text-gray-500 cursor-pointer p-1 bg-white hover:text-sky-500  hover:bg-sky-100' />
//           </Tooltip>
//           <Tooltip content='Export'>
//             <HiOutlineDocumentArrowDown className='text-[30px] cursor-pointer rounded-lg shadow-md text-gray-500 p-1 bg-white hover:text-indigo-500  hover:bg-indigo-100' />
//           </Tooltip>
//         </div>

//         <div className=''>
//             <p className='H text-gray-800   text-[20px]'>{data.DISGRP_ID}</p>
//             <p className='H text-gray-500  text-right '> {moment(data.DISCOUNT_GROUP_DATE).format("MMMM D, YYYY")}</p>

//         </div>
//       </div>

//       <div className='w-full mt-4 flex justify-center'>
//       <div className={`w-full max-w-[430px] ${status=="Y"?"bg-green-400":"bg-red-400"} text-white flex justify-center items-center font-semibold py-2 rounded-full`}>
//               <DiscountGroupFormStatus content={status} statusClick={handleStatusChange}>

//                 <p>
//                   {status=="Y"?"Active":"Inactive"}

//                 </p>
//               </DiscountGroupFormStatus>

//             </div>
//       </div>

//       <InputTextEut onChange={handleCodeChange} name={"CODE"} label="CODE" placeHolder='CODE' isDisabled={enabledCode} value={code}/>
//           {
//             value && value[0].VALIDATION_RESULT==="FALSE"?(<span className='text-red-500'>code already exists</span>):""
//           }

//           <InputTextEut onChange={handleNameChange} name={"NAME"} label="Name" placeHolder='Name' isDisabled={enabled}  value={name}/>
//           <InputTextEut onChange={handleDiscountPercentChange} name={"DISCOUNT_PERCENTAGE"} label="Discount Percentage" placeHolder='Discount Percentage' isDisabled={enabled} value={descountPercent}/>

//         <TextArea onChange={handleDescChange} name={"DESCRIPTION"} label="Descripiton" placeHolder='Descripiton' value={desc}/>
//         {/* <TextInput label="Phone #" isDisabled={true} /> */}
//         {/* <TextInput label="Fax" isDisabled={true} />
//         <TextInput label="Email" isDisabled={true} /> */}

//         {/* // <TextInput label="Name"/> */}
//     </div>

// </div>

//   )
// }

// export default DiscountGroupForm
