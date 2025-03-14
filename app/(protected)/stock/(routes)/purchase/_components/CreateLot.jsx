"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import DatePicker from "../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { setLotList, lotCreateToggle, splitLotCreateToggle, formSplitCreateToggle, onFormSplitLotCraete } from "../redux/Purchase.slice";
import { useDispatch } from "react-redux";
import { FcCalendar } from "react-icons/fc";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";
import NewButton from "../../../../../../components/misc/pureComponents/buttons/NewButton";

const CreateLot = ({ skuData, newLotNumber }) => {
  const focRef = useRef(null);
  const [lotName, setLotName] = useState("");
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [lotValidation, setLotValidation] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const apiUniLotName = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetCodeUniqueValidation`;
  const apiCreateLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostLotDetail`;
  const apiUrlLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const dispatch = useDispatch();
  const getLotStatus = (data) => {
    if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
      setLotValidation(true);
    } else {
      setLotValidation(false);
    }
  };

  const payloadLot = {
    data: {
      PURORD_ID: skuData?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };

  //   useEffect(() => {}, [lotName]);

  const onChangeLotName = (e) => {
    setLotName(e.target.value);
    const payloadUniqLot = {
      data: {
        TYPE: "PARLOT",
        CODE: e.target.value,
      },
      action: "InventoryWeb",
      method: "GetCodeUniqueValidation",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    sendRequest(apiUniLotName, "POST", payloadUniqLot, getLotStatus, token);
  };

  const onDateChange = (date) => {
    setIsDate(date);
  };

  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
  };

  const getAllLot = (res) => {
    if (res.CODE == "SUCCESS") {
      dispatch(setLotList(res.Result));
      const lotData = {
        data: res.Result,
        newLot: lotName
      }
      newLotNumber(lotData)
      setLotName("");
      setIsDate("");
      setIsDatePicker(false);
      setLotValidation(false);
      dispatch(lotCreateToggle(false));
      dispatch(splitLotCreateToggle(false));
      dispatch(formSplitCreateToggle(false));
      dispatch(onFormSplitLotCraete(false));
    }
  };

  const getCreateLot = (res) => {
    if (res.CODE == "SUCCESS") {
      sendRequest(apiUrlLot, "POST", payloadLot, getAllLot, token);
    }
  };

  const createNewLot = () => {
    if (lotName && lotValidation && isDate) {
      const lotPayload = {
        data: {
          INVPARLOT_ID: "",
          EXPIRY_DATE: isDate,
          PAR_ID: skuData?.PAR_ID,
          LOT_NUMBER: lotName,
          LOT_BARCODE: lotName,
        },
        action: "InventoryWeb",
        method: "PostLotDetail",
        username: "admin",
        type: "rpc",
        tid: "144",
      };
      sendRequest(apiCreateLot, "POST", lotPayload, getCreateLot, token);
    } else if (!isDate) {
      setEMessage("Date Missing");
      setIsErrorMessage(true);
    } else if (!lotValidation && lotName != "") {
      setEMessage("Lot Name Not Valid");
      setIsErrorMessage(true);
    } else if (lotName == "") {
      setEMessage("Lot Name Missing");
      setIsErrorMessage(true);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mt-2">
        <NewButton label="New" handleClick={createNewLot} />
      </div>
      {/* <button
        disabled={!lotName || !lotValidation || !isDate}
        onClick={createNewLot}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-1 h-[41px] "
      >
        Create Lot
      </button> */}

      <div className="w-full flex items-start gap-4 mt-5">
        <div className="flex justify-start items-start flex-col">
          <label
            for="sku"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            SKU
          </label>
          <input
            id="sku"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] p-2.5 "
            type="text"
            value={skuData?.PART_NUMBER}
            disabled={true}
          />
        </div>
        <div className="flex justify-start items-start flex-col">
          <label
            for="lot"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            LOT#
          </label>
          <input
            id="lot"
            className={`bg-gray-50 border ${
              lotName != ""
                ? lotValidation
                  ? "border-gray-300 focus:border-gray-300"
                  : "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-gray-300"
            } outline-none text-gray-900 text-sm rounded-lg block w-[200px] p-2.5 `}
            type="text"
            autoComplete="off"
            onChange={onChangeLotName}
            value={lotName}
            ref={focRef}
            required
          />{" "}
          {!lotValidation && lotName != "" && (
            <span className="text-red-500">LOT already exists</span>
          )}
          {/* {lotName != "" ? lotValidation ? <FaCheck /> : <FcCancel /> : ""} */}
        </div>
        <div className="relative w-[150px]">
          <div>
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              DATE
            </label>
            <div
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[150px] p-2.5 "
              onClick={onDateAdd}
            >
              <div className="flex justify-between items-center w-full">
                <span>{isDate ? isDate : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
          </div>

          {isDatePicker && (
            <div className="absolute">
              <DatePicker
                onDateChange={onDateChange}
                setIsDatePicker={setIsDatePicker}
                setPastYears={0}
              />
            </div>
          )}
        </div>
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
};

export default CreateLot;
