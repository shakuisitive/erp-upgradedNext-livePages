import React from "react";
import { useSelector } from "react-redux";

const PMGridOHQty = () => {
  const rowData = useSelector((state) => state.pmSlices.partList);
  const activeItems = rowData.filter((item) => item.ACTIVE_FLAG === "Y");
  const sumOH = rowData.reduce(
    (total, item) => total + (item.OH_QUANTITY || 0),
    0
  );

  return (
    <div className="text-[14px] text-customblack font-medium py-2">{sumOH}</div>
  );
};

export default PMGridOHQty;
