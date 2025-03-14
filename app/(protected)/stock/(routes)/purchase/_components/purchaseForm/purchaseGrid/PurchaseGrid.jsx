"use client";

import React, { useState, useEffect, useMemo } from "react";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import ModalOpen from "../../../../../../../../components/misc/pureComponents/GridTable/ModalOpen";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../../../customHook/useKeyPress";
import PurchaseSiplitSubgrid from "./PurchaseSiplitSubgrid";
import PurchaseGridCost from "./PurchaseGridCost";
import CustomLotcell from "./CustomLotcell";
import PurchaseFormModall from "../../purchaseRightDrawer/PurchaseFormModall";
import PurchaseGridSku from "./PurchaseGridSku";
import PurchaseGridOrdQnt from "./PurchaseGridOrdQnt";
import { useSelector, useDispatch } from "react-redux";
import {
  setNewItem,
  onNextFocus,
  setSubGridTotal,
  setSubGridLCostTotal,
} from "../../../redux/Purchase.slice";
import PurchaseGridSkuTwo from "./PurchaseGridSkuTwo";
import PurchaseDell from "./PurchaseDell";
import PurchaseaddSubgrid from "./PurchaseaddSubgrid";

import PurchaseSelectedModal from "../../PurchaseSelectedModal";
import MoreOption from "../../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import PurchaseMore from "./PurchaseMore";
import PurchaseGridLCost from "./PurchaseGridLCost";

import Draggable from "react-draggable";
import PurchaseFGridTotal from "../../PurchaseMainGrid/PurchaseFGridTotal";
import TotalComp from "./TotalComp";
import GridCount from "./GridCount";
import MinMax from "./MinMax";
import DiscGrid from "./DiscGrid";
import NetCostGrid from "./NetCostGrid";
import SubPurchaseGrid from "./SubPurchaseGrid";
import SubPurchaseUomF from "./SubPurchaseUomF";
import SubGridLCostF from "./SubGridLCostF";
import SubGridNetCF from "./SubGridNetCF";
import SubGridDisAv from "./SubGridDisAv";
import SubGridCostT from "./SubGridCostT";
import SubGridOhQ from "./SubGridOhQ";
import SubGridOQT from "./SubGridOQT";
import PurchaseGridUom from "./PurchaseGridUom";
import PurchaseGridCase from "./PurchaseGridCase";
import SubParchaseExpireGrid from "./SubParchaseExpireGrid";
import PurchaseExpireGrid from "./PurchaseExpireGrid";

const PurchaseGrid = () => {
  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [zero, setZero] = useState(false);
  let [isOpen, setIsOpen] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [hActive, setHActive] = useState({});

  let [subTl, SetSubTl] = useState(0);
  const dispatch = useDispatch();

  const rowDataa = useSelector((state) => state.PurchaseSlices.subGridState);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const ActiveAddItems = useSelector(
    (state) => state.PurchaseSlices.ActiveAddItems
  );

  const searchQuery = useSelector((state) => state.PurchaseSlices.searchQuery);

  useEffect(() => {
    let totalCost = 0;
    if (rowDataa) {
      rowDataa.forEach((data) => {
        const Tl = data?.QUANTITY * data?.COST;
        totalCost += Tl;
      });
    }

    dispatch(setSubGridTotal(totalCost));
  }, [rowDataa, dispatch]);

 

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Ln#",
      slector: "",
      Wid: 30,
      customComp: GridCount,

      b: true,
    },
    {
      title: "Sku",
      slector: "PART_NUMBER",
      Wid: 170,
      customComp: PurchaseGridSku,

      b: true,
    },
    {
      title: "Description",
      slector: "PART_DESCRIPTION",
      Wid: 200,
    },
    { title: "Lot #", slector: "", customComp: CustomLotcell, Wid: 140 },
    // { title: "BARCODE", slector: "BARCODE_NUMBER", Wid: 150 },
    // { title: "Product", slector: "PAR_ID", Wid: 150 },

    { title: "Vendor Part", slector: "PAR_ID", Wid: 130 },
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

    // { title: "Batch", slector: "Batch", Wid: 100 },
    // {
    //   title: "Expiry",
    //   slector: "EXPIRY_DATE",
    //   Wid: 100,
    //   customComp: PurchaseExpireGrid,
    // },
    { title: "Min/Max", slector: "", Wid: 100, customComp: MinMax },
    {
      title: "Cost",
      slector: "COST",
      Wid: 100,
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
      title: "Uom",
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
      customComp: PurchaseGridCase,
      TComp: SubPurchaseGrid,
    },

    // { title: "Conv", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 },

    
    // {
    //   title: "Dell",
    //   slector: "",
    //   Wid: 120,
    //   customComp: PurchaseDell,
    // },
  ]);

  const [headI, setHeadI] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Ln",
      slector: "",
      Wid: 30,
      customComp: GridCount,

      b: true,
    },
    {
      title: "SKU",
      slector: "PART_NUMBER",
      Wid: 200,
      customComp: PurchaseGridSku,
      b: true,
    },
    { title: "Description", slector: "PART_DESCRIPTION", Wid: 150 },
    { title: "Lot", slector: "", customComp: CustomLotcell, Wid: 120 },
    { title: "Vendor Part", slector: "PAR_ID", Wid: 130 },
    // { title: "Part", slector: "PAR_ID", customComp: CustomLotcell, Wid: 100 },
    {
      title: "Ord.Qty",
      slector: "QUANTITY",
      Wid: 80,
      customComp: PurchaseGridOrdQnt,
      tottal: true,
      TComp: SubGridOQT,
    },
    {
      title: "Oh.Qty",
      slector: "QTY_ONHAND",
      Wid: 80,
      tottal: true,
      TComp: SubGridOhQ,
    },
    { title: "Avl Qty", slector: "QTY_ONHAND", Wid: 80 },
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
      title: "Uom",
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
      customComp: PurchaseGridCase,
      TComp: SubPurchaseGrid,
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

  // const [row, setRow] = useState([])

  const colapsfunc = () => {};

  useEffect(() => {
    const hasZeroCount = rowDataa?.some(
      (item) => parseInt(item.QUANTITY) === 0
    );
    // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

    // setLotZero(hasZeroLot)
    setZero(hasZeroCount);
  }, [rowDataa]);
  const selectedRow = (index, data) => {};

  

  const closeModallSlected = () => {};

  const onKeyPress = (event) => {
    if (event.key != "f" && FormStatus == "Initiated") {
      const num = +event.key - 1;

      dispatch(onNextFocus({ index: num, field: "OrdQ" }));
    } else if (event.key != "f" && FormStatus == "Issued to Vendor") {
      const num = +event.key - 1;

      dispatch(onNextFocus({ index: num, field: "lot" }));
    } else {
      alert("slect index");
    }
  };
  useKeyPress(["1", "2", "3", "4", "5", "6", "7", "8", "9", "f"], onKeyPress);

  const setEdite = (e, i, title, selector) => {
    if (e.key === "Enter" && e.target.value !== "hidden") {
      const updatedHead = [...head]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], title: e.target.value }; // Update the specific item's title
      updatedHead[i] = { ...updatedHead[i], def: true };
      setHead(updatedHead); // Update the local state
      let hData = {
        index: i,
        hData: e.target.value,
        cat: true,
      };
      dispatch(setHeadReduxT(hData));
      setHActive({}); // Assuming this sets the active state
    } else if (e.key === "Enter" && e.target.value === "hidden") {
      const updatedHead = [...head]; // Create a copy of the array
      updatedHead[i] = { ...updatedHead[i], hidden: true }; // Update the specific item's hidden property
      setHead(updatedHead); // Update the local state
      setHActive({}); // Assuming this sets the active state
      dispatch(setHeadRedux(updatedHead)); // Dispatch action to update Redux state
    }
  };
  
  const filteredResults = useMemo(() => {
    if (!searchQuery) return rowDataa;
    return rowDataa.filter(item => 
      item.PART_NUMBER && item.PART_NUMBER.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, rowDataa]);

  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const filteredItems = filteredResults.filter(item => item.READY_FOR_RECEIVING_FLAG === 'N');
    setFilteredData(filteredItems);
  }, [filteredResults]);

  useEffect(() => {
    // console.log(filteredData, 'file ready for receiving');
  }, [filteredData]);

  const allFieldsFilledDetail = filteredResults.every((item) => {
    return item.READY_FOR_RECEIVING_FLAG === 'Y'
  });
  useEffect(() => {
    let LCst = 0;
    let NetCT = 0;
    let TDis = 0;
    let CostT = 0;
    let OhQnt = 0;
    let OqT = 0;
    let CaseV = 0;
    let Len = allFieldsFilledDetail ? filteredResults.length :filteredData.length;

    if (filteredData) {
      filteredData.forEach((data) => {
        LCst += data?.LAST_COST || 0;
        CostT += data?.COST || 0;
        NetCT += data?.NET_COST || 0;
        TDis += data?.DISCOUNT || 0;
        OhQnt += data?.QTY_ONHAND || 0;
        OqT += data?.QUANTITY || 0;
        CaseV += data?.QUANTITY / data?.CONVERSION_INTO_STOCKING_UOM;
      });
    }
    else if (allFieldsFilledDetail) {
      filteredResults.forEach((data) => {
        LCst += data?.LAST_COST || 0;
        CostT += data?.COST || 0;
        NetCT += data?.NET_COST || 0;
        TDis += data?.DISCOUNT || 0;
        OhQnt += data?.QTY_ONHAND || 0;
        OqT += data?.QUANTITY || 0;
        CaseV += data?.QUANTITY / data?.CONVERSION_INTO_STOCKING_UOM;
      });
    }
    const AvDis = TDis / (Len || 1);

    const dataCost = {
      LCost: LCst,
      NetCT: NetCT,
      AvDis: AvDis,
      CostT: CostT,
      OhQnt: OhQnt,
      OqT: OqT,
      CaseV: CaseV,
    };
    dispatch(setSubGridLCostTotal(dataCost));
  }, [filteredResults, filteredData, dispatch]);


  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false ) {
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
    console.log('row one 1', rowI)
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData 
    );
  };


  useEffect(() => {
    if (checkedItems.length > 0 && FormStatus == "Initiated" ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
 
  }, [checkedItems]);

  return (
    <div className="">
      <GridTable
        head={FormStatus == "Initiated" ? headI : head}
        row={allFieldsFilledDetail ? filteredResults :filteredData}
        setHead={setHead}
        GridTitle="Items"
        GridColor="#4ade80"
        GridColaps={false}
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfunc}
        // addButton={FormStatus == "Initiated" ? true : false}
        // GriddFooterAdd={FormStatus == "Initiated" && PurchaseaddSubgrid}
        addButton={true}
        GriddFooterAdd={PurchaseaddSubgrid}
        selectedRow={selectedRow}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        MoreOpt={PurchaseMore}
        setEdite={setEdite}
        setHActive={setHActive}
        hActive={hActive}

      />

      <PurchaseSelectedModal
        isOpen={isOpen}
        checkedItems={checkedItems.length}
        closeModal={closeModallSlected}
      />
      
    </div>
  );
};

export default PurchaseGrid;
