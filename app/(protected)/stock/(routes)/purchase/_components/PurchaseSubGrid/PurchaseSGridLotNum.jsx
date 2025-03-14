"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  readySubGridPayLoad,
  subOrderLotChange,
  setLotList,
  setRefresh,
  lotCreateToggle,
} from "../../redux/Purchase.slice";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import LotCreateDrawer from "./LotCreateDrawer";
import Popover from "../../../../../../../components/misc/pureComponents/popovers/Popover";

const PurchaseSGridLotNum = ({ data, index, rowData, id, obj }) => {
  const focRef = useRef(null);
  const apiUrlPOrder = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  const [color, setColor] = useState();
  const [arr, setArr] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [purOrderD, setPurOrderD] = useState([]);
  const [isSend, setIsSend] = useState(false);
  const payload = useSelector((state) => state.PurchaseSlices.subPayload);
  const lotCreate = useSelector((state) => state.PurchaseSlices.lotCreate);
  const subData = useSelector((state) => state.PurchaseSlices.subData);
  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const purchaseOrder = subData.filter(item => item.id === rowData.PURORD_ID);
  const purchaseOrderDetails =  purchaseOrder[0]?.product;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;


  const payloadOrder = {
    data: {
      APPROVED_FLAG: obj?.form[0].APPROVED_FLAG,
      COMPLETE_FLAG: "N",
      ETA_DATE: obj?.form[0].ETA_DATE,
      FNZ_FLAG: "N",
      FNZ_USE_ID: "2694",
      NOTES: obj?.form[0].NOTES,
      PO_DATE: obj?.form[0].PO_DATE,
      PREPARED_DATE: new Date().toISOString().split("T")[0],
      PURORD_ID: obj?.form[0].PURORD_ID,
      REFERENCE_NUMBER: obj?.form[0].REFERENCE_NUMBER,
      TERMS_CONDITION: obj?.form[0].TERMS_CONDITION,
      USE_ID_APRVD_BY: "2694",
      USE_ID_COMPT_BY: "2694",
      USE_ID_PREPARED_BY: "2694",
      VEN_ID: obj?.form[0].VEN_ID,
      VOID_FLAG: obj?.form[0].VOID_FLAG,
      VOID_NOTES: obj?.form[0].VOID_NOTES,
      WAR_ID: obj?.form[0].WAR_ID,
    },
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const getProdectDetailRes = (data) => {
    //dispatch(setRefresh(true));
    setIsSend(false)
  };
  const getAllTaskPOrder = (data) => {
    if (data.CODE == "SUCCESS" && payload != null) {
      sendRequest(
        apiUrlDetails,
        "POST",
        payload.detailPayload,
        getProdectDetailRes,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(apiUrlPOrder, "POST", payloadOrder, getAllTaskPOrder, token);
    }
  }, [isSend]);


  useEffect(() => {
    if (lotList.length > 0) {
      const sortedArr = [...lotList];
      sortedArr.sort((a, b) => {
        if (a.LOT_NUMBER === rowData.LOT_NUMBER) return -1;
        if (b.LOT_NUMBER === rowData.LOT_NUMBER) return 1;
        return 0;
      });
      setArr(sortedArr);
    }
  }, [lotList, data]);

  useEffect(() => {
    let colFil = lotList.filter(
      (data) => data.LOT_NUMBER == rowData.LOT_NUMBER
    );
    setColor(colFil[0]?.PURCHASE_GROUP_COLOR);
  }, [lotList]);

  const setChange = (e) => {
    setColor(e.PURCHASE_GROUP_COLOR);
    let expDate = "";
    let invId = "";
    lotList.forEach((data) => {
      if (data.INVPARLOT_ID === e.INVPARLOT_ID) {
        expDate = data.EXPIRY_DATE;
        invId = data.INVPARLOT_ID;
      }
    });
    // setPurOrderD(
    //   purOrderD.filter((item) => {
    //     if (item.PURORDDET_ID == rowData.PURORDDET_ID) {
    //       item.LOT_NUMBER = e.LOT_NUMBER;
    //       item.INVPARLOT_ID = invId;
    //       item.READY_FOR_RECEIVING_FLAG = "Y";
    //     }
    //     return item;
    //   })
    // );
    let data = {
      invId: invId,
      Lot: e.LOT_NUMBER,
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
      expDate: expDate,
    };
    dispatch(subOrderLotChange(data));
    dispatch(readySubGridPayLoad({ id: id }));
    setIsSend(true)
  };
  const handleOnFocus = () => {};

  const handleOnBlur = () => {
  };

  const handleCloseDrawer = () => {
    dispatch(lotCreateToggle(false));
  };
  
  const setNewLot = (lotData) => {
    let expDate = "";
    let invId = "";
    lotData.data.forEach((data) => {
      if (data.LOT_NUMBER === lotData.newLot) {
        expDate = data.EXPIRY_DATE;
        invId = data.INVPARLOT_ID;
      }
    });
    setPurOrderD(
      purOrderD.filter((item) => {
        if (item.PURORDDET_ID == rowData.PURORDDET_ID) {
          item.LOT_NUMBER = lotData.newLot;
          item.INVPARLOT_ID = invId;
          item.READY_FOR_RECEIVING_FLAG = "Y";
        }
        return item;
      })
    );
    let data = {
      invId: invId,
      Lot: lotData.newLot,
      POId: rowData.PURORD_ID,
      PId: rowData.PURORDDET_ID,
      expDate: expDate,
    };
    //console.log(data, "New Lot data")
    dispatch(subOrderLotChange(data));
    sendRequest(apiUrlPOrder, "POST", payloadOrder, getAllTaskPOrder, token);
  };


  const tabs = [
    {
      label: "Create Lot",
      content: <LotCreateDrawer rowData={rowData} newLotNumber={setNewLot} />,
    },
  ];

  const createNewLot = (option) => {
    dispatch(lotCreateToggle(true));
  };

  const getAvailableOptions = (list) => {
    return arr.filter((item) => {
      return !purchaseOrderDetails?.some(
        (selectedItem) => selectedItem.INVPARLOT_ID === item.INVPARLOT_ID
      );
    });
  };

  const availableLotList = getAvailableOptions();

  return (
    <div className="w-full h-full flex relative justify-between bg-[#E1EFF2] pr-[3px] items-center">
    <div
      style={{ backgroundColor: `${color}` }}
      className={`p-[2px] mr-[2px] h-full`}
    ></div>
          
      <>
        {rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
          obj?.statusId != "Initiated"  ?
           <Dropdown
           options={availableLotList}
           optionKey1="LOT_NUMBER"
           optionKey2="LOT_NUMBER"
           onSelectedOptionChanged={setChange}
           placeholder="select lot"
           inputClassName="focus:outline-none w-full hover:bg-transparent 
           over:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-center"
           dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
           customFocusKey="p"
           isDisabled={(obj?.statusId == "Issued to Vendor" || obj?.statusId == "Partially Ready for Receiving") ? false : true}
           onClearInputValue={false}
           onHandleFocus={handleOnFocus}
           onDefaultInput={rowData?.LOT_NUMBER}
           onHandleBlur={handleOnBlur}
           forwardedRef={focRef}
           onNewOption={createNewLot}
           isCreateOption={true}

         /> : <div/>
        ) : (
         <div className="flex items-center justify-center w-full">
           <Tooltip content="non-stock item dont need Lot#">
            <FaCircleInfo />
          </Tooltip>
         </div>
        )}
      </>
      <div className="ml-1">
         {
          (
            <span onClick={() => setIsPopup(true)} className={`cursor-pointer ${ !rowData?.LOT_NUMBER && 'invisible'}`}>
            <FaCircleInfo />
          </span>
          )
         }
         
        {isPopup && <Popover rowData={rowData} setIsPopup={setIsPopup} />}
      </div>

    <div>
      <RightDrawer
        isOpen={lotCreate}
        onClose={handleCloseDrawer}
        heading="Purchase Order"
        tabs={tabs}
      />
    </div>
  </div>
  );
};

export default PurchaseSGridLotNum;
