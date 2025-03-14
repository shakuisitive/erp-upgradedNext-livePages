import React, { useEffect, useState } from "react";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";

const TransferReportLeft = ({
  transferNum,
  setTransferNum,
  status,
  setStatus,
  warehouseFrom,
  setWarehouseFrom,
  dateFrom,
  setDateFrom,
}) => {
  const [isDatePickerF, setIsDatePickerF] = useState(false);

  const warehouseList = useSelector((state) => state.TransferSlice.wareHouse);
  const transferList = useSelector((state) => state.TransferSlice.PCList);
  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };
  const statusOption = [
    {
      STATUS: "NEW",
    },
    {
      STATUS: "Completed",
    },
    {
      STATUS: "Void",
    },
  ];
  const onDateAddFrom = () => {
    setIsDatePickerF(!isDatePickerF);
    // setCheckDateFrom(false);
  };

  const onDateChangeF = (date) => {
    setDateFrom(date);
    // setCheckDateFrom(false);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-5 px-3 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Transfer#
        </label>
        <UseSelect
          options={transferList}
          optionKeyId="TRANSFER_NUMBER"
          optionKeyValue="TRANSFER_NUMBER"
          value={transferNum}
          onChange={(e) => {
            setTransferNum(e.target.value);
          }}
          placeholder="Please Transfer Number"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Status
        </label>
        <UseSelect
          options={statusOption}
          optionKeyId="STATUS"
          optionKeyValue="STATUS"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          placeholder="Please Status"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse From
        </label>
        <UseSelect
          options={warehouseList}
          optionKeyId="WAR_ID"
          optionKeyValue="WAREHOUSE"
          value={warehouseFrom}
          onChange={(e) => {
            setWarehouseFrom(e.target.value);
          }}
          // disabled={resData?.length > 0 ? false : true}
          placeholder="Please Warehouse From"
        />
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Date(from)
        </label>
        <div className="flex flex-col">
          <div
            id="date"
            className="bg-white  text-customblack text-sm  block w-full p-2.5 "
            onClick={onDateAddFrom}
            tabIndex={0}
            // onBlur={handleBlurDate}
          >
            <div className="flex justify-between items-center w-full">
              <span>{dateFrom ? formatDate(dateFrom) : "MM/DD/YYYY"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerF && (
            <div className="absolute left-[360px] top-[348px]">
              <DatePicker
                onDateChange={onDateChangeF}
                setIsDatePicker={setIsDatePickerF}
                setPastYears={0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferReportLeft;
