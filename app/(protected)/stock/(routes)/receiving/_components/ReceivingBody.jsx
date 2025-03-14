"use client";
import React, { useState, useEffect, useRef } from "react";

import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import useKeyPress from "../../../../../../customHook/useKeyPress";
import PurchaseMGridStatus from "../../purchase/_components/PurchaseMainGrid/PurchaseMGridStatus";
import PurchaseFormModall from "../../purchase/_components/purchaseRightDrawer/PurchaseFormModall";
import PurchaseAddSubGrid from "../../purchase/_components/PurchaseSubGrid/PurchaseAddSubGrid";
import ReceivingSelectedModal from "./ReceivingSelectedModal";
import ReceivingOpenDrawer from "./ReceivingOpenDrawer";
import RecActiveGridStatus from "./RecActiveGridStatus";
import ReceivingFiltration from "./ReceivingFilteration";
import ReceivingOrderQTotal from "./receivingCellComp/ReceivingOrderQTotal";
import ReceivingBOTotal from "./receivingCellComp/ReceivingBOTotal";
import ReceivingOHTotal from "./receivingCellComp/ReceivingOHTotal";
import ReceivingCaseQTotal from "./receivingCellComp/ReceivingCaseQTotal";
import ReceivingQTotal from "./receivingCellComp/ReceivingQTotal";

import { useSelector, useDispatch } from "react-redux";
import {
  setRefresh,
  colseNewModall,
  openNModall,
} from "../../purchase/redux/Purchase.slice";

import ReceivingFormModall from "./ReceivingFormModal";
import ReceivingStatus from "./Rec_Status";
import ReceivingAction from "./ReceivingAction";
import ReceivingQtyInput from "./ReceivingQtyInput";
import { GoHome } from "react-icons/go";
import NewPurchaseForm from "../../purchase/_components/NewPurchaseForm/NewPurchaseForm";
import { setcloseModall } from "../../purchase/redux/Purchase.slice";
import PurchaseFileTab from "../../purchase/_components/purchaseRightDrawer/PurchaseFileTab";
import PurchaseConversationTab from "../../purchase/_components/purchaseRightDrawer/PurchaseConversationTab";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { TiMediaPlayReverseOutline } from "react-icons/ti";
import moment from "moment";
import ReceivingAuditLog from "../_components/ReceivingForm/receivingAuditLog/ReceivingAuditLog";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import OrderDetails from "./../../../../../../components/misc/bindComponent/OrderDetails";
import PurchaseMore from "../../purchase/_components/purchaseForm/purchaseGrid/PurchaseMore";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";
import ReceivingForm from "../_components/ReceivingForm/ReceivingForm";
import {
  clearMGSubGridData,
  removeSameIndex,
  setCloseModal,
  setIsCheckedFItem,
  setMGPRData,
  setMGSubDataDet,
  setMGSubGridData,
  setMGWarId,
  setMGdetails,
  setReceivingOrderList,
  setSubGridCellTData,
  setWareHouse,
  setcloseModal,
} from "../redux/receivingSlices";
import Loading from "../../../../../../components/misc/loader/loading";

const ReceivingBody = () => {
  let [error, sendRequest] = useApiFetch();
  const [data, setData] = useState();
  const [colaps, setColaps] = useState(false);
  const [subColaps, setSubColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenC, setIsModalOpenC] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [gridArrP, setGridArrP] = useState();
  let [aPIProp, setAPIProp] = useState([]);
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
  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  const [eMessage, setEMessage] = useState("");
  const [modifiedPayload, setModifiedPayload] = useState(null);
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const rowDataa = useSelector((state) => state.receivingSlices.subGridState);
  const isModal = useSelector((state) => state.receivingSlices.openModallForm);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const refresh = useSelector((state) => state.PurchaseSlices.Refresh);
  const mGSubGridData = useSelector(
    (state) => state.receivingSlices.mGSubGridData
  );
  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );
  const receivingOrderList = useSelector(
    (state) => state.receivingSlices.receivingOrderList
  );
  const subGridState = useSelector(
    (state) => state.receivingSlices.subGridState
  );

  const formData = useSelector((state) => state.receivingSlices.postReceiving);
  const gridData = useSelector(
    (state) => state.receivingSlices.postReceivingDetail
  );

  const formIndex = useSelector((state) => state.receivingSlices.formIndex);
  const warId = useSelector((state) => state.receivingSlices.warId);
  const isCheckedFItem = useSelector(
    (state) => state.receivingSlices.isCheckedFItem
  );

  const setOnRefresh = (value) => {
    dispatch(setRefresh(value));
  };

  let [head, setHead] = useState([
    {
      title: "Receiving #",
      slector: "RECEIVING_NUMBER",
      Wid: 300,
      filter: "textFilter",
      Modal: ReceivingOpenDrawer,
      Drawer: ReceivingFormModall,
      More: MoreOption,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Receiving Date",
      slector: "REC_DATE",
      Wid: 150,
      date: true,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Status",
      slector: "RECEIVING_STATUS",
      Wid: 150,
      Status: ReceivingStatus,

      hidden: false,
      def: false,
    },
    {
      title: "PO #",
      slector: "PO_NUMBER",
      Wid: 150,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "PO Date",
      slector: "PO_DATE",
      Wid: 150,
      date: true,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Inventory",
      slector: "INVENTORY",
      Wid: 200,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Action",
      slector: "RECEIVING_STATUS",
      Wid: 150,
      Status: ReceivingAction,
      hidden: false,
      def: false,
      edit: false,
    },
  ]);

  const [subHead, setSubHead] = useState([
    { title: "Lot", slector: "LOT_NUMBER", Wid: 250 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 150, date: true },
    { title: "SKU", slector: "SKU_MANUFACTURE", Wid: 150 },
    { title: "Description", slector: "DESCRIPTION", Wid: 250 },
    {
      title: "OhQty",
      slector: "QTY_ONHAND",
      Wid: 150,
      tottal: true,
      TComp: ReceivingOHTotal,
    },
    {
      title: "OrderQty",
      slector: "QTY_ORDERED",
      Wid: 150,
      tottal: true,
      TComp: ReceivingOrderQTotal,
    },
    // { title: 'CaseReceived',slector:'', Wid: 100 },
    { title: "CaseUOM", slector: "REORDERING_UOM", Wid: 150 },
    {
      title: "CaseQty",
      slector: "QTY_ORDERED",
      Wid: 150,
      tottal: true,
      TComp: ReceivingCaseQTotal,
    },
    {
      title: "QtyReceieved",
      slector: "QUANTITY",
      Wid: 120,
      customComp: ReceivingQtyInput,
      tottal: true,
      TComp: ReceivingQTotal,
    },
    {
      title: "BO",
      slector: "BO_QUANTITY",
      Wid: 150,
      tottal: true,
      TComp: ReceivingBOTotal,
    },
  ]);
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecievingList`;
  const warehouseApi = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetWarehouse`;
  const apiUrlPdf = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PurchaseOrderReceivingPDFReport`;
  const apiUrlR = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecieving`;
  const apiUrlDetails = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostRecievingDetail`;
  const apiUrlFinalized = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostFinalizedRecieving`;
  const apiUrlAStock = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostAutoStockOrder`;
  const payloadPdf = {
    data: {
      PURORD_ID: recDetails?.PURORD_ID,
    },
    action: "InventoryWeb",
    method: "PurchaseOrderReceivingPDFReport",
    username: "admin",
    type: "rpc",
    tid: "144",
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

  const getPdfData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data.bytes) {
        let url = convertToPdf(data.bytes);
        setPdf({ title: "Receiving Report", pdfUrl: url });
        setPdfModal(true);
      } else {
        alert("Failed to open file");
      }
    }
  };

  const handleChangeToPdf = () => {
    sendRequest(apiUrlPdf, "POST", payloadPdf, getPdfData, token);
  };

  // useEffect(() => {
  //   const accessTokenN =
  //     typeof localStorage !== "undefined"
  //       ? localStorage.getItem("tokenSession")
  //       : null;
  //   setAccessToken(accessTokenN);
  // }, []);

  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "700",
      PO_NUMBER: "",
      REC_NUMBER: "",
      REC_DATE_FROM: "",
      REC_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      REC_STATUS: "",
      WAR_ID: "",
      FINZ_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetRecievingList",
    type: "rpc",
    tid: "144",
  });

  const [wPayload, setWPayload] = useState({
    data: {
      SEARCH: "",
    },
    action: "InventoryWeb",
    method: "GetWarehouse",
    password: "admin",
    tid: "144",
    type: "rpc",
    username: "admin",
  });

  const payloadR = {
    data: formData[0],
    action: "InventoryWeb",
    method: "PostRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadFinalized = {
    data: {
      INVREC_ID: recDetails?.INVREC_ID,
      USER_ID: "2694",
    },
    action: "InventoryWeb",
    method: "PostFinalizedRecieving",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadAStockOdr = {
    data: [
      {
        INVREC_ID: recDetails?.INVREC_ID,
        WAR_ID: warId?.WAR_ID,
        USER_ID: "2694",
      },
    ],
    action: "InventoryWeb",
    method: "PostStockOrderDetail",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const payloadDetailsRestock = {
    data: modifiedPayload,
    action: "InventoryWeb",
    method: "PostPurchaseOrderDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  useEffect(() => {
    if (gridData.length > 1) {
      const items = gridData
        .filter((_, index) => isCheckedFItem.includes(index))
        .map(({ BO_QUANTITY, ...rest }) => ({
          ...rest,
          READY_FOR_RESTOCK_FLAG: "Y",
        }));

      setModifiedPayload(items);
    } else if (gridData.length === 1) {
      const { BO_QUANTITY, ...rest } = gridData[0];
      const modifiedItem = {
        ...rest,
        READY_FOR_RESTOCK_FLAG: "Y",
      };

      setModifiedPayload([modifiedItem]);
    }
  }, [gridData, isCheckedFItem]);
  // console.log("modified payload: ", modifiedPayload);
  const anyItemCheckedWithYFlagP = modifiedPayload?.some(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "Y"
  );

  const payloadGRList = {
    data: {
      FINZ_FLAG: "N",
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
    },
    action: "InventoryWeb",
    method: "GetRecievingList",
    username: "admin",
    tid: "144",
    type: "rpc",
  };

  const getRecData = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(clearMGSubGridData());
      dispatch(setcloseModal());
    }
  };

  const getAStockOdrData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(apiUrlGRList, "POST", payloadGRList, getRecData, token);
    }
  };

  const getFinalizedData = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlAStock,
        "POST",
        payloadAStockOdr,
        getAStockOdrData,
        token
      );
    }
  };

  const getPostRecevingDetailRestock = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlFinalized,
        "POST",
        payloadFinalized,
        getFinalizedData,
        token
      );
    }
  };

  const getPostDataReceiving = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        apiUrlDetails,
        "POST",
        payloadDetailsRestock,
        getPostRecevingDetailRestock,
        token
      );
    }
  };

  const handleRestock = () => {
    if (modifiedPayload?.length > 0) {
      if (anyItemCheckedWithYFlagP) {
        sendRequest(apiUrlR, "POST", payloadR, getPostDataReceiving, token);
      } else {
        setEMessage("Conditions Not follow to Proceed");
        setIsErrorMessage(true);
      }
    } else {
      setEMessage("Please select order first.");
      setIsErrorMessage(true);
    }
  };

  // function getAllTask(data) {
  //   if (data) {
  //     const dataActive = data?.Result?.Results?.filter((item) => {
  //       return item.RECEIVING_STATUS !== "RE-STOCKED";
  //     });
  //     setCompRowA(dataActive);
  //     const dataComplete = data?.Result?.Results?.filter((item) => {
  //       return item.RECEIVING_STATUS == "RE-STOCKED";
  //     });
  //     setCompRow(dataComplete);
  //     setData(data.Result);
  //     dispatch(setReceivingOrderList(data?.Result?.Results));
  //     setLoading(false);
  //   }
  // }
  function getAllTask(data) {
    if (data) {
      const results = Array.isArray(data.Result)
        ? data.Result
        : data.Result?.Results;

      if (results) {
        const dataActive = results.filter(
          (item) => item.RECEIVING_STATUS !== "RE-STOCKED"
        );
        setCompRowA(dataActive);
        const dataComplete = results.filter(
          (item) => item.RECEIVING_STATUS === "RE-STOCKED"
        );
        setCompRow(dataComplete);
        setData(results);
        dispatch(setReceivingOrderList(results));
        setLoading(false);
      }
    }
  }

  const getAllWarehouse = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setWareHouse(data.Result));
    }
  };

  useEffect(() => {
    sendRequest(warehouseApi, "POST", wPayload, getAllWarehouse, token);
  }, []);

  const handleApply = async () => {
    try {
      sendRequest(apiUrl, "POST", payload, getAllTask, token);
    } catch (error) {
      // console.log("Apply is not working")
    }
  };

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

  const onKeyPress = (event) => {
    if (event.key == "c") {
      event.preventDefault();
      setIsModalOpen(false);
      dispatch(colseNewModall());
    }
  };

  useKeyPress(["c"], onKeyPress);

  const handleCloseModal = () => {
    dispatch(clearMGSubGridData());
    dispatch(setCloseModal());
  };

  const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);

  const poNumber = recDetails?.PO_NUMBER ? recDetails?.PO_NUMBER : "PO0001989";
  const poDate = recDetails?.PO_DATE
    ? moment(recDetails?.PO_DATE).format("DD - MM - YYYY")
    : "24-Jan-2024";
  const recNumber = recDetails?.RECEIVING_NUMBER
    ? recDetails?.RECEIVING_NUMBER
    : "REC0001989";
  const recDate = recDetails?.REC_DATE
    ? moment(recDetails?.REC_DATE).format("DD - MM - YYYY")
    : "24-Jan-2024";

  const anyItemCheckedWithYFlag = rowDataa?.some(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "N" &&
      item?.BACK_ORDER_FLAG == "Y" &&
      item?.RESTOCK_FLAG === "N"
  );
  const anyItemCheckedWithYFlagForAll = rowDataa?.every(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "N" &&
      item?.BACK_ORDER_FLAG == "Y" &&
      item?.RESTOCK_FLAG === "N"
  );
  const anyItemCheckedWithYFlagForRestock = rowDataa?.some(
    (item) =>
      item.QUANTITY != "" &&
      item.QUANTITY > 0 &&
      item?.READY_FOR_RESTOCK_FLAG === "Y" &&
      item?.RESTOCK_FLAG === "Y"
  );
  useEffect(() => {
    if (
      (FormStatus == "IN PROCESS" || FormStatus == "NEW") &&
      anyItemCheckedWithYFlag
    ) {
      const filteredItems = rowDataa.filter(
        (item) =>
          item?.READY_FOR_RESTOCK_FLAG === "Y" &&
          item?.BACK_ORDER_FLAG === "Y" &&
          item?.RESTOCK_FLAG === "Y"
      );
      setFilteredData(filteredItems);
    } else if (anyItemCheckedWithYFlagForAll) {
      setFilteredData([]);
    } else {
      setFilteredData([]);
    }
  }, [rowDataa, filteredData]);
  // useEffect(() => {
  //   if (
  //     (FormStatus == "IN PROCESS" || FormStatus == "NEW") &&
  //     anyItemCheckedWithYFlag &&
  //     !anyItemCheckedWithYFlagForAll
  //   ) {
  //     const filteredItems = rowDataa.filter(
  //       (item) =>
  //         item?.READY_FOR_RESTOCK_FLAG === "N" &&
  //         item?.BACK_ORDER_FLAG === "Y" &&
  //         item?.RESTOCK_FLAG === "N"
  //     );
  //     setFilteredData(filteredItems);
  //     console.log(
  //       "anyItemCheckedWithYFlag && anyItemCheckedWithYFlagForAll: ",
  //       filteredItems
  //     );
  //   } else if (
  //     FormStatus == "IN PROCESS" &&
  //     anyItemCheckedWithYFlagForRestock
  //   ) {
  //     const filteredItems = rowDataa.filter(
  //       (item) =>
  //         item.READY_FOR_RESTOCK_FLAG === "Y" && item?.RESTOCK_FLAG === "Y"
  //     );
  //     setFilteredData(filteredItems);
  //     console.log("anyItemCheckedWithYFlagForRestock: ", filteredItems);
  //   } else if (anyItemCheckedWithYFlagForAll) {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData([]);
  //   }
  // }, [rowDataa, filteredData]);
  // console.log("Filtered Data: ", filteredData);
  useEffect(() => {
    const gridArr = {
      colmnList: {
        // colmn : head ,
        colmn: subHead,
        setColmn: setSubHead,
      },
      //  subColumnList : {
      //     subComln : subHead ,
      //     setSubColmn : setSubHead ,

      //   } ,
      title: {
        GridTitle: "Items",
        GridColor: "#4ade80",
      },
      data: {
        Griddata: filteredData.length > 0 ? filteredData : [],

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
        // GriddFooterAdd: PurchaseAddSubGrid,
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

  const newFuncForm = () => {};

  const postReversePO = () => {};

  const optionForm = [
    {
      label: "Report",
      icon: TbReportAnalytics,
      onClick: newFuncForm,
    },
  ];
  const handleSearch = (e) => {};

  const filterTabsForm = {
    actionBtn: {
      option: optionForm,
      label: anyItemCheckedWithYFlagForRestock ? "Report" : "Instock",
      icon: TiMediaPlayReverseOutline,
      onClick: anyItemCheckedWithYFlagForRestock
        ? handleChangeToPdf
        : handleRestock,
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
        <ReceivingForm
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
      content: <ReceivingAuditLog />,
    },
    // filteredData.length > 0 && {
    //   label: anyItemCheckedWithYFlagForRestock ? "In stock" : "In process",
    //   content: filteredData.length > 0 && (
    //     <OrderDetails
    //       setPdf={setPdf}
    //       pdf={pdf}
    //       setPdfModal={setPdfModal}
    //       pdfModal={pdfModal}
    //       gridArr={subGridArr}
    //       refArray={[itemGridRef]}
    //       //  scroll={scrollSubChange}
    //       defColmn={subHead}
    //       setDefColmn={setSubHead}
    //       //  hideShow={false}
    //       filterTabs={filterTabsForm}
    //       OrderNumber={poNumber}
    //       OrderDate={poDate}
    //     />
    //   ),
    // },
  ];
  const tabsInStock = [
    {
      icon: <GoHome />,
      label: "Details",
      content: (
        <ReceivingForm
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
      content: <ReceivingAuditLog />,
    },
    filteredData.length > 0 && {
      label: anyItemCheckedWithYFlagForRestock ? "In stock" : "In process",
      content: filteredData.length > 0 && (
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

  const handleCheckboxChange = (rowI, rowDataa) => {};

  const checked = (rowI, rowData) => {};

  const closeModallSlected = () => {
    setIsOpen(false);
    setCheckedSubItems([]);
  };

  useEffect(() => {
    if (compRowA?.length > 0) {
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
    if (compRowA?.length > 0) {
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
    let apiData = [
      {
        api: apiUrl,
        payload: payload,
        func: getAllTask,
        token: token,
        // pagination: true,grid
        title: "Active",
      },
    ];

    setAPIProp(apiData);
  }, [token, mGSubGridData, subGridState]);

  useEffect(() => {
    setSubData(mGSubGridData);
  }, [mGSubGridData]);

  const handleTotal = (tData) => {
    let OhT = 0;
    let Oqty = 0;
    let CaseQty = 0;
    let QtyR = 0;
    let BOt = 0;

    if (tData) {
      tData?.forEach((data) => {
        OhT += data?.QTY_ONHAND || 0;
        Oqty += data?.QTY_ORDERED || 0;
        CaseQty += data?.QTY_ORDERED || 0;
        QtyR += data?.QUANTITY || 0;
        BOt += data?.BO_QUANTITY || 0;
      });
    }
    const dataCost = {
      OhT: OhT,
      Oqty: Oqty,
      CaseQty: CaseQty,
      QtyR: QtyR,
      BOt: BOt,
    };

    dispatch(setSubGridCellTData(dataCost));
  };

  const subGridOpen = (getData, perform) => {
    const getAllTaskGet = (data) => {
      const getDataDet = {
        id: getData?.INVREC_ID,
        product: data.Result.Table1,
        form: data?.Result.Results,
      };
      dispatch(setMGSubGridData((prev) => [...prev, getDataDet]));
      dispatch(setMGPRData(data?.Result.Results));
      dispatch(setMGdetails(data?.Result.Results[0]));
      dispatch(setMGSubDataDet(data.Result.Table1));
      dispatch(setMGWarId(data.Result.Table2));
      handleTotal(getDataDet?.product);
    };

    const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;

    const payloadGet = {
      data: {
        INVREC_ID: getData.INVREC_ID,
      },
      action: "InventoryWeb",
      method: "GetRecieving",
      offset: "+05:00",
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    let finde = subData.some((data) => data.id == getData.INVREC_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAllTaskGet, token);
    }
  };

  const setSubEdite = (e, i) => {};

  const subColapsfunc = () => {};
  const selectedSubRow = (index, data) => {};
  const subGridStatus = useSelector(
    (state) => state.PurchaseSlices.subGridStatus
  );

  const handleSubCheckboxChange = (rowI, rowData) => {
    if (rowDataa == "all" && checkedAll == false) {
      setCheckedAll(true);

      const arr = subData?.product.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        return obj;
      });

      setCheckedItems(arr);
    } else if (rowDataa == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedSubItems([]);
      // dispatch(setIsCheckedFItem([]))
    } else {
      if (isSubChecked(rowI, rowDataa)) {
        // Remove the item if it's already checked
        setCheckedSubItems(
          checkedSubItems.filter((item) => item.rowI !== rowI)
        );
        dispatch(removeSameIndex(rowI));
      } else {
        setCheckedSubItems([...checkedItems, { rowI, rowData: rowDataa }]);
        dispatch(setIsCheckedFItem(rowI));
      }
    }
  };
  const isSubChecked = (rowI, rowData) => {
    return checkedSubItems.some((item) => item.rowI === rowI);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [checkedSubItems]);

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
          GridColaps: true,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          // addButton : true ,
          addFooterComp: true,
          addFooterSubComp: true,
          // subAddButton : false ,
          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
          handleSubCheckboxChange: handleSubCheckboxChange,
          isSubChecked: isSubChecked,
        },

        subGridActive: {
          // hActive : hActive ,
          // setHActive : setHActive ,
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVREC_ID",
        },
        // paginationList: {
        //   fixHight: "def",
        //   pagination: false,
        // },

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
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVREC_ID",
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
    sendRequest(apiUrl, "POST", payload, getAllTask, token);
  }, [payload, mGSubGridData, subGridState]);

  const handleFilter = (e) => {
    const newData = {
      ...payload.data,
      REC_NUMBER: e.Rn ? e.Rn : "",
      PO_NUMBER: e.Stn ? e.Stn : "",
      REC_STATUS: e.St ? e.St : "",
      WAR_ID: e.Wn ? e.Wn : "",
      REC_DATE_FROM: e.Df ? e.Df : "",
      REC_DATE_TO: e.Dt ? e.Dt : "",
    };
    const newPayload = { ...payload, data: newData };
    setPayload(newPayload);
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
    // actionBtn: {
    //   option: option,
    //   label: "New",
    //   icon: IoIosAdd,
    //   onClick: newFunc,
    // },

    filter: {
      handleFilter: handleFilter,
      FilterComp: ReceivingFiltration,
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
    data: receivingOrderList,
  };

  // console.log(CsvData, "CsvData")
  return (
    <>
      <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
        {receivingOrderList.length <= 0 && <Loading />}

        <div ref={containerRef}>
          {/* <MainTabs
         mainTabs={tabsmain}
          // tabsmains={tabsmains}
           onRefresh={onRefresh} exportProps={exportProps}/> */}
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

        <CustomModal
          tabs={filteredData.length > 0 ? tabsInStock : tabsC}
          isOpen={isModal}
          onClose={handleCloseModal}
          onClickApply={handleApply}
          heading="Receiving Order"
          number={recNumber}
          date={recDate}
        />

        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </>
  );
};

export default ReceivingBody;
