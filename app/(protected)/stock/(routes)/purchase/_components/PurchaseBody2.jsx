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
import PurchaseAddSubGrid from "./PurchaseSubGrid/PurchaseAddSubGrid";

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
  setSelectedVeNid,
  setVenid,
  setVenderData,
  clearVenderListFormData,
  selectedOrderId,
  orderProductUpdate,
  subGridStatusUpdate,
  openNModall,
  gridFilter,
  loaderToggle,
  setLotList,
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
import FiltrationMGrid from "./purchaseTopNav/FiltrationMGrid";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { TiMediaPlayReverseOutline } from "react-icons/ti";
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
import PurchaseSGridCost from "./PurchaseSubGrid/PurchaseSGridCost";
import PurchaseOrderQ from "./PurchaseSubGrid/PurchaseOrderQ";
import PurchaseSGridLotNum from "./PurchaseSubGrid/PurchaseSGridLotNum";
import PurchaseSGridDes from "./PurchaseSubGrid/PurchaseSGridDes";
import PurchaseSGridDisc from "./PurchaseSubGrid/PurchaseSGridDisc";
import PurchaseSGridNetCost from "./PurchaseSubGrid/PurchaseSGridNetCost";
import PurchaseSGridLCost from "./PurchaseSubGrid/PurchaseSGridLCost";
import PurchaseSGridSku from "./PurchaseSubGrid/purchaseSGridSku/PurchaseSGridSku";
import PurchaseAuditLog from "./purchaseForm/PurchaseAuditLog";
import PurchaseVendorDetail from "./PurchaseVendorDetail";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import PurchaseFilter from "./globalComp/PurchaseFilter";
import Loading from "../../../../../../components/misc/loader/loading";
import OrderDetails from "./../../../../../../components/misc/bindComponent/OrderDetails";
import PurchaseLeftForm from "./purchaseForm/header/PurchaseLeftForm";
import PurchaseRightForm from "./purchaseForm/header/PurchaseRightForm";
import PurchaseMore from "./purchaseForm/purchaseGrid/PurchaseMore";
import OrderDetailsForm from "./../../../../../../components/misc/bindComponent/OrderDetailsForm";
import PurchaseGridCase from "./purchaseForm/purchaseGrid/PurchaseGridCase";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";

const PurchaseBody2 = () => {
  let [error, sendRequest] = useApiFetch();
  const [data, setData] = useState();
  const [dataA, setDataA] = useState();
  const [comAiniRow, setComAiniRow] = useState();
  const [dataCom, setDataCom] = useState();
  const [colaps, setColaps] = useState(false);
  const [subColaps, setSubColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenC, setIsModalOpenC] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  //const [refresh, setRefresh] = useState(false);
  //const [loading, setLoading] = useState(false);
  let [gridArrP, setGridArrP] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrCheck, setGridArrCheck] = useState();
  let [subGridArr, setSubGridArr] = useState();
  const [checkOpenSubGrid, setCheckOpenSubGrid] = useState();
  const [scrollSubChange, setScrollSubChange] = useState(1);
  const containerRef = useRef(null);
  const itemGridRef = useRef(null);
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const tableHRef = useRef(null);
  let [isOpen, setIsOpen] = useState(true);
  const [hActive, setHActive] = useState({});
  let [accessToken, setAccessToken] = useState();
  let [dataFilter, setDataFiter] = useState([]);
  let [subData, setSubData] = useState([]);
  const [tempSubState, setTempSubState] = useState([]);
  const [checkedSubItems, setCheckedSubItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resetSearch, setResetSearch] = useState(false);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [SubcheckedAll, setSubCheckedAll] = useState(false);
  const purchaseHead = useSelector(
    (state) => state.PurchaseSlices.PurchaseHead
  );
  const CsvData = useSelector((state) => state.PurchaseSlices.CsvData);
  const GridFilterState = useSelector(
    (state) => state.PurchaseSlices.GridFilterState
  );
  const rowDataa = useSelector((state) => state.PurchaseSlices.subGridState);
  const GridFilterStateA = useSelector(
    (state) => state.PurchaseSlices.GridFilterStateA
  );
  const FTTo = useSelector((state) => state.PurchaseSlices.FTTo);
  const searchedData = useSelector(
    (state) => state.PurchaseSlices.searchedData
  );
  const loading = useSelector((state) => state.PurchaseSlices.mainLoader);
  const refresh = useSelector((state) => state.PurchaseSlices.Refresh);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const updateVoid = useSelector(
    (state) => state.PurchaseSlices.postPurchaseDetail
  );

  const setOnRefresh = (value) => {
    dispatch(setRefresh(value));
  };
  const serchState = useSelector((state) => state.PurchaseSlices.serchState);
  let [head, setHead] = useState([
    {
      title: "Order number",
      slector: "PO_NUMBER",
      Wid: 265,
      filter: "textFilter",
      Modal: PurchaseFormModall,
      Drawer: OpenDrawer,
      More: MoreOption,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: PurchaseMGridOwner,
      hidden: false,
      def: false,
      edit: false,
      sticky: true,
    },
    {
      title: "Status",
      slector: "PO_CURRENT_STATUS",
      Wid: 150,
      Status: PurchaseMGridStatus,
      filter: "checkFilter",
      checkFilterOptions: [
        "Completed",
        "Issued to Vendor",
        "Initiated",
        "Void",
        "Ready for Receiving",
      ],
      hidden: false,
      def: false,
    },
    {
      title: "Order Date",
      Wid: 150,
      slector: "PPROVED_DATE",
      date: true,
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
      title: "Vendor",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Vendor Address",
      slector: "ADDRESS_1",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
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
      slector: "WAREHOUSE",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Ship to Address",
      slector: "WAREHOUSE_ADDRESS",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
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
      title: "Order number",
      slector: "PO_NUMBER",
      Wid: 265,
      filter: "textFilter",
      Modal: PurchaseFormModall,
      Drawer: OpenDrawer,
      More: MoreOption,
      hidden: false,
      def: false,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: PurchaseMGridOwner,
      hidden: false,
      def: false,
    },
    {
      title: "Status",
      slector: "PO_CURRENT_STATUS",
      Wid: 150,
      Status: PurchaseMGridStatus,
      filter: "checkFilter",
      checkFilterOptions: [
        "Completed",
        "Issued to Vendor",
        "Initiated",
        "Void",
        "Ready for Receiving",
      ],
      hidden: false,
      def: false,
    },
    {
      title: "Order Date",
      Wid: 150,
      slector: "PPROVED_DATE",
      date: true,
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
      title: "Vendor",
      slector: "SUPPLIER",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Vendor Address",
      slector: "ADDRESS_1",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
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
      slector: "WAREHOUSE",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
      Wid: 150,
      hidden: false,
      def: false,
    },
    {
      title: "Ship to Address",
      slector: "WAREHOUSE_ADDRESS",
      filter: "checkFilter",
      checkFilterOptions: [
        "Nutranex",
        "Opening Entry",
        "Maria Supplier",
        "PAKISTANI SUPPLIERS",
      ],
      customComp: PurchaseVendorDetail,
      Wid: 150,
      hidden: false,
      def: false,
    },
    // { title: "Comp Date", Wid: 150, slector: "COMPLETED_DATE", date: true },

    // { title: "Comments", slector: "REFERENCE_NUMBER", Wid: 170 },
  ]);

  const [subHead, setSubHead] = useState([
    // { title: "", slector: "", Wid: 0 },

    {
      title: "LN#",
      slector: "",
      Wid: 50,
      customComp: GridCount,

      b: true,
    },
    {
      title: "SKU",
      slector: "PART_NUMBER",
      Wid: 170,
      customComp: PurchaseSGridSku,

      b: true,
    },
    {
      title: "Description",
      slector: "PART_DESCRIPTION",
      customComp: PurchaseSGridDes,
      Wid: 200,
    },
    {
      title: "LOT#",
      slector: "",
      customComp: PurchaseSGridLotNum,
      Wid: 140,
      def: false,
      edit: false,
    },
    { title: "Vender Part", slector: "PAR_ID", Wid: 100 },
    {
      title: "ODR.QTY",
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
    { title: "AVL QTY", slector: "QTY_ONHAND", Wid: 100 },
    //{ title: "EXPIRY", slector: "EXPIRY_DATE", Wid: 130, date: true },
    // { title: "BARCODE", slector: "BARCODE_NUMBER", Wid: 150 },
    // { title: "Product", slector: "PAR_ID", Wid: 150 },
    { title: "Min/Max", slector: "", Wid: 100, customComp: MinMax },
    {
      title: "Cost",
      slector: "COST",
      Wid: 120,

      // customComp: PurchaseGridCost,
      customComp: PurchaseSGridCost,
      tottal: true,
      TComp: SubGridCostT,
    },

    {
      title: "Disc%",
      slector: "DISCOUNT",
      Wid: 100,
      customComp: PurchaseSGridDisc,
      tottal: true,
      TComp: SubGridDisAv,
    },
    {
      title: "Net Cost",
      slector: "NET_COST",
      Wid: 150,
      customComp: PurchaseSGridNetCost,
      tottal: true,
      TComp: SubGridNetCF,
    },
    // {
    //   title: "L.Cost",
    //   slector: "LAST_COST",
    //   Wid: 120,
    //   customComp: PurchaseSGridLCost,
    //   tottal: true,
    //   TComp: SubGridLCostF,
    // },
    {
      title: "Value",
      slector: "",
      Wid: 150,
      customComp: PurchaseFGridTotal,
      tottal: true,
      TComp: TotalComp,
    },
    {
      title: "UoM",
      slector: "CONVERSION_INTO_STOCKING_UOM",
      Wid: 100,
      tottal: true,

      customComp: PurchaseGridUom,
      TComp: SubPurchaseUomF,
    },
    {
      title: "Case",
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

  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderPDFReport`;
  const apiUrlPor = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostReversePO`;

  const OpenNewModall = useSelector(
    (state) => state.PurchaseSlices.OpenNewModall
  );
  const openModallForm = useSelector(
    (state) => state.PurchaseSlices.openModallForm
  );

  const RSubData = useSelector((state) => state.PurchaseSlices.subData);
  // const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);

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
  }, [openModallForm]);

  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);

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
    //setLoading(false);
    dispatch(loaderToggle(false));
    // setData(data);
    setCompRow(data.Result.Results);
    dispatch(setMainPurchaseList(data.Result.Results));
    setErrorMessage(error);
  }

  function getAllTaskA(data) {
    setCompRowA(data.Result.Results);
    //setLoading(false);
    dispatch(loaderToggle(false));
    setErrorMessage(error);
  }

  function getAllTaskCsv(data) {
    dispatch(setCSvData(data.Result.Results));
    // dispatch(setMainPurchaseList(data.Result))
    //setLoading(false);
    dispatch(loaderToggle(false));
    setErrorMessage(error);
  }

  function getAllTaskF(data) {
    //  setDataFiter(data)
    setCompRow(data.Result.Results);
    setErrorMessage(error);
  }

  const getAllTaskSku = (data) => {
    //setLoading(false);
    dispatch(loaderToggle(false));
    dispatch(purchaseSku(data.Result.Results));
  };

  const getAllTaskVender = (data) => {
    //setLoading(false);
    dispatch(loaderToggle(false));
    dispatch(setVender(data.Result));
  };

  const getAllTaskWareHouse = (data) => {
    //setLoading(false);
    dispatch(loaderToggle(false));
    dispatch(setWarehouse(data));
  };

  useEffect(() => {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(colseNewModall());
    dispatch(clearVenderListFormData());
    dispatch(setVenid(null));
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

  const checkUpdatelist = useSelector(
    (state) => state.PurchaseSlices.VenderList
  );
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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getAllTaskC = (data) => {
    setOnRefresh(false);
    dispatch(closeModallForm());
    setIsModalOpenC(false);
    // dispatch(setLotList(data.Result))
  };

  const getProdectDetailRes = () => {
    setOnRefresh(false);
  };

  const handleApply = () => {
    setOnRefresh(true);
    sendRequest(apiUrlC, "POST", payloadC, getAllTaskC, token);
    sendRequest(
      apiUrlDetails,
      "POST",
      payloadDetails,
      getProdectDetailRes,
      token
    );
  };

  const convertToPdf = (bytes) => {
    const binaryString = atob(bytes);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const payloadPdf = {
    data: {
      PURORD_ID: PurchaseDetails?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: PurchaseDetails?.PREPARED_BY || "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadPO = {
    data: {
      PURORD_ID: PurchaseDetails?.PURORD_ID,
      REVERSE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "PostReversePO",
    type: "rpc",
    tid: "144",
    username: PurchaseDetails?.PREPARED_BY || "admin",
  };

  useEffect(() => {
    // Filter the rowData array to include only items with readyForReceving: 'Y'
    const filteredItems = rowDataa.filter(
      (item) => item.READY_FOR_RECEIVING_FLAG === "Y"
    );
    setFilteredData(filteredItems);
  }, [rowDataa]);

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
  ]);

  useEffect(() => {
    const gridArr = {
      colmnList: {
        // colmn : head ,
        colmn: headI,
        setColmn: setSubHead,
      },
      //  subColumnList : {
      //     subComln : subHead ,
      //     setSubColmn : setSubHead ,

      //   } ,
      title: {
        GridTitle: "Items",
        GridColor: "#3F51B5",
      },
      data: {
        Griddata:
          FormStatus == "Partially Received" ||
          FormStatus == "Partially Ready for Receiving" ||
          FormStatus == "Ready for Receiving"
            ? filteredData
            : [],

        // subGridData : subData ,
      },
      colapsList: {
        GridColaps: false,
        colaps: subColaps,
        setColaps: setSubColaps,
        colapsfunc: subColapsfunc,
      },
      footerComp: {
        // addButton : true ,
        addFooterComp: true,
        // addFooterSubComp : false ,
        // subAddButton : false ,
        GriddFooterAdd: PurchaseAddSubGrid,
        // SubGriddFooterAdd : PurchaseAddSubGrid ,
      },
      checkBox: {
        selectedRow: selectedSubRow,
        checked: subChecked,
        handleCheckboxChange: handleSubCheckboxChange,
      },
      subGridActive: {
        setHActive: setHActive,
        hActive: hActive,
        // subActiveKey : "PO_COUNT" ,
        // subInActiveVal : 0 ,
        // subGridOpen :subGridOpen , selectedRow
        // idKey : "PURORD_ID" ,
      },

      MoreOption: PurchaseMore,

      // MoreOpt : MoreOption ,
      setEdite: setSubEdite,

      ref: itemGridRef,
      // fixHight : false
    };

    // setGridArrP(gridArr)
    setSubGridArr(gridArr);
  }, [rowDataa, subColaps, subHead, hActive]);

  const getPdfData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: "Purchase Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const newFuncForm = () => {
    sendRequest(apiUrlPdf, "POST", payloadPdf, getPdfData, token);
  };

  const getReversePo = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(closeModallForm());
    }
  };

  const postReversePO = () => {
    sendRequest(apiUrlPor, "POST", payloadPO, getReversePo, token);
  };

  const optionForm = [
    {
      label: "Restock",
      icon: TbReportAnalytics,
      onClick: newFuncForm,
    },
  ];
  const handleSearch = (e) => {};

  const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <NewPurchaseForm />,
    },
  ];

  const filterTabsForm = {
    actionBtn: {
      option: optionForm,
      label: "Reverse",
      icon: TiMediaPlayReverseOutline,
      onClick: postReversePO,
    },
    search: {
      handleSearch: handleSearch,
      resetSearch: resetSearch,
      setResetSearch: setResetSearch,
    },
  };

  const tabsC = [
    {
      icon: <GoHome />,
      label: "Details",
      content: (
        <PurchaseForm
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      ),
    },
    {
      label: "Conversation",
      content: <PurchaseConversationTab />,
    },
    {
      label: "Files",
      content: <PurchaseFileTab />,
    },
    {
      label: "Activity",
      content: <PurchaseAuditLog />,
    },
    {
      label: "Receving",
      content: (
        <OrderDetails
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
          gridArr={subGridArr}
          refArray={[itemGridRef]}
          //  scroll={scrollSubChange}
          defColmn={subHead}
          setDefColmn={setSubHead}
          //  hideShow={false}
          filterTabs={filterTabsForm}
          OrderNumber={poNumber}
          OrderDate={poDate}
        />
      ),
    },
  ];

  useEffect(() => {
    if (closeModall == true) {
      setIsModalOpenC(false);
      dispatch(setcloseModall(false));
    }
  }, [closeModall]);

  const selectedRow = (index, data) => {};

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
    if (checkedItems?.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {
    setIsOpen(false);
    setCheckedSubItems([]);
  };

  useEffect(() => {
    dispatch(setHeadRedux(headTwo));
  }, []);

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

  useEffect(() => {
    setSubData(RSubData);
  }, [RSubData]);

  useEffect(() => {
    if (compRowA.length > 0) {
      // const container = activeGridRef?.current;?
      const container = containerRef?.current;
      const handleOverflowChange = (entries) => {
        setScrollChange((pre) => pre + 1);
      };
      const resizeObserver = new ResizeObserver(handleOverflowChange);
      resizeObserver?.observe(container);

      return () => {
        resizeObserver?.disconnect();
      };
    }
  }, [compRowA]);

  useEffect(() => {
    if (accessToken) {
      dispatch(loaderToggle(true));
      sendRequest(apiUrl, "POST", payloadCsv, getAllTaskCsv, accessToken);
      sendRequest(apiUrlSku, "POST", payloadSku, getAllTaskSku, accessToken);
      sendRequest(
        apiUrlVender,
        "POST",
        VenderPayload,
        getAllTaskVender,
        accessToken
      );
      sendRequest(
        apiUrlWareHouse,
        "POST",
        payloadWareHouse,
        getAllTaskWareHouse,
        accessToken
      );
    }

    let apiData = [
      {
        api: apiUrl,
        payload: payloadA,
        func: getAllTaskA,
        token: accessToken,
        title: "Active",
      },
      {
        api: apiUrl,
        payload: payload,
        func: getAllTask,
        token: accessToken,
        pagination: true,
        title: "Completed",
      },
    ];

    setAPIProp(apiData);
  }, [accessToken]);

  const postEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostEditScreenSessions`;
  const postKillScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions`;
  const getEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;
  const apiUrlLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  const [sessionId, setSessionId] = useState("");
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const killSessionPayload = {
    action: "Inventory",
    data: { EDISCRSES_ID: sessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const postSessionRes = (data) => {
    setSessionId(data.Result);
  };

  const killSessionRes = () => {
    if (data.CODE == "SUCCESS") {
      setSessionId("");
    }
  };

  useEffect(() => {
    if (refresh == true) {
      sendRequest(
        postKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    }
  }, [refresh]);

  const subGridOpen = (getData, perform) => {
    if (sessionId != "") {
      // setOrderNumber(getData?.PURORD_ID)
      // setSpoNumber(getData?.PO_NUMBER)
      sendRequest(
        postKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    }
    const getOpenSession = {
      action: "Inventory",
      data: {
        SOURCE_PK: getData?.PURORD_ID.toString(),
        SOURCE_TABLE: "PURCHASE_ORDER",
        LOGGED_IN_USER_ID: "2694",
      },
      method: "GetEditScreenSessions",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    const sessionPayload = {
      action: "Inventory",
      data: {
        EDISCRSES_ID: "",
        SOURCE_NO: getData?.PO_NUMBER,
        SOURCE_PK: getData?.PURORD_ID.toString(),
        SOURCE_TABLE: "PURCHASE_ORDER",
        USE_ID: "2694",
      },
      method: "PostEditScreenSessions",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    if (perform == "close") {
      setCheckedSubItems([]);
      setSubCheckedAll(false);
      sendRequest(
        postKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    } else {
      const getSessionRes = (data) => {
        if (data.Result.length === 0) {
          openSubGridWithSessionCheck(getData);
          sendRequest(
            postEditScreenSessions,
            "POST",
            sessionPayload,
            postSessionRes,
            accessToken
          );
        } else {
          setEMessage(
            `Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`
          );
          setIsErrorMessage(true);
        }
      };
      sendRequest(
        getEditScreenSessions,
        "POST",
        getOpenSession,
        getSessionRes,
        accessToken
      );
    }
  };

  const getAllLot = (data) => {
    dispatch(setLotList(data.Result));
  };

  const openSubGridWithSessionCheck = (getData) => {
    const payloadLot = {
      data: {
        PURORD_ID: getData?.PURORD_ID,
      },
      action: "InventoryWeb",
      method: "GetPurchaseLotList",
      type: "rpc",
      tid: "144",
    };
    sendRequest(apiUrlLot, "POST", payloadLot, getAllLot, accessToken);
    setCheckOpenSubGrid(getData?.PURORD_ID);
    dispatch(subGridStatusUpdate(getData?.PO_CURRENT_STATUS));
    const getAllTaskGet = (data) => {
      const getDataDet = {
        statusId: getData?.PO_CURRENT_STATUS,
        id: getData?.PURORD_ID,
        product: data.Result.INV_PURCHASE_ORDER_DETAILS_WV,
        form: data.Result.INV_PURCHASE_ORDERS_WV,
      };
      dispatch(orderProductUpdate(getDataDet));
      //setTempSubState((prev) => [...prev, getDataDet]);
    };

    const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseOrder`;
    const payloadGet = {
      data: {
        PURORD_ID: getData?.PURORD_ID,
      },
      action: "InventoryWeb",
      method: "GetPurchaseOrder",
      type: "rpc",
      tid: "144",
      username: "admin",
    };
    dispatch(selectedOrderId(getData?.PURORD_ID));
    let finde = subData.some((data) => data.id == getData?.PURORD_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAllTaskGet, accessToken);
    }
  };

  const setSubEdite = (e, i) => {};

  const subColapsfunc = () => {};
  const selectedSubRow = (index, data) => {};
  const subGridStatus = useSelector(
    (state) => state.PurchaseSlices.subGridStatus
  );
  const handleSubCheckboxChange = (rowI, rowData) => {
    if (subGridStatus == "Initiated" || subGridStatus == "New") {
      const order = subData?.filter(
        (itemsub) => itemsub.id == checkOpenSubGrid
      );

      if (rowData == "all" && SubcheckedAll == false) {
        setSubCheckedAll(true);
        const arr = order[0]?.product?.map((SData, i) => {
          let obj = {};
          obj = { rowI: i, rowData: SData };

          return obj;
        });

        setCheckedSubItems(arr);
      } else if (rowData == "all" && SubcheckedAll == true) {
        setSubCheckedAll(false);
        setCheckedSubItems([]);
      } else {
        if (isSubChecked(rowI, rowData)) {
          setCheckedSubItems(
            checkedSubItems.filter(
              (item) => item.rowI !== rowI && item.rowData !== rowData
            )
          );
        } else {
          setCheckedSubItems([...checkedSubItems, { rowI, rowData }]);
        }
      }
    }
  };
  const isSubChecked = (rowI, rowData) => {
    return checkedSubItems.some(
      (item) => item.rowData.PURORDDET_ID === rowData.PURORDDET_ID
    );
  };

  useEffect(() => {
    const gridArr = [
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },
        subColumnList: {
          subComln: subHead,
          setSubColmn: setSubHead,
        },
        title: {
          GridTitle: "Active",
          GridColor: "#4ade80",
        },
        data: {
          Griddata: compRowA,

          subGridData: subData,
        },
        colapsList: {
          GridColaps: false,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          // addButton : true ,
          addFooterComp: true,
          addFooterSubComp: true,
          // subAddButton : false ,
          GriddFooterAdd: PurchaseGridAdd,
          SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
          handleSubCheckboxChange: handleSubCheckboxChange,
          isSubChecked: isSubChecked,
        },
        subGridActive: {
          // setHActive : setHActive ,
          // hActive : hActive ,
          subActiveKey: "PO_COUNT",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "PURORD_ID",
        },

        MoreOption: MoreOption,

        // MoreOpt : MoreOption ,
        // setEdite : setEdite ,

        ref: activeGridRef,
        fixHight: false,
      },
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },
        subColumnList: {
          subComln: subHead,
          setSubColmn: setSubHead,
        },
        title: {
          GridTitle: "Completed",
          GridColor: "#f472b6",
        },
        data: {
          Griddata: compRow,

          subGridData: subData,
        },
        colapsList: {
          GridColaps: true,
          colaps: colapsComp,
          setColaps: setColapsComp,
          colapsfunc: colapsfuncComp,
        },
        footerComp: {
          // addButton : true ,
          addFooterComp: true,
          addFooterSubComp: false,
          // subAddButton : false ,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          // handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // hActive : hActive ,
          // setHActive : setHActive ,
          subActiveKey: "PO_COUNT",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "PURORD_ID",
        },
        paginationList: {
          fixHight: "def",
          pagination: true,
        },

        MoreOption: MoreOption,

        // MoreOpt : MoreOption ,
        // setEdite : setEdite ,

        ref: completedGridRef,
        // fixHight : true
      },
    ];
    setGridArrP(gridArr);
  }, [
    compRow,
    compRowA,
    colaps,
    colapsComp,
    subData,
    head,
    hActive,
    checkedSubItems,
  ]);
  const subChecked = (rowI, rowData) => {
    return checkedSubItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    if (checkedSubItems.length > 0) {
      // // console.log('kuch data log hoa hai');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedSubItems]);

  useEffect(() => {
    if (rowDataa.length > 0) {
      // const container = activeGridRef?.current;?
      const container = containerRef?.current;
      const handleOverflowChange = (entries) => {
        setScrollSubChange((pre) => pre + 1);
      };
      const resizeObserver = new ResizeObserver(handleOverflowChange);
      resizeObserver?.observe(container);

      return () => {
        resizeObserver?.disconnect();
      };
    }
  }, [rowDataa]);

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTaskF, accessToken);
  }, [payload]);
  useEffect(() => {
    sendRequest(apiUrl, "POST", payloadA, getAllTaskA, accessToken);
  }, [payloadA, updateVoid]);

  const handleFilter = (e) => {
    // console.log('filter state in filter ====e' , e);
    // dispatch(gridFilter(e))

    const newData = {
      ...payload.data,
      PO_STATUS: e.St ? e.St : "",
      PO_NUMBER: e.Po ? e.Po : "",
      VEN_ID: e.Sp ? e.Sp : "",
      PART_DETAILS: e.sku ? e.sku : "",
      PO_DATE_FROM: e.Df ? e.Df : "",
      PO_DATE_TO: e.Dt ? e.Dt : "",
    };
    const newDataA = {
      ...payloadA.data,
      PO_STATUS: e.St ? e.St : "",
      PO_NUMBER: e.Po ? e.Po : "",
      VEN_ID: e.Sp ? e.Sp : "",
      PART_DETAILS: e.sku ? e.sku : "",
      PO_DATE_FROM: e.Df ? e.Df : "",
      PO_DATE_TO: e.Dt ? e.Dt : "",
    };
    // Create a new payload object with the updated data
    // console.log(e, newData, "event")
    const newPayload = { ...payload, data: newData };
    const newPayloadA = { ...payloadA, data: newDataA };
    dispatch(gridFilter(newPayload));
    // Update the state with the new payload object
    setPayload(newPayload);
    setPayloadA(newPayloadA);
  };

  const newFunc = () => {
    dispatch(openNModall());
  };

  const option = [
    {
      label: "New",
      icon: IoIosAdd,
      onClick: newFunc,
    },
  ];

  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: newFunc,
    },

    filter: {
      handleFilter: handleFilter,
      FilterComp: PurchaseFilter,
    },
    // search: {
    //   searchShow: true,
    // },
  };

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Details",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setOnRefresh,
        // toolBar : false
      },
    },
  ];

  const onRefreshHandle = () => {
    setOnRefresh(true);
    // setRefresh(true)
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  const exportProps = {
    fileName: "Download",
    fileExtension: "csv",
    data: CsvData,
  };

  // console.log(CsvData, "CsvData")
  return (
    <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5  ">
      {loading == true && <Loading />}

      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, completedGridRef]}
          scroll={scrollChange}
          // gridHeader = {false}

          // tabsShow={false}
        />
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
        heading="Purchase Order"
        number={poNumber}
        date={poDate}
      />
      <PurchaseSelectedModal
        isOpen={isOpen}
        checkedItems={checkedSubItems?.length}
        closeModal={closeModallSlected}
        checkedSubItems={checkedSubItems}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default PurchaseBody2;
