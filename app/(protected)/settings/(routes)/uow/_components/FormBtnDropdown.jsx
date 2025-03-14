import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIssueStatus,
  setNewIssueStatus,
  setRefresh,
  setReadyForRStatus,
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

const FormBtnDropdown = ({ postNewIssue, postNewOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setOpenn] = useState(false);

  const [zero, setZero] = useState(false);
  const [lotZero, setLotZero] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const ReceavingPo = useSelector((state) => state.PurchaseSlices.ReceavingPO);
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
  // console.log("Formstatus" ,FormStatus)
  const payloadPOrder = {
    data: data[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

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

  useEffect(() => {
    const hasZeroCount = dataDetails.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    const hasZeroLot = dataDetails.some((item) => item.LOT_NUMBER === null);

    setLotZero(hasZeroLot);
    setZero(hasZeroCount);
    // // console.log('// console if has zero' , hasZeroLot , hasZeroCount , dataDetails);
  }, [dataDetails]);

  const getProdectDetailResPO = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
    // // console.log('check response' , data);
  };
  const getProdectDetailResR = (data) => {
    // // console.log('set reset chulling form '  );

    if (data.CODE == "SUCCESS") {
      sendRequest(apiUrlR, "POST", payloadRPO, getProdectDetailResPO, token);
      dispatch(setcloseModall(true));
    }
    // // console.log('check response' , data);
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
    // // console.log('getAllTask' , data.CODE);
    // // console.log('set reset chulling order '  );

    // dispatch(setLotList(data.Result))
  };

  const getProdectDetailRes = (data) => {
    dispatch(setRefresh(true));

    // // console.log('check response' , data);
  };

  const getAllTaskPOrder = (data, key) => {
    if ((data.CODE == "SUCCESS", key == "issueTooltip")) {
      // // console.log('why this running tooltip');
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailRes,
        token
      );
      dispatch(setcloseModall(true));
      // dispatch(closeModallForm())
    }
    dispatch(closeModallForm());

    // // console.log('getAllTask' , data.CODE);

    // dispatch(setLotList(data.Result))
  };
  useEffect(() => {
    if (
      data[0]?.APPROVED_FLAG == "Y" &&
      data[0]?.COMPLETE_FLAG == "N" &&
      data[0]?.VOID_FLAG != "Y"
    ) {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payloadPOrder,
        getAllTaskPOrder,
        token,
        "issueTooltip"
      );
    }
    // // console.log('check issue status2' , data[0]?.APPROVED_FLAG );
  }, [data]);

  useEffect(() => {
    if (data[0]?.APPROVED_FLAG == "Y" && data[0]?.COMPLETE_FLAG == "Y") {
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
    if (zero == false) {
      dispatch(setIssueStatus());
    } else {
      alert("Quantity must be greater than 0");
    }
  };
  const postReadyForReceaving = () => {
    if (lotZero == false) {
      dispatch(setReadyForRStatus());
    } else {
      alert("Please select lot");
    }
  };

  const onKeyPress = (event) => {
    // console.log("ENter press" , event);
    if (event.key == "Enter" && FormStatus == "Initiated") {
      postIssue();
    } else if (event.key == "r" && FormStatus == "Issued to Vendor") {
      postReadyForReceaving();
    }
  };

  useKeyPress(["Enter", "r"], onKeyPress);

  const onClose = () => {
    setOpenn(false);
  };
  const openModall = () => {
    // console.log('oppning modall');
    setOpenn(true);
    setIsOpen(!isOpen);
  };
  return (
    <div className="size-full relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md ${
          FormStatus == "Initiated"
            ? "bg-cyan-400 hover:bg-cyan-500"
            : FormStatus == "Issued to Vendor"
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-customgreen hover:bg-btnHoverGreen"
        }`}
      >
        <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
          <span className="font-medium ">
            {FormStatus == "Initiated"
              ? "Issue"
              : FormStatus == "Issued to Vendor"
              ? "Receive"
              : FormStatus == "Partially Received"
              ? "Void"
              : FormStatus == "Completed"
              ? "Void"
              : FormStatus == "Ready for Receiving"
              ? "Void"
              : FormStatus == "Partially Ready for Receiving"
              ? "Receive"
              : "Apply"}
          </span>
        </div>
        <div className="text-white flex items-center px-2 ">
          <IoIosArrowDown className="text-[18px] " />
        </div>
      </div>

      {isOpen && FormStatus != null && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[170px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="">
            <div
              onClick={postIssue}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "Initiated" ? "flex" : "hidden"
              } `}
            >
              {/* <MdOutlineFileDownloadDone/> */}
              <AiOutlineIssuesClose />
              Issue
            </div>
            {/* For initiated apply button */}
            <div
              onClick={() => postNewOrder()}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center  ${
                FormStatus == "New" ? "flex" : "hidden"
              } `}
            >
              {/* <AiO/> */}
              <MdOutlineFileDownloadDone />
              Apply
            </div>
            {/* for new order Issue */}
            <div
              onClick={() => postNewIssue()}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "New" ? "flex" : "hidden"
              } `}
            >
              <AiOutlineIssuesClose />
              Issue
            </div>

            <div
              onClick={postReadyForReceaving}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "Issued to Vendor" ||
                FormStatus == "Partially Ready for Receiving"
                  ? "flex"
                  : "hidden"
              } `}
            >
              <IoMdCheckmarkCircleOutline />
              Receive
            </div>

            <div
              onClick={openModall}
              className={`cursor-pointer  my-2 gap-4 justify-left items-center py-1 pl-2 w-full  text-customblack hover:bg-customLightGray text-center ${
                FormStatus == "New" ? "hidden" : "flex"
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
    </div>
  );
};

export default FormBtnDropdown;
