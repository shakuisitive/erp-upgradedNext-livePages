"use client";

import React, { useState , useEffect } from "react";
// 

import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer"



import { GoHome } from "react-icons/go";
import { BiMessageRoundedAdd } from "react-icons/bi";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import ConversationTab from "./supplierConversationTab"
import FileTab from "./supplierFileTab"
import { useDispatch, useSelector } from "react-redux";
const PaymentTermFormModall = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );

  // console.log('get purchase in apply buuton' , dataDetails);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

  const payload = {
    data: data[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: dataDetails,
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const token = localStorage.getItem("tokenSession");

  const dispatch = useDispatch();
  // console.log('modall index' , index);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(openForm(index));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tabs = [
    {
      icon: <GoHome />,
      label: "Update",
      content: (
        <div>
          <ConversationTab data={index}/>
        </div>
      ),
    },
    { 

      label: "File", 
      content: <div>
        <FileTab data={index}/>
      </div> 
      
    },
    { 

      label: "Activity", 
      content: <div>
      
      </div> 
      
    }
  ];

  const getAllTask = (data) => {
    // dispatch(setLotList(data.Result))
  };

  const getProdectDetailRes = (data) => {
    console.log("check response", data);
  };
  const handleApply = () => {
    console.log("Apply is chulling");
    sendRequest(apiUrl, "POST", payload, getAllTask, token);
    sendRequest(
      apiUrlDetails,
      "POST",
      payloadDetails,
      getProdectDetailRes,
      token
    );

    setIsModalOpen(false);
  };

  useEffect(()=>{
    if(closeModall == true){
      setIsModalOpen(false);
      dispatch(setcloseModall(false))
    }
  },[closeModall])


  const [isDrawer, setIsDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawer(true);
  };
   const handleCloseDrawer = () => {
    setIsDrawer(false);
  };


  return (
    <div className="">
      <BiMessageRoundedAdd
       onClick={handleOpenDrawer}
        className="text-[22px] text-[#676879] hover:text-[#579BFC] "
      />
        <RightDrawer isOpen={isDrawer} onClose={handleCloseDrawer} heading={index?.PAYTER_ID} tabs={tabs} />
      <CustomModal
        tabs={tabs}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Purchase Order"
      />
    </div>
  );
};

export default PaymentTermFormModall;
