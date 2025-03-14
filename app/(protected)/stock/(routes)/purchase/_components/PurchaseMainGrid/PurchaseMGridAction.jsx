import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { loaderToggle, setPurchaseDetails, setRefresh } from "../../redux/Purchase.slice";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PurchaseFormEmail from "../purchaseForm/PurchaseFormEmail";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import VoidCall from "./../PurchaseSubGrid/VoidCall";
import PdfModal from './../../../../../../../components/misc/pureComponents/modal/PdfModal';

const PurchaseMGridAction = ({ data, rowData, index, obj }) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;
  const apiUrlReveres = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostReversePO`;
  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderPDFReport`;
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();
  const [purOrder, setPurOrder] = useState([]);
  const [lotCheck, setLotCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovLoading, setHovLoading] = useState(false);
  const [purOrderDetails, setPurOrderDetails] = useState([]);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [returnDrawer, setReturnDrawer] = useState(false);
  const [isOpenVoidNote, setOpenVoidNote] = useState(false);
  const cancelButtonRef = useRef(null);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
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

  const payloadPOrderReverse = {
    data: { PURORD_ID: rowData.PURORD_ID, REVERSE_FLAG: "Y" },
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

    dispatch(setPurchaseDetails(data.Result.INV_PURCHASE_ORDERS_WV[0]));

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
    let lotNum = purOrderDetailsUpdate?.some(
      (data) =>
        data.LOT_INITIAL_STATUS != null && data.NON_STOCK_ITEM_FLAG == "N"
    );
    
    setHovLoading(false);
    if (lotNum == false) {
      setLotCheck(false);
    } else {
      setLotCheck(true);
    }
  }


  const onHover = () => {
    setHovLoading(true);
    if (data == "Initiated" || data == "Issued to Vendor" || data== "Partially Ready for Receiving") {
      sendRequest(apiUrl, "POST", purchasePayload, getAllTask, token);
    }
  };

  const getProdectDetailRes = (data) => {
    setIsDrawer(false);
    setReturnDrawer(false);
    setLoading(false);
    setTooltipVisible(false);
    dispatch(loaderToggle(false));
    dispatch(setRefresh(true));
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      setTooltipVisible(false)
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
      setTooltipVisible(false)
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
      if (purOrderDetails.length > 0) {
        setIsDrawer(true);
      } else {
        setTooltipVisible(false)
        setEMessage("Add Products In This Order");
        setIsErrorMessage(true);
      }
    } else if (
      data == "Issued to Vendor" ||
      data == "Partially Ready for Receiving"
    ) {
      if (lotCheck && hovLoading == false) {
        setLoading(true);
        let purOrderChange = [...purOrder];
        purOrderChange[0].COMPLETE_FLAG = "Y";
        purOrderChange[0].PREPARED_DATE = new Date()
          .toISOString()
          .split("T")[0];
        setPurOrder(purOrderChange);
        let setDetails = purOrderDetails.forEach(item => {
          if(item.NON_STOCK_ITEM_FLAG == "Y" || item.LOT_INITIAL_STATUS == "Y" || (item.INVPARLOT_ID != null && item.LOT_NUMBER != null)) {
            item.READY_FOR_RECEIVING_FLAG = "Y"
          }
        });
        setPurOrderDetails(setDetails);
        sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskR, token);
      } else {
        setTooltipVisible(false)
        setEMessage("Check Lot #");
        setIsErrorMessage(true);
      }
    }
  };

  const onIssueToVander = () => {
    setLoading(true);
    dispatch(loaderToggle(true));
    let purOrderChange = [...purOrder];
    purOrderChange[0].APPROVED_FLAG = "Y";
    purOrderChange[0].PREPARED_DATE = new Date().toISOString().split("T")[0];
    setPurOrder(purOrderChange);
    sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskPOrder, token);
  };

  const onReturnToIssuance = () => {
    setLoading(true);
    dispatch(loaderToggle(true));
    let purOrderChange = [...purOrder];
    purOrderChange[0].APPROVED_FLAG = "N";
    // purOrderChange[0].PREPARED_DATE = new Date().toISOString().split("T")[0];
    // purOrderChange[0].WAR_ID = null
    setPurOrder(purOrderChange);
    sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskPOrder, token);
  };

  const handleCloseDrawer = () => {
    setIsDrawer(false);
    setReturnDrawer(false);
  };

  const tabs = [
    {
      label: "Email",
      content: (
        <PurchaseFormEmail
          setIsDrawer={setIsDrawer}
          isDrawer={isDrawer}
          handleSkipEmailIssuOrder={onIssueToVander}
        />
      ),
    },
  ];

  const tabReturn = [
    {
      label: "Email",
      content: (
        <PurchaseFormEmail
          setIsDrawer={setReturnDrawer}
          isDrawer={returnDrawer}
          handleSkipEmailIssuOrder={onReturnToIssuance}
        />
      ),
    },
  ];

  const returnVoid = (data) => {
    if (data.CODE == "SUCCESS") {
      setLoading(false);
      setTooltipVisible(false);
      dispatch(setRefresh(true));
    }
  };

  const onClose = () => {
    setOpenVoidNote(false);
  };

  const onVoid = () => {
    setLoading(true);
    let purOrderChange = [...purOrder];
    purOrderChange[0].APPROVED_FLAG = "N";
    purOrderChange[0].COMPLETE_FLAG = "N";
    purOrderChange[0].FNZ_FLAG = "N";
    purOrderChange[0].VOID_FLAG = "Y";
    setPurOrder(purOrderChange);
    sendRequest(apiUrlPOrder, "POST", payloadPOrder, returnVoid, token);
  };

  const getReverse = (data)=> {
    if (data.CODE == "SUCCESS") {
      setLoading(false);
      setTooltipVisible(false)
      dispatch(setRefresh(true));
    }
  }

  const onReverseAction = () => {
    setLoading(true);
    sendRequest(apiUrlReveres, "POST", payloadPOrderReverse, getReverse, token);
  };

  const onVoidChange = (value) => {
    let purOrderChange = [...purOrder];
    purOrderChange[0].VOID_NOTES = value;
    setPurOrder(purOrderChange);
  };

  const payloadPdf = {
    data: {
      PURORD_ID: rowData?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: obj?.form[0].PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
  };

  const convertToPdf = (bytes) => {
    const binaryString = atob(bytes);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const getPdfData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: "Purchase Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(apiUrlPdf, "POST", payloadPdf, getPdfData, token);
  };

  return (
    <div className="size-full relative">
      {loading == false ? (
        <button
          onMouseEnter={() => onHover()}
          onClick={() => setTooltipVisible(!isTooltipVisible)}
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
              ? "bg-indigo-500"
              : data == "Partially Received"
              ? "bg-slate-400"
              : ""
          } `}
        >
          <p className="text-[14px] leading-normal  line-clamp-1 text-white">
            {data == "Initiated"
              ? "Issued to Vendor"
              : data == "Issued to Vendor" ||
                data == "Partially Ready for Receiving"
              ? "Ready for Receiving"
              : data}
          </p>
        </button>
      ) : (
        <div
          role="status"
          className="w-full h-full flex justify-center item items-center	 "
        >
          <svg
            aria-hidden="true"
            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {isTooltipVisible && (
        <div className="absolute z-[112] text-white  bg-white w-full p-1 text-sm shadow-lg rounded">
          {data == "Initiated" && (
            <div
              onClick={() => onSubmit()}
              className={` cursor-pointer bg-cyan-400 rounded`}
            >
              <p className="p-1 w-full m-1">Issue to vendor</p>
            </div>
          )}

          {data == "Initiated" && (
            <div
              onClick={() => setOpenVoidNote(!isOpenVoidNote)}
              className={` cursor-pointer bg-slate-400 rounded`}
            >
              <p className="p-1 w-full m-1">Void</p>
            </div>
          )}

          {(data == "Issued to Vendor" ||
            data == "Partially Ready for Receiving") && (
            <div
              onClick={() => onSubmit()}
              className={` cursor-pointer bg-indigo-500 rounded`}
            >
              <p className="p-1 w-full m-1">Ready for receiving</p>
            </div>
          )}

          {(
            data == "Partially Ready for Receiving") && (
            <div
              onClick={() => onReverseAction()}
              className={` cursor-pointer bg-green-900 rounded`}
            >
              <p className="p-1 w-full m-1">Reverse</p>
            </div>
          )}

          {data == "Issued to Vendor" && (
            <div
              onClick={() => setReturnDrawer(!returnDrawer)}
              className={` cursor-pointer bg-cyan-400 rounded`}
            >
              <p className="p-1 w-full m-1">Return issuance</p>
            </div>
          )}

          {data != "Initiated" && (
            <div
              onClick={() => handleChangeToPdf()}
              className={` cursor-pointer bg-[#854d0e] rounded`}
            >
              <p className="p-1 w-full m-1">Report</p>
            </div>
          )}
        </div>
      )}
      <VoidCall
        isOpen={isOpenVoidNote}
        setOpen={setOpenVoidNote}
        onClose={onClose}
        cancelButtonRef={cancelButtonRef}
        onChangeComment={onVoidChange}
        onSubmit={onVoid}
      />
      <RightDrawer
        isOpen={isDrawer}
        setIsDrawer={setIsDrawer}
        onClose={handleCloseDrawer}
        heading="Purchase Order"
        tabs={tabs}
      />
      <RightDrawer
        isOpen={returnDrawer}
        setIsDrawer={setReturnDrawer}
        onClose={handleCloseDrawer}
        heading="Purchase Order"
        tabs={tabReturn}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
      {pdfModal == true && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )}
    </div>
  );
};

export default PurchaseMGridAction;
