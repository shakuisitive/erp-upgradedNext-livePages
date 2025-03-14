import React, { useState } from "react";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { useSelector } from "react-redux";
import { FaCircleInfo } from "react-icons/fa6";

const PMCostLeft = ({
  unitCostCurrent,
  setUnitCostCurrent,
  unitCostProjected,
  setUnitCostProjected,
  eDateCurrent,
  setEDateCurrent,
  eDateProjected,
  setEDateProjected,
  otherChargesCurrent,
  setOtherChargesCurrent,
  otherChargesProjected,
  setOtherChargesProjected,
  htCodeCurrent,
  setHtCodeCurrent,
  htCodeProjected,
  setHtCodeProjected,
  venIdCurrent,
  setVenIdCurrent,
  venIdProjected,
  setVenIdProjected,
  lCostCurrent,
  setLCostCurrent,
  lCostProjected,
  setLCostProjected,
  isError,
}) => {
  const [isDatePickerF, setIsDatePickerF] = useState(false);
  const [checkDateTo, setCheckDateTo] = useState(false);
  const [isDatePickerT, setIsDatePickerT] = useState(false);

  const vendorList = useSelector((state) => state.commonSlices.getVendor);
  const HTData = useSelector((state) => state.commonSlices.HTData);
  const selectedItemCurrent = HTData.find(
    (item) => item.HT_CODE_ID === htCodeCurrent
  );
  const selectedItemProjected = HTData.find(
    (item) => item.HT_CODE_ID === htCodeProjected
  );

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleUnitCostProjected = (e) => {
    const value = Number(e.target.value);
    setUnitCostProjected(value);
  };

  const handleUnitCostCurrent = (e) => {
    const value = Number(e.target.value);
    setUnitCostCurrent(value);
  };

  const onDateAddFrom = () => {
    setIsDatePickerF(!isDatePickerF);
    // setCheckDateFrom(false);
  };
  const handleBlurDate = () => {};
  const handleEDateCurrent = (date) => {
    setEDateCurrent(date);
    // setCheckDateFrom(false);
  };

  const onDateAddTo = () => {
    setIsDatePickerT(!isDatePickerT);
    setCheckDateTo(false);
  };
  const handleEDateProjected = (date) => {
    setEDateProjected(date);
    setCheckDateTo(false);
  };
  const handleBlurDateT = () => {
    if (!eDateProjected) {
      setCheckDateTo(true);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const handleOtherChargesCurrent = (e) => {
    const value = Number(e.target.value);
    setOtherChargesCurrent(value);
  };

  const handleOtherChargesProjected = (e) => {
    const value = Number(e.target.value);
    setOtherChargesProjected(value);
  };

  const handleChangeHtCodeCurrent = (e) => {
    const value = Number(e.target.value);
    setHtCodeCurrent(value);
  };
  const handleChangeHtCodeProjected = (e) => {
    const value = Number(e.target.value);
    setHtCodeProjected(value);
  };

  const handleChangeVenIdCurrent = (e) => {
    const value = e.target.value;
    setVenIdCurrent(value);
  };

  const handleChangeVenIdProjected = (e) => {
    const value = e.target.value;
    setVenIdProjected(value);
  };

  const handleLCostCurrent = (e) => {
    const value = e.target.value;
    setLCostCurrent(value);
  };

  const handleLCostProjected = (e) => {
    const value = e.target.value;
    setLCostProjected(value);
  };
  // console.log("projected and current", lCostCurrent);
  return (
    <div className="w-full mx-auto bg-[#E1EFF2] rounded-[6px]  border border-customgreen p-10 tablet:w-full">
      <div className="flex items-center justify-center gap-[190px] font-bold mb-[12px]">
        <p></p>
        <p>Current</p>
        <p>Projected</p>
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Preferred Vendor
        </label>
        <UseSelect
          options={vendorList}
          optionKeyId="VEN_ID"
          optionKeyValue="SUPPLIER"
          value={venIdCurrent}
          placeholder="Select Venodr List"
          onChange={handleChangeVenIdCurrent}
        />
        <UseSelect
          options={vendorList}
          optionKeyId="VEN_ID"
          optionKeyValue="SUPPLIER"
          value={venIdProjected}
          placeholder="Select Venodr List"
          onChange={handleChangeVenIdProjected}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Unit Cost <span className="text-red-600">*</span>
        </label>
        <div className="w-full flex flex-col">
          <UseInput
            type="number"
            value={unitCostCurrent}
            onChange={handleUnitCostCurrent}
            placeholder="Add unit cost current"
          />
          {isError && !unitCostCurrent && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Unit cost required</span>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <UseInput
            type="number"
            value={unitCostProjected}
            onChange={handleUnitCostProjected}
            placeholder="Add unit cost projected"
          />
          {isError && !unitCostProjected && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Unit cost required</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          HT Code <span className="text-red-600">*</span>
        </label>
        <div className="w-full flex flex-col">
          <UseSelect
            options={HTData}
            optionKeyId="HT_CODE_ID"
            optionKeyValue="CODE"
            value={htCodeCurrent}
            placeholder={"Select HT code"}
            onChange={handleChangeHtCodeCurrent}
          />
          {isError && !htCodeCurrent && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">HT code required</span>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <UseSelect
            options={HTData}
            optionKeyId="HT_CODE_ID"
            optionKeyValue="CODE"
            value={htCodeProjected}
            placeholder={"Select HT code"}
            onChange={handleChangeHtCodeProjected}
          />
          {isError && !htCodeProjected && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Ht code required</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          HT Description
        </label>
        <UseInput
          type="text"
          placeholder="HT description"
          value={selectedItemCurrent?.DESCRIPTION}
          disabled={true}
        />
        <UseInput
          type="text"
          value={selectedItemProjected?.DESCRIPTION}
          disabled={true}
          placeholder="HT description"
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Duty/LC Code
        </label>
        <UseInput
          type="text"
          value={selectedItemCurrent?.DUTY_LC_CODE}
          disabled={true}
          placeholder="Duty/Lc code"
          //onChange={handleInputChange}
        />
        <UseInput
          type="text"
          value={selectedItemProjected?.DUTY_LC_CODE}
          disabled={true}
          placeholder="Duty/Lc code"
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          ForEx
        </label>
        <UseInput
          type="text"
          placeholder="Forex current"
          value={selectedItemCurrent?.FOREX}
          disabled={true}
        />
        <UseInput
          type="text"
          placeholder="Forex projected"
          value={selectedItemProjected?.FOREX}
          disabled={true}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Transportation Fee
        </label>
        <UseInput
          type="number"
          placeholder="Transporation fee current"
          value={selectedItemCurrent?.TRANSPORATION_FEE}
          disabled={true}
        />
        <UseInput
          type="number"
          placeholder="Transporation fee projected"
          value={selectedItemProjected?.TRANSPORATION_FEE}
          disabled={true}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Overheads
        </label>
        <UseInput
          type="text"
          placeholder="Overheads current"
          value={selectedItemCurrent?.OVERHEADS}
          disabled={true}
        />
        <UseInput
          type="text"
          placeholder="Overheads projected"
          value={selectedItemProjected?.OVERHEADS}
          disabled={true}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Other Charges
        </label>
        <UseInput
          type="number"
          placeholder="Add other charges current"
          value={otherChargesCurrent}
          onChange={handleOtherChargesCurrent}
        />
        <UseInput
          type="number"
          placeholder="Add other charges projected"
          value={otherChargesProjected}
          onChange={handleOtherChargesProjected}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Landed Cost
        </label>
        <UseInput
          type="number"
          value={lCostCurrent}
          placeholder="Add Landed Cost Current"
          onChange={handleLCostCurrent}
        />
        <UseInput
          type="number"
          value={lCostProjected}
          placeholder="Add Landed Cost Projected"
          onChange={handleLCostProjected}
        />
      </div>
      <div className="grid grid-cols-[150px_1fr_1fr] gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Effective Date
        </label>

        <div className="flex flex-col relative">
          <div
            id="date"
            className="bg-white  text-customblack text-sm  block w-full p-2.5 "
            onClick={onDateAddFrom}
            tabIndex={0}
            onBlur={handleBlurDate}
          >
            <div className="flex justify-between items-center w-full">
              <span>
                {eDateCurrent ? formatDate(eDateCurrent) : "MM/DD/YYYY"}
              </span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerF && (
            <div className="absolute right-0 top-[40px]">
              <DatePicker
                onDateChange={handleEDateCurrent}
                setIsDatePicker={setIsDatePickerF}
                setPastYears={0}
              />
            </div>
          )}
          {/* {!kitDateFrom && isError && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )} */}
        </div>

        <div className="flex flex-col relative">
          <div
            id="date"
            className="bg-white  text-customblack text-sm  block w-auto p-2.5"
            tabIndex={0}
            onClick={onDateAddTo}
            onBlur={handleBlurDateT}
          >
            <div className="flex justify-between items-center w-full">
              <span>
                {eDateProjected ? formatDate(eDateProjected) : "MM/DD/YYYY"}
              </span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerT && (
            <div className="absolute right-0 top-[40px]">
              <DatePicker
                onDateChange={handleEDateProjected}
                setIsDatePicker={setIsDatePickerT}
                setPastYears={0}
              />
            </div>
          )}
          {/* {checkDateTo && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )} */}
        </div>
      </div>
    </div>
  );
};

export default PMCostLeft;
