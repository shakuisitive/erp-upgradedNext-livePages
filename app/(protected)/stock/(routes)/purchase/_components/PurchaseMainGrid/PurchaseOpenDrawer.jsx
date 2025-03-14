"use client";

import React, { useState, useEffect } from "react";

import { GrExpand } from "react-icons/gr";

import { openForm } from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const OpenDrawer = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const user_ID = useSelector((state) => state.PurchaseSlices.user_ID);
  let [error, sendRequest] = useApiFetch();
  const [killSId, setKillSId] = useState()

  const postKillScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions`;
  const baseUrlESS = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;
  const postEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostEditScreenSessions`;
  const UrlSTimeOut = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetSessionTimeout`;

  const token = localStorage.getItem("tokenSession");

  const getOpenSession = {
    action: "Inventory",
    data: {
      SOURCE_PK: PurchaseDetails.PURORD_ID?.toString(),
      SOURCE_TABLE: "PURCHASE_ORDER",
      LOGGED_IN_USER_ID: user_ID,
    },
    method: "GetEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const sessionPayload = {
    action: "Inventory",
    data: {
      EDISCRSES_ID: "",
      SOURCE_NO: PurchaseDetails.PO_NUMBER,
      SOURCE_PK: PurchaseDetails.PURORD_ID?.toString(),
      SOURCE_TABLE: "PURCHASE_ORDER",
      USE_ID: user_ID,
    },
    method: "PostEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };
  const killSessionRes = (data) => {
   if(data) {
    console.log('kill ssession')
   }
  };
  const postSessionRes = (data) => {
    const killSessionPayload = {
      action: "Inventory",
      data: { EDISCRSES_ID: data?.Result },
      method: "PostKillScreenSessions",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    if (data) {
      sendRequest(
        postKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        token
      );
    }
  };

  const getSessionRes = (data) => {
    if (data) {
      sendRequest(
        postEditScreenSessions,
        "POST",
        sessionPayload,
        postSessionRes,
        token
      );
    } else {
      // setEMessage(
      //   `Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`
      // );
      // setIsErrorMessage(true);
      alert(`Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`);
    }
  };

  // useEffect(() => {

  // }, [PurchaseDetails.PURORD_ID])

  const dispatch = useDispatch();
  // // console.log('modall index' , index);
  const handleOpenModal = () => {
    dispatch(openForm(index));
    setIsModalOpen(true);
    sendRequest(baseUrlESS, "POST", getOpenSession, getSessionRes, token);
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

export default OpenDrawer;
