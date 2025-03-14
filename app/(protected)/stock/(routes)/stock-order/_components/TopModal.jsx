"use client";
import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import InputTextEut from "../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import LocationInput from "./LocationInput";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWarehouse } from "../redux/stockSlice";
import { TbTransferIn } from "react-icons/tb";
import CheckBoxTopModal from "./CheckBoxTopModal";

// Dropdown component


const DropdownExample = ({ data }) => {
 const checkedItemsTopModal = useSelector(state=>state.stockSlices.checkedItemsTopModal);
   const dispatch = useDispatch();

  const [selectedWarehouse, setSelectedWarehouse] = useState("");


  const handleDropdownChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };
  useEffect(()=>{
    if(checkedItemsTopModal.length==0){

      setSelectedWarehouse("Select a warehouse")
    }
  },[checkedItemsTopModal])
  useEffect(()=>{
    if(selectedWarehouse&&selectedWarehouse!=="Select a warehouse")
    {
     console.log("warehouse true")
      dispatch(setWarehouse(true));
    }
  else{
    console.log("warehouse false");
    dispatch(setWarehouse(false))
  }
  },[selectedWarehouse])

  return (
    <div className="p-4 w-[40%]">
      <select
        id="warehouses"
        name="warehouses"
        value={selectedWarehouse}
        onChange={handleDropdownChange}
        className="block w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        disabled={checkedItemsTopModal.length>0?false:true}
      >
        <option value="" className="py-2">
          Select a warehouse
        </option>
        {data?.Result.map((item) => (
          <option
            key={item.WAREHOUSE_CODE}
            value={item.WAREHOUSE_CODE}
            className="py-2"
          >
            {`${item.WAREHOUSE_CODE}-${item.DESCRIPTION}`}
          </option>
        ))}
      </select>
    </div>
  );
};

function TopModal({ isOpen, onClose, heading }) {
  const items = useSelector(state=>state.stockSlices.checkedItems);
 const locationValid = useSelector(state=>state.stockSlices.validLocation);
 const warehouseValid = useSelector(state=>state.stockSlices.validWarehouse);
 
  console.log(items);
  // const [data, setData] = useState();
  const demoArr = [
    {name:"zone",type:"input",no:"1"}
  ]
  
  const [head, sethead] = useState([
    // { title: "Aisle", Wid: 120,slector:"",customComp:LocationInput },
    // { title: "Sec", Wid: 120 },
    // { title: "Row", Wid: 120 },
    // { title: "Bin", Wid: 120 },
    { title: "Lot #",slector:"LOT_NUMBER", Wid: 150 },
    { title: "Check Box",slector:"", Wid: 150 ,customComp:CheckBoxTopModal},
    { title: "Expiry",slector:"EXPIRY_DATE_PDF", Wid: 120 },
    { title: "Location",slector:"",filter:"none", Wid: 140,customComp:LocationInput},
    { title: "MTH", Wid: 120 },
    { title: "SKU #", slector: "SKU_MANUFACTURE", Wid: 130 },
    { title: "Name",slector: "DESCRIPTION", Wid: 120 },
    { title: "OH Qty",slector: "QTY_ONHAND", Wid: 120 },
    { title: "Qty Rec'd", slector: "QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector: "QTY_ONHAND1", Wid: 100 },
    { title: "split", Wid: 120 },
    { title: "Asnd", Wid: 120 },
  ]);
  const [data, setData] = useState();
  const [postPurchaseOrderDetailsData, setPurchaseorderDetailsData] =
    useState();

    // apis urls
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetWarehousesList`;
  const apiUrl2 = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostStockOrderDetail`;
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const [error, sendRequest] = useApiFetch();


  const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNjkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiZXhwIjoxNzA5NTc0MTAyLCJpc3MiOiJwcmVjaXNldGVjLmNhIiwiYXVkIjoicHJlY2lzZXRlYy5jYSJ9.98afPFcw_qh1Y-U_jyDGGQ2Rj4GRZduB1rpAP7CwpJk";

  // const accessToken = localStorage.getItem("tokenSession");

  const getAllWherehouse = (data) => {
    setData(data);
    // console.log("this is data in outer tab", data);
    // console.log("this is data in outer tab DESCRIPTION", data?.Result[0].WAREHOUSE_CODE);
  };
  const getAllpostPurchaseOrder = (data) => {
    setPurchaseorderDetailsData(data);
    console.log("this is data in outer tab in PurchaseorderDetailsData", data);
    // console.log("this is data in outer tab DESCRIPTION", data?.Result[0].WAREHOUSE_CODE);
  };
  useEffect(() => {
    const payload = {
      data: {
        SEARCH: "",
        RNUM_FROM: "1",
        RNUM_TO: "100",
        ACTIVE_FLAG: "Y",
      },
      action: "Administration",
      method: "GetWarehousesList",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(apiUrl, "POST", payload, getAllWherehouse, accessToken);
  }, []);

  useEffect(() => {
    const payloadPostDitels = {
      data: [
        {
          INVSTODET_ID: "",
          INVSTO_ID: "120541",
          PAR_ID: "118422",
          DESCRIPTION: "DESCRIPTION of 118718",
          QUANTITY: "1",
          UOM_ID: "78617",
          DELETED_FLAG: "N",
          COST: "100",
          WORORD_ID: "",
          CONVERT_QTY: "10",
          USE_ID: "1",
          INVPARLOT_ID: "",
          INVRECDET_ID: "",
          SHELF: "SHELF",
          RACK: "RACK",
          BIN: "BIN",
          WARSTOLOC_ID: "",
          WAR_ID: "",
          ASSIGNED_COMPLETE_FLAG: "Y",
          USE_ID_ASSIGNED_TO: "1",
          SALEORDRETDET_ID: "",
        },
      ],
      action: "InventoryWeb",
      method: "PostStockOrderDetail",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      apiUrl2,
      "POST",
      payloadPostDitels,
      getAllpostPurchaseOrder,
    
      accessToken
    );
  }, []);

  if (!isOpen) {
    return null;
  }

  console.log(locationValid ,"and ", warehouseValid)

  return (
    <div className="fixed inset-0 z-30 bg-gray-50 backdrop-blur-sm backdrop-filter bg-opacity-50 opacity-100 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-[90vw] h-auto  mx-auto my-6 border border-gray-200 rounded-lg">
        <div className="bg-white p-4 rounded shadow-lg">
          {/* hedder for modal */}
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold">{heading}</h3>
            <div className="flex items-center justify-between">
              <button
              className={`bg-blue-400 text-lg text-white border px-3 py-2 border-gray-200 rounded-lg ${(locationValid&&warehouseValid)?"":"invisible"}`}
                
              >
                <TbTransferIn />
              </button>
              <button
                className="text-white bg-red-600 border border-gray-200 px-3 text-lg py-2 rounded-lg"
                onClick={onClose}
              >
                <IoIosClose />
              </button>
            </div>
          </div>
          {/* body of modal */}
          <div className="h-[40vh]">
            {/* where house selector */}
            <div className="flex items-center justify-between w-[70%] mx-auto">
            <p> From </p>
              <div>
                <InputTextEut
                  label="Warehouse"
                  placeHolder="Unassigned"
                  isDisabled={true}
                />
              </div>
              <p> To </p>
              <DropdownExample data={data} />
            </div>
                {/* table */}
                <div className="overflow-x-scroll">
                <GridTable head={head}  sethead={sethead} row={items} />
                
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopModal;
