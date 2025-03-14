"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { GoArchive, GoHome } from "react-icons/go";
import { IoMdCopy } from "react-icons/io";
import { IoClose, IoExtensionPuzzleOutline } from "react-icons/io5";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { PiArrowBendRightDown } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbTransferIn } from "react-icons/tb";
import StockFromDrawer from "../StockOrderForm/StockFormDrawer";
import StockOrderDrawr from "../StockOrderDrawr";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import {
  setMultiAssignDrawer,
  setMultiOrderIds,
  setMultiTransferDrawer,
  setRefresh,
} from "../../redux/stockSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

function StSubSlectedModal({
  isOpen,
  closeModal,
  checkedItems,
  checkedItemsData,
  orderId,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isClose, setIsClose] = useState("");
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const subData = useSelector((state) => state.stockSlices.subData);
  const order = subData?.filter((item) => item.id == orderId);
  const status = order[0]?.form[0]?.STOCK_ORD_STATUS;
  const release = checkedItemsData[0]?.rowData.LOT_RELEASE_FLAG;

  const warId = checkedItemsData[0]?.rowData.WAR_ID;

  const checkWar = warId == 3909 || warId == 3024 ? "transfer" : "assign";

  const stockOrderForm = checkedItemsData.map((items) => {
    const { rowData } = items;
    return rowData;
  });

  const handleCloseTransfer = () => {
    dispatch(
      setMultiOrderIds({ id: orderId, action: "ST", list: stockOrderForm })
    );
    dispatch(setMultiTransferDrawer(true));
  };

  const Drawertabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: (
        <div>
          <StockFromDrawer btnText="Add New" />
        </div>
      ),
    },
    {
      //   icon: <SlArrowDown className="pl-2 text-md" />,
      label: "More",
      content: <div>Content for More</div>,
    },
  ];

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostLotReleaseFlag`;

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  let releaseItemsArray = stockOrderForm.map((item) => {
    return {
      INVSTOORDDET_ID: item?.INVSTODET_ID,
      INVPARLOT_ID: item?.INVPARLOT_ID,
    };
  });

  const payload = {
    data: {
      USE_ID: "2694",
      INVSTOORDDET: releaseItemsArray,
    },
    action: "InventoryWeb",
    method: "PostLotReleaseFlag",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  function getAllTask(data) {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  }
  const releaseItem = () => {
    // console.log(payload, "Check Payload")
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  };

  const assignAction = () => {
    dispatch(
      setMultiOrderIds({ id: orderId, action: "SA", product: stockOrderForm })
    );
    dispatch(setMultiAssignDrawer(true));
  };

  return (
    <div
      className={`fixed w-[100vw] z-[101] bottom-10 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className=" w-[500px] h-[63px] bg-white overflow-hidden rounded-md shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex m-auto">
        <div className="text-[24px] text-white w-[63px] flex justify-center items-center bg-[#0073EA]">
          {checkedItems}
        </div>
        <div className="grow flex ">
          <div className="text-customblack text-[20px] font-thin h-full flex items-center pl-[20px] w-[256px]">
            Items Selected
          </div>

          {/* <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <CiFileOn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Export</span>
              </div>
            </div>
          </div> */}
          {/* <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <GoArchive className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Archive</span>
              </div>
            </div>
          </div> */}

          {(status == "NEW" ||
            status == "Initiated" ||
            checkWar == "transfer") &&
            release == "Y" && (
              <div className="flex mr-[20px] cursor-pointer">
                <div className="text-customblack h-full flex justify-center items-center  ">
                  <div onClick={handleCloseTransfer} className="group">
                    <TbTransferIn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                    <span className="text-[12px]">Transfer</span>
                  </div>
                </div>
              </div>
            )}

          {release == "N" && (
            <div className="flex mr-[20px] cursor-pointer">
              <div className="text-customblack h-full flex justify-center items-center  ">
                <div className="group" onClick={releaseItem}>
                  <MdOutlineAssignmentTurnedIn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                  <span className="text-[12px]">Release</span>
                </div>
              </div>
            </div>
          )}

          {(status == "Full Transferred |Not Assigned" ||
            checkWar == "assign") &&
            release == "Y" && (
              <div className="flex mr-[20px] cursor-pointer">
                <div className="text-customblack h-full flex justify-center items-center  ">
                  <div className="group" onClick={assignAction}>
                    <MdOutlineAssignmentTurnedIn className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                    <span className="text-[12px]">Assign</span>
                  </div>
                </div>
              </div>
            )}

          {/* <div className="flex mr-[20px] cursor-pointer">
            <div className="text-customblack h-full flex justify-center items-center  ">
              <div className="group">
                <FiPrinter className="text-[20px] m-auto group-hover:text-customblue cursor-pointer" />
                <span className="text-[12px]">Print</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className=" border-l-2 border-l-[#c3c6d4] w-[63px] text-[24px] text-customblack flex justify-center items-center">
          <IoClose onClick={closeModal} />
        </div>
      </div>

      <RightDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseTransfer}
        heading="Conversation"
        tabs={Drawertabs}
      />
    </div>
  );
}

export default StSubSlectedModal;
