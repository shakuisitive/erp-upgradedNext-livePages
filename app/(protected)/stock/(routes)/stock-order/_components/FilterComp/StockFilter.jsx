import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import OptionSelector from "./OptionSelector";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "./../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import UseInput from "../../../../../../../components/misc/pureComponents/textinput/InputHook";

const StockFilter = ({ filterState, setFilterState, reset, setReset }) => {
  const [statusArr, setStatusArr] = useState([
    { option: "New" },
    { option: "initiated" },
    { option: "Partial Transferred |Not Assigned" },
    { option: "Partial Transferred | Partial Assigned" },
    { option: "Full Transferred |Not Assigned" },
    { option: "Full Transferred | Partial Assigned" },
    { option: "Full Transferred |Full Assigned" },
  ]);
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  const [isDate2, setIsDate2] = useState("");
  const [isDatePicker2, setIsDatePicker2] = useState(false);
  // const [filterState , setFilterState] = useState()
  const stockOrderList = useSelector(
    (state) => state.stockSlices.stockOrderList
  );
  const wareHouseList = useSelector((state) => state.stockSlices.wareHouse);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        Stn: "",
        Rn: "",
        St: "",
        Wn: "",
        Df: "",
        Dt: "",
        WnI: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);

  const setChange = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Stn: value };
    setFilterState(newState);
  };

  const setChangeP = (value) => {
    const newState = { ...filterState, Rn: value };
    setFilterState(newState);
  };

  const setChangeSt = (value) => {
    const newState = { ...filterState, St: value };
    setFilterState(newState);
  };

  const setChangeSp = (value) => {
    let warId = "";
    wareHouseList.forEach((item) => {
      if (item.WAREHOUSE == value) {
        warId = item.WAR_ID;
      }
    });
    const newState = { ...filterState, Wn: warId, WnI: value };
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
    <div className="grid grid-cols-3 gap-4 pb-12">
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <UseInput
          type="text"
          value={filterState?.Stn}
          onChange={setChange}
          placeholder=" Select Stock#"
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
          list={stockOrderList}
          onChangeFun={setChangeP}
          selectedItem={filterState?.Rn}
          listName="Select receiving#"
          propertyName={"RECEIVING_NUMBER"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={wareHouseList}
          onChangeFun={setChangeSp}
          selectedItem={filterState?.WnI}
          listName="Select warehouse"
          propertyName={"WAREHOUSE"}
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
    </div>
  );
};

export default StockFilter;
