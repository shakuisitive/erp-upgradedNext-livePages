"use client";
import React, { useState, useRef } from "react";
import { MdCallSplit } from "react-icons/md";
import SkuModall from "./SkuModall";
import { openSplitModall } from "../../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";

const PurchaseSiplitSubgrid = ({ rowData, index }) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const onClose = () => {
    setOpen(false);
  };
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);

  // // console.log('data and row data', rowData , index);

  const openModall = () => {
    setOpen(true);
    dispatch(openSplitModall(index));
  };
  return (
    <div
      disabled={FormStatus == "Issued to Vendor" ? false : true}
      className=" w-full flex items-center justify-center "
    >
      <MdCallSplit
        onClick={openModall}
        className={`text-green-500 ${
          FormStatus == "Issued to Vendor" ? "block" : "hidden"
        } text-[25px]`}
      />
      <SkuModall
        isOpen={isOpen}
        setOpen={setOpen}
        onClose={onClose}
        cancelButtonRef={cancelButtonRef}
      />
    </div>
  );
};

export default PurchaseSiplitSubgrid;
