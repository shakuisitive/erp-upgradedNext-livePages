import React, { useEffect, useMemo, useState } from "react";
import PdfModal from "../../../../../../components/misc/pureComponents/modal/PdfModal";
import useApiFetch from "../../../../../../customHook//useApiFetch";
import { useSelector, useDispatch } from "react-redux";
import { clearMGSubGridData } from "../redux/receivingSlices";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";

const ReceivingAction = ({ data, rowData }) => {
  const dispatch = useDispatch();
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const [recData, setRecData] = useState([]);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [modifiedPayload, setModifiedPayload] = useState(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const recDetails = useSelector((state) => state.receivingSlices.mGDetils);
  const warId = useSelector((state) => state.receivingSlices.mGWarId);
  const formData = useSelector((state) => state.receivingSlices.mGPRData);
  const gridData = useSelector((state) => state.receivingSlices.mGSubDataDet);
  const isCheckedFItem = useSelector(
    (state) => state.receivingSlices.isCheckedFItem
  );

  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderReceivingPDFReport`;
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecieving`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingDetail`;
  const apiUrlFinalized = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostFinalizedRecieving`;
  const apiUrlAStock = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostAutoStockOrder`;
  const apiUrlByPo = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingByPO`;
  const apiUrlGRList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecievingList`;
  const apiUrlGR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;

  const modifiedData = gridData.map(
    ({ QTY_ORDERED, BO_QUANTITY, ...rest }) => ({
      ...rest,
      BACK_ORDER_FLAG: "Y",
    })
  );

  const anyItemCheckedWithLotNumber = modifiedData.every(
    (item) =>
      item.QUANTITY != "" && item.QUANTITY > 0 && item?.BACK_ORDER_FLAG === "Y"
  );

  const filteredItems = useMemo(() => 
    gridData.filter(item =>
    item.READY_FOR_RESTOCK_FLAG === "N" &&
    item.BACK_ORDER_FLAG === "Y" 
  ),
  [gridData]
);


useEffect(() => {
  if (filteredItems.length > 0) {
    const items = filteredItems
      .filter((_, index) => isCheckedFItem.includes(index))
      .map(({ BO_QUANTITY, ...rest }) => ({
        ...rest,
        READY_FOR_RESTOCK_FLAG: "Y",
      }));

    setModifiedPayload(items);
  }
}, [filteredItems, isCheckedFItem]);
  const anyItemCheckedWithYFlag = modifiedPayload?.some(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "Y"
  );

  const anyItemCheckedWithQty = gridData.some(
    (item) => item.BO_QUANTITY != item.QUANTITY
  );



  const payloadPdf = {
    data: {
      PURORD_ID: rowData?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadFinalized = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      USER_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostFinalizedRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadAStockOdr = {
    data: [
      {
        INVREC_ID: recDetails?.INVREC_ID,
        WAR_ID: warId[0]?.WAR_ID,
        USER_ID: "2694",
      },
    ],
    action: "InventoryWeb",
    method: "PostStockOrderDetail",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadGR = {
    data: {
      INVREC_ID: `${recDetails?.INVREC_ID}`,
      OFFSET: "+5:00",
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: modifiedData,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetailsRestock = {
    data: modifiedPayload,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payload = {
    data: formData[0],
    action: "InventoryWeb",
    method: "PostRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadByPO = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      PURORD_ID: recDetails?.PURORD_ID,
      USER_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostRecievingByPO",
    username: "admin",
    tid: "144",
    type: "rpc",
  };

  const payloadGRList = {
    data: {
      FINZ_FLAG: "N",
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
    },
    action: "InventoryWeb",
    method: "GetRecievingList",
    username: "admin",
    tid: "144",
    type: "rpc",
  };

  const getRecData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(clearMGSubGridData());
    }
  };

  const getAllTaskR = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGRList, "POST", payloadGRList, getRecData, token);
    }
  };

  const postRecByPO = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGR, "POST", payloadGR, getAllTaskR, token);
    }
  };

  const postRecevingDetail = (data) => {
    if (anyItemCheckedWithQty && data?.CODE == "SUCCESS") {
      sendRequest(apiUrlByPo, "POST", payloadByPO, postRecByPO, token);
    } else {
      sendRequest(apiUrlGR, "POST", payloadGR, getAllTaskR, token);
    }
  };

  const getAllTask = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        postRecevingDetail,
        token
      );
    }
  };

  const handleApplyQty = () => {
    if (anyItemCheckedWithLotNumber && gridData.length > 0) {
      sendRequest(apiUrl, "POST", payload, getAllTask, token);
    } else {
      setEMessage("Received quantity must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  const getAStockOdrData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGRList, "POST", payloadGRList, getRecData, token);
    }
  };

  const getFinalizedData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlAStock,
        "POST",
        payloadAStockOdr,
        getAStockOdrData,
        token
      );
    }
  };

  const getPostRecevingDetailRestock = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlFinalized,
        "POST",
        payloadFinalized,
        getFinalizedData,
        token
      );
    }
  };

  const getPostDataReceiving = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetailsRestock,
        getPostRecevingDetailRestock,
        token
      );
    }
  };

  
  const handleRestock = () => {
    if (modifiedPayload?.length > 0) {
      if (anyItemCheckedWithYFlag) {
        sendRequest(apiUrl, "POST", payload, getPostDataReceiving, token);
      } else {
        setEMessage("Conditions Not follow to Proceed");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Please select order first.");
      setIsErrorMessage(true);
    }
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
        setPdf({ title: "Receiving Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        setEMessage("Failed to open file.");
        setIsErrorMessage(true);
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(apiUrlPdf, "POST", payloadPdf, getPdfData, token);
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "IN PROCESS":
        return "bg-green-400";
      case "NEW":
        return "bg-cyan-400";
      case "Void":
        return "bg-yellow-400";
      case "RE-STOCKED":
        return "bg-indigo-400";
      case "Reversed":
        return "bg-slate-400";
      case "READY FOR RELEASE":
        return "bg-teal-400";
      default:
        return "";
    }
  };

  const getBtnTitle = (status) => {
    switch (status) {
      case "IN PROCESS":
        return "Restock";
      case "NEW":
        return "Apply";
      case "RE-STOCKED":
        return "Report";
      case "Reversed":
        return "Reversed";
      case "READY FOR RELEASE":
        return "Apply";
      default:
        return "Apply";
    }
  };

  const getClickHandler = (status) => {
    switch (status) {
      case "IN PROCESS":
        return handleRestock;
      case "NEW":
        return handleApplyQty;
      case "RE-STOCKED":
        return handleChangeToPdf;
      case "READY FOR RELEASE":
        return () => console.log("Ready for release clicked");
      case "Reversed":
        return () => console.log("Reversed clicked");
      default:
        return () => console.log("Default clicked");
    }
  };
  const handleClick = getClickHandler(data);

  return (
    <div className="size-full relative cursor-pointer">
      <div
        className={`w-full h-full flex items-center cursor-pointer justify-center ${getBackgroundColor(
          data
        )}`}
        onClick={handleClick}
      >
        <p className="text-[14px] text-white">{getBtnTitle(data)}</p>
      </div>
      {pdfModal == true && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )}

      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default ReceivingAction;
