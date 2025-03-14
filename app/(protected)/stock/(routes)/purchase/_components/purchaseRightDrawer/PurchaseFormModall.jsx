"use client";

import React, { useState , useEffect } from "react";
// 
import { TbDeviceIpadHorizontalPlus } from "react-icons/tb";

import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer"



// import RightDrawer from "../../../../../components/misc/rightdrawer/RightDrawer";
import PurchaseDrawer from './PurchaseDrawer'
import { GoHome } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { GrHomeRounded } from "react-icons/gr";
// import ConversationTab from '../../../../../../components/misc/rightdrawer/ConversationTab'
// import File from '../../../../../../components/misc/rightdrawer/File'
import PurchaseConversationTab from "./PurchaseConversationTab";
import ConversationTab from "../../../../../../../components/misc/pureComponents/rightdrawer/ConversationTab";
import PurchaseFileTab from "./PurchaseFileTab";
const PurchaseFormModall = ({ index }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // let [error, sendRequest] = useApiFetch();

  // const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  // const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
  // const dataDetails = useSelector(
  //   (state) => state.PurchaseSlices.postPurchaseDetail
  // );

  // // // console.log('get purchase in apply buuton' , dataDetails);

  // const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  // const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

  // const payload = {
  //   data: data[0],
  //   action: "InventoryWeb",
  //   method: "PostPurchaseOrder",
  //   username: "admin",
  //   type: "rpc",
  //   tid: "144",
  // };

  // const payloadDetails = {
  //   data: dataDetails,
  //   action: "InventoryWeb",
  //   method: "PostPurchaseOrder",
  //   username: "admin",
  //   type: "rpc",
  //   tid: "144",
  // };

  // const token = localStorage.getItem("tokenSession");

  // const dispatch = useDispatch();
  // // // console.log('modall index' , index);
  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  //   dispatch(openForm(index));
  // };
  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  // const tabs = [
  //   {
  //     icon: <GoHome />,
  //     label: "Details",
  //     content: (
  //       <div>
  //         <PurchaseForm />
  //       </div>
  //     ),
  //   },
  //   { label: "Audit Log", content: <div>Content for Audit Log</div> },
  // ];

  // const getAllTask = (data) => {
  //   // dispatch(setLotList(data.Result))
  // };

  // const getProdectDetailRes = (data) => {
  //   // console.log("check response", data);
  // };
  // const handleApply = () => {
  //   // console.log("Apply is chulling");
  //   sendRequest(apiUrl, "POST", payload, getAllTask, token);
  //   sendRequest(
  //     apiUrlDetails,
  //     "POST",
  //     payloadDetails,
  //     getProdectDetailRes,
  //     token
  //   );

  //   setIsModalOpen(false);
  // };

  // useEffect(()=>{
  //   if(closeModall == true){
  //     setIsModalOpen(false);
  //     dispatch(setcloseModall(false))
  //   }
  // },[closeModall])


  const [isDrawer, setIsDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawer(true);
  };
   const handleCloseDrawer = () => {
    setIsDrawer(false);
  };
  // const tabs = [
  //   {
  //     icon: <GoHome />,
  //     label: 'Details',
  //     content: <div><PurchaseDrawer btnText="Add New Product"/></div>,
  //   },
  //   {
  //     icon: <SlArrowDown className="pl-2 text-md" />,
  //     label: 'More',
  //     content: <div>Content for More</div>,
  //   },
  // ];
    const tabs = [
    {
      label: "Updates",
      icon: <GrHomeRounded  className="text-customIcon text-[14px]"/>,
      content: <PurchaseConversationTab data={index}/>
    },
    {
      label: "Files",
      content: <PurchaseFileTab data={index}  />
    },
    {
      label: "Activity Log",
       content: <div>this is activity content</div>
    }
  ]

  return (
    <div className="">
      <BiMessageRoundedAdd
       onClick={handleOpenDrawer}
        className="text-[22px] text-[#676879] hover:text-[#579BFC] "
      />
        <RightDrawer data={index} isOpen={isDrawer} onClose={handleCloseDrawer} heading={index?.PO_NUMBER} tabs={tabs} />
      {/* <CustomModal
        tabs={tabs}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Purchase Order"
      /> */}
    </div>
  );
};

export default PurchaseFormModall;
