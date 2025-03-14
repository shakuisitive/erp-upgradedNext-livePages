import React, { useEffect, useRef, useState } from "react";
import NewButton from "../../../../../../../components/misc/pureComponents/buttons/NewButton";
import { IoIosMore, IoIosSearch } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FiFilter } from "react-icons/fi";
import { BiHide, BiSortAlt2 } from "react-icons/bi";
import WarehouseDropdown from "./WarehouseDropdown";
import AssignDropDown from "./AssignDropDown";
import {
  readySubGridPayLoad,
  readyVoidPayLoad,
  setPCModal,
  setRefresh,
  setSessionId,
  setSubPayload,
  updateVoid,
} from "../../redux/TransferSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  PhysicalCount,
  SessionManagement,
  Transfer,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import FormBtnDropdown from "./FormBtnDropdown";

const TransferFormHeader = () => {
  const dispatch = useDispatch();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isVoid, setIsVoid] = useState(false);
  const [traId, setTraID] = useState("");
  const searchRef = useRef(null);
  let [error, sendRequest] = useApiFetch();
  const payload = useSelector((state) => state.TransferSlice.subPayload);
  const voidPayload = useSelector((state) => state.TransferSlice.voidPayload);
  const transferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const sessionId = useSelector((state) => state.TransferSlice.sessionId);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const FinalizedPayload = {
    data: {
      INVTRA_ID: transferForm?.INVTRA_ID,
      USE_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostTransferFinalized",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
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
      dispatch(setSessionId(""));
    }
  };
  const handleFinalized = (data) => {
    if (data.CODE == "SUCCESS") {
      const killSessionPayload = generateKillSessionPayload();
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        token
      );
      dispatch(setSubPayload());
      dispatch(setPCModal(false));
      dispatch(setRefresh(true));
    }
  };

  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      if (!isVoid) {
        sendRequest(
          Transfer.PostTransferFinalized,
          "POST",
          FinalizedPayload,
          handleFinalized,
          token
        );
      }
    }
    if (isVoid) {
      const killSessionPayload = generateKillSessionPayload();
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        token
      );
      dispatch(setSubPayload());
      dispatch(setPCModal(false));
      dispatch(setRefresh(true));
    }
  };

  const getForm = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        Transfer.PostInventoryTransferDetails,
        "POST",
        payload?.detailPayload || voidPayload?.detailPayload,
        getDetail,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        Transfer.PostInventoryTransfer,
        "POST",
        payload?.formPayload || voidPayload?.formPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  const onApply = () => {
    dispatch(readySubGridPayLoad());
    setIsSend(true);
  };

  const onVoid = (notes) => {
    dispatch(updateVoid(notes));
    dispatch(readyVoidPayLoad());
    setIsSend(true);
    setIsVoid(true);
  };

  return (
    <div className="flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="flex items-center">
        <FormBtnDropdown onApply={onApply} onVoid={onVoid} />
        <div className="border-b border-b-gray-300 border-l-green-400 border-l-4 py-1">
          <WarehouseDropdown disable={true} />
        </div>
        {/* <div className="border-b border-b-gray-300 border-l-blue-400 border-l-4 py-1 ml-3">
          <AssignDropDown />
        </div> */}
      </div>
      <div className="flex py-2">
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

export default TransferFormHeader;
