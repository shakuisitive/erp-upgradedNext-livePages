import React from "react";
import { useSelector } from "react-redux";

const PMGridAvlQty = () => {
  const rowData = useSelector((state) => state.pmSlices.partList);
  const activeItems = rowData.filter((item) => item.ACTIVE_FLAG === "Y");
  const sumOH = rowData.reduce(
    (total, item) => total + (item.QTY_AVAILABLE || 0),
    0
  );

  return (
    <div className="text-[14px] text-customblack items-center font-medium py-2">
      {sumOH}
    </div>
  );
};

export default PMGridAvlQty;
