import React, { useState } from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";

const PMPriceQtyDisc = () => {
  const [rowCount, setRowCount] = useState(1);

  const addRow = () => {
    setRowCount((prevCount) => prevCount + 1);
  };
  return (
    <div className="w-full mx-auto bg-[#E1EFF2] rounded-[6px] border border-customgreen p-10 tablet:w-full">
      <div className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] gap-[18px] mb-[12px] text-center text-[15px] font-semibold text-[#009BC6]">
        <p></p>
        <p>Min Qty</p>
        <p>Max Qty</p>
        <p>Step Qty</p>
        <p>Profit %</p>
        <p>List Price</p>
      </div>

      {[...Array(rowCount)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[150px_1fr_1fr_1fr_1fr_1fr] gap-[18px] mb-[12px]"
        >
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor={`unitCost_${index}`}
          >
            Discount Option {index + 1}
          </label>
          <UseInput type="text" id={`unitCost_${index}`} />
          <UseInput type="text" />
          <UseInput type="text" />
          <UseInput type="text" />
          <UseInput type="text" />
        </div>
      ))}

      <div className="grid grid-cols-[150px_1fr] gap-[18px] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="code"
        ></label>
        <button className="text-left" onClick={addRow}>
          Add+
        </button>
      </div>
    </div>
  );
};

export default PMPriceQtyDisc;
