import React from "react";

const ShippingBoxDimensionW = ({ rowData }) => {
  const WDimension = rowData.DIMENSION_W;
  return (
    <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
      {WDimension} cm
    </div>
  );
};

export default ShippingBoxDimensionW;
