import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderProductUpdate,
  setMultiAssignDrawer,
  setMultiOrderIds,
  setMultiTransferDrawer,
} from "../../redux/stockSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { StockOrder } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import PdfModal from "../../../../../../../components/misc/pureComponents/modal/PdfModal";

const StockOrderAction = ({ data, rowData, obj }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const subData = useSelector((state) => state.stockSlices.subData);
  const refresh = useSelector((state) => state.stockSlices.Refresh);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;

  useEffect(() => {
    if (refresh == true) {
      setTooltipVisible(false);
    }
  }, [refresh]);

  const payloadGet = {
    data: {
      INVSTO_ID: rowData.INVSTO_ID,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  };

  const getTranferData = (data) => {
    const getDataDet = {
      id: data.Result.Results[0].INVSTO_ID,
      product: data.Result.Table1,
      form: data.Result.Results,
    };
    dispatch(orderProductUpdate(getDataDet));
    dispatch(setMultiOrderIds({ id: rowData.INVSTO_ID, action: "T" }));
    dispatch(setMultiTransferDrawer(true));
  };
  const getAssignData = (data) => {
    const getDataDet = {
      id: data.Result.Results[0].INVSTO_ID,
      product: data.Result.Table1,
      form: data.Result.Results,
    };
    dispatch(orderProductUpdate(getDataDet));
    dispatch(setMultiOrderIds({ id: rowData.INVSTO_ID, action: "A" }));
    dispatch(setMultiAssignDrawer(true));
  };

  const onSubmit = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const newAction = () => {
    if (data == "NEW" || data == "Initiated") {
      let finde = subData.some((data) => data.id == rowData.INVSTO_ID);
      if (finde == false) {
        sendRequest(getUrl, "POST", payloadGet, getTranferData, token);
      } else {
        dispatch(setMultiOrderIds({ id: rowData.INVSTO_ID, action: "T" }));
        dispatch(setMultiTransferDrawer(true));
      }
    }
  };

  const transferAction = () => {
    let finde = subData.some((data) => data.id == rowData.INVSTO_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getTranferData, token);
    } else {
      dispatch(setMultiOrderIds({ id: rowData.INVSTO_ID, action: "T" }));
      dispatch(setMultiTransferDrawer(true));
    }
  };
  const assignAction = () => {
    let finde = subData.some((data) => data.id == rowData.INVSTO_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAssignData, token);
    } else {
      dispatch(setMultiOrderIds({ id: rowData.INVSTO_ID, action: "A" }));
      dispatch(setMultiAssignDrawer(true));
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

  const payloadPdf = {
    data: {
      INVSTO_ID: rowData?.INVSTO_ID,
    },
    action: "InventoryWeb",
    method: "StockOrderPDFReport",
    username: obj?.form[0].PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
  };

  const getPdfData = (data) => {
    setTooltipVisible(false);
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: "Stock Order Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(
      StockOrder.StockOrderPDFReport,
      "POST",
      payloadPdf,
      getPdfData,
      token
    );
  };

  return (
    <div className="size-full relative">
      <button
        onClick={() => onSubmit()}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          data == "NEW" || data == "Initiated"
            ? "bg-yellow-700"
            : "bg-indigo-500"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {data == "NEW" || data == "Initiated" ? "Transfer" : data}
        </p>
      </button>
      {isTooltipVisible && (
        <div className="absolute z-[112] text-white  bg-white w-full p-1 text-sm shadow-lg rounded">
          {(data == "NEW" || data == "Initiated") && (
            <div
              onClick={() => newAction()}
              className={` cursor-pointer bg-yellow-700`}
            >
              <p className="p-1 w-full m-1">Transfer</p>
            </div>
          )}
          {(data == "Partial Transferred |Not Assigned" ||
            data == "Partial Transferred | Partial Assigned") && (
            <div
              onClick={() => transferAction()}
              className={` cursor-pointer bg-yellow-700`}
            >
              <p className="p-1 w-full m-1">Transfer</p>
            </div>
          )}
          {(data == "Partial Transferred |Not Assigned" ||
            data == "Full Transferred |Not Assigned" ||
            data == "Partial Transferred | Partial Assigned" ||
            data == "Full Transferred | Partial Assigned") && (
            <div
              onClick={() => assignAction()}
              className={` cursor-pointer bg-indigo-500`}
            >
              <p className="p-1 w-full m-1">Assign</p>
            </div>
          )}
          <div
            onClick={() => handleChangeToPdf()}
            className={` cursor-pointer bg-[#854d0e] rounded`}
          >
            <p className="p-1 w-full m-1">Report</p>
          </div>
        </div>
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

export default StockOrderAction;
