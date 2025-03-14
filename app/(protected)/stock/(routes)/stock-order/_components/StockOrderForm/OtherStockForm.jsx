"use client";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import React, { useState, useEffect } from "react";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import MoreOption from "../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import ReceivingSelectedModal from "../../../receiving/_components/ReceivingSelectedModal";
import StockOrderLeftForm from "./Header/StockOrderLeftForm";
import StockOrderRightForm from "./Header/StockOrderRightForm";
import StockOrderFormHeader from "./StockOrderFormHeader";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  setStockOrderFormDataId,
  stockOrderForm,
} from "../../redux/stockSlice";
import StockGridSku from "../StockOrderSubGrid/stockGridSku/StockGridSku";
import FormGridAction from "./FormGridAction";
import FormStockGridSku from "./FormStockGridSku";

function OtherStockForm({warehouseId}) {
  const [isHeader, setIsHeader] = useState(true);

  const dispatch = useDispatch();

  // dtat for fetching inner form
  let subData = useSelector((state) => state.stockSlices.subData);
  // console.log("This is my id", id?.INVSTO_ID);
  const [data, setData] = useState();
  const [item, setItem] = useState(data);
  const [errorM, setErrorM] = useState();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [isOpenS, setIsOpenS] = useState(false);

  let [error, sendRequest] = useApiFetch();

  useEffect(() => {
    if (checkedItems?.length > 0) {
      //   console.log('kuch data log hoa hai');
      setIsOpenS(true);
    } else {
      setIsOpenS(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {};

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "SUK",
      slector: "SKU_MANUFACTURE",
      Wid: 220,
      customComp: FormStockGridSku,
    },
    { title: "Name", slector: "DESCRIPTION", Wid: 120 },
    { title: "Location", slector: "LOCATION", Wid: 250 },
    // { title: "check", slector:"", Wid : 20, customComp:CheckBox},
    { title: "Lot", slector: "LOT_NUMBER", Wid: 120 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120, date: true },
    {
      title: "Action",
      slector: "WAR_ID",
      Wid: 120,
      customComp: FormGridAction,
    },
    // { title: "MTH", Wid: 120 },
    { title: "OH Qty", slector: "QTY_ONHAND", Wid: 120 },
    { title: "Qty Recd", slector: "QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector: "QUANTITY", Wid: 120 },
  ]);

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };

  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
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
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  console.log(warehouseId, "warehouseId")
  const filterData = subData[0].product.filter((item) => item.WAR_ID == warehouseId )
  return (
    <div className=" h-[98%] mt-[4px] gap-2 flex rounded-lg">
      <div
        className="flex flex-col border relative lgdesktop:w-[100%]  desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white"
      >
        <StockOrderFormHeader />
        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-auto">
          <div className="w-full  bg-white grow  p-2 ">
            <GridTable
              row={filterData}
              // row={rowData}
              head={head}
              setHead={setHead}
              GridTitle="Items"
              GridColor="green-400"
              colaps={colaps}
              setColaps={setColaps}
              colapsfunc={colapsfuncComp}
              addButton={false}
              selectedRow={selectedRow}
              MoreOpt={MoreOption}
              MoreOption={MoreOption}
              isChecked={checked}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherStockForm;
