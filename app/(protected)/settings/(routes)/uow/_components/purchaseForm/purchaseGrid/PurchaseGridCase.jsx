import React from "react";

const PurchaseGridCase = ({ data, rowData }) => {
  // console.log("check rowData grid case in total", rowData);

  const caseVal = rowData?.QUANTITY / rowData?.CONVERSION_INTO_STOCKING_UOM;
  const roundValue = Math.round(caseVal)
   
  return (
    <div className="flex justify-center items-center  size-full text-[13px] text-customblack leading-[37px]">
      <div className="w-full text-center">
        <span className="">{roundValue}.00</span>
      </div>
    </div>
  );
};

export default PurchaseGridCase;
