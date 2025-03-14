"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  readySubGridPayLoad,
  setLotList,
  setRefresh,
} from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const PurchaseSGridLotNum = ({ data, index, rowData, id, obj }) => {
  const focRef = useRef(null);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  const [color, setColor] = useState();
  const [arr, setArr] = useState([]);
  const [purOrderD, setPurOrderD] = useState([]);
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const payloadLot = {
    data: {
      PURORD_ID: rowData.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };


    const payloadDetail = {
      data: purOrderD,
      method: "PostPurchaseOrderDetails",
      action: "InventoryWeb",
      tid: "144",
      type: "rpc",
      username: "admin",
    };

  const payloadOrder = {
    data: {
      APPROVED_FLAG: obj?.form[0].APPROVED_FLAG,
      COMPLETE_FLAG: "N",
      ETA_DATE: obj?.form[0].ETA_DATE,
      FNZ_FLAG: "N",
      FNZ_USE_ID: "2694",
      NOTES: obj?.form[0].NOTES,
      PO_DATE: obj?.form[0].PO_DATE,
      PREPARED_DATE: new Date().toISOString().split("T")[0],
      PURORD_ID: obj?.form[0].PURORD_ID,
      REFERENCE_NUMBER: obj?.form[0].REFERENCE_NUMBER,
      TERMS_CONDITION: obj?.form[0].TERMS_CONDITION,
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: obj?.form[0].VEN_ID,
      VOID_FLAG: obj?.form[0].VOID_FLAG,
      VOID_NOTES: obj?.form[0].VOID_NOTES,
      WAR_ID: obj?.form[0].WAR_ID,
    },
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    tid: "144",
    type: "rpc",
    username: "admin",
  };
  const getAllLot = (data) => {
    dispatch(setLotList(data.Result));
  };

  useEffect(() => {
    sendRequest(apiUrlLot, "POST", payloadLot, getAllLot, token);
    const orderProducts = obj?.product.map((items) => {
        const {
          PURORDDET_ID,
          PURORD_ID,
          PAR_ID,
          DESCRIPTION,
          CATALOG_NUMBER,
          QUANTITY,
          DELETED_FLAG,
          WORORD_ID,
          COST,
          USE_ID,
          LOT_NUMBER,
          QUARANTINE_FLAG,
          READY_FOR_RECEIVING_FLAG,
          INVPARLOT_ID,
        } = items;
    
        return {
          PURORDDET_ID,
          PURORD_ID: PURORD_ID.toString(),
          PAR_ID,
          DESCRIPTION,
          CATALOG_NUMBER,
          QUANTITY,
          DELETED_FLAG,
          WORORD_ID,
          COST,
          USE_ID,
          LOT_NUMBER,
          QUARANTINE_FLAG,
          READY_FOR_RECEIVING_FLAG,
          INVPARLOT_ID,
          VENDOR_QUANTITY: QUANTITY,
        };
      });
      const orderD = orderProducts.map((obj) => {
        // Iterate through each property of the object
        const newObj = {};
        for (let key in obj) {
          newObj[key] = obj[key] === undefined ? "" : obj[key];
          newObj.DELETED_FLAG = "N";
        }
        return newObj;
      });
      setPurOrderD(orderD)
  }, []);

  useEffect(() => {
    if (lotList.length > 0) {
      const sortedArr = [...lotList]; 
      sortedArr.sort((a, b) => {
        if (a.LOT_NUMBER === rowData.LOT_NUMBER) return -1; 
        if (b.LOT_NUMBER === rowData.LOT_NUMBER) return 1; 
        return 0; 
      });
      setArr(sortedArr);
    }
  }, [lotList, data]);

  const getProdectDetailRes = (data) => {
     dispatch(setRefresh(true));
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetail,
        getProdectDetailRes,
        token
      );
    }
  };

  useEffect(() => {
    let colFil = lotList.filter(
      (data) => data.LOT_NUMBER == rowData.LOT_NUMBER
    );
    setColor(colFil[0]?.PURCHASE_GROUP_COLOR);
  }, [lotList]);

  const setChange = (e) => {
    setColor(e.PURCHASE_GROUP_COLOR);
    let expDate = "";
    let invId = "";
    lotList.forEach((data) => {
      if (data.LOT_NUMBER === e.LOT_NUMBER) {
        expDate = data.EXPIRY_DATE;
        invId = data.INVPARLOT_ID;
      }
    });
    setPurOrderD(
        purOrderD.filter((item) => {
        if(item.PURORDDET_ID == rowData.PURORDDET_ID ) {
          item.LOT_NUMBER = e.LOT_NUMBER
          item.INVPARLOT_ID = invId
          item.READY_FOR_RECEIVING_FLAG = "Y"
        }
        return item;
      })
    )
  };
  const handleOnFocus = () => {};

  const handleOnBlur = () => {
    sendRequest(apiUrlPOrder, "POST", payloadOrder, getAllTaskPOrder, token);
  };
  return (
    <div className="w-full h-full flex justify-center bg-[#E1EFF2] pr-[3px] items-center">
      <div
        style={{ backgroundColor: `${color}` }}
        className={`p-[2px] mr-[2px] h-full`}
      ></div>
        {
           rowData.NON_STOCK_ITEM_FLAG == "N" ? 
       
      <Dropdown
        options={arr}
        optionKey1="LOT_NUMBER"
        optionKey2="LOT_NUMBER"
        onSelectedOptionChanged={setChange}
        placeholder="select lot"
        inputClassName="focus:outline-none w-full hover:bg-transparent 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-center"
        dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        customFocusKey="p"
        isDisabled={obj?.statusId == "Issued to Vendor" ? false : true}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput={rowData?.LOT_NUMBER}
        onHandleBlur={handleOnBlur}
        forwardedRef={focRef}
      /> : 
        <Tooltip content='non-stock item dont need Lot#'>
            <FaCircleInfo />
        </Tooltip>   }
    </div>
  );
};

export default PurchaseSGridLotNum;
