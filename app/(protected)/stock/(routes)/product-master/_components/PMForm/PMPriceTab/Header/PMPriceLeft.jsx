import React, { useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";

const PMPriceLeft = ({
  eDateCurrent,
  setEDateCurrent,
  eDateProjected,
  setEDateProjected,
  profitMCurrent,
  setProfitMCurrent,
  profitMProjected,
  setProfitMProjected,
  lPriceCurrent,
  setLPriceCurrent,
  lPriceProjected,
  setLPriceProjected,
}) => {
  const [isDatePickerF, setIsDatePickerF] = useState(false);
  const [checkDateTo, setCheckDateTo] = useState(false);
  const [isDatePickerT, setIsDatePickerT] = useState(false);

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

  const handleChangeProfitMCurrent = (e) => {
    const value = Number(e.target.value);
    setProfitMCurrent(value);
  };

  const handleChangeProfitMProjected = (e) => {
    const value = Number(e.target.value);
    setProfitMProjected(value);
  };

  const handleChangeLPriceCurrent = (e) => {
    const value = Number(e.target.value);
    setLPriceCurrent(value);
  };

  const handleChangeLPriceProjected = (e) => {
    const value = Number(e.target.value);
    setLPriceProjected(value);
  };

  return (
    <div className=" bg-blackflex gap-10 sm:w-full flex-col sm:h-full items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3 ">
      <div className="grid grid-cols-[190px_auto]  mb-4 p-4">
        <label className=" font-[500] text-[14px]" htmlFor="code"></label>
        <div className="flex justify-between w-[100%]">
          <div className="w-[75%]">
            <label
              className="p-[90px]  text-[14px] text-black font-bold"
              htmlFor="code"
            >
              Current
            </label>
          </div>

          <div className="w-[25%]">
            <label
              className="p-[8px]  text-[14px] flex text-black font-bold"
              htmlFor="code"
            >
              Projected
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[190px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Landed Cost
        </label>

        <div className="flex justify-between w-[100%]">
          <div className="w-[40%] ">
            <UseInput type="text" placeholder="0.00" />
          </div>
          <div className="w-[40%]">
            <UseInput type="text" placeholder="0.00" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[190px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Profit Margin
        </label>
        <div className="flex justify-between  w-[100%]">
          <div className="w-[40%] input-container">
            <UseInput
              type="number"
              placeholder="0.00"
              step={"0.01"}
              inputClassName={"profit-input"}
              value={profitMCurrent}
              onChange={handleChangeProfitMCurrent}
            />
            <span className="percentage-icon">%</span>
          </div>
          <div className="w-[40%] input-container">
            <UseInput
              type="text"
              placeholder="0.00"
              step={"0.01"}
              inputClassName={"profit-input"}
              value={profitMProjected}
              onChange={handleChangeProfitMProjected}
            />
            <span className="percentage-icon">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[190px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          List Cost
        </label>
        <div className="flex justify-between  w-[100%]">
          <div className="w-[40%]">
            <UseInput
              type="text"
              placeholder="0.00"
              value={lPriceCurrent}
              onChange={handleChangeLPriceCurrent}
            />
          </div>
          <div className="w-[40%]">
            <UseInput
              type="text"
              placeholder="0.00"
              value={lPriceProjected}
              onChange={handleChangeLPriceProjected}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[190px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Effective Date
        </label>

        <div className="flex gap-28 w-full">
          <div className="flex flex-col relative w-full">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block  p-2.5 "
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

          <div className="flex flex-col relative w-full">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block  p-2.5 "
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
    </div>
  );
};

export default PMPriceLeft;
