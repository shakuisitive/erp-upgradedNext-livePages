import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

import {
  IoIosArrowDown,
  IoIosRemoveCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import PdfModal from "../../../../../../../components/misc/pureComponents/modal/PdfModal";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const FormBtnDropdown = ({
  pdfModal,
  setPdfModal,
  pdf,
  setPdf,
  handleApplyQty,
  handleRestock,
  eMessage,
  setIsErrorMessage,
  isEMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const rowData = useSelector((state) => state.receivingSlices.subGridState);
  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );

  const allFieldsFilledDetail = rowData.every((item) => {
    return item.BACK_ORDER_FLAG == "Y";
  });

  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderReceivingPDFReport`;

  const payloadPdf = {
    data: {
      PURORD_ID: recDetails?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: "admin",
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
        setPdf({ title: "Receiving Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(apiUrlPdf, "POST", payloadPdf, getPdfData, token);
  };

  const getBackgroundColor = (status) => {
    switch (status) {
      case "IN PROCESS":
        return allFieldsFilledDetail ? "bg-green-300" : "bg-cyan-300";
      case "NEW":
        return "bg-cyan-300";
      case "Void":
        return "bg-yellow-300";
      case "RE-STOCKED":
        return "bg-indigo-300";
      case "Reversed":
        return "bg-slate-300";
      case "READY FOR RELEASE":
        return "bg-teal-300";
      default:
        return "";
    }
  };

  const backgroundColorClass = getBackgroundColor(FormStatus);

  const getBtnTitle = (status) => {
    switch (status) {
      case "IN PROCESS":
        return allFieldsFilledDetail ? "Restock" : "Apply";
      case "NEW":
        return "Apply";
      case "RE-STOCKED":
        return "Report";
      case "Reversed":
        return "bg-slate-300";
      case "READY FOR RELEASE":
        return "Apply";
      default:
        return "bg-blue-500";
    }
  };

  const getClickHandler = (status) => {
    switch (status) {
      case "IN PROCESS":
        return allFieldsFilledDetail ? handleRestock : handleApplyQty;
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
  const handleClick = getClickHandler(FormStatus);

  const handleIsOpen = () => {
    if (
      FormStatus == "IN PROCESS" ||
      FormStatus == "NEW" ||
      FormStatus == "RE-STOCKED" ||
      FormStatus == "READY FOR RELEASE" ||
      FormStatus == "Reversed"
    ) {
      setIsOpen(!isOpen);
    }
    //  else {
    //   setEMessage("Add vendor list");
    //   setIsErrorMessage(true);
    // }
  };

  return (
    <div className="size-full relative">
      <div
        className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md  ${backgroundColorClass}`}
      >
        <div
          className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle "
          onClick={handleClick}
        >
          <span className="font-medium  cursor-pointer">
            {getBtnTitle(FormStatus)}
          </span>
        </div>
        <div
          className="text-white flex items-center px-2 cursor-pointer "
          onClick={handleIsOpen}
        >
          <IoIosArrowDown className="text-[18px] " />
        </div>
      </div>

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

export default FormBtnDropdown;
