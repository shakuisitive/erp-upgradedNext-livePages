import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import NewButton from "../../../../../../../components/misc/pureComponents/buttons/NewButton";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
  cleanCheckItems,
  loaderToggle,
  readySubGridPayLoad,
  setRefresh,
  setSessionId,
  setStockOrder,
} from "../../redux/stockSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import FormBtnDropdown from './FormBtnDropdown';

const StockOrderFormHeader = () => {
  let [error, sendRequest] = useApiFetch();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isSend, setIsSend] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const RSubData = useSelector((state) => state.stockSlices.subData);
  const payload = useSelector((state) => state.stockSlices.subPayload);
  const sessionId = useSelector((state) => state.stockSlices.sessionId);
  const postStockForm = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrder`;
  const postStockDetail = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrderDetail`;
  const postKillScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getProdectDetailRes = (data) => {
    setIsSend(false);
    dispatch(loaderToggle(false));
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
      dispatch(cleanCheckItems());
    }
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        postStockDetail,
        "POST",
        payload.detailPayload,
        getProdectDetailRes,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        postStockForm,
        "POST",
        payload.formPayload,
        getAllTaskPOrder,
        token
      );
    }
  }, [isSend]);

  const generateKillSessionPayload = () => ({
    action: "Inventory",
    data: { EDISCRSES_ID: sessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  });

  const killSessionRes = () => {
    if (data.CODE == "SUCCESS") {
      dispatch(setSessionId(""))
    }
  };

  const onSubmit = () => {
    dispatch(
      setStockOrder({ form: RSubData[0]?.form, detail: RSubData[0]?.product })
    );
    dispatch(readySubGridPayLoad());
    const killSessionPayload = generateKillSessionPayload();
    sendRequest(
      postKillScreenSessions,
      "POST",
      killSessionPayload,
      killSessionRes,
      token
    );
    setIsSend(true);
    dispatch(loaderToggle(true));
  };
  return (
    <div className="flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="  flex w-[60%]  py-2 ml-[40px] ">
        <FormBtnDropdown onApply={onSubmit} />
        <div className="flex items-center gap-3 ml-[8px]">
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
          <div className="flex items-center gap-3 lg:hidden md:flex sm:flex mt-1">
            <IoIosMore className="text-[18px]" />
            {/* <HeaderDropDown /> */}
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
    </div>
  );
};

export default StockOrderFormHeader;
