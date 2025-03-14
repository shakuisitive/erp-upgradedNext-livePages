import React from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";

const SalesOrderFormRight = () => {
  const options = [{ label: "hello" }];

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          PO#
        </label>
        <UseInput
          type="text"
          isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder=" PO #"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Tacking#
        </label>
        <UseInput
          type="text"
          isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder=" Tracking #"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Reference#
        </label>
        <UseInput
          type="text"
          isRequired={true}
          // value={kitBarcode}
          // onChange={handleBarcode}
          placeholder=" Reference #"
        />
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[170px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Ship to
          </label>
          <div className="grid grid-cols-[auto] text-[14px] gap-4 relative">
            <UseSelect
              options={options}
              optionKeyId="label"
              optionKeyValue="label"
              // value={uow}
              // onChange={handleSelectSWUoW}
              placeholder="please select"
            />
          </div>
        </div>
        <div className="grid grid-cols-[170px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Bill to
          </label>
          <div className="grid grid-cols-[auto] text-[14px] gap-4 relative">
            <UseSelect
              options={options}
              optionKeyId="label"
              optionKeyValue="label"
              // value={uowSW}
              // onChange={handleSelectSWUoW}
              placeholder="please select"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderFormRight;
