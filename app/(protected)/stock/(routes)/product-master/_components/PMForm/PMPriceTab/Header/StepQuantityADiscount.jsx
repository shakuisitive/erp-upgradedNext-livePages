import React from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";

const StepQuantityADiscount = () => {
  return (
    <div className="  flex gap-5 sm:w-full  flex-col sm:h-full items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-6 ">
      <div className="flex justify-center gap-48 ml-20 w-full items-center">
        {/* <p> </p> */}
        <p className="text-blue-600 font-medium">Min Qty</p>
        <p className="text-blue-600 font-medium">Max Qty</p>
        <p className="text-blue-600 font-medium">Step Qty</p>
        <p className="text-blue-600 font-medium">Profit %</p>
        <p className="text-blue-600 font-medium">List Price</p>
      </div>

      <div className="flex justify-between items-center w-full gap-10">
        <p className="w-full font-[500] text-[14px]">Discount Option 1</p>
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
      </div>

      <div className="flex justify-between items-center w-full gap-10">
        <p className="w-full font-[500] text-[14px]">Discount Option 1</p>
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
      </div>
      <div className="flex justify-between items-center w-full gap-10">
        <p className="w-full font-[500] text-[14px]">Discount Option 1</p>
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
        <UseInput />
      </div>
    </div>
  );
};

export default StepQuantityADiscount;
