import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefresh } from "../../redux/Purchase.slice";

const PurchaseMGridAction = ({ data, rowData, index, obj }) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const [purOrder, setPurOrder] = useState([]);
  const [lotCheck, setLotCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovLoading, setHovLoading] = useState(false);
  const [purOrderDetails, setPurOrderDetails] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const purchasePayload = {
    data: {
      PURORD_ID: rowData.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrder",
    type: "rpc",
    tid: "144",
    username: "admin",
  };
  const payloadPOrder = {
    data: purOrder[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: purOrderDetails,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadRPO = {
    data: {
      PURORD_ID: rowData.PURORD_ID,
      USE_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostRecievingByPO",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  function getAllTask(data) {
    const purchaseOrder = data.Result.INV_PURCHASE_ORDERS_WV.map((items) => {
      const {
        APPROVED_FLAG,
        COMPLETE_FLAG,
        ETA_DATE,
        FNZ_FLAG,
        FNZ_USE_ID,
        NOTES,
        PO_DATE,
        PREPARED_DATE,
        PURORD_ID,
        REFERENCE_NUMBER,
        TERMS_CONDITION,
        USE_ID_APRVD_BY,
        USE_ID_COMPT_BY,
        USE_ID_PREPARED_BY,
        VEN_ID,
        VOID_FLAG,
        VOID_NOTES,
        WAR_ID,
      } = items;

      return {
        APPROVED_FLAG,
        COMPLETE_FLAG,
        ETA_DATE: ETA_DATE != null ? ETA_DATE : "",
        FNZ_FLAG,
        FNZ_USE_ID: "2694",
        NOTES,
        PO_DATE,
        PREPARED_DATE,
        PURORD_ID,
        REFERENCE_NUMBER,
        TERMS_CONDITION,
        USE_ID_APRVD_BY: "2694",
        USE_ID_COMPT_BY: "2694",
        USE_ID_PREPARED_BY: "2694",
        VEN_ID,
        VOID_FLAG,
        VOID_NOTES,
        WAR_ID: WAR_ID != null ? WAR_ID : null,
      };
    });

    const PurOrderUpdate = purchaseOrder.map((obj) => {
      // Iterate through each property of the object
      const newObj = {};
      for (let key in obj) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
        newObj.COMPLETE_FLAG = "N";
        newObj.FNZ_FLAG = "N";
      }
      return newObj;
    });

    const purchaseOrderDetails = data.Result.INV_PURCHASE_ORDER_DETAILS_WV.map(
      (items) => {
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
          VENDOR_QUANTITY,
          LOT_INITIAL_STATUS,
          NON_STOCK_ITEM_FLAG,
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
          VENDOR_QUANTITY,
          LOT_INITIAL_STATUS,
          NON_STOCK_ITEM_FLAG,

          // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
        };
      }
    );

    const purOrderDetailsUpdate = purchaseOrderDetails.map((obj) => {
      // Iterate through each property of the object
      const newObj = {};
      for (let key in obj) {
        newObj[key] = obj[key] === undefined ? "" : obj[key];
        newObj.DELETED_FLAG = "N";
      }
      return newObj;
    });
    setPurOrder(PurOrderUpdate);
    setPurOrderDetails(purOrderDetailsUpdate);
    let lotNum = purOrderDetailsUpdate?.filter(
      (data) => data.LOT_INITIAL_STATUS == null && data.NON_STOCK_ITEM_FLAG == "N"
    )
    setHovLoading(false)
    if(lotNum.length > 0) {
      setLotCheck(false);
    } else {
      setLotCheck(true);
    }
  }

  const onHover = () => {
    setHovLoading(true)
    if(data == "Initiated" || data == "Issued to Vendor") {
      sendRequest(apiUrl, "POST", purchasePayload, getAllTask, token);
    }
  };

  const getProdectDetailRes = (data) => {
    setLoading(false);
    dispatch(setRefresh(true));
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailRes,
        token
      );
    }
  };

  const getProdectDetailResPO = (data) => {
    if (data.CODE == "SUCCESS") {
      setLoading(false);
      dispatch(setRefresh(true));
    }
  };

  const getProdectDetailResR = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(apiUrlR, "POST", payloadRPO, getProdectDetailResPO, token);
    }
  };

  const getAllTaskR = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailResR,
        token
      );
    }
  };

  const onSubmit = () => {
    if (data == "Initiated" && hovLoading == false) {
      setLoading(true);
      let purOrderChange = [...purOrder];
      purOrderChange[0].APPROVED_FLAG = "Y";
      purOrderChange[0].PREPARED_DATE = new Date().toISOString().split("T")[0];
      setPurOrder(purOrderChange);
      sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskPOrder, token);
    } else if (data == "Issued to Vendor" || data == "Partially Ready for Receiving" ) {
      if (lotCheck && hovLoading == false) {
        setLoading(true);
        let purOrderChange = [...purOrder];
        purOrderChange[0].COMPLETE_FLAG = "Y";
        purOrderChange[0].PREPARED_DATE = new Date().toISOString().split("T")[0];
        setPurOrder(purOrderChange);
        sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskR, token);
         //alert("update Purchase Order");
      } else {
        alert("Check Lot #");
      }
    }
  };

  return (
    <div className="size-full relative">
      {
        loading == false ?
      <button
        onMouseEnter={() => onHover()}
        onClick={() => onSubmit()}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          data == "Completed"
            ? "bg-green-400"
            : data == "Issued to Vendor"
            ? "bg-indigo-500"
            : data == "Initiated"
            ? "bg-cyan-400"
            : data == "Void"
            ? "bg-yellow-400"
            : data == "Ready for Receiving"
            ? "bg-indigo-500"
            : data == "Partially Ready for Receiving"
            ? "bg-slate-400"
            : data == "Partially Received"
            ? "bg-slate-400"
            : ""
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {data == "Initiated"
            ? "Issued to Vendor"
            : data == "Issued to Vendor"
            ? "Ready for Receiving"
            : data}
        </p>
      </button>: 
      <div role="status" className="w-full h-full flex justify-center item items-center	 ">
        <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>}
    </div>
  );
};

export default PurchaseMGridAction;
