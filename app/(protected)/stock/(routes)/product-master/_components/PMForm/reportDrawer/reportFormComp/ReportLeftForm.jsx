import React, { useEffect, useState } from "react";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";

const ReportLeftForm = ({
  purchaseGroup,
  setPurchaseGroup,
  sku,
  setSku,
  selectLot,
  setSelectLot,
  itemStatus,
  setItemStatus,
  oHFrom,
  setOHFrom,
  oHTo,
  setOHTo,
}) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const [resData, setResData] = useState([]);
  const getPurchaseG = useSelector((state) => state.commonSlices.getPurchaseG);
  const partList = useSelector((state) => state.pmSlices.partList);

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

  const handleSelectPGroup = (e) => {
    setPurchaseGroup(e.target.value);
  };

  const handleChangeSku = (e) => {
    const value = Number(e.target.value);
    setSku(value);
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

  const handleChangeLot = (e) => {
    const value = e.target.value;
    setSelectLot(value);
  };

  const handleChangeItemStatus = (e) => {
    const value = e.target.value;
    setItemStatus(value);
  };

  const statusOption = [
    {
      STATUS: "Stock Items",
    },
    {
      STATUS: "Non-Stock Items",
    },
  ];

  const handleChangeOHFrom = (e) => {
    const value = e.target.value;
    setOHFrom(value);
  };

  const handleChangeOHTo = (e) => {
    const value = e.target.value;
    setOHTo(value);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-5 px-3 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Stock Type
        </label>
        <UseSelect
          options={statusOption}
          optionKeyId="STATUS"
          optionKeyValue="STATUS"
          value={itemStatus}
          onChange={handleChangeItemStatus}
          placeholder="Please stock type"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          SKU
        </label>
        <UseSelect
          options={partList}
          optionKeyId="PAR_ID"
          optionKeyValue="PAR_CODE"
          value={sku}
          onChange={handleChangeSku}
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
          value={selectLot}
          onChange={handleChangeLot}
          disabled={resData?.length > 0 ? false : true}
          placeholder="Please lot#"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
          Group
        </label>
        <UseSelect
          options={getPurchaseG}
          optionKeyId="PURGRO_ID"
          optionKeyValue="CODE"
          value={purchaseGroup}
          disabled={itemStatus == "Non-Stock Items" ? true : false}
          onChange={handleSelectPGroup}
          placeholder="Please group"
        />
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
            OH Qty
          </label>
          <div className="grid grid-cols-[20%_auto] text-[14px] gap-4 relative">
            <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
              From
            </label>
            <UseInput
              type="number"
              placeholder="From"
              value={oHFrom}
              onChange={handleChangeOHFrom}
            />
          </div>
        </div>

        <div className="grid grid-cols-[15%_auto] text-[14px] gap-4 relative">
          <label className="py-[8px] font-[500] text-[14px]" htmlFor="code">
            To
          </label>
          <UseInput
            type="number"
            placeholder="To"
            value={oHTo}
            onChange={handleChangeOHTo}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportLeftForm;
