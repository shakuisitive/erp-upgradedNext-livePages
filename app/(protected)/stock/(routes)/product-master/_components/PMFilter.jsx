import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FcCalendar } from "react-icons/fc";
import OptionSelector from "../../../../../../components/misc/pureComponents/optionselector/OptionSelector";
import UseInput from "../../../../../../components/misc/pureComponents/textinput/InputHook";
import DatePicker from "../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import UseSelect from "../../../../../../components/misc/pureComponents/textinput/UseSelect";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../components/misc/pureComponents/constants/apiConstant";

const PMFilter = ({ filterState, setFilterState, reset, setReset }) => {
  let [error, sendRequest] = useApiFetch();
  const [accessToken, setAccessToken] = useState();

  const [parID, setParID] = useState("");
  const [warID, setWarID] = useState("");
  const [lotList, setLotList] = useState([]);
  const [locList, setLocList] = useState([]);
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  const [isDate2, setIsDate2] = useState("");
  const [isDatePicker2, setIsDatePicker2] = useState(false);
  // const [filterState , setFilterState] = useState()
  const partList = useSelector((state) => state.pmSlices.partList);
  const wareHouseList = useSelector((state) => state.commonSlices.getWarehouse);
  const purchaseGroup = useSelector((state) => state.commonSlices.getPurchaseG);
  const brandList = useSelector((state) => state.commonSlices.brandList);
  const prodCatList = useSelector((state) => state.commonSlices.categoryList);

  const dropdownRef = useRef(null);
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const flagList = [
    {
      label: "Bolton",
    },
    {
      label: "Special",
    },
    {
      label: "Stock Item",
    },
    {
      label: "Non Stock Item",
    },
    {
      label: "Show All",
    },
  ];

  useEffect(() => {
    if (reset == true) {
      const newState = {
        ...filterState,
        Of: "",
        Ot: "",
        // Wn: "",
        Df: "",
        Dt: "",
        Wn: "",
        WnI: "",
        Pi: "",
        Pg: "",
        // Dt: "",
        Fg: "",
        lot: "",
        Wl: "",
        Pc: "",
        Br: "",
      };
      setFilterState(newState);
      setReset(false);
    }
  }, [reset]);

  const handleOHFrom = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Of: value };
    setFilterState(newState);
  };

  const handleOHTo = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Ot: value };
    setFilterState(newState);
  };

  const handleFlag = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Fg: value };
    setFilterState(newState);
  };

  const setChangePar = (e) => {
    const value = e.target.value;
    setParID(value);
    const newState = { ...filterState, Pi: value };
    setFilterState(newState);
  };
  const setChangeLot = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, lot: value };
    setFilterState(newState);
  };
  const setChangePurchaseG = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Pg: value };
    setFilterState(newState);
  };

  const setChangeWarehouse = (e) => {
    const value = e.target.value;
    setWarID(value);
    const newState = { ...filterState, Wn: value };
    setFilterState(newState);
  };
  const setChangeWarehouseLoc = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Wl: value };
    setFilterState(newState);
  };
  const setChangeProdCat = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Pc: value };
    setFilterState(newState);
  };
  const setChangeBrand = (e) => {
    const value = e.target.value;
    const newState = { ...filterState, Br: value };
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
  const locPayload = {
    data: {
      SEARCH: "",
      ORDER: "LOCATION ASC",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      OFFSET: "",
      WAR_ID: warID,
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "GetWarehouseLocationList",
    username: "admin",
    password: "1234",
    type: "rpc",
    tid: "144",
  };
  const lotPayload = {
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "Y",
      PAR_ID: parID,
      PURGRO_ID: "",
    },
    action: "Administration",
    method: "GetDistinctPartLotList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePartLot = (data) => {
    if (data?.CODE == "SUCCESS") {
      setLotList(data?.Result);
    }
  };
  const handleWarLoc = (data) => {
    if (data?.CODE == "SUCCESS") {
      setLocList(data?.Result.Results);
    }
  };
  useEffect(() => {
    sendRequest(
      Administration.GetDistinctPartLotList,
      "POST",
      lotPayload,
      handlePartLot,
      Token
    );
  }, [parID]);
  useEffect(() => {
    sendRequest(
      Administration.GetWareHouseLocations,
      "POST",
      locPayload,
      handleWarLoc,
      Token
    );
  }, [warID]);

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={flagList}
          optionKeyId="label"
          optionKeyValue="label"
          placeholder={"Select Part Type"}
          value={filterState?.Fg}
          onChange={handleFlag}
        />
      </div>
      <div className=" flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={partList}
          optionKeyId="PAR_ID"
          optionKeyValue="PAR_CODE"
          placeholder={"Select Part"}
          value={filterState?.Pi}
          onChange={setChangePar}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={purchaseGroup}
          optionKeyId="PURGRO_ID"
          optionKeyValue="CODE"
          placeholder={"Select Purchase Group"}
          value={filterState?.Pg}
          onChange={setChangePurchaseG}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-10 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={wareHouseList}
          optionKeyId="WAR_ID"
          optionKeyValue="WAREHOUSE"
          placeholder={"Select Warehouse"}
          value={filterState?.Wn}
          onChange={setChangeWarehouse}
        />
      </div>
      <div className="  flex w-full justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <UseSelect
          options={lotList}
          optionKeyId="INVPARLOT_ID"
          optionKeyValue="LOT_NUMBER"
          placeholder={"Select Part Lot"}
          value={filterState?.lot}
          onChange={setChangeLot}
          disabled={!parID ? true : false}
        />
      </div>

      <div className="  flex w-full justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <UseSelect
          options={prodCatList}
          optionKeyId="PARCAT_ID"
          optionKeyValue="CODE"
          placeholder={"Select Product Category"}
          value={filterState?.Pc}
          onChange={setChangeProdCat}
        />
      </div>
      <div className="  flex w-full justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <UseSelect
          options={locList}
          optionKeyId="WARSTOLOC_ID"
          optionKeyValue="LOCATION"
          placeholder={"Select Location"}
          value={filterState?.Wl}
          onChange={setChangeWarehouseLoc}
          disabled={!warID ? true : false}
        />
      </div>
      <div className="  flex w-full justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4] ">
        <UseSelect
          options={brandList}
          optionKeyId="PARBRA_ID"
          optionKeyValue="CODE"
          placeholder={"Select Brand"}
          value={filterState?.Br}
          onChange={setChangeBrand}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={flagList}
          optionKeyId="label"
          optionKeyValue="label"
          placeholder={"Select Product Type"}
          value={filterState?.Fg}
          onChange={handleFlag}
        />
      </div>

      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={flagList}
          optionKeyId="label"
          optionKeyValue="label"
          placeholder={"Select Class"}
          value={filterState?.Fg}
          onChange={handleFlag}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={flagList}
          optionKeyId="label"
          optionKeyValue="label"
          placeholder={"Select Group"}
          value={filterState?.Fg}
          onChange={handleFlag}
        />
      </div>
      <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
        <UseSelect
          options={flagList}
          optionKeyId="label"
          optionKeyValue="label"
          placeholder={"Select Sub Group"}
          value={filterState?.Fg}
          onChange={handleFlag}
        />
      </div>

      <div className="  flex gap-4 items-center text-customblack  hover:bg-slate-100 mt-2   ">
        <span className="w-[80px] ">OH From</span>
        <div className="w-full  hover:bg-slate-100 border border-[#d0d4e4]">
          <UseInput
            type="number"
            value={filterState?.Of}
            onChange={handleOHFrom}
            placeholder=" OH From"
          />
        </div>
      </div>
      <div className="  flex gap-2 items-center text-customblack  mt-2   ">
        <span className="w-[70px] ">OH To</span>
        <div className="w-full  hover:bg-slate-100 border border-[#d0d4e4]">
          <UseInput
            type="number"
            value={filterState?.Ot}
            onChange={handleOHTo}
            placeholder=" OH To"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <div className="  flex justify-between items-center text-customblack hover:bg-slate-100 mt-2 border border-[#d0d4e4]  ">
          <div
            id="date"
            className="text-customblack px-2 border-0 h-full w-full"
            onClick={onDateAdd}
          >
            <div className="flex justify-between items-center w-full gap-4 h-full">
              <span>{isDate ? isDate : "Order date from"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePicker && (
            <div className="absolute top-[104px]">
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
            <div className="absolute top-[104px] right-[20px]">
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

export default PMFilter;
