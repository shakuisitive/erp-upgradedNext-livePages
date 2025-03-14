"use client";
import React, { useState, useEffect } from "react";

import ModalOpen from "../../../../../../components/misc/pureComponents/GridTable/ModalOpen";

import InputTextEut from "../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import TextArea from "../../../../../../components/misc/pureComponents/textinput/TextArea";
import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import TooltipStatus from "./PurchaseTooltip";
import PurchaseGrid from "./purchaseForm/purchaseGrid/PurchaseGrid";
import PurchaseFormHeader from "./purchaseForm/header/PurchaseFormHeader";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../customHook/useKeyPress";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import VenderDetails from "./purchaseForm/VenderDetails";
import {
  updatePurchaseNotes,
  updatePurchaseRef,
  closeModallForm,
  subGridset,
  setPurchaseDetails,
  setUpdatePurchaseDetail,
  setUpdatePurchaseOrder,
  setLotList,
  setProductOrederUpdate,
  setIssueStatus,
  setReadyForRStatus,
  setcloseModall,
  setRefresh,
  onHeadVis,
} from "../redux/Purchase.slice";
// import {setIssueStatus , setReadyForRStatus , setcloseModall , setRefresh} from '../redux/Purchase.slice'
import { IoIosArrowForward } from "react-icons/io";
import moment from "moment";
import PurchaseFormTottalDiv from "./PurchaseFormTottalDiv";

// import TooltipStatus from './PurchaseTooltip'

// import PhoneNumber from './GridTable/PhoneNumber'

const PurchaseForm = () => {
  const [formData, setFormData] = useState();
  const [item, setItem] = useState("Working on it");
  const [itemPriority, setItemPriority] = useState("High");
  let [error, sendRequest] = useApiFetch();
  const [inputValue, setInputValue] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState();
  const [zero, setZero] = useState(false);
  const [lotZero, setLotZero] = useState(false);
  const [formColaps, setFormColaps] = useState(false);

  const dispatch = useDispatch();

  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const postPurchaseOrder = useSelector(
    (state) => state.PurchaseSlices.postPurchaseOrder
  );
  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const ReceavingPo = useSelector((state) => state.PurchaseSlices.ReceavingPO);
  const headVis = useSelector((state) => state.PurchaseSlices.headVis);

  // console.log('check postPurchaseOrder' , postPurchaseOrder);
  // // console.log('row Id ' , rowId);

  const payloadLot = {
    data: {
      PURORD_ID: rowId,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };

  const payload = {
    data: {
      PURORD_ID: rowId,
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrder",
    type: "rpc",
    tid: "144",
    username: "admin",
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
  const apiUrlLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;

  // const token = localStorage.getItem('tokenSession')
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNjkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiZXhwIjoxNzA5NDc0ODQwLCJpc3MiOiJwcmVjaXNldGVjLmNhIiwiYXVkIjoicHJlY2lzZXRlYy5jYSJ9._B2objEkiNbmbdcXdHjNtlqCq-RkzcCln65W9cBFQzY"

  function getAllTask(data) {
    dispatch(subGridset(data.Result.INV_PURCHASE_ORDER_DETAILS_WV));
    dispatch(setPurchaseDetails(data.Result.INV_PURCHASE_ORDERS_WV[0]));
    setFormData(data.Result.INV_PURCHASE_ORDERS_WV[0]);
    setInputValue(data.Result.INV_PURCHASE_ORDERS_WV[0]?.REFERENCE_NUMBER);
    setPhone(data.Result.INV_PURCHASE_ORDERS_WV[0]?.PHONE_1);
    setEmail(data.Result.INV_PURCHASE_ORDERS_WV[0]?.EMAIL);
    setNotes(data.Result.INV_PURCHASE_ORDERS_WV[0]?.NOTES);

    const getorderFilter = data.Result.INV_PURCHASE_ORDERS_WV.map((items) => {
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
      };
    });

    const getFilter = data.Result.INV_PURCHASE_ORDER_DETAILS_WV.map((items) => {
      const {
        PURORDDET_ID,
        PURORD_ID,
        PAR_ID,
        // UOM_REORDER,
        DESCRIPTION,
        CATALOG_NUMBER,
        QUANTITY,
        DELETED_FLAG,
        WORORD_ID,
        COST,
        USE_ID,
        LOT_NUMBER,
        // EXPIRY_DATE,
        QUARANTINE_FLAG,
        READY_FOR_RECEIVING_FLAG,
        INVPARLOT_ID,
        VENDOR_QUANTITY,
        // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
      } = items;

      return {
        PURORDDET_ID,
        PURORD_ID,

        PAR_ID,

        // UOM_REORDER,

        DESCRIPTION,

        CATALOG_NUMBER,

        QUANTITY,

        DELETED_FLAG,

        WORORD_ID,

        COST,

        USE_ID,

        LOT_NUMBER,

        // EXPIRY_DATE,

        QUARANTINE_FLAG,

        READY_FOR_RECEIVING_FLAG,

        INVPARLOT_ID,

        VENDOR_QUANTITY,

        // NON_STOCK_ITEM_PURCHASE_ORDER_FLAG
      };
    });
    dispatch(setUpdatePurchaseDetail(getFilter));
    dispatch(setUpdatePurchaseOrder(getorderFilter));

    // setErrorMessage(error)
  }

  const getAllLot = (data) => {
    dispatch(setLotList(data.Result));
  };
  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, token);

    sendRequest(apiUrlLot, "POST", payloadLot, getAllLot, token);
  }, []);
  // // console.log('==== log item ====',item);
  //

  const getSlect = (e) => {
    setItem(e.target.value);
  };

  const date = moment(formData?.PO_DATE).format("MMM Do ");

  const handleInputChangeRef = (e) => {
    setInputValue(e.target.value);
    dispatch(updatePurchaseRef(e.target.value));
  };

  const handleInputChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleInputChangeNotes = (e) => {
    setNotes(e.target.value);

    dispatch(updatePurchaseNotes(e.target.value));
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

  // const token = localStorage.getItem('tokenSession')

  const getProdectDetailRes = (data) => {
    dispatch(setRefresh(true));

    // // console.log('check response' , data);
  };

  const getAllTaskPOrder = (data, key) => {
    if (data.CODE == "SUCCESS" && key == "issue") {
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

  const getProdectDetailResPO = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
    // // console.log('check response' , data);
  };

  const getProdectDetailResR = (data) => {
    // console.log('set reset chulling form '  );

    if (data.CODE == "SUCCESS") {
      sendRequest(apiUrlR, "POST", payloadRPO, getProdectDetailResPO, token);
      dispatch(setcloseModall(true));
    }
    // // console.log('check response' , data);
  };

  const getAllTaskR = (data, key) => {
    if (data.CODE == "SUCCESS" && key == "ready") {
      // // console.log('why this chullling ready');
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

  useEffect(() => {
    if (data[0]?.APPROVED_FLAG == "Y" && data[0]?.COMPLETE_FLAG == "N") {
      sendRequest(
        apiUrlPOrder,
        "POST",
        payloadPOrder,
        getAllTaskPOrder,
        token,
        "issue"
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
        "ready"
      );
      // sendRequest(apiUrlDetails, 'POST', payloadDetails, getProdectDetailResR, token)
      // sendRequest(apiUrlR , 'POST', payloadRPO, getProdectDetailResPO, token)
      //  // console.log('check issue status2' , data[0] );
      // dispatch(setcloseModall(true))
      // // console.log('set reset chulling big '  );
    }

    // // console.log('check issue status3' , data[0] );
  }, [data]);

  // const onKeyPress = (event) => {
  //   // console.log("ENter press" , event);
  //   if(event.key == 'Enter' && FormStatus == 'Initiated'){

  //     // postIssue()

  //   }else if(event.key == 'r' && FormStatus == 'Issued to Vendor'){
  //     postReadyForReceaving()
  //   }
  // };

  // useKeyPress([ "Enter" , "r"], onKeyPress);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
      <div
        className={`  flex flex-col relative  border ${
          formColaps == true
            ? "grow"
            : "lgdesktop:w-[75%]   desktop:w-[70%] laptop:w-[60%] tablet:w-[50%]"
        }   rounded-md bg-white`}
      >
        <PurchaseFormHeader suplier={formData?.SUPPLIER} />
        <div className="py-1 w-full bg-gray-100"></div>

        <div className="w-full  bg-white grow overflow-auto  p-2 pl-0 ">
          {/* <GridTable head={head} row={row} setHead={setHead} /> */}
          <PurchaseGrid />
        </div>

        <Draggable>
          <div className="absolute bottom-0 right-0 mb-8 mr-8 ">
            <PurchaseFormTottalDiv />
          </div>
        </Draggable>

        <Draggable>
          <div
            className={`absolute bottom-0 left-0 mb-8 ml-8 ${
              headVis == true ? "block" : "hidden"
            } `}
          >
            <VenderDetails />
          </div>
        </Draggable>
        <div
          onClick={() => dispatch(onHeadVis(true))}
          className={`absolute bottom-0 left-0 mb-8 text-[14px] text-white px-2 h-[153px] rounded-r-lg  ${
            headVis != true ? "flex" : "hidden"
          } items-center bg-[#0073EA] cursor-pointer  text-center`}
        >
          H <br /> e <br /> a <br /> d <br /> e <br /> r
        </div>
      </div>

      <div
        className={`px-4 border ${
          formColaps == true
            ? " w-[0px] overflow-hidde"
            : "lgdesktop:w-[25%] desktop:w-[30%]  laptop:w-[40%] tablet:w-[50%] "
        }  bg-white transition-all  duration-300    rounded-md shadow-md shadow-gray-200 py-5`}
      >
        <div className={`flex items-center justify-between `}>
          <div className={` ${formColaps == true ? "hidden" : "flex"} gap-2 `}>
            <Tooltip content="Edit">
              <MdEdit className="text-[30px] shadow-md text-gray-500  bg-white rounded-lg cursor-pointer p-1 hover:text-purple-500  hover:bg-purple-100" />
            </Tooltip>
            <Tooltip content="Perview">
              <FaRegEye className="text-[30px] rounded-lg shadow-md text-gray-500 cursor-pointer p-1 bg-white hover:text-sky-500  hover:bg-sky-100" />
            </Tooltip>
            <Tooltip content="Export">
              <HiOutlineDocumentArrowDown className="text-[30px] cursor-pointer rounded-lg shadow-md text-gray-500 p-1 bg-white hover:text-indigo-500  hover:bg-indigo-100" />
            </Tooltip>
          </div>

          <div
            className={` ${formColaps == true ? "hidden" : "block"} delay-700 `}
          >
            <p className="H text-gray-800 lgdesktop:text-[30px] btdesktop:text-[30px] text-[25px]">
              {formData?.PO_NUMBER}
            </p>
            <p className="H text-gray-500 lgdesktop:text-[18px] btdesktop:text-[18px] text-[16px]  text-right ">
              {date}
            </p>
          </div>
        </div>
        <div>
          <div
            onClick={() => setFormColaps(!formColaps)}
            className="py-2   rounded-r-md cursor-pointer w-fit border -translate-x-6 bg-white"
          >
            <IoIosArrowForward className=" text-[18px]    " />
          </div>
        </div>

        <div
          className={`w-full mt-4  justify-center  ${
            formColaps == true ? "hidden" : "flex"
          } `}
        >
          <button
            onClick={postIssue}
            className={`w-full max-w-[430px]  bg-customgreen hover:bg-btnHoverGreen text-white flex justify-center items-center font-semibold py-2 rounded-full ${
              FormStatus == "Initiated" ? "block" : "hidden"
            }`}
          >
            Issue to Vendor
          </button>
          <button
            onClick={postReadyForReceaving}
            className={`w-full max-w-[430px]  bg-customgreen hover:bg-btnHoverGreen text-white flex justify-center items-center font-semibold py-2 rounded-full ${
              FormStatus == "Issued to Vendor" ? "block" : "hidden"
            }`}
          >
            Ready for Receiving
          </button>
        </div>
        <div
          className={`w-full mt-2  justify-center ${
            formColaps == true ? "hidden" : "flex"
          } `}
        >
          <div className="w-full max-w-[430px] bg-orange-500 text-white flex justify-center items-center font-semibold rounded-full py-2">
            <TooltipStatus content="High">
              <p>High</p>
            </TooltipStatus>
          </div>
        </div>

        <InputTextEut
          label="Phone #"
          placeHolder="Phone #"
          initialValue={formData?.PHONE_1}
          value={phone}
          onChange={handleInputChangePhone}
          isDisabled={true}
        />

        <InputTextEut
          label="Ref"
          placeHolder="Ref"
          initialValue={formData?.REFERENCE_NUMBER}
          value={inputValue}
          onChange={handleInputChangeRef}
          isDisabled={false}
        />

        <InputTextEut
          label="Email"
          placeHolder="Email"
          initialValue={formData?.EMAIL}
          value={email}
          isDisabled={true}
        />

        <TextArea
          label="Comments"
          initialValue={formData?.NOTES}
          onChange={handleInputChangeNotes}
          value={notes}
          placeHolder="Comments"
        />
        {/* <TextInput label="Phone #" isDisabled={true} /> */}
        {/* <TextInput label="Fax" isDisabled={true} />
          <TextInput label="Email" isDisabled={true} /> */}

        {/* // <TextInput label="Name"/> */}
      </div>
    </div>
  );
};

export default PurchaseForm;
