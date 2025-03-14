"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "./../../../../../../../../customHook/useApiFetch";
import OdrQty from "./OdrQty";
import SplitMoreOption from "./stockSplit/SplitMoreOption";
import NewButton from "../../../../../../../../components/misc/pureComponents/buttons/NewButton";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import expiryData from "./expiryData";
import WarehouseDropdown from './WarehouseDropdown';
import SecLocSelect from './SecLocSelect';
import RowLocSelect from "./RowLocSelect";
import BinLocSelect from "./BinLocSelect";

import RemainingDays from './RemainingDays';
import { loaderToggle, readySubGridPayLoad, setRefresh, updateAllProductData, updateSubGridData } from "../../../redux/stockSlice";

const StockMultiRightDrawer = ({ id }) => {
  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const payload = useSelector((state) => state.stockSlices.subPayload);
  const stockOrderDetailData = useSelector((state) => state.stockSlices.stockOrderDetailData);
  const stockOrderFormData = useSelector((state) => state.stockSlices.stockOrderFormData);
  
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const postStockForm = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrder`;
  const postStockDetail = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrderDetail`;
  // let warehoueName = checkUpdatelist.find((item) => item.WAR_ID === product.WAR_ID);

  const dispatch = useDispatch();

  const getProdectDetailRes = (data) => {
    setIsSend(false)
    dispatch(loaderToggle(false));
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
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

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    { title: "Sec", slector: "SHELF", customComp: SecLocSelect, Wid: 140 },
    { title: "Row", slector: "RACK", customComp: RowLocSelect, Wid: 140 },
    { title: "Bin", slector: "BIN", customComp: BinLocSelect, Wid: 140 },
    { title: "LOT#", slector: "LOT_NUMBER", Wid: 150 },
    { title: "Expiry Date", slector: "EXPIRY_DATE", customComp: expiryData, Wid: 150 },
    { title: "REM Days", slector: "EXPIRY_DATE", customComp: RemainingDays, Wid: 100 },
    {
      title: "Allocated QTY",
      slector: "QUANTITY",
      Wid: 120,
      customComp: OdrQty,
    },
  ]);

  const colapsfunc = () => {
    if (colaps) {
      setColaps(false);
      //   setColapsComp(true);
    } else {
      setColaps(!colaps);
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {};
  const selectedRow = (index, data) => {
   
  };

  const onSubmit = () => {
    dispatch(updateAllProductData({SOId: stockOrderFormData[0].INVSTO_ID}));
    dispatch(readySubGridPayLoad({ id: id }));
    setIsSend(true) 
    dispatch(loaderToggle(true));
  };
  const onCloseMode = () => {};

  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
        <div className="mt-2">
          <NewButton label="Apply" handleClick={onSubmit} />
        </div>
        <div className="flex gap-10">
          <div className="w-1/2 ml-2">
            <div className="flex items-center gap-3">
              <span>From</span>
              <div className="bg-white border border-gray-300 rounded w-full p-1">
                <span className="text-gray-400 text-customblack text-[14px]">{stockOrderFormData[0].INVENTORY}</span>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex items-center gap-3">
              <span>To</span>
              <div className="bg-white border border-gray-300 rounded w-full p-1">
                <WarehouseDropdown/>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll">
          {/* <PurchaseGrid/> */}

          <GridTable
            head={head}
            row={stockOrderDetailData}
            setHead={setHead}
            MoreOpt={SplitMoreOption}
            onCloseMode={onCloseMode}
            GridColor="#4ade80"
            GridColaps={false}
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfunc}
            addButton={false}
            selectedRow={selectedRow}
            isChecked={checked}
            checkBoxShow={false}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </>
  );
};

export default StockMultiRightDrawer;
