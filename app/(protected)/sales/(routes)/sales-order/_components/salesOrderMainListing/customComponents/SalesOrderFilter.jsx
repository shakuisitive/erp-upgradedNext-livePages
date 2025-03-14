import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import OptionSelector from "../../../../../../../../components/misc/pureComponents/optionselector/OptionSelector";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";

const SalesOrderFilter = ({ filterState, setFilterState, reset, setReset }) => {
  const [statusArr, setStatusArr] = useState([
    { option: "NEW" },
    { option: "Ready to Pick" },
    { option: "Dispatched" },
    { option: "INCOMPLETE DATA" },
    { option: "Void" },
  ]);
  const [channelList, setChannelList] = useState([
    { option: "All" },
    { option: "SPS" },
    { option: "Bolton" },
    { option: "NC" },
  ]);
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  const [isDate2, setIsDate2] = useState("");
  const [isDatePicker2, setIsDatePicker2] = useState(false);
  // const [filterState , setFilterState] = useState()
  const partList = useSelector((state) => state.salesOrder.partList);
  const custList = useSelector((state) => state.salesOrder.customerList);

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        SkuN: "",
        Sku: "",
        SoSt: "",
        Cus: "",
        CusI: "",
        Ch: "",
        Df: "",
        Dt: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);
  const setChangeSkuN = (e) => {
    const skuN = e.target.value;
    const newState = { ...filterState, SkuN: skuN };
    setFilterState(newState);
  };
  const setChange = (value) => {
    const newState = { ...filterState, Sku: value };
    setFilterState(newState);
  };

  const setChangeCus = (value) => {
    let cusId = "";
    custList.forEach((item) => {
      if (item.CUSTOMER_NAME == value) {
        cusId = item.CUS_ID;
      }
    });

    const newState = { ...filterState, Cus: cusId, CusI: value };
    setFilterState(newState);
  };

  const setChangeSt = (value) => {
    const newState = { ...filterState, SoSt: value };
    setFilterState(newState);
  };
  const setChangeCh = (value) => {
    const newState = { ...filterState, Ch: value };
    setFilterState(newState);
  };

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
      <div className="  flex gap-4 items-center text-customblack  hover:bg-slate-100 mt-2   ">
        <div className="w-full  hover:bg-slate-100 border border-[#d0d4e4]">
          <UseInput
            type="text"
            value={filterState?.SkuN}
            onChange={setChangeSkuN}
            placeholder=" SO #"
          />
        </div>
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={partList}
          onChangeFun={setChange}
          selectedItem={filterState?.Sku}
          listName="Select SKU"
          propertyName={"PAR_CODE"}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={statusArr}
          onChangeFun={setChangeSt}
          selectedItem={filterState?.SoSt}
          listName="Select status"
          propertyName={"option"}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={custList}
          onChangeFun={setChangeCus}
          selectedItem={filterState?.CusI}
          listName="Select Customer"
          propertyName={"CUSTOMER_NAME"}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <OptionSelector
          list={channelList}
          onChangeFun={setChangeCh}
          selectedItem={filterState?.Ch}
          listName="Select Channel"
          propertyName={"option"}
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

export default SalesOrderFilter;
