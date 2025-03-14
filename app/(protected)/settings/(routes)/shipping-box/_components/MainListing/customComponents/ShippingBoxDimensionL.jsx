import React from "react";

const ShippingBoxDimensionL = ({ rowData }) => {
  const LDimension = rowData.DIMENSION_L;
  return (
    <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
      {LDimension} cm
    </div>
  );
};

export default ShippingBoxDimensionL;
