import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import MultiSelect from "../../../../../../../../../components/misc/pureComponents/multiSelect/MultiSelect";
import RadioButton from "../../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";
import { useSelector } from "react-redux";
import { FaCircleInfo } from "react-icons/fa6";

const KitRight = ({
  kitDimensionH,
  setKitDimensionH,
  kitDimensionL,
  setKitDimensionL,
  kitDimensionW,
  setKitDimensionW,
  kitWeight,
  setKitWeight,
  kitShipWeight,
  setKitShipWeight,
  kitDateTo,
  setKitDateTo,
  kitDateFrom,
  setKitDateFrom,
  kitCustomer,
  setKitCustomer,
  kitCustomerType,
  setKitCustomerType,
  setKitAllCustomer,
  kitAllCustomer,
  setKitActive,
  kitActive,
  kitAsgnCustName,
  setKitAsgnCustName,
  kitAsgnCustId,
  setKitAsgnCustId,
  kitUoW,
  setKitUoW,
  setKitShipWeightU,
  kitShipWeightU,
  isError,
}) => {
  const [checkDateFrom, setCheckDateFrom] = useState(false);
  const [isDatePickerF, setIsDatePickerF] = useState(false);
  const [checkDateTo, setCheckDateTo] = useState(false);
  const [isDatePickerT, setIsDatePickerT] = useState(false);
  const getCustomer = useSelector((state) => state.commonSlices.getCustomer);
  const getUoW = useSelector((state) => state.commonSlices.getUoW);

  const [filteredUoW, setFilteredUoW] = useState([]);

  useEffect(() => {
    const filteredData = getUoW.filter((item) => item.CODE !== null);

    setFilteredUoW(filteredData);
  }, [getUoW]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const multioption = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
  ];
  const shipWghtU = [
    { id: "KG", label: "KG" },
    { id: "Lb", label: "Lb" },
  ];

  const handleMultiSelectChange = (newIds) => {
    const ids = newIds.map((option) => option.CUS_ID).join(" ,");
    setKitAsgnCustId(ids);
  };

  const handleRadioChange = (event) => {
    setKitCustomerType(event.target.value);
  };
  const handleKitAllCustomer = (event) => {
    setKitAllCustomer(event.target.value);
  };
  const handleActive = (event) => {
    setKitActive(event.target.checked);
  };
  const handleDimensionW = (e) => {
    setKitDimensionW(e.target.value);
  };
  const handleDimensionWBlur = () => {
    if (kitDimensionW) {
      const parsedDimW = parseFloat(kitDimensionW).toFixed(2);
      setKitDimensionW(parsedDimW);
    }
  };
  const handleDimensionL = (e) => {
    setKitDimensionL(e.target.value);
  };
  const handleDimensionLBlur = () => {
    if (kitDimensionL) {
      const parsedDimL = parseFloat(kitDimensionL).toFixed(2);
      setKitDimensionL(parsedDimL);
    }
  };
  const handleDimensionH = (e) => {
    setKitDimensionH(e.target.value);
  };
  const handleDimensionHBlur = () => {
    if (kitDimensionH) {
      const parsedDimH = parseFloat(kitDimensionH).toFixed(2);
      setKitDimensionH(parsedDimH);
    }
  };
  const handleWeight = (e) => {
    setKitWeight(e.target.value);
  };
  const handleWeightBlur = () => {
    if (kitWeight) {
      const weight = parseFloat(kitWeight).toFixed(2);
      setKitWeight(weight);
    }
  };
  const handleShipWeight = (e) => {
    setKitShipWeight(e.target.value);
  };
  const handleShipWeightBlur = () => {
    if (kitShipWeight) {
      const ShipWeight = parseFloat(kitShipWeight).toFixed(2);
      setKitShipWeight(ShipWeight);
    }
  };
  const handleKitUoW = (event) => {
    setKitUoW(event.target.value);
  };
  const handleKitShipWeightU = (event) => {
    setKitShipWeightU(event.target.value);
  };
  const handleCustomer = (e) => {
    setKitCustomer(e.target.value);
  };
  const onDateAddFrom = () => {
    setIsDatePickerF(!isDatePickerF);
    setCheckDateFrom(false);
  };
  const handleBlurDate = () => {
    if (!kitDateFrom) {
      setCheckDateFrom(true);
    }
  };
  const onDateChangeF = (date) => {
    setKitDateFrom(date);
    setCheckDateFrom(false);
  };

  const onDateAddTo = () => {
    setIsDatePickerT(!isDatePickerT);
    setCheckDateTo(false);
  };
  const onDateChangeT = (date) => {
    setKitDateTo(date);
    setCheckDateTo(false);
  };
  const handleBlurDateT = () => {
    if (!kitDateTo) {
      setCheckDateTo(true);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY"; // Fallback if no date is provided

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Active
            </label>
            <ToggleSwitch
              id="active"
              checked={kitActive}
              onChange={handleActive}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div>
          <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
            Customer type
          </label>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto] items-center">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Mass
            </label>
            <RadioButton
              name="customerType"
              value="mass"
              checked={kitCustomerType === "mass"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Prepay
            </label>
            <RadioButton
              name="customerType"
              value="prepay"
              checked={kitCustomerType === "prepay"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Both
            </label>
            <RadioButton
              name="customerType"
              value="both"
              checked={kitCustomerType === "both"}
              onChange={handleRadioChange}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div>
          <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
            All Customer
          </label>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto] items-center">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Yes
            </label>
            <RadioButton
              name="allCustomer"
              value="yes"
              checked={kitAllCustomer === "yes"}
              onChange={handleKitAllCustomer}
            />
          </div>
          <div className="grid grid-cols-[116px_auto] items-center">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              No
            </label>
            <RadioButton
              name="allCustomer"
              value="no"
              checked={kitAllCustomer === "no"}
              onChange={handleKitAllCustomer}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center"></div>
        </div>
      </div>
      {kitAllCustomer === "no" ? (
        <div className="grid grid-cols-[150px_auto] mb-[12px]">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Customers
          </label>
          {/* <UseSelect
            id="mySelect"
            options={getCustomer}
            optionKeyId="CUS_ID"
            optionKeyValue="CUSTOMER_NAME"
            value={kitCustomer}
            onChange={handleCustomer}
            placeholder="Please Select"
          /> */}
          <MultiSelect
            options={getCustomer}
            defaultSelectedIDs={kitAsgnCustId}
            onChange={handleMultiSelectChange}
            optionID="CUS_ID"
            optionValue="CUSTOMER_NAME"
            placeholder="Select options"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-[150px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Dimension L X W X H
        </label>
        <div className="grid grid-cols-[auto_auto_auto] text-[14px] gap-4 relative">
          <UseInput
            type="text"
            placeholder="Length"
            id=""
            value={kitDimensionL}
            onChange={handleDimensionL}
            onBlur={handleDimensionLBlur}
          />
          <UseInput
            type="text"
            placeholder="Width"
            id=""
            value={kitDimensionW}
            onChange={handleDimensionW}
            onBlur={handleDimensionWBlur}
          />
          <UseInput
            type="text"
            placeholder="Height"
            id=""
            value={kitDimensionH}
            onChange={handleDimensionH}
            onBlur={handleDimensionHBlur}
          />
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Weight
        </label>
        <div className="grid grid-cols-[auto_39%] text-[14px] gap-4 relative">
          <UseInput
            type="text"
            placeholder="Weight"
            id=""
            value={kitWeight}
            onChange={handleWeight}
            onBlur={handleWeightBlur}
          />

          <UseSelect
            options={filteredUoW}
            optionKeyId="UOW_ID"
            optionKeyValue="CODE"
            value={kitUoW}
            onChange={handleKitUoW}
            placeholder="Please Select"
          />
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Ship Weight
        </label>
        <div className="grid grid-cols-[auto_39%] text-[14px] gap-4 relative">
          <UseInput
            type="text"
            placeholder="Ship Weight"
            id=""
            value={kitShipWeight}
            onChange={handleShipWeight}
            onBlur={handleShipWeightBlur}
          />

          <UseSelect
            options={shipWghtU}
            optionKeyId="id"
            optionKeyValue="label"
            value={kitShipWeightU}
            onChange={handleKitShipWeightU}
            placeholder="Please Select"
          />
        </div>
      </div>

      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Validity(from) <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-full p-2.5 "
              onClick={onDateAddFrom}
              tabIndex={0}
              onBlur={handleBlurDate}
            >
              <div className="flex justify-between items-center w-full">
                <span>
                  {kitDateFrom ? formatDate(kitDateFrom) : "MM/DD/YYYY"}
                </span>
                <FcCalendar />
              </div>
            </div>
            {isDatePickerF && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeF}
                  setIsDatePicker={setIsDatePickerF}
                  setPastYears={0}
                />
              </div>
            )}
            {!kitDateFrom && isError && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Validity(to)<span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-auto p-2.5"
              tabIndex={0}
              onClick={onDateAddTo}
              onBlur={handleBlurDateT}
            >
              <div className="flex justify-between items-center w-full">
                <span>{kitDateTo ? formatDate(kitDateTo) : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
            {isDatePickerT && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeT}
                  setIsDatePicker={setIsDatePickerT}
                  setPastYears={0}
                />
              </div>
            )}
            {checkDateTo && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitRight;
