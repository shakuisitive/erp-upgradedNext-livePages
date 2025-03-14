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
} from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import BranchRightDrawer from "../../../../settings/(routes)/branch/_components/BranchMainListing/BranchRightDrawer";
import { IoIosAdd } from "react-icons/io";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  orderProductUpdate,
  setAssignDrawer,
  setCSvData,
  setIsModalOpen,
  setLoader,
  setLocations,
  setNewForm,
  setNewModal,
  setPCList,
  setPCModal,
  setPartList,
  setPhysicalCountDetails,
  setPhysicalCountForm,
  setRefresh,
  setSelectedWarid,
  setSessionId,
  setUsers,
  setVerifyCodeModal,
  setWareHouse,
} from "../redux/CycleCountSlice";
import NewPhysicalCount from "./NewCycleCount/NewCycleCount";
import PCFormOpen from "./CycleCountMainGrid/CycleCountFormOpen";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import CycleCountForm from "./CycleCountForm/CycleCountForm";
import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import VerifyModal from "../../../../../../components/misc/pureComponents/modal/VerifyModal";
import InputModal from "../../../../../../components/misc/pureComponents/modal/InputModal";
import PCFilter from "./FilterComp/PCFilter";
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";
import BinLocSelect from './CycleCountSubGrid/BinLocSelect';
import SecLocSelect from './CycleCountSubGrid/SecLocSelect';
import RowLocSelect from './CycleCountSubGrid/RowLocSelect';
import CycleCountQTY from './CycleCountSubGrid/CycleCountQTY';
import ItemSplit from './CycleCountSubGrid/ItemSplit';
import LotNumber from './CycleCountSubGrid/LotNumber';
import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PCMainAction from './CycleCountMainAction';
import AssignDropDown from "./CycleCountForm/AssignDropDown";
import AssignDrawer from './AssignDrawer';

const CycleCountBody = () => {
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

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [code, setCode] = useState("");
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);

  const verifyCodeModal = useSelector(
    (state) => state.CycleCountSlice.verifyCodeModal
  );
  const isModalOpen = useSelector((state) => state.CycleCountSlice.isModalOpen);
  const newModal = useSelector((state) => state.CycleCountSlice.newModal);
  let PCModal = useSelector((state) => state.CycleCountSlice.PCModal);
  const loading = useSelector((state) => state.CycleCountSlice.mainLoader);
  const refresh = useSelector((state) => state.CycleCountSlice.refresh);
  let PCIndex = useSelector((state) => state.CycleCountSlice.PCIndex);
  const CsvData = useSelector((state) => state.CycleCountSlice.CsvData);
  const sessionId = useSelector((state) => state.CycleCountSlice.sessionId);
  const subData = useSelector((state) => state.CycleCountSlice.subData);
  const assignDrawer = useSelector((state) => state.CycleCountSlice.assignDrawer);
  // useEffect(() => {
  //   if (refresh == true) {
  //     setData([]);
  //     setInactiveData([])
  //   }
  // }, [refresh]);

  const setOnRefresh = (value) => {
    dispatch(setRefresh(value));
  };

  const ToggleNewModal = (set) => {
    dispatch(setPhysicalCountDetails([]));
    dispatch(setSelectedWarid({}));
    dispatch(setNewForm());
    dispatch(setNewModal(set));
  };

  const handleVerifyNewModal = () => {
    // dispatch(setPhysicalCountDetails([]))
    ToggleNewModal(true);
    setIsNewModalOpen(false);
  };

  const option = [
    {
      label: "New PC",
      icon: IoIosAdd,
      onClick: () => setIsNewModalOpen(true),
    },
  ];


  const [head, setHead] = useState([
    {
      title: "Count #",
      slector: "PC_NUMBER",
      Wid: 350,
      filter: "textFilter",
      Modal: BranchRightDrawer,
      Drawer: PCFormOpen,
    },
    {
      title: "Date",
      slector: "PC_DATE",
      Wid: 150,
      date: true,
    },
    {
      title: "Warehouse",
      slector: "INVENTORY",
      Wid: 150,
    },
    {
      title: "Finalized Date",
      slector: "FINAL_DATE",
      Wid: 100,
      date: true,
    },
    {
      title: "Status",
      slector: "PC_STATUS",
      Wid: 100,
    },
    {
      title: "Action",
      slector: "PC_STATUS",
      Wid: 250,
      Status: PCMainAction,
    },

    // { title: "Status", slector: "", Wid: 150, customComp: BranchStatus },
  ]);

  const [subHead, setSubHead] = useState([
    { title: "Sec", slector: "SECTION", customComp: SecLocSelect, Wid: 40 },
    { title: "Row", slector: "ROW_NUMBER", customComp: RowLocSelect, Wid: 40 },
    { title: "Bin", slector: "BIN_NUMBER", customComp: BinLocSelect, Wid: 40 },
    { title: "Item", slector: "PART_NUMBER", customComp: ItemSplit, Wid: 250 },
    { title: "Product", slector: "SKU_MANUFACTURE", Wid: 20 },
    { title: "OH QTY", slector: "ONHAND_QTY", Wid: 120 },
    { title: "LOT", slector: "LOT_NUMBER", customComp: LotNumber, Wid: 120 },
    {
      title: "Count",
      slector: "COUNT_QTY",
      customComp: CycleCountQTY,
      Wid: 120,
    },
    {
      title: "Adjustment",
      slector: "ADJUSTMENT",
      Wid: 120,
    },
  ]);

  //Payloads
  const [payloadBranchA, setPayloadBranchA] = useState({
    data: {
      SEARCH: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "+5:00",
      RNUM_FROM: "1",
      RNUM_TO: "5",
      FINZ_FLAG: "",
      VOID_FLAG: "",
      CYCLE_COUNT_FLAG: "Y",
      PHYSICAL_COUNT_NUMBER: "",
      PHYSICAL_COUNT_DATE_FROM: "",
      PHYSICAL_COUNT_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      PHYSICAL_COUNT_STATUS: "",
      WAR_ID: "",
      NON_STOCK_ITEMS_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCountList",
    tid: "144",
    type: "rpc",
  });

  const [payloadBranch, setPayloadBranch] = useState({
    data: {
      SEARCH: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "+5:00",
      RNUM_FROM: "1",
      RNUM_TO: "5",
      FINZ_FLAG: "",
      VOID_FLAG: "",
      CYCLE_COUNT_FLAG: "Y",
      PHYSICAL_COUNT_NUMBER: "",
      PHYSICAL_COUNT_DATE_FROM: "",
      PHYSICAL_COUNT_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      PHYSICAL_COUNT_STATUS: "",
      WAR_ID: "",
      NON_STOCK_ITEMS_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCountList",
    tid: "144",
    type: "rpc",
  });
  //functions
  const handleBranchA = (data) => {
    const items = data.Result.filter((item) => item.PC_STATUS != "Complete" && item.PC_STATUS != "Void" && item.PC_STATUS != "Assigned")
    setData(items);
    dispatch(setPCList(items));
    dispatch(setLoader(false));
  };
  const handleBranch = (data) => {
    const items = data.Result.filter((item) => item.PC_STATUS == "Complete" || item.PC_STATUS == "Void" || item.PC_STATUS == "Assigned")
    setInactiveData(items);
    dispatch(setLoader(false));
  };

  useEffect(() => {
    sendRequest(
      PhysicalCount.GetPhysicalCountList,
      "POST",
      payloadBranchA,
      handleBranchA,
      accessToken
    );
  }, [payloadBranchA]);
  useEffect(() => {
    sendRequest(
      PhysicalCount.GetPhysicalCountList,
      "POST",
      payloadBranch,
      handleBranch,
      accessToken
    );
  }, [payloadBranch]);

  const handleFilter = (e) => {
    const newData = {
      ...payloadBranchA.data,
      LOT_NUMBER: e.Ln ? e.Ln : "",
      PHYSICAL_COUNT_DATE_FROM: e.Df ? e.Df : "",
      PHYSICAL_COUNT_DATE_TO: e.Dt ? e.Dt : "",
      PHYSICAL_COUNT_NUMBER: e.Cn ? e.Cn : "",
      PHYSICAL_COUNT_STATUS: e.Cs ? e.Cs : "",
      WAR_ID: e.Wi ? e.Wn : "",
    };
    const newPayload = { ...payloadBranchA, data: newData };
    setPayloadBranchA(newPayload);

    const newData2 = {
      ...payloadBranch.data,
      LOT_NUMBER: e.Ln ? e.Ln : "",
      PHYSICAL_COUNT_DATE_FROM: e.Df ? e.Df : "",
      PHYSICAL_COUNT_DATE_TO: e.Dt ? e.Dt : "",
      PHYSICAL_COUNT_NUMBER: e.Cn ? e.Cn : "",
      PHYSICAL_COUNT_STATUS: e.Cs ? e.Cs : "",
      WAR_ID: e.Wi ? e.Wn : "",
    };
    const newPayload2 = { ...payloadBranch, data: newData2 };
    setPayloadBranch(newPayload2);
  };

  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New PC",
      icon: IoIosAdd,
      onClick: () => setIsNewModalOpen(true),
    },

    filter: {
      handleFilter: handleFilter,
      FilterComp: PCFilter,
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

  const [session, setSession] = useState("");

  const killSessionPayload = {
    action: "Inventory",
    data: { EDISCRSES_ID: session },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const postSessionRes = (data) => {
    setSession(data.Result);
  };

  const killSessionRes = () => {
    if (data.CODE == "SUCCESS") {
      setSession("");
      dispatch(setSessionId(""))
    }
  };

  useEffect(() => {
    if (refresh == true) {
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    }
  }, [refresh]);

  const subGridOpen = (getData, perform) => {
    if (sessionId != "") {
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    }
    const getOpenSession = {
      action: "Inventory",
      data: {
        SOURCE_PK: getData?.PHYCOU_ID,
        SOURCE_TABLE: "PHYSICAL_COUNT",
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
        SOURCE_NO: getData?.PC_NUMBER,
        SOURCE_PK: getData?.PHYCOU_ID.toString(),
        SOURCE_TABLE: "PHYSICAL_COUNT",
        USE_ID: "2694",
      },
      method: "PostEditScreenSessions",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    if (perform == "close") {
      sendRequest(
        SessionManagement.PostKillScreenSessions,
        "POST",
        killSessionPayload,
        killSessionRes,
        accessToken
      );
    } else {
      const getSessionRes = (data) => {
        if (data?.Result.length == 0) {
          openSubGridWithSessionCheck(getData);
          sendRequest(
            SessionManagement.PostEditScreenSessions,
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
        SessionManagement.GetEditScreenSessions,
        "POST",
        getOpenSession,
        getSessionRes,
        accessToken
      );
    }
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

        // Sort numbers in ascending order
        return a - b;
      };

      secOptions = secOptions.sort(customSort);
      rowOptions = rowOptions.sort(customSort);
      binOptions = binOptions.sort(customSort);
      dispatch(
        setLocations({
          sec: secOptions,
          row: rowOptions,
          bin: binOptions,
          loc: locList,
        })
      );
    }
  };

  function getAllTask(data) {
    dispatch(setPhysicalCountForm(data.Result));
    const warehouseLocationPayload = {
      action: "Administration",
      data: {
        ACTIVE_FLAG: "Y",
        SEARCH: "",
        ORDER: "LOCATION ASC",
        RNUM_FROM: "1",
        RNUM_TO: "100000",
        OFFSET: "",
        WAR_ID: data.Result[0].WAR_ID,
      },
      method: "GetWarehouseLocationList",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    sendRequest(
      Administration.GetWareHouseLocations,
      "POST",
      warehouseLocationPayload,
      getLocations,
      accessToken
    );
  }

  function getDetail(data) {
    const getDataDet = {
      // statusId: getData.PO_CURRENT_STATUS,
      id: data.Result[0].PHYCOU_ID,
      product: data.Result,
    };
    dispatch(orderProductUpdate(getDataDet));
  }

  const openSubGridWithSessionCheck = (getData) => {
    setCheckOpenSubGrid(getData.PHYCOU_ID);
    const payload = {
      data: {
        PHYCOU_ID: `${getData.PHYCOU_ID}`,
        OFFSET: "+5.00",
      },
      action: "InventoryWeb",
      method: "GetPhysicalCount",
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    const payloadDetail = {
      data: {
        PHYCOU_ID: `${getData.PHYCOU_ID}`,
        OFFSET: "+5:00",
        ORDER: "ORDER BY 1 DESC",
      },
      action: "InventoryWeb",
      method: "GetPhysicalCountDetails",
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    let finde = subData.some((data) => data.id == getData.PHYCOU_ID);
    if (finde == false) {
      sendRequest(
        PhysicalCount.GetPhysicalCount,
        "POST",
        payload,
        getAllTask,
        accessToken
      );
      sendRequest(
        PhysicalCount.GetPhysicalCountDetails,
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
          subActiveKey: "TOTALROW",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "PHYCOU_ID",
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
          subActiveKey: "TOTALROW",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "PHYCOU_ID",
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
      CYCLE_COUNT_FLAG: "N",
    },
    action: "InventoryWeb",
    method: "GetPhysicalCountList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  function getAllTaskCsv(data) {
    dispatch(setCSvData(data.Result.Results));
    dispatch(setLoader(false));
  }
  // for api
  useEffect(() => {
    if (accessToken) {
      dispatch(setLoader(true));
      sendRequest(
        PhysicalCount.GetPhysicalCountList,
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
          api: PhysicalCount.GetPhysicalCountList,
          payload: payloadBranchA,
          func: handleBranchA,
          token: accessToken,
          title: "Active",
        },
        {
          api: PhysicalCount.GetPhysicalCountList,
          payload: payloadBranch,
          func: handleBranch,
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
      content: <NewPhysicalCount nonSPC={false} />,
    },
  ];
  const [Modaltabs, setModaltabs] = useState([
    {
      icon: <GoHome />,
      label: "Main",
      content: <CycleCountForm />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={PCIndex?.PHYCOU_ID} />,
    },
  ]);

  const generateKillSessionPayload = () => ({
    action: "Inventory",
    data: { EDISCRSES_ID: sessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  });

  const handleApply = () => {};
  const handleCloseModal = () => {
    setOnRefresh(true);
    dispatch(setPCModal(false));
    const killSessionPayload = generateKillSessionPayload();
    sendRequest(
      SessionManagement.PostKillScreenSessions,
      "POST",
      killSessionPayload,
      killSessionRes,
      accessToken
    );
  };

  const verifyModalOpen = () => {
    dispatch(setVerifyCodeModal(true));
    verifyModalClose();
  };

  const verifyModalClose = () => {
    dispatch(setIsModalOpen(false));
    const killSessionPayload = generateKillSessionPayload();
    sendRequest(
      SessionManagement.PostKillScreenSessions,
      "POST",
      killSessionPayload,
      killSessionRes,
      accessToken
    );
    dispatch(setRefresh(true));
  };

  const verifyCodeModalClose = () => {
    dispatch(setVerifyCodeModal(false));
  };

  const overridePayload = {
    data: {
      ADMIN_PASSWORD: code,
    },
    action: "Administration",
    method: "GetAdminAccess",
    username: "admin",
  };

  const handleVerifyCodeResData = (data) => {
    if (data?.CODE == "SUCCESS") {
      if (data?.Result[0].ALLOW_ADMIN_OVERRIDE == "Y") {
        dispatch(setPCModal(true));
      }
    }
  };

  const handleVerifyCode = () => {
    if (code == "12123") {
      sendRequest(
        Administration.GetAdminAccess,
        "POST",
        overridePayload,
        handleVerifyCodeResData,
        accessToken
      );
      verifyCodeModalClose();
      setCode("");
    } else {
      setIsError(true);
    }
  };

  const closeAssign = () => {
    dispatch(setAssignDrawer(false))
  } 

  const drawerTabs = [
    {
      label: "Assign",
      content: (
        <AssignDrawer/>
      ),
    },
  ];

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
        onClose={() => ToggleNewModal(false)}
        tabs={tabs}
        heading="Cycle Count"
      />
      <CustomModal
        tabs={Modaltabs}
        isOpen={PCModal}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Cycle Count"
        number={""}
        date={""}
      />
      <RightDrawer
        isOpen={assignDrawer}
        setIsDrawer={closeAssign}
        onClose={closeAssign}
        heading={"Assign Drawer"}
        tabs={drawerTabs}
      />
      {isNewModalOpen && (
        <VerifyModal
          onClose={() => setIsNewModalOpen(false)}
          cancle={"cancel"}
          verify={"Verify"}
          msg="Continuing with the inventory count while sales and transfers are in progress might result in discrepancies. Do you wish to proceed ?"
          action={handleVerifyNewModal}
        />
      )}
      {isModalOpen && (
        <VerifyModal
          onClose={() => verifyModalClose()}
          cancle={"cancel"}
          verify={"Verify"}
          msg="Continuing with the inventory count while sales and transfers are in progress might result in discrepancies. Do you wish to proceed ?"
          action={verifyModalOpen}
        />
      )}
      {verifyCodeModal && (
        <InputModal
          onClose={() => verifyCodeModalClose(false)}
          code={code}
          setCode={setCode}
          isError={isError}
          action={handleVerifyCode}
        />
      )}
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default CycleCountBody;
