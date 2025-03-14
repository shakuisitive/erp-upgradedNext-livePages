"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosMore,
  IoIosSearch,
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import HeaderDropDown from "../FormHeaderDropdown";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  setRestock,
  setSave,
  setcloseModal,
  setRefresh,
  setCloseModal,
  clearMGSubGridData,
} from "../../redux/receivingSlices";
import { HiOutlineUserCircle } from "react-icons/hi2";
import ReceivingFormBtnDropdown from "./RecieveFormBtnDropdown";
import { RxCross2 } from "react-icons/rx";

const ReceivingFormHeader = ({
  supplier,
  index,
  setPdf,
  pdf,
  setPdfModal,
  pdfModal,
}) => {
  let [error, sendRequest] = useApiFetch();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const [updatedData, setUpdatedData] = useState([]);
  const [recData, setRecData] = useState([]);
  const [modifiedPayload, setModifiedPayload] = useState(null);
  const [modifiedNewPayload, setModifiedNewPayload] = useState(null);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("tokenSession");
  const formData = useSelector((state) => state.receivingSlices.postReceiving);
  const gridData = useSelector(
    (state) => state.receivingSlices.postReceivingDetail
  );

  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );
  const formIndex = useSelector((state) => state.receivingSlices.formIndex);
  const warId = useSelector((state) => state.receivingSlices.warId);
  const isCheckedFItem = useSelector(
    (state) => state.receivingSlices.isCheckedFItem
  );

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecieving`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingDetail`;
  const apiUrlFinalized = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostFinalizedRecieving`;
  const apiUrlAStock = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostAutoStockOrder`;
  const apiUrlByPo = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingByPO`;
  const apiUrlGRList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecievingList`;
  const apiUrlGR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;

  useEffect(() => {
    const items = gridData.map(({ BO_QUANTITY, ...rest }) => ({
      ...rest,
      BACK_ORDER_FLAG: "Y",
    }));

    setModifiedNewPayload(items);
  }, [gridData]);

  const anyItemCheckedWithFlagAndOrderQty = modifiedNewPayload?.every(
    (item) =>
      item.QUANTITY != "" && item.QUANTITY > 0 && item?.BACK_ORDER_FLAG === "Y"
  );
  const filteredItems = useMemo(() => 
  gridData.filter(item =>
    item.READY_FOR_RESTOCK_FLAG === "N" &&
    item.BACK_ORDER_FLAG === "Y" 
  ),
  [gridData]
);


useEffect(() => {
  if (filteredItems.length > 0) {
    const items = filteredItems
      .filter((_, index) => isCheckedFItem.includes(index))
      .map(({ BO_QUANTITY, ...rest }) => ({
        ...rest,
        READY_FOR_RESTOCK_FLAG: "Y",
      }));

    setModifiedPayload(items);
  }
}, [filteredItems, isCheckedFItem]);



  const anyItemCheckedWithYFlag = modifiedPayload?.some(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "Y"
  );

  const anyItemCheckedWithQty = gridData.some(
    (item) => item.BO_QUANTITY != item.QUANTITY
  );

  const payloadFinalized = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      USER_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostFinalizedRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadAStockOdr = {
    data: [
      {
        INVREC_ID: recDetails?.INVREC_ID,
        WAR_ID: warId?.WAR_ID,
        USER_ID: "2694",
      },
    ],
    action: "InventoryWeb",
    method: "PostStockOrderDetail",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadGR = {
    data: {
      INVREC_ID: `${formIndex?.INVREC_ID}`,
      OFFSET: "+5:00",
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: modifiedNewPayload,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetailsRestock = {
    data: modifiedPayload,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payload = {
    data: formData[0],
    action: "InventoryWeb",
    method: "PostRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadByPO = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      PURORD_ID: recDetails?.PURORD_ID,
      USER_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostRecievingByPO",
    username: "admin",
    tid: "144",
    type: "rpc",
  };

  const payloadGRList = {
    data: {
      FINZ_FLAG: "N",
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
    },
    action: "InventoryWeb",
    method: "GetRecievingList",
    username: "admin",
    tid: "144",
    type: "rpc",
  };

  const getRecData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(clearMGSubGridData());
      dispatch(setCloseModal());
    }
  };

  const getAllTaskR = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGRList, "POST", payloadGRList, getRecData, token);
    }
  };

  const postRecByPO = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGR, "POST", payloadGR, getAllTaskR, token);
    }
  };

  const postRecevingDetail = (data) => {
    if (anyItemCheckedWithQty && data?.CODE == "SUCCESS") {
      sendRequest(apiUrlByPo, "POST", payloadByPO, postRecByPO, token);
    } else {
      sendRequest(apiUrlGR, "POST", payloadGR, getAllTaskR, token);
    }
  };

  const getAllTask = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        postRecevingDetail,
        token
      );
    }
  };

  const handleApplyQty = () => {
    if (anyItemCheckedWithFlagAndOrderQty) {
      sendRequest(apiUrl, "POST", payload, getAllTask, token);
    } else {
      setEMessage("Received quantity must be greater than 0");
      setIsErrorMessage(true);
    }
  };

  const getAStockOdrData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGRList, "POST", payloadGRList, getRecData, token);
    }
  };

  const getFinalizedData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlAStock,
        "POST",
        payloadAStockOdr,
        getAStockOdrData,
        token
      );
    }
  };

  const getPostRecevingDetailRestock = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlFinalized,
        "POST",
        payloadFinalized,
        getFinalizedData,
        token
      );
    }
  };

  const getPostDataReceiving = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetailsRestock,
        getPostRecevingDetailRestock,
        token
      );
    }
  };

  const handleRestock = () => {
    if (modifiedPayload?.length > 0) {
      if (anyItemCheckedWithYFlag) {
        sendRequest(apiUrl, "POST", payload, getPostDataReceiving, token);
      } else {
        setEMessage("Conditions Not follow to Proceed");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Please select order first.");
      setIsErrorMessage(true);
    }
  };

  return (
    <div className="flex w-full justify-between gap-2 px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="  flex w-[60%]  py-2 ml-[20px] ">
        <div className=" ">
          <ReceivingFormBtnDropdown
            setPdf={setPdf}
            pdf={pdf}
            setPdfModal={setPdfModal}
            pdfModal={pdfModal}
            handleApplyQty={handleApplyQty}
            handleRestock={handleRestock}
            eMessage={eMessage}
            setIsErrorMessage={setIsErrorMessage}
            isEMessage={isEMessage}
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className={` ${
              toggleSearch ? "!border-[#0073ea] " : "hover:bg-customLightGray"
            }  border cursor-pointer rounded-[4px]  border-transparent lg:flex  p-[2px] items-center gap-2`}
          >
            <div
              className={`${
                toggleSearch
                  ? "w-[240px] px-2 relative  after:absolute after:right-[0px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-grayBlack"
                  : "w-0 px-0"
              } transition-all duration-200 text-customblack flex items-center justify-between`}
            >
              <input
                type="text"
                className={`h-full w-full focus:outline-none ${
                  toggleSearch ? "" : "hidden"
                } text-[14px] text-customblack`}
                // value={searchQuery}
                // onChange={handleSearchChange}
                // ref={searchRef}
                placeholder="Search this board"
              />
              {
                <div
                  // onClick={() => dispatch(setSearchQuery(""))}
                  className={`${
                    toggleSearch ? "flex" : "hidden"
                  } hover:border-gray-200 border cursor-pointer  border-transparent items-center h-fit`}
                >
                  <RxCross2 className="text-[14px]" />
                </div>
              }
            </div>
            <div
              onClick={() => setToggleSearch((pre) => !pre)}
              className=" text-customblack text-[14px] transition-all flex duration-1000 items-center gap-2 cursor-pointer"
            >
              <IoIosSearch className="text-[18px] text-customblack" />
              {toggleSearch ? "" : "Search"}
            </div>
          </div>
          <div className="flex items-center gap-3 lg:hidden md:flex sm:flex mt-1">
            {/* <IoIosMore className='text-[18px]' /> */}
            <HeaderDropDown />
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <HiOutlineUserCircle className="text-[18px] text-grayBlack" />
            Person
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <FiFilter className="text-[15px] text-grayBlack" />
            Filter
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <BiSortAlt2 className="text-[18px] text-grayBlack" />
            Sort
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <BiHide className="text-[18px] text-grayBlack" />
            Hide
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <IoIosMore className="text-[18px] text-grayBlack" />
          </div>
        </div>
      </div>
      <div className="flex w-[17%]  min-w-fit justify-end items-center">
        <p className="text-grayBlack text-[16px] leading-[28px] font-normal mr-4">
          Fields with a red asterisk (<span className="text-red-600">*</span>)
          are mandatory
        </p>
      </div>
    </div>
  );
};

export default ReceivingFormHeader;
