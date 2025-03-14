"use client";
import React, { useState, useEffect } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { GoArchive } from "react-icons/go";
import { IoMdCopy } from "react-icons/io";
import { IoClose, IoExtensionPuzzleOutline } from "react-icons/io5";
import { PiArrowBendRightDown } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRowsInOrder, readySubGridPayLoad, setRefresh, loaderToggle
} from "../redux/Purchase.slice";
import useApiFetch from "../../../../../../customHook/useApiFetch";

function PurchaseSelectedModal({ isOpen, closeModal , checkedItems, checkedSubItems }) {
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getProdectDetailRes = (data) => {
    dispatch(setRefresh(true));
    dispatch(loaderToggle(false));
    closeModal()
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(loaderToggle(true));
      sendRequest(
        apiUrlDetails,
        "POST",
        payload.detailPayload,
        getProdectDetailRes,
        token
      );
    }
  };

  // useEffect(() => {
  //   if (payload != null && isOpen == true) {
  //     sendRequest(
  //       apiUrlPOrder,
  //       "POST",
  //       payload.formPayload,
  //       getAllTaskPOrder,
  //       token
  //     );
  //   }
  // }, [payload]);


  const onDelete = () => {
    sendRequest(
      apiUrlPOrder,
      "POST",
      payload.formPayload,
      getAllTaskPOrder,
      token
    );
    
  }

  const onDeleteHover = () => {
    const checkedItems = {
      Pid: checkedSubItems[0]?.rowData.PURORD_ID,
      items: checkedSubItems,
    }
    dispatch(deleteRowsInOrder(checkedItems))
    dispatch(readySubGridPayLoad({id:checkedSubItems[0]?.rowData.PURORD_ID}))
    
  }

  return (
    <div className={`fixed w-[100vw] z-[100]  bottom-10 ${isOpen ? "block" : "hidden"}`}>
      <div className=" w-[800px] h-[63px] bg-white overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex m-auto">
        <div className="text-[24px] text-white w-[63px] flex justify-center items-center bg-[#0073EA]">
       { checkedItems}
        </div>
        <div className="grow flex ">
          <div className="text-customblack text-[20px] font-thin h-full flex items-center pl-[20px] w-[256px]">
            Purchase Selected
          </div>
          <div className="flex w-[71px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <IoMdCopy className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Duplicate</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <CiFileOn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Export</span>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <GoArchive className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Archive</span>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group" onMouseEnter={() => onDeleteHover()} onClick={() => onDelete()} >
                <RiDeleteBin6Line className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Delete</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <PiArrowBendRightDown className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Convert</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <BsArrowRightCircle className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Move to</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px]">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <IoExtensionPuzzleOutline className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">App</span>
              </div>
            </div>
          </div>
        </div>
        <div onClick={()=> closeModal()} className=" border-l-2 border-l-[#c3c6d4] w-[63px] text-[24px] text-customblack flex justify-center items-center">
          <IoClose />
        </div>
      </div>
    </div>
  );
}

export default PurchaseSelectedModal;
