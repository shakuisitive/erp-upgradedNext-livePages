"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from './../../../../../../../../customHook/useApiFetch';
import {
    setAvailableQuantity,
    setNewsplit,
    setRefresh,
    setSplitPostPurchaseDetail,
    setSplitPostPurchaseDetais,
    splitDrawerClose,
} from "../../../redux/Purchase.slice";
import SplitLot from "./SplitLot";
import SplitAlocated from "./SplitAlocated";
import SplitMoreOption from './SplitMoreOption'
import SplitPurchaseSplit from "./SplitPurchaseSplit";
import NewButton from "../../../../../../../../components/misc/pureComponents/buttons/NewButton";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import CreateLot from '../../CreateLot'
import Modal from "../../../../../../../../components/misc/pureComponents/modal/Modal";
import expiryData from './expiryData';
import RemainingDays from './RemainingDays';



const PurchaseRightDrawer = ({ suplier, btnText }) => {
    const arr = useSelector(
        (state) => state.PurchaseSlices.splitPostPurcahseDetail
      );
      const arr2 = useSelector(
        (state) => state.PurchaseSlices.splitpurchaseOrderDetails
      );
      const splitRowQuantity = useSelector(
        (state) => state.PurchaseSlices.splitRowQuantity
      );
      let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [availableQyt, setAvailableQyt] = useState(null);
  const [eMessage, setEMessage] = useState('')
  const [isEMessage, setIsErrorMessage]  = useState(false)

  const dispatch = useDispatch();
  
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    { title: "LOT#", slector: "LOT_NUMBER", customComp: SplitLot, Wid: 80 },
    { title: "Expiry Date", slector: "EXPIRY_DATE", customComp:expiryData, Wid: 80 },
    { title: "REM Days", slector: "EXPIRY_DATE", customComp:RemainingDays, Wid: 80 },
    {
      title: "Allocated QTY",
      slector: "QUANTITY",
      Wid: 120,
      customComp: SplitAlocated,
    },

    {
      title: "Split",
      slector: "Split",
      Wid: 50,
      customComp: SplitPurchaseSplit,
    },
  ]);
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const available = arr.reduce((acc, curr) => acc + curr.QUANTITY, 0);
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
    if(data){
    dispatch(setRefresh(true))
    }
    // console.log('check response' , data);
  };
  const onSubmit = () => {
    const lotNumbers = arr?.map(item => item?.LOT_NUMBER);
  
    if (availableQyt == 0) {
      if (!arr.some(item => !item.LOT_NUMBER)) {
        sendRequest(
          apiUrlDetails,
          "POST",
          payloadDetails,
          getProdectDetailResR,
          token
        );
        dispatch(setNewsplit([]));
        dispatch(setSplitPostPurchaseDetail([]))
        dispatch(setSplitPostPurchaseDetais([]))
        dispatch(splitDrawerClose())
        dispatch(setRefresh(true));
      } else {
        setEMessage('Please select or enter valid Lot Numbers.')
        setIsErrorMessage(true)
      }
    } else if (splitRowQuantity != available) {
      setEMessage('Available Quantity must be equal to order Quantity')
      setIsErrorMessage(true)
    } else {
      setEMessage('Please check the conditions and fill out all required fields.')
      setIsErrorMessage(true)
    }
  };
  const onCloseMode = () => {
    const newArr = [];
    dispatch(setNewsplit(newArr));
    dispatch(setSplitPostPurchaseDetail(newArr))
    dispatch(setSplitPostPurchaseDetais(newArr))
  };

  // console.log(arr2, arr, "arr2")
  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
        <div className="mt-2">
          <NewButton label="Apply" handleClick={onSubmit} />
        </div>
        <div className="">
          {/* <PurchaseGrid/> */}
          
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
      {
        isEMessage && (
          <Modal  setIsErrorMessage={setIsErrorMessage} eMessage={eMessage}/>
        )
      }
    </>
  );
};

export default PurchaseRightDrawer;
