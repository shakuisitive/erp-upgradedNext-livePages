"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setAvailableQuantity,
  setNewsplit,
  setRefresh,
  setSplitPostPurchaseDetail,
  setSplitPostPurchaseDetais,
} from "../../redux/Purchase.slice";

import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import SplitMoreOption from "../purchaseForm/purchaseGrid/SplitMoreOption";
import SiplitAlocated from "../purchaseForm/purchaseGrid/SiplitAlocated";
import splitPurchaseSplit from "../purchaseForm/purchaseGrid/splitPurchaseSplit";
import SiplitLot from "../purchaseForm/purchaseGrid/SiplitLot";
import NewButton from "../../../../../../../components/misc/pureComponents/buttons/NewButton";
import CreateLot from "../CreateLot";
import expiryData from "../PurchaseSubGrid/purchaseSGridSku/expiryData";
import RemainingDays from "../PurchaseSubGrid/purchaseSGridSku/RemainingDays";

const PurchaseDrawer = ({ setEMessage, setIsErrorMessage, onClose }) => {
  const arr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );
  const arr2 = useSelector(
    (state) => state.PurchaseSlices.splitpurchaseOrderDetails
  );
  const splitRowQuantity = useSelector(
    (state) => state.PurchaseSlices.splitPurchaseRowQuantity
  );
  const availableQuantity = useSelector(
    (state) => state.PurchaseSlices.availableQuantity
  );
  const lotCreate = useSelector(
    (state) => state.PurchaseSlices.lotCreate
  );
  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [availableQyt, setAvailableQyt] = useState(null);

  const dispatch = useDispatch();

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    { title: "Lot#", slector: "", customComp: SiplitLot, Wid: 150 },
    { title: "Expiry Date", slector: "EXPIRY_DATE", customComp:expiryData, Wid: 100 },
    { title: "REM Days", slector: "EXPIRY_DATE", customComp:RemainingDays, Wid: 100 },
    {
      title: "Allocated Qty",
      slector: "QUANTITY",
      Wid: 120,
      customComp: SiplitAlocated,
    },

    {
      title: "Split",
      slector: "Split",
      Wid: 120,
      customComp: splitPurchaseSplit,
    },
  ]);
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const available = arr.reduce((acc, curr) => acc + curr.QUANTITY, 0);
  const newAvailableQuantity =
    available < splitRowQuantity
      ? splitRowQuantity - available
      : splitRowQuantity;
  useEffect(() => {
    // Check if updatedAvailableQuantity is less than 0, if yes, set it to 0
    if (newAvailableQuantity < 0) {
      setAvailableQyt(splitRowQuantity);
    } else {
      const checkAvl = splitRowQuantity == available ? 0 : newAvailableQuantity;
      setAvailableQyt(checkAvl);
      //dispatch(setAvailableQuantity(newAvailableQuantity));
    }
  }, [arr, arr2]);

  const payloadDetails = {
    data: arr,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  // const token = localStorage.getItem('tokenSession')
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
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

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const data = arr?.Result?.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        //console.log("obj", obj);

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  const selectedRow = (index, data) => {
    // // console.log('check slected row Data and index' , index , data);
  };
  const [options, setOptions] = useState([
    { value: "Nutraunex", label: "Nutraunex" },
    { value: "Supplier", label: "Supplier" },
    { value: "Getz", label: "Getz" },
  ]);

  const handleCreateOption = (inputValue) => {
    const newOption = {
      value: inputValue,
      label: inputValue,
    };
    setOptions([...options, newOption]);
  };

  const getProdectDetailResR = (data) => {
    //console.log(data, 'dataa fetch')
    if (data) {
      dispatch(setRefresh(true));
    }
    // console.log('check response' , data);
  };
  const onSubmit = () => {
    if (availableQuantity == 0) {
      if (!arr.some((item) => !item.LOT_NUMBER)) {
        sendRequest(
          apiUrlDetails,
          "POST",
          payloadDetails,
          getProdectDetailResR,
          token
        );
        onClose();
      } else {
        setEMessage("Please select or enter valid Lot Numbers.");
        setIsErrorMessage(true);
      }
    } else if (availableQuantity === 0) {
      setEMessage(
        "Please check the conditions and fill out all required fields."
      );
      setIsErrorMessage(true);
    } else {
      setEMessage("Available Quantity must be equal to order Quantity");
      setIsErrorMessage(true);
    }
  };
  const onCloseMode = () => {
    const newArr = [];
    dispatch(setNewsplit(newArr));
    dispatch(setSplitPostPurchaseDetail(newArr));
    dispatch(setSplitPostPurchaseDetais(newArr));
  };
  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
        <div className="mt-2">
          <NewButton label="Apply" handleClick={onSubmit} />
        </div>
        <div className="">
          <GridTable
            head={head}
            row={arr2}
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
            <span>{availableQyt == 0 ? availableQuantity : availableQyt}</span>
          </div>
        </div>
        {lotCreate && <div className="border-t pt-2"><CreateLot skuData={arr2[0]} /></div>}
      </div>
    </>
  );
};

export default PurchaseDrawer;
