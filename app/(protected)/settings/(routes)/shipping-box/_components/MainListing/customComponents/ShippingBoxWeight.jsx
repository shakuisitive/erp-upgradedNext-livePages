import React from "react";

const ShippingBoxWeight = ({ rowData }) => {
  const Weight = rowData.WEIGHT;
  const WeightUnit = rowData.WEIGHT_UNIT;

  const Combined = `${Weight} ${WeightUnit}`;
  return (
    <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
      {Combined}
    </div>
  );
};

export default ShippingBoxWeight;
