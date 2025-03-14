import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import ReportLeftForm from "../reportDrawer/reportFormComp/ReportLeftForm";
import ReportRightForm from "../reportDrawer/reportFormComp/ReportRightForm";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const ReportForm = ({ pdfModal, setPdfModal, pdf, setPdf, onClose }) => {
  const [isHeader, setIsHeader] = useState(true);
  const [warehouse, setWarehouse] = useState('');
  const [purchaseGroup, setPurchaseGroup] = useState('');
  const [sku, setSku] = useState('');
  const [selectLot, setSelectLot] = useState('');
  const [exDateFrom, setExDateFrom] = useState("");
  const [exDateTo, setExDateTo] = useState("");
  const [itemStatus, setItemStatus] = useState("Stock Items");
  const [boltenFlag, setBoltenFlag] = useState(false);
  const [location, setLocation] = useState("");
  const [expiryStatus, setExpiryStatus] = useState("NotExpired");
  const [activeFlag, setActiveFlag] = useState(false);
  const [promoFlag, setPromoFlag] = useState(false);
  const [oHFrom , setOHFrom] = useState('')
  const [oHTo , setOHTo] = useState('')

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();

  const ItemMasterReportPayload = {
    data: {
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: activeFlag ? 'N' : '',
      WAR_ID: warehouse,
      DUPLICATE_PARTS_FLAG: "",
      PAR_ID: "26",
      OH_QTY_FROM: oHFrom,
      OH_QTY_TO: oHTo,
      EXPIRY_DATE_FROM: exDateFrom,
      EXPIRY_DATE_TO: exDateTo,
      SUPPLIER_REPORT_FLAG: "",
      VEN_ID: "",
      PURCHASE_GROUP: purchaseGroup,
      PROMO_FLAG: promoFlag ? 'Y' : '',
      EXPIRY_IN_DAYS: "",
      INVPARLOT_ID: selectLot,
      LOCATION: location,
      NON_STOCK_ITEM_FLAG: itemStatus == "Stock Items" ? "N" : itemStatus == "Non-Stock Items" ? "Y" : '',
      EXPIRY_STATUS: expiryStatus,
      BOLTON_ITEM_FLAG: boltenFlag ? "Y" : "",
    },
    action: "ItemMaster",
    method: "ItemMasterPDFReport",
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

  console.log("pdf", pdf);

  const handleGenerateReport = () => {
    sendRequest(
      ItemMaster?.ItemMasterPDFReport,
      "POST",
      ItemMasterReportPayload,
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
            handleClick={handleGenerateReport}
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
                    <ReportLeftForm
                      purchaseGroup={purchaseGroup}
                      setPurchaseGroup={setPurchaseGroup}
                      sku={sku}
                      setSku={setSku}
                      selectLot={selectLot}
                      setSelectLot={setSelectLot}
                      itemStatus={itemStatus}
                      setItemStatus={setItemStatus}
                      oHFrom={oHFrom}
                      setOHFrom={setOHFrom}
                      oHTo={oHTo}
                      setOHTo={setOHTo}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <ReportRightForm
                      warehouse={warehouse}
                      setWarehouse={setWarehouse}
                      exDateFrom={exDateFrom}
                      setExDateFrom={setExDateFrom}
                      exDateTo={exDateTo}
                      setExDateTo={setExDateTo}
                      boltenFlag={boltenFlag}
                      setBoltenFlag={setBoltenFlag}
                      location={location}
                      setLocation={setLocation}
                      expiryStatus={expiryStatus}
                      setExpiryStatus={setExpiryStatus}
                      activeFlag={activeFlag}
                      setActiveFlag={setActiveFlag}
                      promoFlag={promoFlag}
                      setPromoFlag={setPromoFlag}
                      itemStatus={itemStatus}
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
