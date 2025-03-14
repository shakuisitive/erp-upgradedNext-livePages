import React from "react";

const PromoValue = ({ rowData }) => {
  const displayValue =
    rowData?.PROMO_BASED_ON === "PERCENT"
      ? `${rowData?.PROMO_PERCENTAGE}%`
      : `$${rowData?.PROMO_VALUE}`;
  return (
    <div className="w-full flex items-center  px-[3px] justify-center ">
      <p className="text-center text-[14px] text-customblack">{displayValue}</p>
    </div>
  );
};

export default PromoValue;
