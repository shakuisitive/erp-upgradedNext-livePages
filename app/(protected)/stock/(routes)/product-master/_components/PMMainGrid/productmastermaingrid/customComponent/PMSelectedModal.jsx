import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { BsArrowRightCircle } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { GoArchive } from "react-icons/go";
import { IoMdCopy } from "react-icons/io";
import { IoClose, IoExtensionPuzzleOutline } from "react-icons/io5";
import { PiArrowBendRightDown } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  setDuplicateDrawer,
  setDuplicateLotData,
  setEditDetForm,
  setRefresh,
  setReportDrawer,
} from "../../../../redux/pmSlice";
import {
  Administration,
  General,
  ItemMaster,
} from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../../../components/misc/pureComponents/modal/Modal";
import RightDrawer from "../../../../../../../settings/(routes)/tax/_components/grid/TaxRightDrawer";
import DuplicateForm from "../../../PMForm/duplicateFormDrawer/DuplicateForm";
import VerifyModal from "../../../../../../../../../components/misc/pureComponents/modal/VerifyModal";
const PMSelectedModal = ({
  isOpen,
  closeModal,
  checkedItems,
  checkedSubItems,
}) => {
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  let [error, sendRequest] = useApiFetch();
  const pmPartList = useSelector((state) => state.pmSlices.partList);

  const editDetForm = checkedSubItems[0]?.rowData
    ? checkedSubItems[0]?.rowData
    : [];

  const parId = checkedSubItems[0]?.rowData?.PAR_ID;
  const payloadGetPartDet = {
    data: {
      OFFSET: "+04:00",
      PAR_ID: parId,
    },
    action: "ItemMaster",
    method: "GetPartDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadGetPartLotList = {
    data: {
      ACTIVE_FLAG: "Y",
      ORDER: "",
      PAR_ID: parId,
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetPartLotList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const duplicateLotListPayload = {
    data: { PAR_ID: parId },
    action: "Inventory",
    method: "GetDuplicatePartLots",
    username: "admin",
  };

  const handleGetDuplicatePartLots = (data) => {
    setLoading(data?.Result);
    setApiCall(true);
    if (data?.CODE == "SUCCESS") {
      dispatch(setDuplicateLotData(data?.Result));
    }
  };

  const handleGetPartLotList = (data) => {
    sendRequest(
      General.GetDuplicatePartLots,
      "POST",
      duplicateLotListPayload,
      handleGetDuplicatePartLots,
      token
    );
  };
  const handleGetPartDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setEditDetForm(data?.Result));
      sendRequest(
        Administration.GetPartLotList,
        "POST",
        payloadGetPartLotList,
        handleGetPartLotList,
        token
      );
    }
  };

  const payload = {
    PAR_ID: editDetForm?.PAR_ID,
    CODE: editDetForm?.PAR_CODE,
    NAME: editDetForm?.NAME,
    SKU_MANUFACTURE: editDetForm?.SKU_MANUFACTURE,
    BARCODE_NUMBER: editDetForm?.BARCODE_NUMBER,
    DESCRIPTION: editDetForm?.PART_DESCRIPTION,
    UOM_ID: editDetForm?.UOM_ID,
    PARGRO_ID: editDetForm?.PARGRO_ID,
    MARGRO_ID: "",
    MARKUP_BASED_ON: "STD",
    PRICE: editDetForm?.PRICE,
    STANDARD_COST: editDetForm?.STANDARD_COST,
    LAST_PURCHASE_COST: "",
    ENABLE_ITEM_LEVEL_CHARGE: "N",
    ITEM_LEVEL_CHARGE: "",
    NOTES: "",
    FUEL_FLAG: "N",
    STOCK_ITEM_FLAG: editDetForm?.STOCK_ITEM_FLAG,
    GLACC_ID_ASSET: "",
    GLACC_ID_REVENUE: "",
    GLACC_ID_COGS: "",
    ACTIVE_FLAG: "N",
    USE_ID: "2694",
    VMRSYS_ID: "",
    VMRASS_ID: "",
    VMRCOM_ID: "",
    CONVERSION_TO_STOCKING_UOM: editDetForm?.CONVERSION_INTO_STOCKING_UOM,
    WARRANTY: "",
    PAR_ID_SUPERCEDES: "",
    UOM_ID_REORDERING: editDetForm?.UOM_ID,
    ALLOW_NEGATIVE_FLAG: "N",
    ITEM_LEVEL_CHRG_EXP_DATE: "",
    REFERENCE_NUMBER: "",
    SHOSUP_FLAG: "N",
    ALLOW_FRACTION_QTY: "N",
    ALLOW_NEG_RO_COMP_FLAG: "N",
    DimensionL: editDetForm?.DimensionL,
    DimensionH: editDetForm?.DimensionH,
    DimensionW: editDetForm?.DimensionW,
    Weight: editDetForm?.Weight,
    ALLOW_TAX_FLAG: "Y",
    PARWAR_ID: editDetForm?.PAR_WAR_ID,
    UOW_ID: editDetForm?.UOW_ID,
    UPC_MANUFACTURE: editDetForm?.UPC_MANUFACTURE,
    AVAILABLE_TO_ALL_CHANNELS: "N",
    PRICE_MANUAL_INSERT: "N",
    PARCATGR_ID: "",
    SHIPPING_WEIGHT_UNIT: editDetForm?.SHIPPING_WEIGHT_UNIT,
    // SHIPPING_WEIGHT_UNIT: getWeight(uowSW),
    SHIPPING_WEIGHT: editDetForm?.SHIPPING_WEIGHT,
    BOLTON_FLAG: "N",
    NON_STOCK_ITEM_FLAG: "N",
    VEN_ID: "",
    // FileNames: selectedFiles || [],
    BUYERPARTNUMBER: "",
    COU_ID_ORIGIN: editDetForm?.COU_ID_ORIGIN,
    ELETCRONIC_SERIAL_NUMBER: editDetForm?.ELETCRONIC_SERIAL_NUMBER,
    WEB_SALE_ITEM_FLAG: "N",
    FINAL_SALE_ITME_FLAG: "N",
    CLEARANCE_ITEM_FLAG: "N",
    RESTRICTED_ITEM_FLAG: "N",
    CASE_DIMENSION_L: editDetForm?.CASE_DIMENSION_L,
    CASE_DIMENSION_H: editDetForm?.CASE_DIMENSION_H,
    CASE_DIMENSION_W: editDetForm?.CASE_DIMENSION_W,
    CASE_WEIGHT: editDetForm?.CASE_WEIGHT,
    CASE_UOW_ID: editDetForm?.CASE_UOW_ID,
    CASE_SHIPP_WEIGHT: editDetForm?.CASE_SHIPP_WEIGHT,
    CASE_SHIPP_UOW_ID: editDetForm?.CASE_SHIPP_UOW_ID,
    SHOW_NEW_START_DATE: "",
    SHOW_NEW_END_DATE: "",
    PROFIT_MARGIN_PERCENTAGE: "",
    PARBRA_ID: editDetForm?.PARBRA_ID,
    PARASSIGNCAT_ID: editDetForm?.ASSIGNED_CATEGORIES_ID,
  };
  const payloadPostPartDet = {
    data: payload,
    action: "ItemMaster",
    method: "PostPartDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const postPartDet = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  };
  const handleClick = () => {
    sendRequest(
      ItemMaster.PostPartDetails,
      "POST",
      payloadPostPartDet,
      postPartDet,
      token
    );
  };
  const handleDelete = () => {
    setIsModalOpen(true);
    // console.log("payload: ", payloadPostPartDet);
  };

  const handleDuplicateFormOpen = () => {
    if (parId !== undefined) {
      sendRequest(
        ItemMaster.GetPartDetail,
        "POST",
        payloadGetPartDet,
        handleGetPartDet,
        token
      );
    }
  };

  useEffect(() => {
    if (apiCall) {
      if (loading?.length > 0) {
        dispatch(setDuplicateDrawer(true));
        setApiCall(false);

        // closeModal();
      } else {
        setEMessage("Cannot make duplicate of this part");
        setIsErrorMessage(true);
        setApiCall(false);
      }
    }
  }, [apiCall, loading]);

  return (
    <div
      className={`fixed w-[100vw] z-[100]  bottom-10 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className=" w-[800px] h-[63px] bg-white overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex m-auto">
        <div className="text-[24px] text-white w-[63px] flex justify-center items-center bg-[#0073EA]">
          {checkedItems}
        </div>
        <div className="grow flex gap-[40px]">
          <div className="text-customblack text-[20px] font-thin h-full flex items-center pl-[20px] w-[256px]">
            Product Selected
          </div>
          <div className="flex w-[71px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div onClick={handleDuplicateFormOpen} className="group">
                <IoMdCopy className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Duplicate</span>
              </div>
            </div>
          </div>

          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <CiFileOn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <CSVLink
                  data={pmPartList}
                  filename="export.csv"
                  target="_blank" // This can help with download issues
                  className="text-[12px]"
                >
                  <span className="text-[12px]">Export</span>
                </CSVLink>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div
                onClick={() => dispatch(setReportDrawer(true))}
                className="group"
              >
                <GoArchive className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Report</span>
              </div>
            </div>
          </div>
          <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div
                className="group"
                // onMouseEnter={() => onDeleteHover()}
                onClick={() => handleDelete()}
              >
                <RiDeleteBin6Line className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Delete</span>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => closeModal()}
          className=" border-l-2 border-l-[#c3c6d4] w-[63px] text-[24px] text-customblack flex justify-center items-center"
        >
          <IoClose />
        </div>
      </div>

      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
      {isModalOpen && (
        <VerifyModal
          onClose={() => setIsModalOpen(false)}
          msg="Are you sure to DELETE the Product?"
          action={handleClick}
          cancle="Cancle"
          verify="Continue"
        />
      )}
    </div>
  );
};

export default PMSelectedModal;
