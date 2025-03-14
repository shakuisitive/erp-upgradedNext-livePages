import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIssueStatus,
  setNewIssueStatus,
  setRefresh,
  setReadyForRStatus,
  setPosttIssueState,
  setPostIssueStatas,
  clearVenderListFormData,
  returnReadyForRStatus,
  closeModallForm,
} from "../redux/Purchase.slice";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../customHook/useKeyPress";
import VoidNotes from "./purchaseForm/VoidNotes";
import {
  IoIosArrowDown,
  IoIosRemoveCircleOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { IoSaveOutline } from "react-icons/io5";
import {
  MdOutlineFileDownloadDone,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { RiRepeat2Fill } from "react-icons/ri";
import { AiOutlineIssuesClose } from "react-icons/ai";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";

const FormBtnDropdown = ({
  postNewIssue,
  postNewOrder,
  updatePostNew,
  setIsDrawer,
  setEMessage,
  setIsErrorMessage,
  isEMessage,
  eMessage,
  pdfModal,
  setPdfModal,
  pdf,
  setPdf,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setOpenn] = useState(false);

  const [zero, setZero] = useState(false);
  const [lotZero, setLotZero] = useState(false);

  let [error, sendRequest] = useApiFetch();
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;
  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderPDFReport`;
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const rowDataa = useSelector((state) => state.PurchaseSlices.subGridState);
  const ReceavingPo = useSelector((state) => state.PurchaseSlices.ReceavingPO);
  const updatedPostData = useSelector(
    (state) => state.PurchaseSlices.subGridState
  );
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const tooltipRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  const token = localStorage.getItem("tokenSession");




 

  const payloadPOrder = {
    data: data[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const returnPayloadR = {
    data: data[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const [filteredData, setFilteredData] = useState([]);

  const payloadDetails = {
    data: dataDetails,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadRPO = {
    data: ReceavingPo,
    action: "InventoryWeb",
    method: "PostRecievingByPO",
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

  const payloadPdf = {
    data: {
      PURORD_ID: PurchaseDetails?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: PurchaseDetails?.PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
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

  useEffect(() => {
    const hasZeroCount = dataDetails?.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    const hasZeroLot = dataDetails?.some((item) => item.LOT_NUMBER === null);

    setLotZero(hasZeroLot);
    setZero(hasZeroCount);
  }, [dataDetails]);

  const getProdectDetailResPO = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  };
  const getProdectDetailResR = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(apiUrlR, "POST", payloadRPO, getProdectDetailResPO, token);
      dispatch(setcloseModall(true));
    }
  };

  const getAllTaskR = (data, key) => {
    if ((data.CODE == "SUCCESS", key == "readyTooltip")) {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailResR,
        token
      );
    }
    dispatch(closeModallForm());
  };

  const getProdectDetailRes = (data) => {
    dispatch(setRefresh(true));
  };

  // const getAllTaskPOrder = (data, key) => {
  //   if ((data.CODE == "SUCCESS", key == "issueTooltip")) {
  //     sendRequest(
  //       apiUrlDetails,
  //       "POST",
  //       payloadDetails,
  //       getProdectDetailRes,
  //       token
  //     );
     
  //     dispatch(closeModallForm());
  //   }

    
  // };
  // useEffect(() => {
  //   if (
  //     data[0]?.APPROVED_FLAG == "Y" &&
  //     data[0]?.COMPLETE_FLAG == "N" &&
  //     data[0]?.VOID_FLAG != "Y"
  //   ) {
  //     sendRequest(
  //       apiUrlPOrder,
  //       "POST",
  //       payloadPOrder,
  //       getAllTaskPOrder,
  //       token,
  //       "issueTooltip"
  //     );
  //   }
  // }, [data]);

  const returnRecevingItem = (data) => {
    dispatch(closeModallForm());
  };

  useEffect(() => {
    if (
      data[0]?.APPROVED_FLAG == "N" &&
      data[0]?.COMPLETE_FLAG == "N" &&
      data[0]?.VOID_FLAG != "Y"
    ) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        returnPayloadR,
        returnRecevingItem,
        token,
        "returnIssuance"
      );
    }
  }, [data]);

  const anyItemCheckedWithLotNumber =
    dataDetails.some((item) => item.LOT_NUMBER != null || item.NON_STOCK_ITEM_FLAG == 'Y') ||
    updatedPostData.some((item) => item.LOT_NUMBER != null || item.NON_STOCK_ITEM_FLAG== 'Y');


  const allItemsWithLotNumberNotChecked =
    dataDetails.every((item) => item.LOT_NUMBER != null || item.NON_STOCK_ITEM_FLAG == 'Y') ||
    updatedPostData.every((item) => item.LOT_NUMBER != null || item.NON_STOCK_ITEM_FLAG == 'Y');

 
  useEffect(() => {
    if (
      data[0]?.APPROVED_FLAG == "Y" &&
      data[0]?.COMPLETE_FLAG == 'Y' &&
      (anyItemCheckedWithLotNumber || allItemsWithLotNumberNotChecked)
    ) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payloadPOrder,
        getAllTaskR,
        token,
        "readyTooltip"
      );
    }
  }, [data]);

  //  const postNewIssue = () =>{

  //   if(zero == false){
  //     dispatch(setNewIssueStatus())

  //   }else{
  //     alert("Quantity must be greater than 0")
  //   }

  //     }
  const postIssue = () => {
    dispatch(setPostIssueStatas(zero));

    setIsDrawer(true);
  };
  const allFieldsFilledDetail = dataDetails.every((item) => {
    return item.QUANTITY > 0 && item.COST > 0 && item?.NET_COST;
  });

  const postReadyForReceaving = () => {
    const allFieldsFilled = updatedPostData.every((item) => {
      return (
        item.DESCRIPTION !== "" &&
        item.QUANTITY > 0 &&
        item.COST > 0 &&
        item?.NET_COST > 0
      );
    });

    if (
      (anyItemCheckedWithLotNumber || allItemsWithLotNumberNotChecked) &&
      (allFieldsFilled || allFieldsFilledDetail)
    ) {
      dispatch(setReadyForRStatus());
    } else {
      setEMessage("Please fill all fields");
      setIsErrorMessage(true);
    }
  };

  const returnPostReceaving = () => {
    dispatch(returnReadyForRStatus());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F6" && FormStatus == "Issued to Vendor") {
        postReadyForReceaving();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [postReadyForReceaving]);

  const onClose = () => {
    setOpenn(false);
  };
  const openModall = () => {
    // dispatch(clearVenderListFormData());
    setOpenn(true);
    setIsOpen(!isOpen);
  };
  const venderListData = useSelector(
    (state) => state.PurchaseSlices.venderListData
  );
  const NewpostPurchaseOrder = useSelector(
    (state) => state.PurchaseSlices.NewpostPurchaseOrder
  );

  const purchaseOrderDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );

  const handleIsOpen = () => {
    if (
      !venderListData.email == "" ||
      NewpostPurchaseOrder?.VEN_ID == purchaseOrderDetails?.VEN_ID ||
      FormStatus == "Initiated" ||
      FormStatus == "Issued to Vendor" ||
      FormStatus == "Partially Received" ||
      FormStatus == "Partially Ready for Receiving" ||
      FormStatus == "Ready for Receiving" ||
      FormStatus == "Completed" 
    ) {
      setIsOpen(!isOpen);
    } else {
      setEMessage("Add vendor list");
      setIsErrorMessage(true);
    }
  };

  const updateNewpost = () => {
    updatePostNew();
    setIsOpen(!isOpen);
  };

  return (
    <div className="size-full relative">
      <div
        className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md ${
          FormStatus == "Initiated"
            ? "bg-cyan-400 hover:bg-cyan-500"
            : FormStatus == "Issued to Vendor"
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-customgreen hover:bg-btnHoverGreen"
        }`}
      >
        <div
          className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle "
          onClick={
            FormStatus == "New"
              ? postNewOrder
              : FormStatus == "Initiated"
              ? postIssue
              : FormStatus == "Issued to Vendor" ||
                FormStatus == "Partially Ready for Receiving" ||
                FormStatus == "Ready for Receiving"
              ? postReadyForReceaving
              : ""
          }
        >
          <span className="font-medium  cursor-pointer">
            {FormStatus == "Initiated"
              ? "Apply"
              : FormStatus == "Issued to Vendor"
              ? "Receive"
              : FormStatus == "Partially Received"
              ? "Ready for Receving"
              : FormStatus == "Completed"
              ? "Apply"
              : FormStatus == "Ready for Receiving"
              ? "Receive"
              : FormStatus == "Partially Ready for Receiving"
              ? "Receive"
              : "Apply"}
          </span>
        </div>
        <div
          className="text-white flex items-center px-2 cursor-pointer "
          onClick={handleIsOpen}
        >
          <IoIosArrowDown className="text-[18px] " />
        </div>
      </div>

      {isOpen && FormStatus != null && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[200px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="">
            {/* <div
             
              className={`cursor-pointer  my-2 gap-4 justify-left  items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "Initiated" ? "flex" : "hidden"
              } `}
            >
             
              <AiOutlineIssuesClose />
              Issue
            </div> */}
            {/* For initiated apply button */}
            <div
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center  ${
                FormStatus == "Partially Received" ||
                FormStatus == "Issued to Vendor" ||
                FormStatus == "Partially Ready for Receiving" ||
                FormStatus == "Ready for Receiving" ||
                FormStatus == "Completed"
                  ? "flex"
                  : "hidden"
              } `}
             onClick={handleChangeToPdf} 
            >
              <MdOutlineFileDownloadDone />
              Report
            </div>
            {/* for new order Issue */}
            <div
              onClick={() => postNewIssue()}
              className={`cursor-pointer   my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "New" ? "flex" : "hidden"
              } `}
            >
              <AiOutlineIssuesClose />
              Issue
            </div>

            <div
              onClick={returnPostReceaving}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "Issued to Vendor" 
                  ? "flex"
                  : "hidden"
              } `}
            >
              <IoMdCheckmarkCircleOutline />
              Return issuance
            </div>
            <div
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center  
              ${FormStatus == "Initiated" ? "flex" : "hidden"}
              `}
              onClick={updateNewpost}
            >
              <IoMdCheckmarkCircleOutline />
              Update
            </div>

            <div
              onClick={openModall}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "Initiated" ? "flex" : "hidden"
              }`}
            >
              <IoIosRemoveCircleOutline />
              Void
            </div>
          </div>
        </div>
      )}

      <VoidNotes
        isOpen={isOpenn}
        setOpen={setOpenn}
        onClose={onClose}
        cancelButtonRef={cancelButtonRef}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default FormBtnDropdown;
