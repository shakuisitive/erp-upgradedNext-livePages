"use client";

import React, { useState, useEffect } from "react";
// import { BiMessageSquareAdd } from "react-icons/bi";
import { GoHome } from "react-icons/go";
// import PurchaseForm from '../../../../../../components/misc/PurchaseForm'
import ReceivingForm from "./ReceivingForm";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
// import { TbDeviceIpadHorizontalPlus } from 'react-icons/tb';
import { GrExpand } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { openForm, setRefresh } from "../redux/receivingSlices";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { setcloseModal } from "../redux/receivingSlices";

const ReceivingFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const dispatch = useDispatch();

  // const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const formData = useSelector((state) => state.receivingSlices.postReceiving);
  const gridData = useSelector(
    (state) => state.receivingSlices.postReceivingDetail
  );
  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );

  const apiUrlGR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;
 

  const payload = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      OFFSET: "+5:00"
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
  };

  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const getAllTask = (data) => {};

  const handleOpenModal = () => {
    sendRequest(apiUrlGR, "POST", payload, getAllTask, token);
    dispatch(openForm(index));
    setIsModalOpen(true);
  };

  return (
    <div className="ml-2">
      <div
        onClick={handleOpenModal}
        className=" hidden items-center mr-2  group-hover:flex cursor-pointer "
      >
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default ReceivingFormModal;
