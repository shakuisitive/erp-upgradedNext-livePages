import React from "react";
import { useSelector } from "react-redux";

const ReceivingBOTotal = ({ rowData }) => {
  const subGridCellTData = useSelector(
    (state) => state.receivingSlices.subGridCellTData
  );

  return (
    <div className="w-full h-full justify-center items-center text-[14px] text-customblack">
      {subGridCellTData?.BOt}
    </div>
  );
};

export default ReceivingBOTotal;
