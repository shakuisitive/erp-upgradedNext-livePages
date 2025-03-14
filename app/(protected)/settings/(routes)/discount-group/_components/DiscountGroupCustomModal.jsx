// import React, { useEffect, useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { AiFillUnlock } from "react-icons/ai";
// import { SlArrowDown } from "react-icons/sl";
// import {  useDispatch, useSelector } from "react-redux";
// import CustomModalButton from "./CustomModalButton";
// import { updateDiscountGroup, updateforRefresh } from "../_redux/DiscountGroupSlice";
// import {isObjectsEqul} from "./customFunctions.js"
// import useApiFetch from "../../../../../../customHook/useApiFetch";
// import { send } from "process";
// const DiscountGroupCustomModal = ({ isOpen, onClose, tabs, heading }) => {

//   const dispatch = useDispatch()
//   const [apiResponse,setApiResponse] =useState();

//   const data=useSelector((state)=>state.discountGroup.formData);
//   const prevFormdata=useSelector((state)=>state.discountGroup.prevFormData);
//   let refresh=useSelector((state)=>state.discountGroup.data);

//   //const error=useSelector((state)=>state.discountGroup.error);

// //custom Hook
// let [error,sendRequest]=useApiFetch();

//  // console.log( );

//   const [activeTab, setActiveTab] = useState(0);

//   if (!isOpen) {
//     return null;
//   }

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(tabIndex);
//   };

//   const handleApply = () => {
//     // dispatch(setApply(true))
//   };
//   let isFieldsChanged=isObjectsEqul(data,prevFormdata[0])
//   let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostDiscountGroup";
// let accessToken=localStorage.getItem("tokenSession");
// let getAllTask = (data) =>{
//   dispatch(updateforRefresh(true))
//   setApiResponse(data);
// }
//   const editClickHandler=()=>{
//    if(isFieldsChanged===false){
//     let newdata={
//       data: data,
//       action: "Administration",
//       method: "PostDiscountGroup",
//       username: "testuser",
//       type: "rpc",
//       tid: "144"
//   }
//     sendRequest(url,"POST",newdata,getAllTask,accessToken);
//     onClose();
//     // dispatch(updateDiscountGroup(data));
//     // setInterval(()=>{
//     //
//     // },500)
//    }

//     // !loading &&

//   }

//   const newClickHandler=()=>{

//   }
// console.log("api response",apiResponse)
// console.log("redux",refresh)

//   return (
//     //Main div
//     <div className="fixed   inset-0 z-50  bg-black bg-opacity-50 flex">
//       <div className="relative p-6 bg-white h-[97vh] w-[99%] mx-auto mt-3 rounded-md flex flex-col">
//         {/* headin and cross icon */}
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center">
//           <h1 className="poppins font-medium text-[24px] leading-7 lgdesktop:text-[32px] lgdesktop:leading-10  text-customblack">{heading}</h1>
//           </div>
//           <div className="flex gap-2">
//             <button
//               className="text-gray-600 border border-gray-200 rounded-full"
//               onClick={onClose}
//             >
//               <SlArrowDown className="p-1 text-2xl hover:bg-gray-200 rounded-full" />
//             </button>
//             <button
//               className="flex-col text-gray-600 hover:bg-gray-200 rounded-md"
//               onClick={onClose}
//             >
//               <RxCross1 className="p-1 text-2xl" />
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col">
//           {/* tabs and buttons  */}
//           <div className="flex">
//           {tabs.map((tab, index) => (
//               <React.Fragment key={index} className="">
//                 <div className={`${ activeTab === index ? "border-b-customblue border-b-[2px] pb-[0.8px]":""}`}>
//                   {/* #dcdfec */}
//                 <button
//                   className={`flex items-center  ${
//                     activeTab === index
//                       ? "flex items-center text-[14px]  relative p-[8px] hover:bg-[#dcdfec] rounded-[4px] text-customblack gap-2  after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4]  after:absolute after:right-[0px]"
//                       : "flex items-center text-[14px]  relative p-[8px] hover:bg-[#dcdfec] rounded-[4px] text-customblack gap-2  after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4]  after:absolute after:right-[0px]"
//                   }`}
//                   onClick={() => handleTabClick(index)}
//                 >
//                   {tab.icon}
//                   {tab.label}
//                 </button>

//                 </div>
//               </React.Fragment>
//             ))}
//             <div className="ml-auto flex space-x-1 mb-2">
//               {/* Add your buttons here */}
//             <CustomModalButton label={"apply"} onClick={editClickHandler} flag={isFieldsChanged}/>
//               <button onClick={newClickHandler} className="bg-customgreen hover:bg-btnHoverGreen text-white text-[14px] leading-[24px] px-4 py-2  rounded-[4px]">
//                 Lock
//               </button>
//               {/* <button onClick={handleApply} className="bg-[#6DB4B3] text-white text-xs px-2  rounded-sm">
//                 Apply
//               </button>
//               <button className="bg-[#6DB4B3] text-white text-xs px-2  rounded-sm">
//                 Unlock
//               </button> */}
//             </div>
//           </div>
//           {/* hr line */}
//           <hr className="w-auto border border-gray-300" />
//           {/* tagline */}
//           <div className="text-xs mt-2 text-gray-400">
//             <div className="flex-col">
//               <p className="flex items-center ">
//                 <AiFillUnlock className="mr-2 text-customgreen" />
//                 <span className="font-semibold text-grayBlack text-[14px] leading-6 lgdesktop:text-lg  ">
//                   This product is currently unlocked
//                 </span>
//               </p>
//               <p className="text-grayBlack text-[14px] leading-6 lgdesktop:text-lg ">
//                 Fields with a red aesteric(
//                 <span className="text-red-600">*</span>) are mandatory
//               </p>
//               <p className="text-grayBlack text-[14px] leading-6 lgdesktop:text-lg ">
//                 You have to lock the product before you can edit it. Click &quot;Lock&quot;
//                 to lock the product. Click &quot;Apply&quot; to save the details. Click
//                 &quot;Reset&quot; to revert the last saved state. Once you have completed
//                 the edit, click &quot;Unlock&quot; to release the product lock
//               </p>
//             </div>
//           </div>
//           {/* modal body */}
//           <div className="bg-gray-100 h-[50vh] overflow-auto ">
//             <div className="rounded-sm  ">{tabs[activeTab].content}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiscountGroupCustomModal;

// //***************Modal with tabs********************* */
// // const [isModalOpen, setIsModalOpen] = useState(false);

// //   const openModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //   };
// // const tabs = [
// //     {
// //       icon: <GoHome />,
// //       label: 'Details',
// //       content: <div><PurchaseForm/></div>,
// //     },
// //     {
// //       icon: <SlArrowDown className="pl-2 text-md" />,
// //       label: 'More',
// //       content: <div>Content for More</div>,
// //     },
// //   ];

// // after return()

// {
//   /* <button onClick={handleOpenModal}>Open Modal</button>
//       <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} tabs={tabs} heading="" /> */
// }

// //***************Modal with tabs********************* */
