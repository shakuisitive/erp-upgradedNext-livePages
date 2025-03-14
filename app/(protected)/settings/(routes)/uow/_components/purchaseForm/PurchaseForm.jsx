"use client";
import React, { useState, useEffect } from "react";

import ModalOpen from "../../../../../../../components/misc/pureComponents/GridTable/ModalOpen";

import InputTextEut from "../../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import TextArea from "../../../../../../../components/misc/pureComponents/textinput/TextArea";
import Tooltip from "../../../../../../../components/misc/pureComponents/tooltip/Tooltip";

import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import TooltipStatus from "../PurchaseTooltipTemp";
import PurchaseGrid from "./purchaseGrid/PurchaseGrid";
import PurchaseFormHeader from "./header/PurchaseFormHeader";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../customHook/useKeyPress";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import VenderDetails from "./VenderDetails";
import {
  updatePurchaseNotes,
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
  setPScreenS,
} from "../../Redux/Purchase.slice";
// import {setIssueStatus , setReadyForRStatus , setcloseModall , setRefresh} from '../redux/Purchase.slice'
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import moment from "moment";
import PurchaseFormTotalDivT from "../PurchaseFormTotalDivTemp";
import PurchaseLeftForm from "./header/PurchaseLeftForm";
import PurchaseRightForm from "./header/PurchaseRightForm";
import { GoHome } from "react-icons/go";
import { ref } from "yup";

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
  const [formColaps, setFormColaps] = useState(true);
  const [currTab, setCurrTab] = useState("supplier");
  const [isHeader, setIsHeader] = useState(true);

  const dispatch = useDispatch();
  const arr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );
  const updatedPostData = useSelector(
    (state) => state.PurchaseSlices.subGridState
  );
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const postPurchaseOrder = useSelector(
    (state) => state.PurchaseSlices.postPurchaseOrder
  );
  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const dataDetail = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const ReceavingPo = useSelector((state) => state.PurchaseSlices.ReceavingPO);
  const headVis = useSelector((state) => state.PurchaseSlices.headVis);
  // const KillId = useSelector((state) => state.PurchaseSlices.PScreenS);

  // // console.log("checking madiha data", KillId?.Result);
  // // console.log("checking madiha postpurchaseorder", postPurchaseOrder);
  // // console.log("checking madiha dataDetails", dataDetail.PURORD_ID);
  // // console.log("checking madiha dataDetails", dataDetail);

  // // console.log('checking madiha row Id ' , rowId);

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
  const apiUrlKillScreenS = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions`;
  const apiUrlPEditScreenS = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostEditScreenSessions`;
  const apiUrlGSessionTO = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetSessionTimeout`;
  const apiUrlGEditScreenS = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;
// dataDetail.USER_ID_PREPARED_BY
const purord_id = JSON.stringify(rowId);

  const payloadPEdit = {
    data: {
        EDISCRSES_ID: "",
        SOURCE_PK: purord_id,
        SOURCE_TABLE: "PURCHASE_ORDER",
        USE_ID:"2694" ,
        SOURCE_NO: dataDetail.PO_NUMBER,
    },
    action: "Inventory",
    method: "PostEditScreenSessions",
    username: "admin",
    type: "rpc",
    tid: "144"
};
// const payloadGEdit = {
//   data:
// 		{
//       LOGGED_IN_USER_ID : "2694",
// 		  SOURCE_PK 	: purord_id,
//       SOURCE_TABLE 	: "PURCHASE_ORDER"
// 		},
//   action: "Inventory",
//   method: "GetEditScreenSessions",
//   username: "admin",
//   type: "rpc",
//   tid: "144"
// }

// const killSessionId = JSON.stringify(KillId.Result);
// const payloadKillScreenS = {
//    data:
// 		{ 
// 		   EDISCRSES_ID 	: ""
// 		},
//   action: "Inventory",
//   method: "PostKillScreenSessions",
//   username: "admin",
//   type: "rpc",
//   tid: "144"
// }





const postEditScreen=(data) => {
  if(data.CODE == "SUCCESS"){
   dispatch(setPScreenS(data))
  }
}
const getEditScreen=() => {
  
}
const killAllTask=() => {

}
  // const token = localStorage.getItem("tokenSession");

  const token =  typeof  window !== "undefined"
   ? localStorage.getItem("tokenSession")
   : null;

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
    
  }, [arr, updatedPostData]);
  // // console.log('==== log item ====',item);
  //

  const getSlect = (e) => {
    setItem(e.target.value);
  };

  const date = moment(formData?.PO_DATE).format("MMM Do ");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleInputChangeNotes = (e) => {
    setNotes(e.target.value);

    // dispatch(updatePurchaseNotes(e.target.value));
    //  // console.log(" purchase form W tab handle notes madiha detail")
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

  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
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
    // console.log("set reset chulling form ");

    if (data.CODE == "SUCCESS") {
      sendRequest(apiUrlR, "POST", payloadRPO, getProdectDetailResPO, token);
      dispatch(setcloseModall(true));
    }
    // // console.log('check response' , data);
  };

  const getAllTaskR = (data) => {
    if (data.CODE == "SUCCESS") {
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
  }

  //   else{
  //     alert("Please select lot");
  //   }
  // }

  useEffect(()=>{
    if(data[0]?.APPROVED_FLAG == 'Y' && data[0]?.COMPLETE_FLAG  == 'N'){
      sendRequest(apiUrlPOrder, 'POST', payloadPOrder, getAllTaskPOrder, token)
    // sendRequest(
    //     apiUrlKillScreenS,
    //     "POST",
    //     payloadKillScreenS,
    //     killAllTask,
    //     token
    //   );
    }
    // // console.log('check issue status2' , data[0]?.APPROVED_FLAG );
  }, [data]);

  useEffect(() => {
    if (data[0]?.APPROVED_FLAG == "Y" && data[0]?.COMPLETE_FLAG == "Y") {
      sendRequest(apiUrlPOrder, "POST", payloadPOrder, getAllTaskR, token);
      // sendRequest(
      //   apiUrlKillScreenS,
      //   "POST",
      //   payloadKillScreenS,
      //   killAllTask,
      //   token
      // );
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

  function currTabHandler(tab) {
    setCurrTab(tab);
  }
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white "
      >
        <PurchaseFormHeader suplier={formData?.SUPPLIER} />
        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
        <div className="ml-[50px] my-4">
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
        <div className="ml-10 ">
             <div className="flex px-4 mr-2 gap-4  ">
                <div className="w-1/2"> 
                    <PurchaseLeftForm />
                </div>
                <div className="w-1/2">
                    <PurchaseRightForm />
                </div>
      </div>
        </div>
           
      )}
      
    </div>
       
        <div className="w-full  grow overflow-x-auto bg-white  p-2 pl-0 ">
          {/* <GridTable head={head} row={row} setHead={setHead} /> */}
          <PurchaseGrid />
        </div>
        </div>


        
      </div>

      <div
        className={`right-0 pl-[10px] pr-[10px] border ${
          formColaps == true
            ? " w-[0px] overflow-hidden"
            : "lgdesktop:w-[20%] desktop:w-[20%]  laptop:w-[20%] tablet:w-[20%] "
        }  bg-white transition-all  duration-300  absolute  rounded-md shadow-md shadow-gray-200 py-2 overflow-auto`}
      >
        <div>
          <div
            onClick={() => setFormColaps(!formColaps)}
            className="py-2   rounded-r-md cursor-pointer w-fit border -translate-x-[0.5rem] bg-white"
          >
            <IoIosArrowForward className=" text-[18px]    " />
          </div>
        </div>

        <div className={`${formColaps == true ? "hidden" : ""}`}>
          <div className="flex gap-1 ">
            <div
              className={`${
                currTab == "supplier" ? "border-b-[#0073ea] border-b-[2px]" : ""
              }  pb-[3px] mt-[2px] `}
            >
              <button
                className={`flex items-center text-[14px] w-[100px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover 
               after:absolute after:right-[0px]`}
                onClick={() => currTabHandler("supplier")}
              >
                <GoHome className="text-[18px] text-customIcon" />
                Supplier
              </button>
            </div>
            <div
              className={`${
                currTab == "shipping" ? "border-b-[#0073ea] border-b-[2px]" : ""
              } pb-[3px] mt-[2px]`}
            >
              <button
                className={`flex items-center text-[14px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover
               after:absolute after:right-[0px]`}
                onClick={() => currTabHandler("shipping")}
              >
                Shipping
              </button>
            </div>
          </div>
        </div>

        <InputTextEut placeHolder="Supplier" isDisabled={true} />
        <InputTextEut
          placeHolder="Phone #"
          initialValue={formData?.PHONE_1}
          value={phone}
          onChange={handleInputChangePhone}
          isDisabled={true}
        />
        <InputTextEut
          placeHolder="Email"
          initialValue={formData?.EMAIL}
          value={email}
          isDisabled={true}
        />
        {/* <InputTextEut placeHolder="Address" isDisabled={true} /> */}
        {/* <InputTextEut placeHolder="Ship Via" isDisabled={true} /> */}
        {/* <InputTextEut placeHolder="Shipping Instructions" isDisabled={true} /> */}
         {/* <TextArea label="Comments" initialValue={formData?.NOTES} onChange={handleInputChangeNotes} value={notes} placeHolder='Comments' />  */}
          <TextArea label="Comments"  onChange={handleInputChangeNotes} value={notes} placeHolder='Comments' /> 
        <div className={`${formColaps == true ? "hidden" : ""}`}>
          <PurchaseFormTotalDivT />
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
