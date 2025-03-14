"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import OdrQty from "../OdrQty";
import SplitMoreOption from "./SplitMoreOption";
import NewButton from "../../../../../../../../../components/misc/pureComponents/buttons/NewButton";
import GridTable from "../../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import Modal from "../../../../../../../../../components/misc/pureComponents/modal/Modal";
import expiryData from "../expiryData";
import WarehouseDropdown from '../WarehouseDropdown';

import RemainingDays from '../RemainingDays';
import { loaderToggle, readySubGridPayLoad, setAvailableQuantity, setRefresh, updateSplitSubGridData, updateSubGridData } from "../../../../redux/stockSlice";
import StockSplit from './StockSplit';
import SplitSecLocSelect from './SplitSecLocSelect';
import SplitRowLocSelect from './SplitRowLocSelect';
import SplitBinLocSelect from './SplitBinLocSelect';

const SplitRightDrawer = ({ id, rowId }) => {
  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [availableQyt, setAvailableQyt] = useState(null);
  const checkUpdatelist = useSelector((state) => state.stockSlices.wareHouse);
  const payload = useSelector((state) => state.stockSlices.subPayload);
  const product = useSelector((state) => state.stockSlices.stockOrderDetailData);
  const LocationsSet = useSelector(
    (state) => state.stockSlices.LocationsSet
  );
  const stockOrderFormDataId = useSelector(
    (state) => state.stockSlices.stockOrderFormDataId
  );
  const splitRowQuantity = useSelector(
    (state) => state.stockSlices.splitRowQuantity
  );
  const stockOrderDetailDataId = useSelector(
    (state) => state.stockSlices.stockOrderDetailDataId
  );
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const postStockForm = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrder`;
  const postStockDetail = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrderDetail`;
  // let warehoueName = checkUpdatelist.find((item) => item.WAR_ID === product.WAR_ID);

  const dispatch = useDispatch();

  const spitRow = product.filter((item) => item.INVSTODET_ID == stockOrderDetailDataId || item.INVSTODET_ID == "")

  const available = spitRow.reduce((acc, curr) => acc + curr.QUANTITY, 0);
  const newAvailableQuantity = available < splitRowQuantity ? splitRowQuantity - available : splitRowQuantity;
  useEffect(() => {

    // Check if updatedAvailableQuantity is less than 0, if yes, set it to 0
    if (newAvailableQuantity < 0) {
      setAvailableQyt(splitRowQuantity);
    } else {
    const checkAvl = splitRowQuantity == available ? 0 : newAvailableQuantity;
      setAvailableQyt(checkAvl);
      dispatch(setAvailableQuantity(checkAvl));
    }
  }, [product]);

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
    { title: "Sec", slector: "SHELF", customComp: SplitSecLocSelect, Wid: 90 },
    { title: "Row", slector: "RACK", customComp: SplitRowLocSelect, Wid: 90 },
    { title: "Bin", slector: "BIN", customComp: SplitBinLocSelect, Wid: 90 },
    { title: "LOT#", slector: "LOT_NUMBER", Wid: 150 },
    { title: "Expiry Date", slector: "EXPIRY_DATE", customComp: expiryData, Wid: 150 },
    { title: "REM Days", slector: "EXPIRY_DATE", customComp: RemainingDays, Wid: 80 },
    {
      title: "Stock QTY",
      slector: "QUANTITY",
      Wid: 120,
      customComp: OdrQty,
    },
    {
      title: "Split",
      slector: "Split",
      Wid: 50,
      customComp: StockSplit,
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

  const handleCreateOption = (inputValue) => {};

  const getProdectDetailResR = (data) => {};
  const onSubmit = () => {
    dispatch(updateSplitSubGridData({SOId: stockOrderFormDataId}))
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
        <div className="overflow-x-scroll">
          {/* <PurchaseGrid/> */}

          <GridTable
            head={head}
            row={spitRow}
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
        <div className="flex flex-col gap-2 ml-10">
            <div className="flex items-center gap-4">
              <p className="m-0 font-medium">Order Quantity :</p>
              <span>{splitRowQuantity}</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="m-0 font-medium">Available Quantity :</p>
              <span>{availableQyt}</span>
            </div>
          </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </>
  );
};

export default SplitRightDrawer;
