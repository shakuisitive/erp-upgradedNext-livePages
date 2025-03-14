import React, { useEffect, useRef, useState } from "react";
import { GoHome } from "react-icons/go";
import Loading from "../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import {
  Administration,
  ItemMaster,
  SessionManagement,
  PhysicalCount,
  Transfer,
} from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import BranchRightDrawer from "../../../../settings/(routes)/branch/_components/BranchMainListing/BranchRightDrawer";
import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import { IoIosAdd } from "react-icons/io";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  orderProductUpdate,
  setAssignDrawer,
  setCSvData,
  setIsModalOpen,
  setKillSession,
  setLoader,
  setLocations,
  setNewForm,
  setNewModal,
  setPCList,
  setPCModal,
  setPartList,
  setRefresh,
  setSessionId,
  setUsers,
  setWareHouse,
} from "../redux/TransferSlice";
import NewTransfer from "./NewTransfer/NewTransfer";
import TransferFormOpen from "./TransferMainGrid/TransferFormOpen";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import TransferForm from "./TransferForm/TransferForm";
import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import TransferFilter from "./FilterComp/TransferFilter";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";

import TransferMainAction from "./TransferMainAction";
import TransferStatus from "./TransferStatus";

import WarehouseTo from "./TransferSubGrid/WarehouseTo";
import BinLocSelect from "./TransferSubGrid/BinLocSelect";
import SecLocSelect from "./TransferSubGrid/SecLocSelect";
import RowLocSelect from "./TransferSubGrid/RowLocSelect";
import TransferQTY from "./TransferSubGrid/TransferQTY";
import PdfModal from "../../../../../../components/misc/pureComponents/modal/PdfModal";
import ReportForm from "./reportDrawer/ReportForm";

const TransferBody = () => {
  const dispatch = useDispatch();
  const [scrollChange, setScrollChange] = useState(1);
  // const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [inactiveData, setInactiveData] = useState();
  const [checkOpenSubGrid, setCheckOpenSubGrid] = useState();
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [code, setCode] = useState("");
  const [isReportDrawer, setIsReportDrawer] = useState(false);
  const [killSessionId, setKillSessionID] = useState("");
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);

  const newModal = useSelector((state) => state.TransferSlice.newModal);
  let PCModal = useSelector((state) => state.TransferSlice.PCModal);
  const loading = useSelector((state) => state.TransferSlice.mainLoader);
  const refresh = useSelector((state) => state.TransferSlice.refresh);
  let PCIndex = useSelector((state) => state.TransferSlice.PCIndex);
  const CsvData = useSelector((state) => state.TransferSlice.CsvData);
  const sessionId = useSelector((state) => state.TransferSlice.sessionId);
  const subData = useSelector((state) => state.TransferSlice.subData);
  const killSession = useSelector((state) => state.TransferSlice.killSession);

  const formId = PCIndex?.INVTRA_ID;

  const setOnRefresh = (value) => {
    dispatch(setRefresh(value));
  };

  const option = [
    // {
    //   label: "New +",
    //   // icon: IoIosAdd,
    //   onClick: () => setIsNewModalOpen(true),
    // },
    {
      label: "Report",
      icon: IoIosAdd,
      onClick: () => {
        setIsReportDrawer(true);
      },
    },
  ];

  const [head, setHead] = useState([
    {
      title: "Transfer #",
      slector: "TRANSFER_NUMBER",
      Wid: 350,
      filter: "textFilter",
      Modal: BranchRightDrawer,
      Drawer: TransferFormOpen,
    },
    {
      title: "Date",
      slector: "TRANSFER_DATE",
      Wid: 150,
      date: true,
    },
    {
      title: "From warehouse",
      slector: "INVENTORY_FROM",
      Wid: 150,
    },
    {
      title: "Status",
      slector: "TRANSFER_STATUS",
      Wid: 100,
      Status: TransferStatus,
    },
    {
      title: "To warehouse",
      slector: "INVENTORY_TO",
      Wid: 150,
    },
    // {
    //   title: "Finalized Date",
    //   slector: "FINAL_DATE",
    //   Wid: 100,
    //   date: true,
    // },

    {
      title: "Action",
      slector: "TRANSFER_STATUS",
      Wid: 100,
      Status: TransferMainAction,
    },

    // { title: "Status", slector: "", Wid: 150, customComp: BranchStatus },
  ]);

  const [subHead, setSubHead] = useState([
    { title: "SKU", slector: "PART_CODE", Wid: 250 },
    // { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 120 },
    { title: "LOT#", slector: "LOT_NUMBER", Wid: 120 },
    // { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120 },
    { title: "Sec", slector: "SHELF_FROM_LOC", Wid: 40 },
    { title: "Row", slector: "RACK_FROM_LOC", Wid: 40 },
    { title: "Bin", slector: "BIN_NUMBER_FROM_LOC", Wid: 40 },
    { title: "Warehouse from", slector: "INVENTORY_FROM", Wid: 80 },
    { title: "OH Frm", slector: "", Wid: 40 },
    { title: "Avl Frm", slector: "AVL_QTY_FROM", Wid: 40 },
    {
      title: "Warehouse To",
      slector: "INVENTORY_TO",
      Wid: 80,
      customComp: WarehouseTo,
    },
    {
      title: "Sec",
      slector: "SHELF_TO_LOC",
      Wid: 40,
      customComp: SecLocSelect,
    },
    {
      title: "Row",
      slector: "RACK_TO_LOC",
      Wid: 40,
      customComp: RowLocSelect,
    },
    {
      title: "Bin",
      slector: "BIN_NUMBER_TO_LOC",
      Wid: 40,
      customComp: BinLocSelect,
    },
    { title: "OH To", slector: "ONHAND_QTY_FROM", Wid: 40 },
    { title: "Avl To", slector: "AVL_QTY_FROM", Wid: 40 },
    {
      title: "Qty",
      slector: "QUANTITY",
      Wid: 80,
      customComp: TransferQTY,
    },
  ]);

  //Payloads
  const [payloadBranchA, setPayloadBranchA] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: null,
      ORDER: "",
      LOC_ID: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      FINZ_FLAG: null,
    },
    action: "InventoryWeb",
    method: "GetInvTransferList",
    type: "rpc",
    tid: "144",
  });
  const [payloadR, setPayloadR] = useState({});
  // console.log("payload Report: ", payloadR);

  // const payloadReport = {
  //   data: payloadR,
  //   action: "InventoryWeb",
  //   method: "GetInvTransferListPDFReport",
  //   type: "rpc",
  //   tid: "144",
  // };

  //functions
  const handleBranchA = (data) => {
    const items = data.Result.filter((item) => item.TRANSFER_STATUS == "NEW");
    setData(items);
    const comp = data.Result.filter(
      (item) =>
        item.TRANSFER_STATUS == "Completed" || item.TRANSFER_STATUS == "Void"
    );
    setInactiveData(comp);
    dispatch(setPCList(items));
    // dispatch(setLoader(false));
  };

  useEffect(() => {
    sendRequest(
      Transfer.GetInvTransferList,
      "POST",
      payloadBranchA,
      handleBranchA,
      accessToken
    );
  }, [payloadBranchA]);

  const handleFilter = (e) => {
    const newData = {
      ...payloadBranchA.data,
      LOT_NUMBER: e.Ln ? e.Ln : "",
      TRANSFER_DATE_FROM: e.Df ? e.Df : "",
      TRANSFER_DATE_TO: e.Dt ? e.Dt : "",
      TRANSFER_NUMBER: e.Cn ? e.Cn : "",
      TRANSFER_STATUS: e.Cs ? e.Cs : "",
      WAR_ID_FROM: e.Wi ? e.Wn : "",
      WAR_ID_TO: e.Wi2 ? e.Wn2 : "",
      PART_DETAILS: e.Sku ? e.Sku : "",
    };
    const newPayload = { ...payloadBranchA, data: newData };
    setPayloadBranchA(newPayload);
  };

  const handleCloseReportDrawer = () => {
    setIsReportDrawer(false);
  };
  const reportTabs = [
    {
      label: "Report",
      content: (
        <ReportForm
          setEMessage={setEMessage}
          onClose={handleCloseReportDrawer}
          setIsErrorMessage={setIsErrorMessage}
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      ),
    },
  ];
  const handleNewForm = () => {
    // setIsNewModalOpen(true);
    dispatch(setNewModal(true));
    dispatch(setNewForm());
  };
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New +",
      // icon: IoIosAdd,
      onClick: () => {
        handleNewForm();
      },
    },

    filter: {
      handleFilter: handleFilter,
      FilterComp: TransferFilter,
    },
  };

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Main Tab",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.BranchApiDataA,
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
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  const exportProps = {
    fileName: "Download",
    fileExtension: "csv",
    data: CsvData,
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
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const getAllWarehouse = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setWareHouse(data.Result));
    }
  };

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
  //useEffect
  // for token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Token = localStorage.getItem("tokenSession");
      setAccessToken(Token);
    }
  }, []);

  // const [session, setSession] = useState("");
  useEffect(() => {
    setKillSessionID(sessionId);
  }, [sessionId]);
  const killSessionsPayload = {
    action: "Inventory",
    data: { EDISCRSES_ID: killSessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const postSessionRes = (data) => {
    // setSession(data.Result);
    dispatch(setSessionId(data.Result));
  };

  const killSessionResponse = (data) => {
    if (data?.CODE == "SUCCESS") {
      // setSession("");
      dispatch(setKillSession(true));
      dispatch(setSessionId(""));
    }
  };

  useEffect(() => {
    if (refresh == true) {
      console.log("session id payload refresh true: ", killSessionsPayload),
        sendRequest(
          SessionManagement.PostKillScreenSessions,
          "POST",
          killSessionsPayload,
          killSessionResponse,
          accessToken
        );
    }
  }, [refresh]);
  useEffect(() => {
    if (killSessionId != "") {
      console.log("session id payload !==null: ", killSessionsPayload),
        sendRequest(
          SessionManagement.PostKillScreenSessions,
          "POST",
          killSessionsPayload,
          killSessionResponse,
          accessToken
        );
    }
    if (killSession == false) {
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionsPayload,
        killSessionResponse,
        accessToken
      );
    }
  }, [killSession]);

  const subGridOpen = (getData, perform) => {
    // if (killSessionId != "") {
    //   // console.log("session id payload !==null: ", killSessionsPayload),
    //   sendRequest(
    //     SessionManagement.PostKillScreenSessions,
    //     "POST",
    //     killSessionsPayload,
    //     killSessionResponse,
    //     accessToken
    //   );
    // }
    const getOpenSession = {
      action: "Inventory",
      data: {
        SOURCE_PK: getData?.INVTRA_ID,
        SOURCE_TABLE: "INVENTORY_TRANSFER",
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
        SOURCE_NO: getData?.TRANSFER_NUMBER,
        SOURCE_PK: getData?.INVTRA_ID.toString(),
        SOURCE_TABLE: "INVENTORY_TRANSFER",
        USE_ID: "2694",
      },
      method: "PostEditScreenSessions",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    if (perform == "close") {
      dispatch(setKillSession(false));
      // console.log("session id payload: ", killSessionsPayload),

      // sendRequest(
      //   SessionManagement.PostKillScreenSessions,
      //   "POST",
      //   killSessionsPayload,
      //   killSessionRes,
      //   accessToken
      // );
    } else {
      const getSessionRes = (data) => {
        if (data?.Result.length == 0) {
          sendRequest(
            SessionManagement.PostEditScreenSessions,
            "POST",
            sessionPayload,
            postSessionRes,
            accessToken
          );
          openSubGridWithSessionCheck(getData);
        } else {
          setEMessage(
            `Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`
          );
          setIsErrorMessage(true);
        }
      };
      sendRequest(
        SessionManagement.GetEditScreenSessions,
        "POST",
        getOpenSession,
        getSessionRes,
        accessToken
      );
    }
  };
  // console.log("session id: ", sessionId);
  // console.log("kill session id: ", killSessionId);
  useEffect(() => {
    subData[0]?.product.forEach((item, index) => {
      const warehouseLocationPayload = {
        action: "Administration",
        data: {
          ACTIVE_FLAG: "Y",
          SEARCH: "",
          ORDER: "LOCATION ASC",
          RNUM_FROM: "1",
          RNUM_TO: "100000",
          OFFSET: "",
          WAR_ID: item.war_id_to,
        },
        method: "GetWarehouseLocationList",
        tid: "144",
        type: "rpc",
        username: "admin",
      };
      const getLocations = (res) => {
        if (res?.CODE === "SUCCESS") {
          let secOptions = [];
          let rowOptions = [];
          let binOptions = [];

          let locList = res?.Result?.Results.map((item) => {
            let location = item.LOCATION;
            const hasAlphabets = /[A-Za-z]{2,}/.test(location);
            if (location === "SOSROSBOS") {
              location = "OS";
            } else if (hasAlphabets) {
              location = location.replace(/[SRB]/g, "");
            }
            if (!secOptions.includes(item?.SECTION)) {
              secOptions.push(item?.SECTION);
            }
            if (!rowOptions.includes(item?.ROW)) {
              rowOptions.push(item?.ROW);
            }
            if (!binOptions.includes(item?.BIN)) {
              binOptions.push(item?.BIN);
            }
            return { ...item, value: item.LOCATION, label: location };
          });

          const customSort = (a, b) => {
            if (a === "OS") return 1; // "OS" goes to the end
            if (b === "OS") return -1; // "OS" goes to the end

            return a - b;
          };

          secOptions = secOptions.sort(customSort);
          rowOptions = rowOptions.sort(customSort);
          binOptions = binOptions.sort(customSort);

          const LocData = {
            ind: index,
            sec: secOptions,
            row: rowOptions,
            bin: binOptions,
            loc: locList,
          };

          dispatch(setLocations(LocData));
        }
      };
      sendRequest(
        Administration.GetWareHouseLocations,
        "POST",
        warehouseLocationPayload,
        getLocations,
        accessToken
      );
    });
  }, [subData[0]?.product?.length]);
  function getDetail(data) {
    const getDataDet = {
      id: data.Result.Results[0].INVTRA_ID,
      product: data.Result.Table1,
      form: data.Result.Results,
    };
    dispatch(orderProductUpdate(getDataDet));
  }

  const openSubGridWithSessionCheck = (getData) => {
    setCheckOpenSubGrid(getData.INVTRA_ID);

    const payloadDetail = {
      data: {
        INVTRA_ID: `${getData.INVTRA_ID}`,
        OFFSET: "+5:00",
      },
      action: "InventoryWeb",
      method: "GetRecieving",
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    let finde = subData.some((data) => data.id == getData.INVTRA_ID);
    if (finde == false) {
      sendRequest(
        Transfer.GetInvTransfer,
        "POST",
        payloadDetail,
        getDetail,
        accessToken
      );
    }
  };
  const subColapsfunc = () => {};
  const selectedSubRow = (index, data) => {
    // // console.log('check slected row Data and index' , index , data);
  };

  // console.log(subData, "check subData");

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
          Griddata: data,
          subGridData: subData,
          // subGridData: transferDetails,
        },
        colapsList: {
          GridColaps: false,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVTRA_ID",
        },
        MoreOpt: () => {},
        ref: activeGridRef,
        fixHight: true,
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
          GridColor: "#F87171",
        },
        data: {
          Griddata: inactiveData,
          subGridData: subData,
          // subGridData: transferDetails,
        },
        colapsList: {
          GridColaps: true,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVTRA_ID",
        },
        MoreOpt: () => {},
        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, inactiveData, subData, colaps, colapsComp, head]);

  const userPayload = {
    data: {
      SEARCH: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ORDER: "",
    },
    action: "Security",
    method: "GetUserList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const setUserList = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setUsers(data.Result));
    }
  };
  const getPartList = (data) => {
    dispatch(setPartList(data.Result.Results));
  };
  const partPayload = {
    data: {
      OFFSET: "+4:00",
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: "Y",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
    },
    action: "ItemMaster",
    method: "",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };
  const csvPayload = {
    data: {
      SEARCH: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      FINZ_FLAG: "N",
      VOID_FLAG: "N",
    },
    action: "InventoryWeb",
    method: "GetInvTransferList",
    type: "rpc",
    tid: "144",
  };
  function getAllTaskCsv(data) {
    dispatch(setCSvData(data.Result));
    dispatch(setLoader(false));
  }
  // for api
  useEffect(() => {
    if (accessToken) {
      dispatch(setLoader(true));
      sendRequest(
        Transfer.GetInvTransferList,
        "POST",
        csvPayload,
        getAllTaskCsv,
        accessToken
      );
      sendRequest(
        PhysicalCount.GetUserList,
        "POST",
        userPayload,
        setUserList,
        accessToken
      );
      sendRequest(
        PhysicalCount.GetWarehouse,
        "POST",
        wPayload,
        getAllWarehouse,
        accessToken
      );
      sendRequest(
        ItemMaster.GetPartsList,
        "POST",
        partPayload,
        getPartList,
        accessToken
      );
    }
    let apiData = {
      BranchApiDataA: [
        {
          api: Transfer.GetInvTransferList,
          payload: payloadBranchA,
          func: handleBranchA,
          token: accessToken,
          title: "Active",
        },
        {
          api: Transfer.GetInvTransferList,
          payload: payloadBranchA,
          func: handleBranchA,
          token: accessToken,
          title: "Inactive",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);
  // for multi scrollbar
  useEffect(() => {
    if (data?.length > 0) {
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
  }, [data]);
  const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <NewTransfer />,
    },
  ];
  const [Modaltabs, setModaltabs] = useState([
    {
      icon: <GoHome />,
      label: "Main",
      content: <TransferForm />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={formId} />,
    },
  ]);

  const generateKillSessionPayload = () => ({
    action: "Inventory",
    data: { EDISCRSES_ID: killSessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  });
  const killSessionRes = () => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setSessionId(""));
    }
  };
  const handleApply = () => {};
  const handleCloseNewModal = () => {
    setOnRefresh(true);
    dispatch(setNewModal(false));
  };
  const handleCloseModal = () => {
    setOnRefresh(true);
    const killSessionPayload = generateKillSessionPayload();
    sendRequest(
      SessionManagement.PostKillScreenSessions,
      "POST",
      killSessionPayload,
      killSessionRes,
      accessToken
    );
    dispatch(setPCModal(false));
  };

  return (
    <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, InactiveGridRef]}
          scroll={scrollChange}
          // gridHeader = {false}

          // tabsShow={false}
        />
      </div>
      <NewCustomModal
        isOpen={newModal}
        onClose={() => handleCloseNewModal()}
        tabs={tabs}
        heading="Transfer"
      />
      <CustomModal
        tabs={Modaltabs}
        isOpen={PCModal}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Transfer"
        number={""}
        date={""}
      />

      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
      <RightDrawer
        isOpen={isReportDrawer}
        setIsDrawer={setIsReportDrawer}
        onClose={handleCloseReportDrawer}
        heading={`Report Filters`}
        tabs={reportTabs}
      />

      {pdfModal == true && (
        <PdfModal
          setPdf={setPdf}
          pdf={pdf}
          setPdfModal={setPdfModal}
          pdfModal={pdfModal}
        />
      )}
    </div>
  );
};

export default TransferBody;
