import React from "react";
import { useSelector } from "react-redux";

const SubGridDisAv = () => {
  const subGridTotal = useSelector(
    (state) => state.PurchaseSlices.SubGridDisAv
  );

  const roundedTotal = !isNaN(subGridTotal) ? subGridTotal.toFixed(2) : "0.00";

  return (
    <div className="min-w-[70px] w-full h-full flex justify-center items-center text-[14px] text-customblack">
      Avg : {roundedTotal}%
    </div>
  );
};

export default SubGridDisAv;
