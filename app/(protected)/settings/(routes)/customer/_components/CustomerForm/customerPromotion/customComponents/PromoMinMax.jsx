import React from "react";

const PromoMinMax = ({ rowData }) => {
  const minQuantity = rowData?.MINIMUM_QUANTITY ?? 0;
  const maxQuantity = rowData?.MAXIMUM_QUANTITY ?? 0;

  const displayValue = `${minQuantity}/${maxQuantity}`;

  return (
    <div className="w-full flex items-center  px-[3px] justify-center ">
      <p className="text-center text-[14px] text-customblack">{displayValue}</p>
    </div>
  );
};

export default PromoMinMax;
