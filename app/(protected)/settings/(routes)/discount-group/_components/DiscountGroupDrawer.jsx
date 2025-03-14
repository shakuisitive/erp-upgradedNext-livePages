// "use client";

// import React, { useState , useEffect } from "react";

// import { GrExpand } from "react-icons/gr";
// import DiscountGroupForm from "./DiscountGroupForm";
// import { openForm } from "../_redux/DiscountGroupSlice";
// import { useSelector, useDispatch } from "react-redux";
// import useApiFetch from "../../../../../../customHook/useApiFetch";
// import {setcloseModall} from "../_redux/DiscountGroupSlice";
// import { GoHome } from "react-icons/go";
// import DiscountGroupCustomModal from "./DiscountGroupCustomModal";
// //import PurchaseDrawer from "./PurchaseDrawer"

// const OpenDrawer = ({index}) => {

//     const [isModalOpen, setIsModalOpen] = useState(false);
//   let [error, sendRequest] = useApiFetch();

//   const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
//   const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
//   const dataDetails = useSelector(
//     (state) => state.PurchaseSlices.postPurchaseDetail
//   );

//     //add and edit discount information

//   // console.log('get purchase in apply buuton' , dataDetails);

//   const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
//   const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

//   const payload = {
//     data: data[0],
//     action: "InventoryWeb",
//     method: "PostPurchaseOrder",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   const payloadDetails = {
//     data: dataDetails,
//     action: "InventoryWeb",
//     method: "PostPurchaseOrder",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   const token = localStorage.getItem("tokenSession");

//   const dispatch = useDispatch();
// dispatch(openForm(index));
//   // console.log('modall index' , index);
//   const handleOpenModal = () => {

//     setIsModalOpen(true);
//     dispatch(openForm(index));
//   };
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const tabs = [
//     {
//       icon: <GoHome />,
//       label: "Details",
//       content: (
//         <div>
//           <DiscountGroupForm/>
//         </div>
//       ),
//     },
//     { label: "Audit Log", content: <div>Content for Audit Log</div> },
//   ];

//   const getAllTask = (data) => {
//     // dispatch(setLotList(data.Result))
//     // console.log('get purchase in apply buuton', dataDetails);
//   };

//   const getProdectDetailRes = (data) => {
//     console.log("check response", data);
//   };
//   const handleApply = () => {
//     console.log("Apply is chulling");
//     sendRequest(apiUrl, "POST", payload, getAllTask, token);
//     sendRequest(
//       apiUrlDetails,
//       "POST",
//       payloadDetails,
//       getProdectDetailRes,
//       token
//     );

//     setIsModalOpen(false);
//   };

//   useEffect(()=>{
//     if(closeModall == true){
//       setIsModalOpen(false);
//       dispatch(setcloseModall(false))
//     }
//   },[closeModall])
//   return (
//     <div className="">
//         <div   onClick={handleOpenModal} className=" hidden items-center mr-2 group-hover:flex cursor-pointer "><GrExpand className="mr-2" />Open</div>
//         <DiscountGroupCustomModal
//         tabs={tabs}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onClickApply={handleApply}
//         heading="Discount Group"
//       />
//     </div>
//   )
// }

// export default OpenDrawer
