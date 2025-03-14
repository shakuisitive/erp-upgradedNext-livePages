import React, { useEffect, useState } from "react";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";

import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";

const TransferReportRight = ({
  sku,
  setSku,
  lot,
  setLot,
  warehouseTo,
  setWarehouseTo,
  dateTo,
  setDateTo,
}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const [resData, setResData] = useState([]);
  const [isDatePickerT, setIsDatePickerT] = useState(false);

  const partList = useSelector((state) => state.TransferSlice.partList);

  const warehouseList = useSelector((state) => state.TransferSlice.wareHouse);

  const lotListPayload = {
    data: {
      PAR_ID: sku,
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      ACTIVE_FLAG: "Y",
    },
    method: "GetDistinctPartLotList",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const handleGetLot = (data) => {
    if (data?.CODE == "SUCCESS") {
      setResData(data?.Result);
    }
  };

  useEffect(() => {
    if (sku) {
      sendRequest(
        Administration.GetDistinctPartLotList,
        "POST",
        lotListPayload,
        handleGetLot,
        token
      );
    }
  }, [sku]);
  const onDateAddTo = () => {
    setIsDatePickerT(!isDatePickerT);
    // setCheckDateTo(false);
  };
  const onDateChangeT = (date) => {
    setDateTo(date);
    // setCheckDateTo(false);
  };
  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-5 px-3 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          SKU
        </label>
        <UseSelect
          options={partList}
          optionKeyId="PAR_ID"
          optionKeyValue="PAR_CODE"
          value={sku}
          onChange={(e) => {
            setSku(e.target.value);
          }}
          placeholder="Please Sku"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Lot#
        </label>
        <UseSelect
          options={resData}
          optionKeyId="INVPARLOT_ID"
          optionKeyValue="LOT_NUMBER"
          value={lot}
          onChange={(e) => {
            setLot(e.target.value);
          }}
          disabled={resData?.length > 0 ? false : true}
          placeholder="Please lot#"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Warehouse TO
        </label>
        <UseSelect
          options={warehouseList}
          optionKeyId="WAR_ID"
          optionKeyValue="WAREHOUSE"
          value={warehouseTo}
          onChange={(e) => {
            setWarehouseTo(e.target.value);
          }}
          // disabled={resData?.length > 0 ? false : true}
          placeholder="Please Warehouse To"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Date(to) <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <div
            id="date"
            className="bg-white  text-customblack text-sm  block w-auto p-2.5"
            tabIndex={0}
            onClick={onDateAddTo}
            // onBlur={handleBlurDateT}
          >
            <div className="flex justify-between items-center w-full">
              <span>{dateTo ? formatDate(dateTo) : "MM/DD/YYYY"}</span>
              <FcCalendar />
            </div>
          </div>
          {isDatePickerT && (
            <div className="absolute right-3 top-[346px]">
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

export default TransferReportRight;
