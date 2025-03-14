import React from "react";

import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { FaAngleDown } from "react-icons/fa";
import { FaCircleInfo, FaPencil } from "react-icons/fa6";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { useSelector } from "react-redux";
import { set } from "date-fns";
const PMCostRight = ({
  uomId,
  setUomId,
  currency,
  setCurrency,
  conversion,
  setConversion,
  replenishment,
  setReplenishment,
  averageCost,
  setAverageCost,
  standeredCost,
  setStanderedCost,
  lastCost,
  setLastCost,
  note,
  setNote,
  isLocal,
  setIsLocal,
  isInternational,
  setIsInternational,
  country,
  setCountry,
  isError
}) => {
  const getUoM = useSelector((state) => state.commonSlices.getUoM);
  const options = [
    { id: 1, label: "USD" },
    { id: 2, label: "Vanilla" },
    { id: 3, label: "Strawberry" },
  ];

  const countryList = [
    { id: 1, label: "Canada" },
    { id: 2, label: "United States" }
  ];
  const handleSelectUomId = (e) => {
    const value = e.target.value;
    setUomId(value);
  };

  const handleSelectCurrency = (e) => {
    const value = e.target.value;
    setCurrency(value);
  };

  const handleChangeConversion = (e) => {
    const value = e.target.value;
    setConversion(value);
  };

  const handleChangeReplenishment = (e) => {
    const value = e.target.value;
    setReplenishment(value);
  };

  const handleChangeLastCost = (e) => {
    const value = Number(e.target.value);
    setLastCost(value);
  };

  const handleChangeAverageCost = (e) => {
    const value = Number(e.target.value);
    setAverageCost(value);
  };

  const handleChangeStanderedCost = (e) => {
    const value = Number(e.target.value);
    setStanderedCost(value);
  };

  const handleAddNote = (e) => {
    const value = e.target.value;
    setNote(value);
  };

  const handleIsLocal = (e) => {
    const value = e.target.checked
    setIsLocal(value)
  }

  const handleIsInternational = (e) => {
    const value = e.target.checked
    setIsInternational(value)
  }
   const handleSelectCountry = (e) =>{
      const value = e.target.value
      setCountry(value)
   }
  

  return (
    <div className="w-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border p-10 tablet:w-full">
      <div className="grid grid-cols-[140px_1fr_1fr_1fr] gap-[18px] mb-[12px] ">
        <label className="p-[8px] text-[14px] font-bold" htmlFor="code">
          Source <span className="text-red-600">*</span>
        </label>
        <div className="w-full">
        <div className="flex items-center gap-[12px] mr-5">
          <label className="p-[8px] text-[14px] font-bold" htmlFor="code">
            Local
          </label>
          <UseInput type="checkbox" checked={isLocal ? true :false} onChange={handleIsLocal} />
        </div>
          {isError && (!isLocal && !isInternational) && (
          <div className="items-center flex gap-2  text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">source is required</span>
          </div>
        )}
        </div>
        <div className="w-full">
        <div className="flex items-center gap-[12px]">
          <label className="p-[8px] text-[14px] font-bold" htmlFor="code">
            International
          </label>
         
         <UseInput type="checkbox" checked={isInternational ? true :false}  onChange={handleIsInternational} />
        </div>
          {isError && (!isInternational && !isLocal) && (
          <div className="items-center flex gap-2  text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500 ">source is required</span>
          </div>
        )}
         
        </div>
      </div>
      <div className="grid grid-cols-[140px_1.4fr_120px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Currency
        </label>
        <UseSelect
          options={options}
          optionKeyId="label"
          optionKeyValue="label"
          value={currency}
          onChange={handleSelectCurrency}
          placeholder={"Select Currency"}
        />
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Last Order QTY
        </label>
        <UseInput type="text" id="" />
      </div>
      <div className="grid grid-cols-[140px_1.4fr_120px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Order UoM
        </label>
        <UseSelect
          options={getUoM}
          optionKeyId="UOM_ID"
          optionKeyValue="CODE"
          value={uomId}
          onChange={handleSelectUomId}
          placeholder={"Select UOM"}
        />
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Conversion
        </label>
        <UseInput
          type="text"
          placeholder="Add conversion"
          value={conversion}
          onChange={handleChangeConversion}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Replenishment
        </label>
        <UseInput
          type="text"
          placeholder="Add replenishment"
          value={replenishment}
          onChange={handleChangeReplenishment}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country Of Origin
        </label>
        <UseSelect
          options={countryList}
          optionKeyId="lable"
          optionKeyValue="label"
          value={country}
          placeholder='Select Country'
          onChange={handleSelectCountry}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Last Vendor
        </label>
        <UseSelect
          id="mySelect"
          options={options}
          optionKeyId="value"
          optionKeyValue="label"
          //onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Last Cost
        </label>
        <UseInput
          type="number"
          placeholder="0.00"
          value={lastCost}
          onChange={handleChangeLastCost}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr_auto_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Average Cost
        </label>
        <UseInput
          type="number"
          placeholder="0.00"
          value={averageCost}
          onChange={handleChangeAverageCost}
        />
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Std Cost
        </label>
        <UseInput
          type="number"
          placeholder="0.00"
          value={standeredCost}
          onChange={handleChangeStanderedCost}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          GL Group
        </label>
        <UseSelect
          id="mySelect"
          options={options}
          optionKeyId="value"
          optionKeyValue="label"
          //onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          GL A/C#
        </label>
        <UseSelect
          id="mySelect"
          options={options}
          optionKeyId="value"
          optionKeyValue="label"
          //onChange={handleSelectChange}
        />
      </div>
      <div className="grid grid-cols-[140px_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Notes
        </label>
        <textarea
          id="code"
          className="bg-white focus:outline-none focus:unset h-[80px] border-b py-[8px] pl-[12px] pr-[36px]"
          placeholder="Add note"
          value={note}
          onChange={handleAddNote}
        />
      </div>
    </div>
  );
};

export default PMCostRight;
