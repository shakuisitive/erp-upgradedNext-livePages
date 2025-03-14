"use client";

import React, { useState, useEffect, useMemo } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import ModalOpen from "../../../../../../../components/misc/pureComponents/GridTable/ModalOpen";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../customHook/useKeyPress";
import PurchaseSiplitSubgrid from "../purchaseForm/purchaseGrid/PurchaseSiplitSubgrid";
import PurchaseGridCost from "../purchaseForm/purchaseGrid/PurchaseGridCost";
import CustomLotcell from "../purchaseForm/purchaseGrid/CustomLotcell";
import PurchaseFormModall from "../purchaseRightDrawer/PurchaseFormModall";
import PurchaseGridSku from "../purchaseForm/purchaseGrid/PurchaseGridSku";
import PurchaseGridOrdQnt from "../purchaseForm/purchaseGrid/PurchaseGridOrdQnt";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewItem,
  onNextFocus,
  setSubGridTotal,
  setSubGridLCostTotal,
} from "../../redux/Purchase.slice";
import PurchaseGridSkuTwo from "../purchaseForm/purchaseGrid/PurchaseGridSkuTwo";
import PurchaseDell from "../purchaseForm/purchaseGrid/PurchaseDell";
import PurchaseaddSubgrid from "../purchaseForm/purchaseGrid/PurchaseaddSubgrid";

import MoreOption from "../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import PurchaseSelectedModal from "../PurchaseSelectedModal";
import PurchaseMoreOption from "../purchaseForm/purchaseGrid/PurchaseMoreOption";
import PurchaseGridLCost from "../purchaseForm/purchaseGrid/PurchaseGridLCost";
import PurchaseFGridTotal from "../PurchaseMainGrid/PurchaseFGridTotal";
import TotalComp from "../purchaseForm/purchaseGrid/TotalComp";
import GridCount from "../purchaseForm/purchaseGrid/GridCount";
import SubGridOQT from "../purchaseForm/purchaseGrid/SubGridOQT";
import SubGridOhQ from "../purchaseForm/purchaseGrid/SubGridOhQ";
import SubGridCostT from "../purchaseForm/purchaseGrid/SubGridCostT";
import PurchaseGridUom from "../purchaseForm/purchaseGrid/PurchaseGridUom";
import SubPurchaseGrid from "../purchaseForm/purchaseGrid/SubPurchaseGrid";
import MinMax from "../purchaseForm/purchaseGrid/MinMax";
import DiscGrid from "../purchaseForm/purchaseGrid/DiscGrid";
import SubGridDisAv from "../purchaseForm/purchaseGrid/SubGridDisAv";
import NetCostGrid from "../purchaseForm/purchaseGrid/NetCostGrid";
import SubGridNetCF from "../purchaseForm/purchaseGrid/SubGridNetCF";
import SubGridLCostF from "../purchaseForm/purchaseGrid/SubGridLCostF";
import SubPurchaseUomF from "../purchaseForm/purchaseGrid/SubPurchaseUomF";
import PurchaseGridCase from "../purchaseForm/purchaseGrid/PurchaseGridCase";
import SubParchaseExpireGrid from "../purchaseForm/purchaseGrid/SubParchaseExpireGrid";
import PurchaseExpireGrid from "../purchaseForm/purchaseGrid/PurchaseExpireGrid";

const PurchaseGrid = () => {
  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [zero, setZero] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const rowDataa = useSelector((state) => state.PurchaseSlices.subGridState);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const ActiveAddItems = useSelector(
    (state) => state.PurchaseSlices.ActiveAddItems
  );

  const searchQuery = useSelector((state) => state.PurchaseSlices.searchQuery);


  useEffect(() => {
    // Calculate the total cost based on QUANTITY and COST of each item in rowDataa
    let totalCost = 0;
    if (rowDataa) {
      rowDataa.forEach(data => {
        const Tl = data?.QUANTITY * data?.COST;
        totalCost += Tl;
      });
    }
    // Dispatch the total cost using setSubGridTotal action
    dispatch(setSubGridTotal(totalCost));
  }, [rowDataa, dispatch]);

  useEffect(() => {
    // Calculate various totals based on the values in rowDataa
    let LCst = 0;
    let NetCT = 0;
    let TDis = 0;
    let CostT = 0;
    let OhQnt = 0;
    let OqT = 0;
    let CaseV = 0;
    let Len = rowDataa.length;

    if (rowDataa) {
      rowDataa.forEach(data => {
        LCst += data?.LAST_COST || 0;
        CostT += data?.COST || 0;
        NetCT += data?.NET_COST || 0;
        TDis += data?.DISCOUNT || 0;
        OhQnt += data?.QTY_ONHAND || 0;
        OqT += data?.QUANTITY || 0;
        CaseV += data?.QUANTITY / data?.CONVERSION_INTO_STOCKING_UOM;
      });
    }
    // Calculate average discount
    const AvDis = TDis / (Len || 1);

    // Dispatch the calculated totals using setSubGridLCostTotal action
    const dataCost = {
      LCost: LCst,
      NetCT: NetCT,
      AvDis: AvDis,
      CostT: CostT,
      OhQnt: OhQnt,
      OqT: OqT,
      CaseV:CaseV
    };
    dispatch(setSubGridLCostTotal(dataCost));
  }, [rowDataa, dispatch]);
  

  const [headI, setHeadI] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Ln#",
      slector: "",
      Wid: 30,
      customComp: GridCount,

      b: true,
    },
    {
      title: "SKU",
      slector: "PART_NUMBER",
      Wid: 120,
      customComp: PurchaseGridSku,
      b: true,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      Wid: 150,
    },
    // { title: "BARCODE", slector: "BARCODE_NUMBER", Wid: 120 },
    // { title: "Product", slector: "PAR_ID",  Wid: 150 },
 
    { title: "Vendor Part", slector: "PAR_ID", Wid: 130 },
    // { title: "Part", slector: "PAR_ID", customComp: CustomLotcell, Wid: 100 },
    {
      title: "Ord.Qyt",
      slector: "QUANTITY",
      Wid: 80,
      customComp: PurchaseGridOrdQnt,
      tottal: true,
      TComp: SubGridOQT,
    },
    {
      title: "Oh.Qyt",
      slector: "QTY_ONHAND",
      Wid: 80,
      tottal: true,
      TComp: SubGridOhQ,
    },
    { title: "Avl Qyt", slector: "QTY_ONHAND", Wid: 80 },
    { title: "Min/Max", slector: "", Wid: 80, customComp: MinMax },

    // { title: "Lot id", slector: "", customComp: CustomLotcell, Wid: 150 },
    {
      title: "Cost",
      slector: "COST",
      Wid: 80,
      customComp: PurchaseGridCost,
      tottal: true,
      TComp: SubGridCostT,
    },
    {
      title: "Disc%",
      slector: "DISCOUNT",
      Wid: 80,
      customComp: DiscGrid,
      tottal: true,
      TComp: SubGridDisAv,
    },
    {
      title: "Net Cost",
      slector: "NET",
      Wid: 80,
      customComp: NetCostGrid,
      tottal: true,
      TComp: SubGridNetCF,
    },
    {
      title: "L.Cost",
      slector: "LAST_COST",
      Wid: 80,
      customComp: PurchaseGridLCost,
      tottal: true,
      TComp: SubGridLCostF,
    },
    {
      title: "Value",
      slector: "",
      Wid: 100,
      customComp: PurchaseFGridTotal,
      tottal: true,
      TComp: TotalComp,
    },
    {
      title: "UoM",
      slector: "CONVERSION_INTO_STOCKING_UOM",
      Wid: 40,
      tottal: true,
      customComp: PurchaseGridUom,
      TComp: SubPurchaseUomF,
    },
    {
      title: "Case",
      slector: "CaseQty",
      Wid: 80,
      tottal: true,
      TComp: SubPurchaseGrid,
      customComp: PurchaseGridCase,
    },

    // { title: "UOM", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 , customComp:PurchaseGridUom },
    // { title: "Conv", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 },
    // { title: "Total", slector: "", Wid: 100 , customComp:PurchaseFGridTotal },

    // { title: "C.Qty", slector: "CaseQty", Wid: 120 },
    // {
    //   title: "Split",
    //   slector: "Split",
    //   Wid: 120,
    //   customComp: PurchaseSiplitSubgrid,
    // },

    // { title: "Batch", slector: "Batch", Wid: 120 },
    // {
    //   title: "Expiry",
    //   slector: "EXPIRY_DATE",
    //   Wid: 170,
    //   date: true,
    //   TComp: SubParchaseExpireGrid,
    //   customComp: PurchaseExpireGrid,
    // },
    // {
    //   title: "Dell",
    //   slector: "",
    //   Wid: 50,
    //   customComp: PurchaseDell,
    // },
  ]);

  // const [headI, setHeadI] = useState([
  //   { title: "", slector: "", Wid: 0 },
  //   {
  //     title: "Ln",
  //     slector: "",
  //     Wid: 50,
  //     customComp: GridCount,

  //     b:true
  //   },
  //   {
  //     title: "SubItem",
  //     slector: "PART_NUMBER",
  //     Wid: 200,
  //     customComp: PurchaseGridSku,
  //     b:true
  //   },
  //   { title: "Part", slector: "PAR_ID", customComp: CustomLotcell, Wid: 100 },
  //   {
  //     title: "OdrQty",
  //     slector: "QUANTITY",
  //     Wid: 100,
  //     customComp: PurchaseGridOrdQnt,
  //   },
  //   // { title: "Lot id", slector: "", customComp: CustomLotcell, Wid: 150 },
  //   { title: "Cost", slector: "COST", Wid: 100, customComp: PurchaseGridCost },
  //   {
  //     title: "L.Cost",
  //     slector: "LAST_COST",
  //     Wid: 100,
  //     customComp: PurchaseGridLCost,
  //   },
  //   { title: "OhQty", slector: "QTY_ONHAND", Wid: 100 },

  //   { title: "UOM", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 },
  //   { title: "Conv", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 },
  //   { title: "Total", slector: "", Wid: 100 , customComp:PurchaseFGridTotal ,   tottal:true  , TComp:TotalComp  },

  //   { title: "C.Qty", slector: "CaseQty", Wid: 120 },
  //   // {
  //   //   title: "Split",
  //   //   slector: "Split",
  //   //   Wid: 120,
  //   //   customComp: PurchaseSiplitSubgrid,
  //   // },

  //   // { title: "Batch", slector: "Batch", Wid: 120 },
  //   // { title: "Expiry", slector: "EXPIRY_DATE", Wid: 170, date: true },
  //   // {
  //   //   title: "Dell",
  //   //   slector: "",
  //   //   Wid: 50,
  //   //   customComp: PurchaseDell,
  //   // },
  // ]);

  // const [row, setRow] = useState([])


  const colapsfunc = () => {};

  useEffect(() => {
    const hasZeroCount = rowDataa.some((item) => parseInt(item.QUANTITY) === 0);
    // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

    // setLotZero(hasZeroLot)
    setZero(hasZeroCount);

  }, [rowDataa]);

  const selectedRow = (index, data) => {

  };

  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = rowDataa.map((SData, i) => {
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

  useEffect(() => {
    if (checkedItems.length > 0) {

      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {};

  const onKeyPress = (event) => {
    if (event.key != "f" && FormStatus == "Initiated") {
      const num = +event.key - 1;

      dispatch(onNextFocus({ index: num, field: "OrdQ" }));
    } else if (event.key != "f" && FormStatus == "Issued to Vendor") {
      const num = +event.key - 1;

      dispatch(onNextFocus({ index: num, field: "lot" }));
    }
  };

  useKeyPress(["1", "2", "3", "4", "5", "6", "7", "8", "9", "f"], onKeyPress);


  const filteredResults = useMemo(() => {
    if (!searchQuery) return rowDataa;
    return rowDataa.filter(item => 
      (item.PART_NUMBER && item.PART_NUMBER.toLowerCase().includes(searchQuery.toLowerCase())) 
      // (item.PAR_ID && item.PAR_ID.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, rowDataa]);

  return (
    <div>
      <GridTable
        head={headI}
        row={filteredResults}
        setHead={setHeadI}
        GridTitle="Items"
        GridColor="#4ade80"
        GridColaps={false}
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfunc}
        addButton={true}
        GriddFooterAdd={PurchaseaddSubgrid}
        selectedRow={selectedRow}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        MoreOpt={PurchaseMoreOption}
      />
      <PurchaseSelectedModal
        isOpen={isOpen}
        checkedItems={checkedItems.length}
        closeModal={closeModallSlected}
      />
      {/* <div>
        <p 
        className={` mt-2 ${zero == true ? "text-gray-500" : "text-blue-500"} ${FormStatus == 'Initiated' ? 'block' : 'hidden'} `}
        onClick={()=>{
          if(zero == false){
            dispatch(setNewItem())

          }
        }}
        >
            Add item
            </p>
       </div> */}
    </div>
  );
};

export default PurchaseGrid;
