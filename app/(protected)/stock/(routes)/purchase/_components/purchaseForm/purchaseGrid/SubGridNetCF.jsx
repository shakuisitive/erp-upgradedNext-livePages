import React from "react";
import { useSelector } from "react-redux";

const SubGridNetCF = () => {
  const subGridTotal = useSelector(
    (state) => state.PurchaseSlices.SubGridNetCostT
  );
  const subGridTotalCo = useSelector(
    (state) => state.PurchaseSlices.SubGridCostT
  );

  const displayTotal = subGridTotal > 0 ? subGridTotal : subGridTotalCo;

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subGridTotal);

  return (
    <div className="flex justify-center items-center size-full text-[13px] text-customblack leading-[37px]">
      <div className=" min-w-[70px] w-full">Avg : {formattedTotal}</div>
    </div>
  );
};

export default SubGridNetCF;
