import React from "react";
import { useSelector } from "react-redux";

const SubPurchaseGrid = ({ data, rowData }) => {
  // console.log("check rowData grid case in total", rowData);
  const  SubGridCaseValue = useSelector((state) => state.PurchaseSlices.SubGridCaseValue);
   
  return (
    <div className="flex justify-center items-center  size-full text-[13px] text-customblack leading-[37px]">
      <div className="w-full text-center">
        <span className="">{parseFloat(SubGridCaseValue).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default SubPurchaseGrid;