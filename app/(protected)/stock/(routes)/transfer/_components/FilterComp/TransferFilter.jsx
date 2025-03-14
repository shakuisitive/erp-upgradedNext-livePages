import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "./../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import OptionSelector from "./../../../../../../../components/misc/pureComponents/optionselector/OptionSelector";
import { setReporting } from "../../redux/TransferSlice";

const TransferFilter = ({ filterState, setFilterState, reset, setReset }) => {
  const [statusArr, setStatusArr] = useState([
    { option: "New" },
    { option: "Completed" },
    { option: "Void" },
  ]);
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  const [isDate2, setIsDate2] = useState("");
  const [isDatePicker2, setIsDatePicker2] = useState(false);
  // const [filterState , setFilterState] = useState()
  const PCList = useSelector((state) => state.TransferSlice.PCList);
  const wareHouseList = useSelector((state) => state.TransferSlice.wareHouse);
  const partList = useSelector((state) => state.TransferSlice.partList);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        Ln: "",
        Df: "",
        Dt: "",
        Cn: "",
        Cs: "",
        Wi: "",
        Wn: "",
        Wi2: "",
        Wn2: "",
        Sku: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);
  const setChange = (value) => {
    const newState = { ...filterState, Cn: value };
    setFilterState(newState);
  };

  const setChangeP = (value) => {
    const newState = { ...filterState, Ln: value };
    setFilterState(newState);
  };

  const setChangeSt = (value) => {
    const newState = { ...filterState, Cs: value };
    setFilterState(newState);
  };
  const setChangeSku = (value) => {
    const newState = { ...filterState, Sku: value };
    setFilterState(newState);
  };

  const setChangeSp = (value) => {
    let warId = "";
    wareHouseList.forEach((item) => {
      if (item.WAREHOUSE == value) {
        warId = item.WAR_ID;
      }
    });
    const newState = { ...filterState, Wn: warId, Wi: value };
    setFilterState(newState);
  };

  const setChangeSp2 = (value) => {
    let warId = "";
    wareHouseList.forEach((item) => {
      if (item.WAREHOUSE == value) {
        warId = item.WAR_ID;
      }
    });
    const newState = { ...filterState, Wn2: warId, Wi2: value };
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
  const handleReport = () => {
    // console.log("payload Report: ", filterState);

    dispatch(setReporting(true));
  };
  return (
    <div className="grid grid-cols-3 gap-4 pb-12">
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={PCList}
          onChangeFun={setChange}
          selectedItem={filterState?.Cn}
          listName="Select Transfer#"
          propertyName={"TRANSFER_NUMBER"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={statusArr}
          onChangeFun={setChangeSt}
          selectedItem={filterState?.Cs}
          listName="Select status"
          propertyName={"option"}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={partList}
          onChangeFun={setChangeSku}
          selectedItem={filterState?.Sku}
          listName="Select SKU"
          propertyName={"PAR_CODE"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <OptionSelector
          list={[]}
          onChangeFun={setChangeP}
          selectedItem={filterState?.Ln}
          listName="Select Lot#"
          propertyName={"LOT_NUMBER"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={wareHouseList}
          onChangeFun={setChangeSp}
          selectedItem={filterState?.Wi}
          listName="Select warehouse From"
          propertyName={"WAREHOUSE"}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={wareHouseList}
          onChangeFun={setChangeSp2}
          selectedItem={filterState?.Wi2}
          listName="Select warehouse To"
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

export default TransferFilter;
