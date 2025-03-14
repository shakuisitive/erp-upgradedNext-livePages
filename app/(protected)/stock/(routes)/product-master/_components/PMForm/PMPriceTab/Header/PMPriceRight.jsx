import React from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";

const PMPriceRight = ({
  lastPrice,
  setLastPrice,
  averagePrice,
  setAveragePrice,
  standeredPrice,
  setStanderedPrice,
  note,
  setNote
}) => {
  const handleChangeLastPrice = (e) => {
    const value = Number(e.target.value);
    setLastPrice(value);
  };

  const handleChangeAveragePrice = (e) => {
    const value = Number(e.target.value);
    setAveragePrice(value);
  };

  const handleChangeStanderedPrice = (e) => {
    const value = Number(e.target.value);
    setStanderedPrice(value);
  };

  const handleAddNote = (e) => {
    const value = e.target.value;
    setNote(value);
  };

  return (
    <div className="gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen p-8">
      <div className="grid grid-cols-[190px_auto] mb-[12px] mt-4">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="lastPrice">
          Last Price
        </label>
        <div className="w-full relative">
          <UseInput
            type="number"
            placeholder="Last cost"
            value={lastPrice}
            onChange={handleChangeLastPrice}
          />
          <span className="px-4  bg-slate-300 absolute right-2 top-2 cursor-pointer">
            History
          </span>
        </div>
      </div>
      <div className="flex items-center gap-8 mt-4">
        <div className="flex items-center mb-[12px]">
          <label
            className="min-w-[190px] p-[8px] font-[500] text-[14px]"
            htmlFor="averagePrice"
          >
            Average Price
          </label>
          <UseInput
            type="text"
            placeholder="Average price"
            value={averagePrice}
            onChange={handleChangeAveragePrice}
          />
        </div>
        <div className="grid grid-cols-[100px_auto] mb-[12px]">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="stdPrice">
            Std Price
          </label>
          <UseInput
            type="text"
            placeholder="Standered price"
            value={standeredPrice}
            onChange={handleChangeStanderedPrice}
          />
        </div>
      </div>
      <div className="grid grid-cols-[190px_auto] mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="glGroup">
          GL Group
        </label>
        <UseSelect
          id="mySelect"
          options={[]}
          optionKeyId="value"
          optionKeyValue="label"
          //onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[190px_auto] mb-[12px] relative">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="glaC">
          GLA/C#
        </label>
        <UseSelect
          id="mySelect"
          options={[]}
          optionKeyId="value"
          optionKeyValue="label"
          //onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[190px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="notes">
          Notes
        </label>
        <textarea className="px-3 py-1" name="notes" placeholder="Add note" value={note} onChange={handleAddNote} />
      </div>
    </div>
  );
};

export default PMPriceRight;
