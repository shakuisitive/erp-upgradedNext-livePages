import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoIosArrowDown,
} from "react-icons/io";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import PdfModal from "./../../../../../../../components/misc/pureComponents/modal/PdfModal";
import useApiFetch from "./../../../../../../../customHook/useApiFetch";
import { StockOrder } from "./../../../../../../../components/misc/pureComponents/constants/apiConstant";

const FormBtnDropdown = ({ onApply }) => {
  let [error, sendRequest] = useApiFetch();
  const tooltipRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);

  const subData = useSelector(
    (state) => state.stockSlices.subData[0]
  );

  const CycleCountForm = useSelector((state) => state.CycleCountSlice.CycleCountForm[0]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

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
      INVSTO_ID: subData?.form[0]?.INVSTO_ID,
    },
    action: "InventoryWeb",
    method: "StockOrderPDFReport",
    username: subData?.form[0]?.PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
  };

  const getPdfData = (data) => {
    setIsOpen(false);
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
      accessToken
    );
  };

  return (
    <div className="relative">
      <div className="mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md bg-cyan-400 hover:bg-cyan-500">
        <div
          className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle "
          onClick={onApply}
        >
          <span className="font-medium  cursor-pointer">Apply</span>
        </div>
        <div
          className="text-white flex items-center px-2 cursor-pointer "
          onClick={handleIsOpen}
        >
          <IoIosArrowDown className="text-[18px] " />
        </div>
      </div>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[200px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="">
            <div
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center flex `}
              onClick={handleChangeToPdf}
            >
              <MdOutlineFileDownloadDone />
              Report
            </div>
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

export default FormBtnDropdown;
