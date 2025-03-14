import React from "react";

const ShippingBoxDimensionH = ({ rowData }) => {
  const HDimension = rowData.DIMENSION_H;
  return (
    <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
      {HDimension} cm
    </div>
  );
};

export default ShippingBoxDimensionH;
