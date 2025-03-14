import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";
import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";

const ReportRightForm = ({
  warehouse,
  setWarehouse,
  exDateFrom,
  setExDateFrom,
  exDateTo,
  setExDateTo,
  boltenFlag,
  setBoltenFlag,
  location,
  setLocation,
  expiryStatus,
  setExpiryStatus,
  activeFlag,
  setActiveFlag,
  promoFlag,
  setPromoFlag,
  itemStatus,
}) => {
  const [isDatePickerF, setIsDatePickerF] = useState(false);
  const [checkDateTo, setCheckDateTo] = useState(false);
  const [isDatePickerT, setIsDatePickerT] = useState(false);
  const [locationListData, setLocationListData] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();

  const getWarehouse = useSelector((state) => state.commonSlices.getWarehouse);

  const locationListPayload = {
    data: {
      ACTIVE_FLAG: "Y",
      SEARCH: "",
      ORDER: "LOCATION ASC",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      OFFSET: "",
      WAR_ID: warehouse,
    },
    action: "Administration",
    method: "GetWarehouseLocationList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const onDateAddFrom = () => {
    setIsDatePickerF(!isDatePickerF);
    // setCheckDateFrom(false);
  };
  const handleBlurDate = () => {};
  const onDateChangeF = (date) => {
    setExDateFrom(date);
    // setCheckDateFrom(false);
  };

  const onDateAddTo = () => {
    setIsDatePickerT(!isDatePickerT);
    setCheckDateTo(false);
  };
  const onDateChangeT = (date) => {
    setExDateTo(date);
    setCheckDateTo(false);
  };
  const handleBlurDateT = () => {
    if (!exDateTo) {
      setCheckDateTo(true);
    }
  };

  const handleBoltenFlag = () => {
    setBoltenFlag((prev) => !prev);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const handleSelectWarehouse = (e) => {
    const value = Number(e.target.value);
    setWarehouse(value);
  };

  const handleGetWareHouseLocationList = (data) => {
    if (data?.CODE == "SUCCESS") {
      setLocationListData(data?.Result?.Results);
    }
  };

  useEffect(() => {
    sendRequest(
      Administration.GetWareHouseLocations,
      "POST",
      locationListPayload,
      handleGetWareHouseLocationList,
      token
    );
  }, [warehouse]);

  const handleChangeLocation = (e) => {
    const value = Number(e.target.value);
    setLocation(value);
  };

  const expiryList = [
    {
      label: "Not Expired",
    },
    {
      label: "Expiring Soon",
    },
    {
      label: "For Disposal",
    },
  ];

  const handleSelectExpiryStatus = (e) => {
    const value = e.target.value;
    setExpiryStatus(value);
  };

  const handleActiveFlag = () => {
    setActiveFlag((prev) => !prev);
  };

  const handlePromoFlag = () => {
    setPromoFlag((prev) => !prev);
  };

  return (
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-5 px-3 tablet:w-full">
      <div className="grid grid-cols-2 items-center mb-[12px]">
        <div className="flex items-center justify-between flex-wrap flex-col">
          <div className="flex">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Show Inactive
            </label>
            <ToggleSwitch
              id="active"
              name="ACTIVE_FLAG"
              checked={activeFlag}
              onChange={handleActiveFlag}
            />
          </div>
          <div className="flex">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Show Special
            </label>
            <ToggleSwitch
              id="manage-stock"
              name="STOCK_ITEM_FLAG"
              disabled={itemStatus == "Non-Stock Items" ? true : false}
            />
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap flex-col">
          <div className="flex">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Show Promo Items
            </label>
            <ToggleSwitch
              id="promo"
              name="PROMO_FLAG"
              checked={promoFlag}
              disabled={itemStatus == "Non-Stock Items" ? true : false}
              onChange={handlePromoFlag}
            />
          </div>
          <div className="flex">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Show Bolten Item
            </label>
            <ToggleSwitch
              id="bolten"
              name="BOLTON_ORDER_FLAG"
              checked={boltenFlag}
              onChange={handleBoltenFlag}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse
        </label>
        <UseSelect
          options={getWarehouse}
          optionKeyId="WAR_ID"
          optionKeyValue="WAREHOUSE"
          value={warehouse}
          onChange={handleSelectWarehouse}
          placeholder="Please Select Warehouse"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Location
        </label>
        <UseSelect
          options={locationListData}
          optionKeyId="LOCATION"
          optionKeyValue="LOCATION"
          value={location}
          onChange={handleChangeLocation}
          disabled={locationListData?.length > 0 ? false : true}
          placeholder="Select Location"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Expiry Status
        </label>
        <UseSelect
          options={expiryList}
          optionKeyId="lable"
          optionKeyValue="label"
          value={expiryStatus}
          disabled={itemStatus == "Non-Stock Items" ? true : false}
          onChange={handleSelectExpiryStatus}
          placeholder="Select Expiry Status"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Expiry(from) <span className="text-red-600">*</span>
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
              <span>{exDateFrom ? formatDate(exDateFrom) : "MM/DD/YYYY"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerF && (
            <div className="absolute top-[435px] right-8">
              <DatePicker
                onDateChange={onDateChangeF}
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
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Expiry(to) <span className="text-red-600">*</span>
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
              <span>{exDateTo ? formatDate(exDateTo) : "MM/DD/YYYY"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerT && (
            <div className="absolute top-[465px] right-8">
              <DatePicker
                onDateChange={onDateChangeT}
                setIsDatePicker={setIsDatePickerT}
                setPastYears={0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportRightForm;
