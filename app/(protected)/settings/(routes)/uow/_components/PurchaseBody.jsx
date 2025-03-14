"use client";
import React, { useState, useEffect, useRef } from "react";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import ModalOpen from "../../../../../../components/misc/pureComponents/GridTable/ModalOpen";
import PhoneNumber from "../../../../../../components/misc/pureComponents/GridTable/PhoneNumber";
// import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../customHook/useKeyPress";
import PurchaseGridCost from "./purchaseForm/purchaseGrid/PurchaseGridCost";
import PurchaseMGridStatus from "./PurchaseMainGrid/PurchaseMGridStatus";
import PurchaseFormModall from "./purchaseRightDrawer/PurchaseFormModall";

import { useSelector, useDispatch } from "react-redux";
import {
  purchaseSku,
  setVender,
  setRefresh,
  colseNewModall,
  closeModallForm,
  setHeadRedux,
  setHeadReduxT,
  setMainPurchaseList,
  setPageCount,
  getSearchVal,
  setWarehouse,
  setCSvData,
  setSubGridData,
  setUpdatePurchaseDetail,
} from "../redux/Purchase.slice";
import StatusCell from "../../../../../../components/misc/pureComponents/GridTable/GridStatusCell";
import OpenDrawer from "./PurchaseMainGrid/PurchaseOpenDrawer";
import PurchaseGridAdd from "./PurchaseMainGrid/PurchaseGridAdd";
import CustomScrollBar from "../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import PurchaseMGridValue from "./PurchaseMainGrid/PurchaseMGridValue";
import { GoHome } from "react-icons/go";
import NewPurchaseForm from "./NewPurchaseForm/NewPurchaseForm";
// import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { setcloseModall } from "../redux/Purchase.slice";
// import PurchaseForm from "./PurchaseFormTemp";
import PurchaseFileTab from "./purchaseRightDrawer/PurchaseFileTab";
import PurchaseForm from "./purchaseForm/PurchaseForm";
import PurchaseConversationTab from "./purchaseRightDrawer/PurchaseConversationTab";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import PurchaseSelectedModal from "./PurchaseSelectedModal";
import TooltipStatus from "./PurchaseTooltipTemp";

import PurchaseMGridOwner from "./PurchaseMainGrid/PurchaseMGridOwner";
import PurchaseMGridAction from "./PurchaseMainGrid/PurchaseMGridAction";
import PurchaseGridPagination from "./PurchaseMainGrid/PurchaseGridPagination";
// import FiltrationMGrid from "./organizationTopNav/FiltrationMGrid";
import FiltrationMGrid from "./UowTopNav/FiltrationMGrid"
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import moment from "moment";
import PurchaseGridSku from "./purchaseForm/purchaseGrid/PurchaseGridSku";
import PurchaseGridOrdQnt from "./purchaseForm/purchaseGrid/PurchaseGridOrdQnt";
import PurchaseGridLCost from "./purchaseForm/purchaseGrid/PurchaseGridLCost";
import PurchaseGridUom from "./purchaseForm/purchaseGrid/PurchaseGridUom";
import CustomLotcell from "./purchaseForm/purchaseGrid/CustomLotcell";
import MinMax from "./purchaseForm/purchaseGrid/MinMax";
import DiscGrid from "./purchaseForm/purchaseGrid/DiscGrid";
import NetCostGrid from "./purchaseForm/purchaseGrid/NetCostGrid";
import PurchaseFGridTotal from "./PurchaseMainGrid/PurchaseFGridTotal";
import GridCount from "./purchaseForm/purchaseGrid/GridCount";
import SubPurchaseGrid from "./purchaseForm/purchaseGrid/SubPurchaseGrid";
import SubPurchaseUomF from "./purchaseForm/purchaseGrid/SubPurchaseUomF";
import TotalComp from "./purchaseForm/purchaseGrid/TotalComp";
import SubGridLCostF from "./purchaseForm/purchaseGrid/SubGridLCostF";
import SubGridNetCF from "./purchaseForm/purchaseGrid/SubGridNetCF";
import SubGridDisAv from "./purchaseForm/purchaseGrid/SubGridDisAv";
import SubGridCostT from "./purchaseForm/purchaseGrid/SubGridCostT";
import SubGridOhQ from "./purchaseForm/purchaseGrid/SubGridOhQ";
import SubGridOQT from "./purchaseForm/purchaseGrid/SubGridOQT";
import PurchaseSGridCost from './PurchaseSubGrid/PurchaseSGridCost'
import PurchaseOrderQ from './PurchaseSubGrid/PurchaseOrderQ';
import PurchaseSGridLotNum from './PurchaseSubGrid/PurchaseSGridLotNum';
import PurchaseSGridDes from './PurchaseSubGrid/PurchaseSGridDes';
// import OrganizationModalDetails from "./OrganizationModalDetails";
import UowModalDetails from "./UowModalDetails"
import UowMainGrid from "../UowMainGrid";

const PurchaseBody = () => {
  let [error, sendRequest] = useApiFetch();
  const [data, setData] = useState();
  const [dataA, setDataA] = useState();
  const [comAiniRow, setComAiniRow] = useState();
  const [dataCom, setDataCom] = useState();
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenC, setIsModalOpenC] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const tableHRef = useRef(null);
  let [isOpen, setIsOpen] = useState(true);
  const [hActive, setHActive] = useState({});
  let [accessToken, setAccessToken] = useState();
  let [dataFilter, setDataFiter] = useState([]);
  let [subData, setSubData] = useState([]);
  const purchaseHead = useSelector(
    (state) => state.PurchaseSlices.PurchaseHead
  );
  const GridFilterState = useSelector(
    (state) => state.PurchaseSlices.GridFilterState
  );
  const GridFilterStateA = useSelector(
    (state) => state.PurchaseSlices.GridFilterStateA
  );
  const FTTo = useSelector((state) => state.PurchaseSlices.FTTo);
  const searchedData = useSelector(
    (state) => state.PurchaseSlices.searchedData
  );
  const serchState = useSelector((state) => state.PurchaseSlices.serchState);
  // // console.log("check search", serchState)
  let [head, setHead] = useState([
    {
      title: "Name",
      slector: "NAME",
      Wid: 265,
      // filter: "textFilter",
      Modal: PurchaseFormModall,
      // Drawer: OpenDrawer,
      More: MoreOption,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Order Date",
      Wid: 150,
      slector: "PPROVED_DATE",
      // date: true,
      hidden: false,
      def: false,
    },
    {
      title: "Required Date",
      Wid: 150,
      slector: "PPROVED_DATE",
      date: true,
      hidden: false,
      def: false,
    },
    {
      title: "Supplier",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Supplier Address",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Value",
      slector: "TOTAL_COST",
      Wid: 100,
      filter: "NumberFilter",
      tottal: "Cost",
      customComp: PurchaseMGridValue,
      hidden: false,
      def: false,
    },
    {
      title: "Action",
      Wid: 150,
      slector: "PO_CURRENT_STATUS",
      Status: PurchaseMGridAction,
      mWid: 200,
      hidden: false,
      def: false,
    },
    {
      title: "Warehouse",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Ship to Address",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      Wid: 150,
      hidden: false,
      def: false,
    },
    // { title: "Comp Date", Wid: 150, slector: "COMPLETED_DATE", date: true },

    // { title: "Comments", slector: "REFERENCE_NUMBER", Wid: 170 },
  ]);

  useEffect(() => {
    if (purchaseHead != head) {
      setHead(purchaseHead);
    }
  }, [purchaseHead]);

  let [headTwo, setHeadTwo] = useState([
    {
      title: "ID",
      slector: "UOW_ID",
      Wid: 365,
      filter: "textFilter",
      Modal: PurchaseFormModall,
      Drawer: OpenDrawer,
      More: MoreOption,
      hidden: false,
      def: false,
    },
    {
      title: "Name",
      slector: "CODE",
      Wid: 100,
      customComp: PurchaseMGridOwner,
      hidden: false,
      def: false,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      Wid: 150,
     Status: PurchaseMGridStatus,
      // filter: "checkFilter",
      hidden: false,
      def: false,
    },
    // {
    //   title: "ID",
    //   Wid: 300,
    //   slector: "PERSON_EMAIL",
    //   // date: true,
    //   hidden: false,
    //   def: false,
    // },
    {
      title: "Status",
      Wid: 50,
      mWid: 60,
      slector: "PO_STATUS",
      // date: true,
      hidden: false,
      def: false,
    },
    // {
    //   title: "Action",
    //   Wid: 50,
    //   slector: "PO_CURRENT_STATUS",
    //   Status: PurchaseMGridAction,
    //   // mWid: 200,
    //   hidden: false,
    //   def: false,
    // },
    // { title: "Comp Date", Wid: 150, slector: "COMPLETED_DATE", date: true },

    // { title: "Comments", slector: "REFERENCE_NUMBER", Wid: 170 },
  ]);

  const [subHead, setSubHead] = useState([
    // { title: "", slector: "", Wid: 0 },

    {
      title: "LN#",
      slector: "",
      Wid: 120,
      customComp: GridCount,

      b: true,
    },
    {
      title: "SKU",
      slector: "PART_NUMBER",
      Wid: 170,
      customComp: PurchaseGridSku,

      b: true,
    },
    { title: "BARCODE", slector: "BARCODE_NUMBER", Wid: 150 },
    // { title: "Product", slector: "PAR_ID", Wid: 150 },
    {
      title: "DESCRIPTION",
      slector: "PART_DESCRIPTION",
      customComp: PurchaseSGridDes,
      Wid: 200,
    },
    { title: "SubPart", slector: "PAR_ID", Wid: 100 },
    {
      title: "OR.QTY",
      slector: "QUANTITY",
      Wid: 100,
      customComp: PurchaseOrderQ,
      tottal: true,
      TComp: SubGridOQT,
    },
    {
      title: "OH.QTY",
      slector: "QTY_ONHAND",
      Wid: 100,
      tottal: true,
      TComp: SubGridOhQ,
    },
    { title: "AVL QTY", slector: "QTY_ONHAND", Wid: 150 },
    { 
      title: "BATCH", 
      slector: "", customComp: 
      PurchaseSGridLotNum, 
      Wid: 140, 
      def: false,
      edit: false, 
    },
    { title: "Min/Max", slector: "", Wid: 100, customComp: MinMax },
    {
      title: "COST",
      slector: "COST",
      Wid: 150,

      // customComp: PurchaseGridCost,
      customComp: PurchaseSGridCost,
      tottal: true,
      TComp: SubGridCostT,
    },

    {
      title: "DISC%",
      slector: "DISCOUNT",
      Wid: 150,
      customComp: DiscGrid,
      tottal: true,
      TComp: SubGridDisAv,
    },
    {
      title: "NET COST",
      slector: "NET",
      Wid: 150,
      customComp: NetCostGrid,
      tottal: true,
      TComp: SubGridNetCF,
    },
    {
      title: "L.COST",
      slector: "LAST_COST",
      Wid: 150,
      customComp: PurchaseGridLCost,
      tottal: true,
      TComp: SubGridLCostF,
    },
    {
      title: "VALUE",
      slector: "",
      Wid: 150,
      customComp: PurchaseFGridTotal,
      tottal: true,
      TComp: TotalComp,
    },
    {
      title: "UOM",
      slector: "CONVERSION_INTO_STOCKING_UOM",
      Wid: 100,
      tottal: true,

      customComp: PurchaseGridUom,
      TComp: SubPurchaseUomF,
    },
    {
      title: "CASE",
      slector: "CaseQty",
      Wid: 100,
      tottal: true,
      TComp: SubPurchaseGrid,
    },

    // { title: "Conv", slector: "CONVERSION_INTO_STOCKING_UOM", Wid: 100 },
  ]);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrderList`;
  const apiUrlSku = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}ItemMaster/GetPartsList`;
  const apiUrlVender = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetSupplierCode`;
  const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetUowList`;

  const Refresh = useSelector((state) => state.PurchaseSlices.Refresh);
  const OpenNewModall = useSelector(
    (state) => state.PurchaseSlices.OpenNewModall
  );
  const openModallForm = useSelector(
    (state) => state.PurchaseSlices.openModallForm
  );

  const RSubData = useSelector((state) => state.PurchaseSlices.subData);
  // const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
  // console.log("check subDAta Grid ", RSubData);

  useEffect(() => {
    if (OpenNewModall == true) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [OpenNewModall]);
  useEffect(() => {
    if (openModallForm == true) {
      setIsModalOpenC(true);
    } else {
      setIsModalOpenC(false);
    }

    // console.log("check modall in purchase", openModallForm, isModalOpenC);
  }, [openModallForm]);

  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  // // console.log('comp Row' , compRow);

  // let accessToken = ''
  useEffect(() => {
    const accessTokenN =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(accessTokenN);
  }, []);

  const dispatch = useDispatch();

  const VenderPayload = {
    data: {
      SEARCH: "",
    },
    action: "InventoryWeb",
    method: "GetSupplierCode",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };

  const [payloadCsv, setPayloadCsv] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "+5:00",
      RNUM_FROM: "1",
      RNUM_TO: "2500",
      PO_NUMBER: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      PO_STATUS: "",
      PO_DATE_FROM: "",
      PO_DATE_TO: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      FINZ_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrderList",
    username: "admin",
    type: "rpc",
    tid: "144",
  });
  const [payload, setPayload] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "+5:00",
      RNUM_FROM: "1",
      RNUM_TO: "25",
      PO_NUMBER: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      PO_STATUS: "",
      PO_DATE_FROM: "",
      PO_DATE_TO: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      FINZ_FLAG: "",
      GRID_STATUS: "Y",
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrderList",
    username: "admin",
    type: "rpc",
    tid: "144",
  });
  const [payloadA, setPayloadA] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "+5:00",
      RNUM_FROM: "1",
      RNUM_TO: "5",
      PO_NUMBER: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      PO_STATUS: "",
      PO_DATE_FROM: "",
      PO_DATE_TO: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      FINZ_FLAG: "",
      // GRID_STATUS     : "Y"
      GRID_STATUS: "N",
    },
    action: "InventoryWeb",
    method: "GetPurchaseOrderList",
    username: "admin",
    type: "rpc",
    tid: "144",
  });

  const payloadSku = {
    data: {
      SEARCH: "",
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: "Y",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      BOLTON_FLAG: "",
      SPECIAL_FLAG: "",
      NON_STOCK_FLAG: "",
    },
    action: "ItemMaster",
    method: "GetPartsList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

 

  function getAllTask(data) {
    // setData(data);
    setCompRow(data.Result);
    dispatch(setMainPurchaseList(data.Result));
    // console.log("data Row", data);
    setErrorMessage(error);
  }

  function getAllTaskA(data) {
    // // console.log('refresh chulling');
    // if(data.CODE == "SUCCESS"){
    //   setCompRowA([]);

    // }
    // setDataA(data);
    setCompRowA(data.Result);
    // dispatch(setMainPurchaseList(data.Result))
    // // console.log('data' , data);
    setErrorMessage(error);
  }

  function getAllTaskCsv(data) {
    dispatch(setCSvData(data.Result));
    // dispatch(setMainPurchaseList(data.Result))
    // // console.log('data' , data);
    setErrorMessage(error);
  }

  function getAllTaskF(data) {
    //  setDataFiter(data)
    setCompRow(data.Result);
    // console.log("purchase body payload", data);
    setErrorMessage(error);
  }

  const getAllTaskSku = (data) => {
    // console.log("get all sku", data.Result);
    dispatch(purchaseSku(data.Result.Results));
  };

  const getAllTaskVender = (data) => {
    // // console.log('get all vender' , data.Result);
    dispatch(setVender(data.Result));
  };

  const getAllTaskWareHouse = (data) => {
    dispatch(setWarehouse(data));
  };

  useEffect(() => {
    // // console.log('refresh chulling refresh 1');

    dataA?.Result?.forEach((comp) => {
      if (
        comp?.PO_CURRENT_STATUS !== "Completed" &&
        comp?.PO_CURRENT_STATUS !== "Ready for Receiving" &&
        comp?.PO_CURRENT_STATUS !== "Partially Received" &&
        comp?.PO_CURRENT_STATUS !== "Partially Ready for Receiving" &&
        compRowA.length == 0
      ) {
        setCompRowA((prev) => [...prev, comp]);
      }
    });
  }, [dataA]);

  useEffect(() => {
    if (accessToken) {
      // sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
      // sendRequest(apiUrl, "POST", payloadA, getAllTaskA, accessToken);
      sendRequest(apiPartList, "POST", PayloadPartList, handlePartList, accessToken);

      // sendRequest(apiUrl, "POST", payloadCsv, getAllTaskCsv, accessToken);
      // sendRequest(apiUrlSku, "POST", payloadSku, getAllTaskSku, accessToken);
      // sendRequest(
      //   apiUrlVender,
      //   "POST",
      //   VenderPayload,
      //   getAllTaskVender,
      //   accessToken
      // );
      // sendRequest(
      //   apiUrlWareHouse,
      //   "POST",
      //   payloadWareHouse,
      //   getAllTaskWareHouse,
      //   accessToken
      // );
    }
  }, [accessToken]);
  const PayloadPartList = {
    data: {
        SEARCH     	: "",
        ORDER     	: "",
        RNUM_FROM     : "1",
        RNUM_TO       : "100",
        ACTIVE_FLAG   : "Y"
        },
       action: "InventoryWeb",
        method: "GetUowList",
        username: "admin", 
          type: "rpc",  
          tid: "144"
}
function handlePartList(data) {
  setData(data?.Result);
  setErrorM(error)
}
  // useEffect(() => {
  //   if (Refresh == true) {
  //     const RefreshP = {
  //       data: {
  //         SEARCH: "",
  //         VOID_FLAG: "",
  //         ORDER: "",
  //         LOC_ID: "",
  //         OFFSET: "+5:00",
  //         RNUM_FROM: "1",
  //         RNUM_TO: "5",
  //         PO_NUMBER: "",
  //         PART_DETAILS: "",
  //         LOT_NUMBER: "",
  //         PO_STATUS: "",
  //         PO_DATE_FROM: "",
  //         PO_DATE_TO: "",
  //         LOT_EXPIRY_DATE: "",
  //         VEN_ID: "",
  //         FINZ_FLAG: "",
  //         GRID_STATUS: "Y",
  //       },
  //       action: "InventoryWeb",
  //       method: "GetPurchaseOrderList",
  //       username: "admin",
  //       type: "rpc",
  //       tid: "144",
  //     };

  //     const RefreshPA = {
  //       data: {
  //         SEARCH: "",
  //         VOID_FLAG: "",
  //         ORDER: "",
  //         LOC_ID: "",
  //         OFFSET: "+5:00",
  //         RNUM_FROM: "1",
  //         RNUM_TO: "5",
  //         PO_NUMBER: "",
  //         PART_DETAILS: "",
  //         LOT_NUMBER: "",
  //         PO_STATUS: "",
  //         PO_DATE_FROM: "",
  //         PO_DATE_TO: "",
  //         LOT_EXPIRY_DATE: "",
  //         VEN_ID: "",
  //         FINZ_FLAG: "",
  //         GRID_STATUS: "N",
  //       },
  //       action: "InventoryWeb",
  //       method: "GetPurchaseOrderList",
  //       username: "admin",
  //       type: "rpc",
  //       tid: "144",
  //     };
  //     setSubData([]);
  //     setPayload(RefreshP);
  //     setPayloadA(RefreshPA);
  //     dispatch(setRefresh(false));
  //     dispatch(getSearchVal(""));
  //   }
  // }, [Refresh]);

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTaskF, accessToken);
  }, [payload]);
  useEffect(() => {
    sendRequest(apiUrl, "POST", payloadA, getAllTaskA, accessToken);
  }, [payloadA]);

  useEffect(() => {
    const newData = {
      ...payload.data,
      PO_STATUS: GridFilterState.St ? GridFilterState.St : "",
      PO_NUMBER: GridFilterState.Po ? GridFilterState.Po : "",
      VEN_ID: GridFilterState.Sp ? GridFilterState.Sp : "",
      PART_DETAILS: GridFilterState.sku ? GridFilterState.sku : "",
    };
    // Create a new payload object with the updated data
    const newPayload = { ...payload, data: newData };
    // Update the state with the new payload object
    setPayload(newPayload);
  }, [GridFilterState]);

  const setDataRowChange = (e) => {
    // // console.log('check payload change e' , e.target.value);
    const newData = { ...payload.data, RNUM_TO: e.target.value };
    // Create a new payload object with the updated data
    const newPayload = { ...payload, data: newData };
    dispatch(setPageCount(e.target.value));
    // Update the state with the new payload object
    // setPayload(newPayload)
  };

  useEffect(() => {
    if (FTTo.from) {
      const newData = {
        ...payload.data,
        RNUM_TO: FTTo.To,
        RNUM_FROM: FTTo.from,
      };
      // Create a new payload object with the updated data
      const newPayload = { ...payload, data: newData };
      setPayload(newPayload);
    }
  }, [FTTo]);

  useEffect(() => {
    // if(serchState){
    // console.log("check search");
    const newData = { ...payload.data, SEARCH: serchState };
    const newDataA = { ...payloadA.data, SEARCH: serchState };
    // Create a new payload object with the updated data
    const newPayload = { ...payload, data: newData };
    const newPayloadA = { ...payloadA, data: newDataA };
    setPayload(newPayload);
    setPayloadA(newPayloadA);
    // }
  }, [serchState]);

  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      setColaps(false);
      setColapsComp(true);
    } else {
      setColaps(!colaps);
    }
  };

  const colapsfuncComp = () => {
    if (!colaps && colapsComp) {
      setColaps(true);
      setColapsComp(false);
    } else {
      setColapsComp(!colapsComp);
    }
  };

  useEffect(() => {
    const container = activeGridRef.current;

    const handleOverflowChange = (entries) => {
      setScrollChange((pre) => pre + 1);
    };
    const resizeObserver = new ResizeObserver(handleOverflowChange);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(colseNewModall());
  };

  const onKeyPress = (event) => {
    if (event.key == "c") {
      event.preventDefault();
      setIsModalOpen(false);
      dispatch(colseNewModall());
    }
  };

  useKeyPress(["c"], onKeyPress);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(openForm(index));
  };
  const handleCloseModal = () => {
    setIsModalOpenC(false);
    dispatch(closeModallForm());
  };

  //custom modall api hit

  const dataC = useSelector((state) => state.PurchaseSlices.postPurchaseOrder);
  const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
  const dataDetails = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );

  const poNumber = PurchaseDetails?.PO_NUMBER;
  const poDate = moment(PurchaseDetails?.PO_DATE).format("DD / MM / YYYY");

  // // console.log('Ponumber checking' , poNumber);
  // // console.log('Ponumber checking' , poDate);

  const apiUrlC = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrder`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostPurchaseOrderDetails`;
  const apiUrlWareHouse = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetWarehouse`;

  const payloadWareHouse = {
    data: {
      SEARCH: "",
    },
    action: "InventoryWeb",
    method: "GetWarehouse",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadC = {
    data: dataC[0],
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetails = {
    data: dataDetails,
    action: "InventoryWeb",
    method: "PostPurchaseOrder",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  // const token = localStorage.getItem("tokenSession");
  let token = "";
  useEffect(() => {
    token =
      typeof window !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
  }, []);

  const getAllTaskC = (data) => {
    dispatch(closeModallForm());
    setIsModalOpenC(false);
    // // console.log('why this running , body');
    // dispatch(setLotList(data.Result))
  };

  const getProdectDetailRes = () => {};

  const handleApply = () => {
    // console.log("Apply is chulling");
    sendRequest(apiUrlC, "POST", payloadC, getAllTaskC, token);
    sendRequest(
      apiUrlDetails,
      "POST",
      payloadDetails,
      getProdectDetailRes,
      token
    );
  };

  const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <NewPurchaseForm />,
    },
  ];

  const tabsC = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <UowModalDetails/>,
    },
    // {
    //   label: "Conversation",
    //   content: <PurchaseConversationTab />,
    // },
    // {
    //   label: "Files",
    //   content: <PurchaseFileTab />,
    // },
    // {
    //   label: "Activity",
    //   content: <div>Content for Activity</div>,
    // },
  ];
  useEffect(() => {
    if (closeModall == true) {
      setIsModalOpenC(false);
      dispatch(setcloseModall(false));
    }
  }, [closeModall]);

  const selectedRow = (index, data) => {
    // // console.log('check slected row Data and index' , index , data);
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

  useEffect(() => {
    if (checkedItems.length > 0) {
      // // console.log('kuch data log hoa hai');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {};

  useEffect(() => {
    dispatch(setHeadRedux(headTwo));
  }, []);

  const setEdite = (e, i, title, selector) => {
    if (e.key === "Enter" && e.target.value !== "hidden") {
      // // console.log('check key press header', i, title, selector);
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

  useEffect(() => {
    dispatch(setSubGridData(subData));
  }, [subData]);

  const subGridOpen = (getData) => {
    const getAllTaskGet = (data) => {
      const getDataDet = {
        statusId: getData.PO_CURRENT_STATUS,
        id: getData.PURORD_ID,
        product: data.Result.INV_PURCHASE_ORDER_DETAILS_WV,
        form: data.Result.INV_PURCHASE_ORDERS_WV,
      };
      setSubData((prev) => [...prev, getDataDet]);
      dispatch(setUpdatePurchaseDetail(getDataDet.product));
    };

    const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
    const payloadGet = {
      data: {
        PURORD_ID: getData.PURORD_ID,
      },
      action: "InventoryWeb",
      method: "GetPurchaseOrder",
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    let finde = subData.some((data) => data.id == getData.PURORD_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAllTaskGet, accessToken);
    }
  };
  return (
    <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
      <CustomScrollBar
        change={scrollChange}
        refsArray={[activeGridRef, completedGridRef]}
      >

        <div
          ref={activeGridRef} className={` overflow-x-hidden   mt-1 h-fit mr- `}>
          <GridTable
            head={head}
            row={data}
            setHead={setHead}
            // setSubHead={setSubHead}
            // subRow={subData}
            // subHead={subHead}
            GridTitle="Active"
            GridColor="green-400"
            // GridColaps={false}
            // colaps={colaps}
            setColaps={setColaps}
            // colapsfunc={colapsfunc}
            // addButton={true}
            // subAddButton={true}
            // GriddFooterAdd={PurchaseGridAdd}
            selectedRow={selectedRow}
            MoreOption={MoreOption}
            isChecked={checked}
            handleCheckboxChange={handleCheckboxChange}
            MoreOpt={MoreOption}
            setEdite={setEdite}
            setHActive={setHActive}
            hActive={hActive}
            // tableHRef={tableHRef}
            
            // subActiveKey={"PO_COUNT"}

            // subInActiveVal={0}
            // subGridOpen={subGridOpen}
            // idKey={"PURORD_ID"}
          />
        </div>
  
      </CustomScrollBar>

      <div>
        <div className="flex items-center border w-[250px] py-2 px-3 ml-16 rounded-md cursor-pointer ">
          <IoIosAdd className="text-customblack text-[30px]" />
          <select onChange={setDataRowChange} className="w-full outline-none">
            <option value="25">Show 25</option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
            <option value="500">Show 500</option>
          </select>
          <IoIosArrowDown className="text-customblack text-[25px]" />
        </div>
      </div>

      <NewCustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tabs={tabs}
        heading="Purchase Order"
      
      />
      <CustomModal
        tabs={tabsC}
        isOpen={isModalOpenC}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Purcdadahase Order"
        number={poNumber}
        date={poDate}
      />
      <PurchaseSelectedModal
        isOpen={isOpen}
        checkedItems={checkedItems?.length}
        closeModal={closeModallSlected}
      />
      {/* <UowMainGrid/> */}
    </div>
  );
};

export default PurchaseBody;
