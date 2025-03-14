"use client";
import React, { useState, useEffect } from "react";
import InputTextEut from "../../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import TextArea from "../../../../../../../components/misc/pureComponents/textinput/TextArea";
import TooltipStatus from "../PurchaseTooltipTemp";
import NewPurchaseGrid from "./NewPurchaserGrid";
import NewPurchaseFormHeader from "./header/NewPurchaseFormHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePurchaseNotes,
  updatePurchaseRef,
  colseNewModall,
  onHeadVis,
  setVenderListFormData,
  clearVenderListFormData,
} from "../../redux/Purchase.slice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../customHook/useKeyPress";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

import moment from "moment";
import {
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import VenderDetails from "../purchaseForm/VenderDetails";

import PurchaseFormTotalDivT from "../PurchaseFormTotalDivTemp";
import { GoHome } from "react-icons/go";
import NewPurchaseLeftForm from "./header/NewPurchaseLeftForm";
import NewPurchaseRightForm from "./header/NewPurchaseRightForm";
import PurchaseFormEmail from "../purchaseForm/PurchaseFormEmail";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";

const PurchaseForm = () => {
  const [formData, setFormData] = useState();
  const [inputValue, setInputValue] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [waraddress, setWarAddress] = useState();
  const [notes, setNotes] = useState();
  const [zero, setZero] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const [newpayloadDetails, setNewpayloadDetails] = useState();
  console.log("new pay load data", newpayloadDetails);
  const [formColaps, setFormColaps] = useState(true);
  const [currTab, setCurrTab] = useState("supplier");
  const [isHeader, setIsHeader] = useState(true);
  const [isDrawer, setIsDrawer] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [newPayResData, setNewPayResData] = useState(null)

  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const baseUrlESS = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;
  const dispatch = useDispatch();

  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const selectedVid = useSelector((state) => state.PurchaseSlices.selectedVid);
  const postPurchaseOrder = useSelector(
    (state) => state.PurchaseSlices.NewpostPurchaseOrder
  );
  //  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder)
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const newPurchaseForm = useSelector(
    (state) => state.PurchaseSlices.newPurchaseForm
  );
  const updatedPostData = useSelector(
    (state) => state.PurchaseSlices.subGridState
  );

  const VenderList = useSelector((state) => state.PurchaseSlices.VenderList);
  const WareHouse = useSelector((state) => state.PurchaseSlices.WareHouse);
  const user_ID = useSelector((state) => state.PurchaseSlices.user_ID);
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );

  const token = localStorage.getItem("tokenSession");
  // let token
  // useEffect(()=>{
  //    token =  typeof  window !== "undefined"
  //   ? localStorage.getItem("tokenSession")
  //   : null;
  // },[])

  // console.log("dataDetails[0]" ,dataDetails);
  const payload = {
    data: postPurchaseOrder,
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: newpayloadDetails,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const updatePayloadDetails = {
    data: newPayResData,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  // // console.log("postPurchaseOrderr[0] id filter" , postPurchaseOrder[0] , payload.data);

  useEffect(() => {
    const slected = VenderList?.filter(
      (data) => data?.VEN_ID == newPurchaseForm?.data.VEN_ID
    );
    // setPhone(slected[0]?.PHONE_1);
    // setEmail(slected[0]?.EMAIL);
    // setAddress(slected[0]?.ADDRESS_1);

    if (selectedVid) {
      dispatch(
        setVenderListFormData({
          phone: slected[0]?.PHONE_1,
          email: slected[0]?.EMAIL,
          address: slected[0]?.ADDRESS_1,
        })
      );
    }
  }, [newPurchaseForm]);

  useEffect(() => {
    const WarId = WareHouse?.Result?.filter(
      (data) => data?.WAR_ID == newPurchaseForm?.data?.WAR_ID
    );
    setWarAddress(WarId[0]?.ADDRESS_1);
  }, [newPurchaseForm]);

  useEffect(() => {
    const hasZeroCount = dataDetails?.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

    // setLotZero(hasZeroLot)
    setZero(hasZeroCount);
  }, [dataDetails]);

  const date = moment(formData?.PO_DATE).format("MMM Do ");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // dispatch(updatePurchaseRef(e.target.value))
  };

  const handleInputChangeNotes = (e) => {
    setNotes(e.target.value);
    // dispatch(updatePurchaseNotes(e.target.value))
    // // console.log("New purchase form handle notes madiha detail")
  };

  const getProdectDetailRes = (data) => {
   
    dispatch(colseNewModall());
    // // console.log('check response' , data);
  };

  useEffect(() => {
    if (newpayloadDetails ) {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailRes,
        token
      );
    }
  }, [newpayloadDetails]);

 

  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      let updatedArr = dataDetails?.map((item) => {
        return { ...item, PURORD_ID: data.Result };
      });
      setNewpayloadDetails(updatedArr);
    
    }
   
  };

  const postIssue = () => {
    if (updatedPostData?.length > 0) {
      setIsDrawer(true)
    } else {
      setEMessage("Row data length must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  const postReadyForReceaving = () => {
    if (lotZero == false) {
      dispatch(setReadyForRStatus());
    } else {
      alert("Please select lot");
    }
  };
  const allFieldsFilledDetail = dataDetails.every(item => {
    return  item.QUANTITY > 0 && item.COST > 0 && item?.NET_COST
  });

  const allFieldsFilled = updatedPostData.every(item => {
    return item.DESCRIPTION !== "" && item.QUANTITY > 0 && item.COST > 0 && item?.NET_COST
  });
  const getOpenSession = {
    action: "Inventory",
    data: {

      SOURCE_TABLE: "PURCHASE_ORDER",
      LOGGED_IN_USER_ID: user_ID,
    },
    method: "GetEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };
  const getSessionRes = (data) => {

  }
  const postNew = () => {
    if (updatedPostData?.length > 0) {
      sendRequest(
        baseUrlESS,
        "POST",
        getOpenSession,
        getSessionRes,
        token
      );
      if (allFieldsFilled && dataDetails?.length > 0 && allFieldsFilledDetail) {
        if (postPurchaseOrder?.APPROVED_FLAG == "Y") {
          sendRequest(
            apiUrlPOrder,
            "POST",
            newPurchaseForm,
            getAllTaskPOrder,
            token
          );
        
        }
      } else {
        setEMessage("Product fields Must be filled and order quantity is greater than 0");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Row data length must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  const getUpdateProductDetailRes = (data) => {

  }


  useEffect(() => {
    if (newPayResData ) {
      sendRequest(
        apiUrlDetails,
        "POST",
        updatePayloadDetails,
        getUpdateProductDetailRes,
        token
      );
    }
  }, [newPayResData]);

  const getUpdateData = (data) => {
 if (data.CODE == "SUCCESS") {
      let updatedArr = dataDetails?.map((item) => {
        return { ...item, PURORD_ID: data.Result };
      });
      setNewPayResData(updatedArr);
     
    }
  }

  const updatePostNew = () => {
    if (updatedPostData?.length > 0) {
      if (allFieldsFilled && dataDetails?.length > 0 && allFieldsFilledDetail) {
        if (postPurchaseOrder?.APPROVED_FLAG == "Y") {
          sendRequest(
            apiUrlPOrder,
            "POST",
            newPurchaseForm,
            getUpdateData,
            token
          );
        
        }
      } else {
        setEMessage("Product fields Must be filled and order quantity is greater than 0");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Row data length must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  useEffect(() => {
    if (newPurchaseForm) {
      dispatch(clearVenderListFormData());
    }
  }, []);

  // const onKeyPress = (event) => {
  //   if (event.key == "p") {
  //     postNew();
  //   } else if (event.key == "i") {
  //     postIssue();
  //   }
  // };

  // useKeyPress(["i", "Enter"], onKeyPress);

  const handleCloseDrawer = () => {
    setIsDrawer(false);
  };

  const handleSkipEmailIssuOrder = (val) => {
    
    if (updatedPostData?.length > 0) {
      if (zero == false && dataDetails?.length > 0 && allFieldsFilled) {
        if (postPurchaseOrder?.APPROVED_FLAG == "Y") {
          sendRequest(apiUrlPOrder, "POST", payload, getAllTaskPOrder, token);
        }
      } else {
        setEMessage("Product fields Must be filled and order quantity is greater than 0");
        setIsErrorMessage(true);
        setIsDrawer(false);
      }
    } else {
      setEMessage("Row data length must be greater than 0");
      setIsErrorMessage(true);
      setIsDrawer(false);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F4" && FormStatus == "New") {
        handleSkipEmailIssuOrder();
      }
      if (event.key === "F2" && FormStatus == "New") {
        postNew();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSkipEmailIssuOrder, postNew]);

  const tabs = [
    {
      label: "Email",
      content: (
        <PurchaseFormEmail
          setIsDrawer={setIsDrawer}
          isDrawer={isDrawer}
          handleSkipEmailIssuOrder={handleSkipEmailIssuOrder}
        />
      ),
    },
  ];

  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md    "
      >
        <NewPurchaseFormHeader
          suplier={formData?.SUPPLIER}
          postNewIssue={postIssue}
          postNewOrder={postNew}
          setIsDrawer={setIsDrawer}
          updatePostNew={updatePostNew}
          setEMessage={setEMessage}
          isEMessage={isEMessage}
          eMessage={eMessage}
          setIsErrorMessage={setIsErrorMessage}
        />
        <div className="py-1 w-full bg-gray-100"></div>
        <div className=" bg-white  h-[98%] overflow-auto  ">
          <div className="">
            <div className="ml-[58px] my-4">
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
                    <NewPurchaseLeftForm
                      phone={phone}
                      email={email}
                      address={address}
                      waraddress={waraddress}
                      setAddress={setAddress}
                      setEmail={setEmail}
                      setPhone={setPhone}
                      setWarAddress={setAddress}
                    />
                  </div>
                  <div className="w-1/2">
                    <NewPurchaseRightForm />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full min-h-[30vh] overflow-x-auto bg-white p-2">
            <NewPurchaseGrid />
          </div>
        </div>

        {/* <Draggable>
<div className='absolute bottom-0 right-0 mb-8 mr-8 '>
  <PurchaseFormTottalDiv/>
</div>
        </Draggable> */}

        {/* <Draggable>
<div className={`absolute bottom-0 left-0 mb-8 ml-8 ${headVis == true ? "block" : "hidden"} `}>
  <VenderDetails/>
</div>
        </Draggable> */}
        {/* <div onClick={()=>dispatch(onHeadVis(true))} className={`absolute bottom-0 left-0 mb-8 text-[14px] text-white px-2 h-[153px] rounded-r-lg  ${headVis != true ? "flex" : "hidden"} items-center bg-[#0073EA] cursor-pointer  text-center`}>
        H <br/> e <br/> a <br/> d <br/> e <br/> r
       </div> */}
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
          // onChange={handleInputChangePhone}
          isDisabled={true}
        />
        <InputTextEut
          placeHolder="Email"
          initialValue={formData?.EMAIL}
          value={email}
          isDisabled={true}
        />
        {/* <InputTextEut value={address} placeHolder="Address" isDisabled={true} /> */}
        {/* <InputTextEut placeHolder="Ship Via" isDisabled={true} /> */}
        {/* <InputTextEut placeHolder="Shipping Instructions" isDisabled={true} /> */}
        {/* <TextArea label="Comments" initialValue={formData?.NOTES} onChange={handleInputChangeNotes} value={notes} placeHolder='Comments' /> */}
        <TextArea
          label="Comments"
          initialValue={formData?.NOTES}
          onChange={handleInputChangeNotes}
          value={notes}
          placeHolder="Comments"
        />
        <div className={`${formColaps == true ? "hidden" : ""}`}>
          <PurchaseFormTotalDivT />
        </div>
      </div>
      <RightDrawer
        isOpen={isDrawer}
        setIsDrawer={setIsDrawer}
        onClose={handleCloseDrawer}
        heading="Purchase Order"
        tabs={tabs}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PurchaseForm;
