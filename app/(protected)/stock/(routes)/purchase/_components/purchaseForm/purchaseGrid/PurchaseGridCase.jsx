import React from "react";

const PurchaseGridCase = ({ data, rowData }) => {
  const caseVal = rowData?.QUANTITY / rowData?.CONVERSION_INTO_STOCKING_UOM;

  return (
    <div className="flex justify-center items-center  size-full text-[13px] text-customblack leading-[37px]">
      <div className="w-full text-center">
        <span className="">{parseFloat(caseVal).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PurchaseGridCase;
