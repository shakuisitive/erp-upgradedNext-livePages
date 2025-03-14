"use client";
import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
// import { RxCross1 } from "react-icons/rx";

import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import InputTextEut from "../../../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import CustomLotcell from "./CustomLotcell";
import PurchaseGridOrdQnt from "./PurchaseGridOrdQnt";
import PurchaseSiplitSubgrid from "./PurchaseSiplitSubgrid";
import SiplitAlocated from "./SiplitAlocated";
import SiplitLot from "./SiplitLot";
import splitPurchaseSplit from "./splitPurchaseSplit";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSplitPostPurchaseDetail,
  setAvailableQuantity,
  setNewsplit,
  setSplitPostPurchaseDetail,
  setSplitPostPurchaseDetais,
} from "../../../redux/Purchase.slice";
import SplitMoreOption from './SplitMoreOption'

function SkuModall({ isOpen, onClose, heading }) {
  const arr = useSelector(
    (state) => state.PurchaseSlices.splitPostPurcahseDetail
  );
  const arr2 = useSelector(
    (state) => state.PurchaseSlices.splitpurchaseOrderDetails
  );
  const [colaps, setColaps] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [availableQyt, setAvailableQyt] = useState(null);

  const dispatch = useDispatch();

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    { title: "Part", slector: "", customComp: SiplitLot, Wid: 150 },

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
    arr?.length > 1 ? arr2[0]?.QUANTITY - available : arr2[0]?.QUANTITY;
  useEffect(() => {

    // Check if updatedAvailableQuantity is less than 0, if yes, set it to 0
    if (newAvailableQuantity < 0) {
      setAvailableQyt(arr2[0]?.QUANTITY);
    } else {
      setAvailableQyt(newAvailableQuantity);
      dispatch(setAvailableQuantity(newAvailableQuantity));
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

  const colapsfunc = () => {};

  if (!isOpen) {
    return null;
  }
  const getProdectDetailResR = (data) => {
    if(data){
    dispatch(setRefresh(true))
    }
  };
  const onSubmit = () => {
    const lotNumbers = arr?.map(item => item?.LOT_NUMBER);
  
    if (arr2[0]?.QUANTITY == available && availableQyt == 0) {
      if (arr && arr.length > 0 && !arr.some(item => !item.LOT_NUMBER)) {
        sendRequest(
          apiUrlDetails,
          "POST",
          payloadDetails,
          getProdectDetailResR,
          token
        );
        onClose();
      } else {
        alert('Please select or enter valid Lot Numbers.');
      }
    } else if (arr2[0]?.QUANTITY != available) {
      alert('Available Quantity must be equal to order Quantity');
    } else {
      alert('Please check the conditions and fill out all required fields.');
    }
  };
  
  
 

  const selectedRow = (index, data) => {
  
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

  const onCloseMode = () => {
    const newArr = [];
    dispatch(setNewsplit(newArr));
    dispatch(setSplitPostPurchaseDetail(newArr))
    dispatch(setSplitPostPurchaseDetais(newArr))
    onClose();
  };

  

  return (
    <div className="fixed inset-0 z-30 bg-gray-50 backdrop-blur-sm backdrop-filter bg-opacity-50 opacity-100 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-[90vw] h-auto  mx-auto my-6 border border-gray-200 rounded-lg">
        <div className="bg-white p-4 rounded-md shadow-lg  ">
          {/* hedder for modal */}
          <div className="flex items-start justify-between border-b-[1px] border-gray-300 ">
            <h3 className="poppins text-customblack text-[24px] leading-[30px]">
              {heading}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <button
                // bg-[#6DB4B3] custom modal apply green
                // bg-[#007f9b] monday green
                className=" bg-customgreen hover:bg-btnHoverGreen  text-sm text-white border p-2 mr-2 border-gray-200 rounded-[4px] "
                onClick={onSubmit}
              >
                Apply
              </button>
              <button
                className="  flex-col text-gray-600 hover:bg-customGray rounded-md "
                onClick={onCloseMode}
              >
                <RxCross1 className="p-2 text-4xl " />
              </button>
            </div>
          </div>
          {/* body of modal */}
          <div className="h-[40vh] overflow-auto">
            <GridTable
              head={head}
              row={arr2}
              setHead={setHead}
              // setSubHead={setSubHead}
              // subHead={subHead}
              // GridTitle="Active"
              MoreOpt={SplitMoreOption}
              onCloseMode={onCloseMode}
              // MoreOption={MoreOption}
              GridColor="green-400"
              GridColaps={false}
              colaps={colaps}
              setColaps={setColaps}
              colapsfunc={colapsfunc}
              addButton={false}
              // GriddFooterAdd={PurchaseGriddAdd}

              selectedRow={selectedRow}
              isChecked={checked}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="flex flex-col gap-2 ml-10 max-w-[170px]">
            <div className="flex items-center justify-between">
              <p className="m-0 font-medium">Order Quantity :</p>
              <span>{arr2[0]?.QUANTITY}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="m-0 font-medium">Available Quantity :</p>
              <span>{availableQyt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkuModall;
