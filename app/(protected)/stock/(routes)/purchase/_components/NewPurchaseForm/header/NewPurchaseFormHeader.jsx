"use client";
import React, { useEffect, useState, useRef } from "react";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
// import { FiEdit2, FiFilter } from 'react-icons/fi'
// import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoIosSearch } from 'react-icons/io'
// import { IoAddSharp, IoSettingsOutline } from 'react-icons/io5'
import HeaderDropDown from "../../purchaseForm/header/FormHeaderDropdown";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  setIssueStatus,
  setReadyForRStatus,
  setcloseModall,
  setRefresh,
  setSearchQuery,
} from "../../../redux/Purchase.slice";

import VenderDropdown from "./VenderDropdown";
import WarehouseDropdown from "./WarehouseDropdown";
import { FiFilter, FiEdit2 } from "react-icons/fi";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosMore,
  IoIosSearch,
} from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoAddSharp } from "react-icons/io5";
import FormBtnDropdown from "../../FormBtnDropdown";

const NewPurchaseFormHeader = ({
  suplier,
  postNewIssue,
  postNewOrder,
  updatePostNew,
  setIsDrawer,
  setEMessage,
  setIsErrorMessage,
  isDrawer,
  isEMessage,
  eMessage
}) => {
  let [error, sendRequest] = useApiFetch();
  const [zero, setZero] = useState(false);
  const [lotZero, setLotZero] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const data = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const ReceavingPo = useSelector((state) => state.PurchaseSlices.ReceavingPO);
  const searchQuery = useSelector((state) => state.PurchaseSlices.searchQuery);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingFromPO`;
  // // console.log('check issue status' , ReceavingPo);

  useEffect(() => {
    const hasZeroCount = dataDetails.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    const hasZeroLot = dataDetails.some((item) => item.LOT_NUMBER === null);

    setLotZero(hasZeroLot);
    setZero(hasZeroCount);
    // console.log('// console if has zero' , hasZeroLot , hasZeroCount , dataDetails);
  }, [dataDetails]);

  const payload = {
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
  let token = "";
  useEffect(() => {
    token =
      typeof window !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
  }, []);
  const getProdectDetailRes = (data) => {
    dispatch(setRefresh(true));

    // // console.log('check response' , data);
  };

  const getAllTask = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetails,
        getProdectDetailRes,
        token
      );
      dispatch(setcloseModall(true));
    }
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
    // // console.log('getAllTask' , data.CODE);

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
      sendRequest(apiUrl, "POST", payload, getAllTask, token);
    }
    // // console.log('check issue status2' , data[0]?.APPROVED_FLAG );
  }, [data]);

  useEffect(() => {
    if (data[0]?.APPROVED_FLAG == "Y" && data[0]?.COMPLETE_FLAG == "Y") {
      sendRequest(apiUrl, "POST", payload, getAllTaskR, token);
      // sendRequest(apiUrlDetails, 'POST', payloadDetails, getProdectDetailResR, token)
      // sendRequest(apiUrlR , 'POST', payloadRPO, getProdectDetailResPO, token)
      //  // console.log('check issue status2' , data[0] );
      // dispatch(setcloseModall(true))
    }

    // // console.log('check issue status3' , data[0] );
  }, [data]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  
  return (
    <div className="flex w-full justify-between  pr-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="  flex w-[50%]  py-2  ">
        {/* <div className="bg-[#0073ea] mr-3 ml-2 flex pl-3 w-[130px] justify-between rounded-[4px] ">
           <div className="flex  text-white grow text-[14px] items-center border-r border-r-gray-500 py-2 align-middle ">
            <span className=" font-semibold">Apply (f4)</span>
           </div>
           <div className="text-white flex items-center px-2 ">
            <IoIosArrowDown className="text-[18px] "/>
           </div>
        </div> */}
        <div className="  ">
          <FormBtnDropdown
            postNewIssue={postNewIssue}
            updatePostNew={updatePostNew}
            postNewOrder={postNewOrder}
            setEMessage={setEMessage}
            isEMessage={isEMessage}
            eMessage={eMessage}
            setIsErrorMessage={setIsErrorMessage}
          />
        </div>
        <div className="  flex  py-2  ">
          {/* <div className='flex min-w-[200px] items-center  ml-4 mr-2'>
        <div className='bg-green-400 flex mr-2 p-[2px] h-full'>

        </div>
       
        <VenderDropdown />
        <div className="flex gap-2 items-center ">
            <div className="justify-center items-center gap-2 ml-3">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>

            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
          
      </div> */}
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
                value={searchQuery}
                onChange={handleSearchChange}
                ref={searchRef}
                placeholder="Search this board"
              />
              {searchQuery && (
                <div
                  onClick={() =>  dispatch(setSearchQuery(''))}
                  className={`${
                    toggleSearch ? "flex" : "hidden"
                  } hover:border-gray-200 border cursor-pointer  border-transparent items-center h-fit`}
                >
                  <RxCross2 className="text-[14px]" />
                </div>
              )}
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

          {/* <div className="border h-fit items-center p-1 hover:border-[#0073ea] hidden lg:flex md:hidden sm:hidden">
            <IoIosArrowDown className="text-[18px]" />
          </div>
          <div className="border items-center h-fit p-1 hover:border-[#0073ea] hidden lg:flex md:hidden sm:hidden">
            <IoIosArrowUp className="text-[18px] text-customblack" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseFormHeader;

{
  /* <div className='flex w-full justify-between  px-2 bg-white py-2 mb-2 rounded-t-md'>
    <div className='  flex w-[50%]  py-2  '>
    <button disabled={FormStatus == 'New' ? false : true} onClick={postNew} className={`bg-customgreen hover:bg-btnHoverGreen rounded-[4px] text-[14px] w-[100px] leading-[24px] py-1 px-[2px]  text-white block`}>New Order</button>
    
      <div className='flex min-w-[200px] items-center  ml-4 mr-16'>
        <div className='bg-green-400 flex mr-2 p-[2px] h-full'>

        </div>
       
        <VenderDropdown />
        <div className="flex gap-2 items-center ">
            <div className="justify-center items-center gap-2 ml-3">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>

            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
          
      </div>
      <div className='flex min-w-[200px] items-center  ml-4'>
        <div className='bg-green-400 flex mr-2 p-[2px] h-full'>

        </div>
       
        <WarehouseDropdown/>
        <div className="flex gap-2 items-center">
            <div className="justify-center items-center gap-2 ml-3">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>

            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>

      </div>
    </div>
    
    <div className="flex w-[17%]  min-w-fit justify-end gap-2">
        <div className="flex items-center space-x-2">
          
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchRef}
                placeholder="Search this board"
              />
              {search && (
                <div
                  onClick={() => setSearch("")}
                  className={`${
                    toggleSearch ? "flex" : "hidden"
                  } hover:border-gray-200 border cursor-pointer  border-transparent items-center h-fit`}
                >
                  <RxCross2 className="text-[14px]" />
                </div>
              )}
            </div>
            <div
              onClick={() => setToggleSearch((pre) => !pre)}
              className=" text-customblack text-[14px] transition-all flex duration-1000 items-center gap-2 cursor-pointer"
            >
              <IoIosSearch className="text-[18px] text-customblack" />
              {toggleSearch ? "" : "Search"}
            </div>
          </div>
          <div className="flex items-center gap-2 lg:hidden md:flex sm:flex mt-1">
            <HeaderDropDown />
          </div>
          <div className="text-customblack text-[14px] hidden items-center gap-2 lg:flex md:hidden sm:hidden hover:bg-customLightGray rounded-[4px] p-[2px]">
            <BiSortAlt2 className="text-[18px] text-customblack" />
            Sort
          </div>
          <div className="border h-fit items-center p-1 hover:border-[#0073ea] hidden lg:flex md:hidden sm:hidden">
            <IoIosArrowDown className="text-[18px]" />
          </div>
          <div className="border items-center h-fit p-1 hover:border-[#0073ea] hidden lg:flex md:hidden sm:hidden">
            <IoIosArrowUp className="text-[18px] text-customblack" />
          </div>
        </div>
      </div>
  </div> */
}
