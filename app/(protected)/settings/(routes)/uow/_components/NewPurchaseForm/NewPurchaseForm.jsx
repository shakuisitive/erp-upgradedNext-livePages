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
} from "../../redux/Purchase.slice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../customHook/useKeyPress";
import Draggable from "react-draggable";

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
  const [formColaps, setFormColaps] = useState(true);
  const [currTab, setCurrTab] = useState("supplier");
  const [isHeader, setIsHeader] = useState(true);

  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;

  const dispatch = useDispatch();

  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
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
  const VenderList = useSelector((state) => state.PurchaseSlices.VenderList);
  const WareHouse = useSelector((state) => state.PurchaseSlices.WareHouse);
  const headVis = useSelector((state) => state.PurchaseSlices.headVis);
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );

  // // console.log("checking WareHouse",WareHouse)
  // // console.log("check not redux madiha new post purchase order form madiha",postPurchaseOrder);

  // useEffect(() => {
  //   // console.log("check not redux madiha payload form madiha",newPurchaseForm);
  // },[postPurchaseOrder])

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
  // // console.log("postPurchaseOrderr[0] id filter" , postPurchaseOrder[0] , payload.data);

  useEffect(() => {
    const slected = VenderList?.filter(
      (data) => data?.VEN_ID == newPurchaseForm?.data.VEN_ID
    );
    setPhone(slected[0]?.PHONE_1);
    setEmail(slected[0]?.EMAIL);
    setAddress(slected[0]?.ADDRESS_1);

    // // console.log("checke newpurchase form ven id filter" , newPurchaseForm?.data.VEN_ID );
    // // console.log("checke ven id filter" , VenderList?.data?.VEN_ID );
  }, [newPurchaseForm]);

  useEffect(() => {
    const WarId = WareHouse?.Result?.filter(
      (data) => data?.WAR_ID == newPurchaseForm?.data.WAR_ID
    );
    setWarAddress(WarId[0]?.ADDRESS_1);
    // // console.log("checke newpurchase form ven id filter" , newPurchaseForm?.data.VEN_ID );
    // // console.log("checke ven id filter" , VenderList?.data?.VEN_ID );
  }, [newPurchaseForm]);

  useEffect(() => {
    const hasZeroCount = dataDetails?.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

    // setLotZero(hasZeroLot)
    setZero(hasZeroCount);
    //   // console.log('// console if has zero'  , hasZeroCount , dataDetails);
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
    if (newpayloadDetails) {
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
    // // console.log('getAllTask' , data.CODE);

    // dispatch(setLotList(data.Result))
  };

  const postIssue = () => {
    // // console.log("check button clicked" , zero);

    if (zero == false && dataDetails?.length > 0) {
      // console.log("Issue if working")
      if (postPurchaseOrder?.APPROVED_FLAG == "Y") {
        // console.log("Issue if if working")

        sendRequest(apiUrlPOrder, "POST", payload, getAllTaskPOrder, token);
      }
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

  const postNew = () => {
    if (zero == false) {
      // console.log('function chulling');
      // // console.log(postPurchaseOrder, "postPurchaseOrder")
      if (postPurchaseOrder?.APPROVED_FLAG == "Y") {
        // console.log('function chulling if block');
        sendRequest(
          apiUrlPOrder,
          "POST",
          newPurchaseForm,
          getAllTaskPOrder,
          token
        );
      }
    } else {
      alert("Quantity must be greater than 0");
    }
  };

  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      postNew();
      // // console.log(`key pressed: ${event.key}`);
    } else if (event.key == "i") {
      postIssue();
    }
  };

  useKeyPress(["i", "Enter"], onKeyPress);

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
                    />
                  </div>
                  <div className="w-1/2">
                    <NewPurchaseRightForm />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full h-full overflow-x-auto bg-white p-2">
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
    </div>
  );
};

export default PurchaseForm;
