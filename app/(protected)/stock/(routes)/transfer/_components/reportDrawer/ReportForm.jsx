import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { Transfer } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import TransferReportLeft from "./reportFormComponent/TransferReportLeft";
import TransferReportRight from "./reportFormComponent/TransferReportRight";

const ReportForm = ({ pdfModal, setPdfModal, pdf, setPdf, onClose }) => {
  const [isHeader, setIsHeader] = useState(true);
  const [sku, setSku] = useState("");
  const [lot, setLot] = useState("");
  const [warehouseTo, setWarehouseTo] = useState("");
  const [transferNum, setTransferNum] = useState("");
  const [status, setStatus] = useState("");
  const [warehouseFrom, setWarehouseFrom] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const ReportPayload = {
    data: {
      LOT_NUMBER: lot,
      PART_DETAILS: sku,
      TRANSFER_DATE_FROM: dateFrom,
      TRANSFER_DATE_TO: dateTo,
      TRANSFER_NUMBER: transferNum,
      TRANSFER_STATUS: status,
      WAR_ID_FROM: warehouseFrom,
      WAR_ID_TO: warehouseTo,
    },
    action: "InventoryWeb",
    method: "GetInvTransferListPDFReport",
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

  const handleGetReportData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: data?.Result, pdfUrl: url });
        setPdfModal(true);
        onClose();
      } else {
        alert("Failed to open file");
      }
    }
  };

  //   console.log("pdf", pdf);

  const handleGenerateReport = () => {
    sendRequest(
      Transfer?.GetInvTransferListPDFReport,
      "POST",
      ReportPayload,
      handleGetReportData,
      token
    );
  };
  return (
    <div>
      <div
        className=" flex flex-col relative   lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
      rounded-md bg-white  "
      >
        <div className="py-2 ">
          <DropdownMenu
            label="Generate"
            handleClick={() => {
              handleGenerateReport();
            }}
            // options={options}
            // isOpen={isOpen}
            // setIsOpen={setIsOpen}
          />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
            <div className="ml-1 my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-2 ">
                <div className="flex flex-col lg:flex-row  px-1 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <TransferReportLeft
                      transferNum={transferNum}
                      setTransferNum={setTransferNum}
                      status={status}
                      setStatus={setStatus}
                      warehoseFrom={warehouseFrom}
                      setWarehouseFrom={setWarehouseFrom}
                      dateFrom={dateFrom}
                      setDateFrom={setDateFrom}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <TransferReportRight
                      sku={sku}
                      setSku={setSku}
                      lot={lot}
                      setLot={setLot}
                      warehouseTo={warehouseTo}
                      setWarehouseTo={setWarehouseTo}
                      dateTo={dateTo}
                      setDateTo={setDateTo}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
