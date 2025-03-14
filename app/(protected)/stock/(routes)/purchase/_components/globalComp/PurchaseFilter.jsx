import React, { useState, useRef, useEffect } from "react";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useSelector } from "react-redux";
import OptionSelector from "./OptionSelector";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
const PurchaseFilter = ({ filterState, setFilterState, reset, setReset }) => {
  const [statusArr, setStatusArr] = useState([
    { option: "Completed" },
    { option: "Ready for Receiving" },
    { option: "Partially Received" },
    { option: "Initiated" },
    { option: "Issued to Vendor" },
  ]);
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  const [isDate2, setIsDate2] = useState("");
  const [isDatePicker2, setIsDatePicker2] = useState(false);
  // const [filterState , setFilterState] = useState()
  const skuList = useSelector((state) => state.PurchaseSlices.skuList);
  const purchaseMainGrid = useSelector(
    (state) => state.PurchaseSlices.purchaseMainGrid
  );
  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderList
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        sku: "",
        Po: "",
        St: "",
        Sp: "",
        Df: "",
        Dt: "",
        SPI: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);

  const setChange = (value) => {
    const newState = { ...filterState, sku: value };
    setFilterState(newState);
  };

  const setChangeP = (value) => {
    const newState = { ...filterState, Po: value };
    setFilterState(newState);
  };

  const setChangeSt = (value) => {
    const newState = { ...filterState, St: value };
    setFilterState(newState);
  };

  const setChangeSp = (value) => {
    let venId = "";
    checkUpdatelist.forEach((item) => {
      if (item.SUPPLIER == value) {
        venId = item.VEN_ID;
      }
    });
    const newState = { ...filterState, Sp: venId, SPI: value };
    setFilterState(newState);
  };

  const handleOnFocus = () => {};

  const handleOnBlur = () => {};

  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
  };

  const onDateChange = (date) => {
    setIsDate(date);
    const newState = { ...filterState, Df: date };
    setFilterState(newState);
  };

  const onDateAdd2 = () => {
    setIsDatePicker2(!isDatePicker2);
  };

  const onDateChange2 = (date) => {
    setIsDate2(date);
    const newState = { ...filterState, Dt: date };
    setFilterState(newState);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={skuList}
          onChangeFun={setChange}
          selectedItem={filterState?.sku}
          listName="Select SKU"
          propertyName={"PAR_CODE"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={statusArr}
          onChangeFun={setChangeSt}
          selectedItem={filterState?.St}
          listName="Select status"
          propertyName={"option"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <OptionSelector
          list={purchaseMainGrid}
          onChangeFun={setChangeP}
          selectedItem={filterState?.Po}
          listName="Select order number"
          propertyName={"PO_NUMBER"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={checkUpdatelist}
          onChangeFun={setChangeSp}
          selectedItem={filterState?.SPI}
          listName="Select Vendor"
          propertyName={"SUPPLIER"}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
          <div
            id="date"
            className="text-customblack px-2 border-0 h-full "
            onClick={onDateAdd}
          >
            <div className="flex justify-between items-center w-full gap-4 h-full">
              <span>{isDate ? isDate : "Order date from"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePicker && (
            <div className="absolute z-[100]">
              <DatePicker
                onDateChange={onDateChange}
                setIsDatePicker={setIsDatePicker}
                setPastYears={0}
              />
            </div>
          )}
        </div>
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] overflow-hidden ">
          <div
            id="date"
            className="text-customblack px-2  border-0 h-full"
            onClick={onDateAdd2}
          >
            <div className="flex justify-between items-center w-full gap-4 h-full">
              <span>{isDate2 ? isDate2 : "Order date to"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePicker2 && (
            <div className="absolute z-[100]">
              <DatePicker
                onDateChange={onDateChange2}
                setIsDatePicker={setIsDatePicker2}
                setPastYears={0}
              />
            </div>
          )}
        </div>
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4]  ">
        <Dropdown
          options={checkUpdatelist}
          optionKey1="SUPPLIER"
          optionKey2="VEN_ID"
          onSelectedOptionChanged={setChangeSp}
          placeholder="select Warehouse"
          inputClassName="focus:outline-none w-[350px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          customFocusKey=""
          isDisabled={false}
          onClearInputValue={false}
          onHandleFocus={handleOnFocus}
          onDefaultInput=""
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4]  ">
        <Dropdown
          options={checkUpdatelist}
          optionKey1="SUPPLIER"
          optionKey2="VEN_ID"
          onSelectedOptionChanged={setChangeSp}
          placeholder="select Receiving Number"
          inputClassName="focus:outline-none w-[350px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          customFocusKey=""
          isDisabled={false}
          onClearInputValue={false}
          onHandleFocus={handleOnFocus}
          onDefaultInput=""
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4]  ">
        <Dropdown
          options={checkUpdatelist}
          optionKey1="SUPPLIER"
          optionKey2="VEN_ID"
          onSelectedOptionChanged={setChangeSp}
          placeholder="select Stock Number"
          inputClassName="focus:outline-none w-[350px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          customFocusKey=""
          isDisabled={false}
          onClearInputValue={false}
          onHandleFocus={handleOnFocus}
          onDefaultInput=""
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
        />
      </div>
      <div className="flex gap-2 justify-between">
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4]  ">
          <Dropdown
            options={checkUpdatelist}
            optionKey1="SUPPLIER"
            optionKey2="VEN_ID"
            onSelectedOptionChanged={setChangeSp}
            placeholder="select Created by"
            inputClassName="focus:outline-none w-[150px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
            dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
            customFocusKey=""
            isDisabled={false}
            onClearInputValue={false}
            onHandleFocus={handleOnFocus}
            onDefaultInput=""
            onHandleBlur={handleOnBlur}
            forwardedRef={dropdownRef}
          />
        </div>
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4]  ">
          <Dropdown
            options={checkUpdatelist}
            optionKey1="SUPPLIER"
            optionKey2="VEN_ID"
            onSelectedOptionChanged={setChangeSp}
            placeholder="select Updated by"
            inputClassName="focus:outline-none w-[150px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
            dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
            customFocusKey=""
            isDisabled={false}
            onClearInputValue={false}
            onHandleFocus={handleOnFocus}
            onDefaultInput=""
            onHandleBlur={handleOnBlur}
            forwardedRef={dropdownRef}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4] overflow-hidden ">
          <Dropdown
            options={checkUpdatelist}
            optionKey1="SUPPLIER"
            optionKey2="VEN_ID"
            onSelectedOptionChanged={setChangeSp}
            placeholder=" Product lines from"
            inputClassName="focus:outline-none w-[150px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
            dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
            customFocusKey=""
            isDisabled={false}
            onClearInputValue={false}
            onHandleFocus={handleOnFocus}
            onDefaultInput=""
            onHandleBlur={handleOnBlur}
            forwardedRef={dropdownRef}
          />
        </div>
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 px-3   border border-[#d0d4e4] overflow-hidden ">
          <Dropdown
            options={checkUpdatelist}
            optionKey1="SUPPLIER"
            optionKey2="VEN_ID"
            onSelectedOptionChanged={setChangeSp}
            placeholder=" Product lines to"
            inputClassName="focus:outline-none w-[150px] hover:bg-transparent  py-2 
            hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
            dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
            customFocusKey=""
            isDisabled={false}
            onClearInputValue={false}
            onHandleFocus={handleOnFocus}
            onDefaultInput=""
            onHandleBlur={handleOnBlur}
            forwardedRef={dropdownRef}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseFilter;
