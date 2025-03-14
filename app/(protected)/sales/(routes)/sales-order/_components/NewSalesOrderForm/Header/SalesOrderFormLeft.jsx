import React from "react";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";

const SalesOrderFormLeft = () => {
  const options = [{ label: "hello" }];
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_50%_10%_auto]  mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Customer <span className="text-red-600">*</span>
        </label>
        <UseSelect
          options={options}
          optionKeyId="label"
          optionKeyValue="label"
          // value={kitWarId}
          // onChange={handleWarId}

          placeholder="Please Select"
        />
        <div></div>
        <UseInput type="number" placeholder="MASS" id="" />
      </div>
      <div className="grid grid-cols-[170px_50%_10%_auto]  mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Inventory <span className="text-red-600">*</span>
        </label>
        <UseSelect
          options={options}
          optionKeyId="label"
          optionKeyValue="label"
          // value={kitWarId}
          // onChange={handleWarId}

          placeholder="Please Select"
        />
        <div></div>
        <UseInput type="number" placeholder="GROUP" id="" />
      </div>
      <div className="grid grid-cols-[170px_50%_10%_auto]  mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Distribution <span className="text-red-600">*</span>
        </label>
        <UseSelect
          options={options}
          optionKeyId="label"
          optionKeyValue="label"
          // value={kitWarId}
          // onChange={handleWarId}

          placeholder="Please Select"
        />
        <div></div>
        <UseInput type="number" placeholder="" id="" />
      </div>
    </div>
  );
};

export default SalesOrderFormLeft;
