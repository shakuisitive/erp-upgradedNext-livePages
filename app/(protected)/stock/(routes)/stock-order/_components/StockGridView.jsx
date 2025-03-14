"use client";
import StockPriority from "./StockPriority";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import ModalOpen from "../../../../../../components/misc/pureComponents/GridTable/ModalOpen";
//import PhoneNumber from '../../../../../../components/misc/GridTable/PhoneNumber'
import useApiFetch from "../../../../../../customHook/useApiFetch";
import moment from "moment";
import StockStatus from "./StockStatus";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import StockFormModall from "./StockFormModall";
import React, { useState, useEffect } from "react";
import { useRef } from "react";

import StockOrderFormModal from "./StockOrderMainGrid/StockOrderFormModal";
import { useSelector, useDispatch } from "react-redux";
import {
  cleanCheckItems,
  loaderToggle,
  setCSvData,
  setColapsRedux,
  setRefresh,
  setWareHouse,
  setStockOrderList,
  setTransferDrawer,
  orderProductUpdate,
  setMultiTransferDrawer,
  setAssignDrawer,
  setUserList,
  setMultiAssignDrawer,
  setSelectedWarid,
  setSplitDrawer,
  setLocations,
  setVender,
  setSessionId,
} from "../redux/stockSlice";
import { GoHome } from "react-icons/go";
import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import StockOrderDrawr from "./StockOrderDrawr";
import StockForm from "./StockOrderForm/StockForm";
import { SlArrowDown } from "react-icons/sl";
import StockActivityLogForm from "./StockActivityLogForm";
import StockOrderAction from "./StockOrderMainGrid/StockOrderAction";
import StockOrderSelectedModal from "./StockOrderMainGrid/StockOrderSelectedModal";
import StSubSlectedModal from "./StockOrderSubGrid/StSubSlectedModal";
import StockOrderGridPagination from "./StockOrderGridPagination";
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import Loading from "../../../../../../components/misc/loader/loading";
import StockFilter from "./FilterComp/StockFilter";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import OrderDetails from "../../../../../../components/misc/bindComponent/OrderDetails";
import OrderDetailsForm from "../../../../../../components/misc/bindComponent/OrderDetailsForm";
import StockOrderLeftForm from "./StockOrderForm/Header/StockOrderLeftForm";
import StockOrderRightForm from "./StockOrderForm/Header/StockOrderRightForm";
import StockGridSku from "./StockOrderSubGrid/stockGridSku/StockGridSku";
import StockRightDrawer from "./StockOrderSubGrid/stockGridSku/StockRightDrawer";
import StockMultiRightDrawer from "./StockOrderSubGrid/stockGridSku/StockMultiRightDrawer";
import SubGridAction from "./StockOrderSubGrid/SubGridAction";
import AssignDrawer from "./StockOrderSubGrid/stockGridSku/AssignDrawer";
import SplitRightDrawer from "./StockOrderSubGrid/stockGridSku/stockSplit/SplitRightDrawer";
import Modal from "./../../../../../../components/misc/pureComponents/modal/Modal";

function StockGridView() {
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const containerRef = useRef(null);
  const itemGridRef = useRef(null);
  const [scrollChange, setScrollChange] = useState(1);
  const [accessToken, setAccessToken] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedSubItems, setCheckedSubItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [SubcheckedAll, setSubCheckedAll] = useState(false);
  let [gridArrP, setGridArrP] = useState();
  let [subGridArr, setSubGridArr] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [isOpen, setIsOpen] = useState(true);
  let [isOpenS, setIsOpenS] = useState(false);
  let [isOpenSub, setIsOpenSub] = useState(false);
  const [subData, setSubData] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  const [compRow, setCompRow] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [subColaps, setSubColaps] = useState(false);
  const [checkOpenSubGrid, setCheckOpenSubGrid] = useState();
  const [resetSearch, setResetSearch] = useState(false);
  const [scrollSubChange, setScrollSubChange] = useState(1);
  const [hActive, setHActive] = useState({});
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const setOnRefresh = (value) => {
    dispatch(setRefresh(value));
  };
  let [error, sendRequest] = useApiFetch();
  const [errorM, setErrorM] = useState();

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrderList`;
  const warehouseApi = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetWarehouse`;
  const userApi = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Security/GetUserList`;
  const apiUrlVender = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetSupplierCode`;

  const isDrawr = useSelector((state) => state.stockSlices.isDrawr);
  const isModal = useSelector((state) => state.stockSlices.isModal);
  const refresh = useSelector((state) => state.stockSlices.Refresh);
  const CsvData = useSelector((state) => state.stockSlices.CsvData);
  const loading = useSelector((state) => state.stockSlices.mainLoader);
  const stockOrderFormData = useSelector(
    (state) => state.stockSlices.stockOrderFormData
  );
  const stockOrderDetailData = useSelector(
    (state) => state.stockSlices.stockOrderDetailData
  );
  const stockOrderFormDataId = useSelector(
    (state) => state.stockSlices.stockOrderFormDataId
  );
  const stockOrderDetailDataId = useSelector(
    (state) => state.stockSlices.stockOrderDetailDataId
  );
  const transferDrawer = useSelector(
    (state) => state.stockSlices.transferDrawer
  );
  const multiTransferDrawer = useSelector(
    (state) => state.stockSlices.multiTransferDrawer
  );
  const multiAssignDrawer = useSelector(
    (state) => state.stockSlices.multiAssignDrawer
  );
  const splitDrawer = useSelector((state) => state.stockSlices.splitDrawer);
  const assignDrawer = useSelector((state) => state.stockSlices.assignDrawer);
  const RSubData = useSelector((state) => state.stockSlices.subData);
  const sessionId = useSelector((state) => state.stockSlices.sessionId);

  useEffect(() => {
    setSubData(RSubData);
  }, [RSubData]);

  useEffect(() => {
    if (refresh == true) {
      setCheckedSubItems([]);
    }
  }, [refresh]);

  const poNumber = RSubData[0]?.form[0].STOORD_NUMBER;
  const poDate = moment(RSubData[0]?.form[0]?.STO_DATE).format(
    "DD / MM / YYYY"
  );

  useEffect(() => {
    const accessTokenN =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(accessTokenN);
  }, []);

  const [payloadCsv, setPayloadCsv] = useState({
    data: {
      FINZ_FLAG: "N",
      LOC_ID: "",
      OFFSET: "",
      ORDER: "",
      RETURN_FLAG: "N",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      SEARCH: "",
      VOID_FLAG: "N",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
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
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "25",
      FINZ_FLAG: "",
      REC_NUMBER: "",
      STOCK_NUMBER: "",
      STOCK_DATE_FROM: "",
      STOCK_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      STOCK_STATUS: "New",
      WAR_ID: "",
      RETURN_FLAG: "",
    },
    action: "GetStockOrderList",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  });
  const [payloadA, setPayloadA] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "5",
      FINZ_FLAG: "",
      REC_NUMBER: "",
      STOCK_NUMBER: "",
      STOCK_DATE_FROM: "",
      STOCK_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      STOCK_STATUS: "Full Transferred |Full Assigned",
      WAR_ID: "",
      RETURN_FLAG: "",
    },
    action: "GetStockOrderList",
    method: "GetSaleOrder",
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

  const getAllWarehouse = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setWareHouse(data.Result));
    }
  };
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

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

  const getAllUser = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setUserList(data.Result));
    }
  };
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

  const getAllTaskVender = (data) => {
    dispatch(setVender(data.Result));
  };

  useEffect(() => {
    sendRequest(warehouseApi, "POST", wPayload, getAllWarehouse, token);
    sendRequest(userApi, "POST", userPayload, getAllUser, token);
    sendRequest(apiUrlVender, "POST", VenderPayload, getAllTaskVender, token);
  }, []);

  function getAllTaskF(data) {
    dispatch(loaderToggle(false));
    dispatch(setStockOrderList(data.Result.Results));
    const completedOrdered = data.Result.Results.filter((item) => {
      return item.STOCK_ORD_STATUS.includes("Full Assigned");
    });

    const unCompletedOrdered = data.Result.Results.filter((item) => {
      return !item.STOCK_ORD_STATUS.includes("Full Assigned");
    });
    setCompRowA(unCompletedOrdered);
    setCompRow(completedOrdered);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTaskF, accessToken);
  }, [payload]);
  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTaskF, accessToken);
  }, [payloadA]);

  const handleFilter = (e) => {
    const newData = {
      ...payload.data,
      REC_NUMBER: e.Rn ? e.Rn : "",
      STOCK_NUMBER: e.Stn ? e.Stn : "",
      STOCK_STATUS: e.St ? e.St : "",
      WAR_ID: e.Wn ? e.Wn : "",
      STOCK_DATE_FROM: e.Df ? e.Df : "",
      STOCK_DATE_TO: e.Dt ? e.Dt : "",
    };
    const newPayload = { ...payload, data: newData };
    setPayload(newPayload);
  };

  const [subHead, setSubHead] = useState([
    {
      title: "SUK",
      slector: "SKU_MANUFACTURE",
      Wid: 220,
      customComp: StockGridSku,
    },
    { title: "Name", slector: "DESCRIPTION", Wid: 120 },
    { title: "Location", slector: "LOCATION", Wid: 250 },
    // { title: "check", slector:"", Wid : 20, customComp:CheckBox},
    { title: "Lot", slector: "LOT_NUMBER", Wid: 120 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120, date: true },
    { title: "Action", slector: "WAR_ID", Wid: 120, customComp: SubGridAction },
    // { title: "MTH", Wid: 120 },
    { title: "OH Qty", slector: "QTY_ONHAND", Wid: 120 },
    { title: "Qty Recd", slector: "QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector: "QUANTITY", Wid: 120 },
  ]);

  const handleApply = () => {
    // console.log("Apply is chulling");
    // sendRequest(apiUrlC, "POST", payloadC, getAllTaskC, token);
    // sendRequest(
    //   apiUrlDetails,
    //   "POST",
    //   payloadDetails,
    //   getProdectDetailRes,
    //   token
    // );
  };

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
    if (stockOrderDetailData.length > 0) {
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
  }, [stockOrderDetailData]);

  function getAllTask(data) {
    dispatch(loaderToggle(false));
    dispatch(setStockOrderList(data.Result.Results));

    const unCompletedOrdered = data.Result.Results.filter((item) => {
      return !item.STOCK_ORD_STATUS.includes("Full Assigned");
    });
    setCompRowA(unCompletedOrdered);
    setErrorM(error);
  }
  function getAllTaskA(data) {
    dispatch(loaderToggle(false));
    const completedOrdered = data.Result.Results.filter((item) => {
      return item.STOCK_ORD_STATUS.includes("Full Assigned");
    });
    setCompRow(completedOrdered);
    setErrorM(error);
  }
  function getAllTaskCsv(data) {
    dispatch(setCSvData(data.Result.Results));
    dispatch(loaderToggle(false));
  }

  useEffect(() => {
    if (accessToken) {
      dispatch(loaderToggle(true));
      sendRequest(apiUrl, "POST", payloadCsv, getAllTaskCsv, accessToken);
    }

    let apiData = [
      {
        api: apiUrl,
        payload: payload,
        func: getAllTask,
        token: accessToken,
        title: "Active",
      },
      {
        api: apiUrl,
        payload: payloadA,
        func: getAllTaskA,
        token: accessToken,
        pagination: true,
        title: "Completed",
      },
    ];

    setAPIProp(apiData);
  }, [accessToken]);

  const [head, setHead] = useState([
    {
      title: "Stock #",
      slector: "STOORD_NUMBER",
      Wid: 275,
      filter: "textFilter",
      Modal: StockFormModall,
      Drawer: StockOrderFormModal,
    },
    { title: "Stock Date", slector: "STOORD_DATE", Wid: 160, date: true },
    { title: "Receiving", slector: "RECEIVING_NUMBER", Wid: 200 },
    { title: "ReceivingDate", slector: "RECEIVING_DATE", Wid: 160, date: true },
    {
      title: "Status",
      slector: "STOCK_ORD_STATUS",
      Wid: 250,
      Status: StockStatus,
      filter: "checkFilter",
      checkFilterOptions: [
        "Full Transferred |Full Assigned",
        "Initiated",
        "NEW",
        "Full Transferred |Not Assigned",
        "Partial Transferred |Not Assigned",
        "Partial Transferred | Partial Assigned",
      ],
    },
    { title: "Warehouse", slector: "INVENTORY", Wid: 220 },
    {
      title: "Action",
      slector: "STOCK_ORD_STATUS",
      Wid: 250,
      Status: StockOrderAction,
      filter: "checkFilter",
      checkFilterOptions: [
        "Full Transferred |Full Assigned",
        "Initiated",
        "NEW",
        "Full Transferred |Not Assigned",
        "Partial Transferred |Not Assigned",
        "Partial Transferred | Partial Assigned",
      ],
    },
  ]);
  const Drawrtabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: (
        <div>
          <StockOrderDrawr btnText="Add New" />
        </div>
      ),
    },
    {
      //   icon: <SlArrowDown className="pl-2 text-md" />,
      label: "More",
      content: <div>Content for More</div>,
    },
  ];
  const newFuncForm = () => {
    //dispatch(openNModall())
  };

  const optionForm = [
    {
      label: "Issue",
      icon: IoIosAdd,
      onClick: newFuncForm,
    },
  ];
  const handleSearch = (e) => {};
  const filterTabsForm = {
    actionBtn: {
      option: optionForm,
      label: "Issue",
      icon: IoIosAdd,
      onClick: newFuncForm,
    },
    search: {
      handleSearch: handleSearch,
      resetSearch: resetSearch,
      setResetSearch: setResetSearch,
    },

    // navigatorShow :  false ,
    // sortShow : false ,
    // hideShow : false ,

    //  filterShow : false ,
    //  search :{
    //   searchShow : false
    //  }
    //  filterTool : false
  };
  const FormArray = [
    {
      label: "header",
      Form: (
        <div className="flex px-4 mr-2 gap-4  ">
          <div className="w-1/2">
            <StockOrderLeftForm />
          </div>
          <div className="w-1/2">
            <StockOrderRightForm />
          </div>
        </div>
      ),
      MinForm: ["Vender", "Warehouse"],
    },
  ];
  const FormTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: FormArray,
    },
    // {
    //   icon: <GoHome />,
    //   label: "Second",
    //   content: FormArrayT,
    // },
  ];
  const [Modaltabs, setModaltabs] = useState([
    {
      icon: <GoHome />,
      label: "Main",
      content: <StockForm />,
    },
    {
      icon: <SlArrowDown className="pl-2 text-md" />,
      label: "Activity",
      content: <StockActivityLogForm />,
    },
  ]);

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
    if (colapsComp) {
      dispatch(setColapsRedux(false));
    } else {
      dispatch(setColapsRedux(true));
    }
  };

  const selectedRow = (index, data) => {
    // // console.log('check slected row Data and index' , index , data);
  };
  // checked for Grid //
  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = compRowA?.map((SData, i) => {
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

  // checked for SubGrid //

  const handleSubCheckboxChange = (rowI, rowData) => {
    const order = subData?.filter((itemsub) => itemsub.id == checkOpenSubGrid);
    const stockOrderStatus = order[0]?.form[0]?.STOCK_ORD_STATUS;
    const warId = checkedSubItems[0]?.rowData.WAR_ID;
    const checkWar = warId == 3909 || warId == 3024 ? "transfer" : "assign";
    const release = checkedSubItems[0]?.rowData.LOT_RELEASE_FLAG;

    if (
      stockOrderStatus == "NEW" ||
      stockOrderStatus == "Initiated" ||
      stockOrderStatus == "Full Transferred |Not Assigned"
    ) {
      selectedFun(rowI, rowData, order);
    } else if (
      stockOrderStatus == "Partial Transferred |Not Assigned" ||
      stockOrderStatus == "Partial Transferred | Partial Assigned" ||
      stockOrderStatus == "Full Transferred | Partial Assigned"
    ) {
      if (rowData == "all") {
        setEMessage("You can only select transfer or assign product");
        setIsErrorMessage(true);
      } else if (
        checkedSubItems.length == 0 &&
        rowData.USE_ID_ASSIGNED_TO == null
      ) {
        electionValidation(rowI, rowData);
      } else {
        if (checkWar == "transfer" && release == "Y") {
          if (
            (rowData.WAR_ID == 3909 || rowData.WAR_ID == 3024) &&
            rowData.LOT_RELEASE_FLAG == "Y" &&
            rowData.USE_ID_ASSIGNED_TO == null
          ) {
            electionValidation(rowI, rowData);
          } else {
            setEMessage(
              "You can not select assign, Release and assigned product"
            );
            setIsErrorMessage(true);
          }
        } else if (checkWar == "assign" && release == "Y") {
          if (
            rowData.WAR_ID != 3909 &&
            rowData.WAR_ID != 3024 &&
            rowData.USE_ID_ASSIGNED_TO == null &&
            rowData.LOT_RELEASE_FLAG == "Y"
          ) {
            electionValidation(rowI, rowData);
          } else {
            setEMessage(
              "You can not select transfer, Release and assigned product"
            );
            setIsErrorMessage(true);
          }
        } else if (release == "N") {
          if (rowData.LOT_RELEASE_FLAG == "N") {
            electionValidation(rowI, rowData);
          } else {
            setEMessage(
              "You can not select transfer, assign and assigned product"
            );
            setIsErrorMessage(true);
          }
        }
      }
    }
  };

  const electionValidation = (rowI, rowData) => {
    if (isSubChecked(rowI, rowData)) {
      setCheckedSubItems(
        checkedSubItems.filter(
          (item) => item.rowI !== rowI && item.rowData !== rowData
        )
      );
    } else {
      setCheckedSubItems([...checkedSubItems, { rowI, rowData }]);
    }
  };

  const selectedFun = (rowI, rowData, order) => {
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
        // Remove the item if it's already checked
        setCheckedSubItems(
          checkedSubItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedSubItems([...checkedSubItems, { rowI, rowData }]);
      }
    }
  };

  const isSubChecked = (rowI, rowData) => {
    return checkedSubItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    if (checkedItems.length > 0) {
      // // console.log('kuch data log hoa hai');
      setIsOpenS(true);
    } else {
      setIsOpenS(false);
    }
  }, [checkedItems]);

  useEffect(() => {
    if (checkedSubItems.length > 0) {
      // // console.log('kuch data log hoa hai');
      setIsOpenSub(true);
    } else {
      setIsOpenSub(false);
    }
  }, [checkedSubItems]);

  const handleCloseDrawer = () => {};

  const closeModallSlected = () => {
    setIsOpenSub(false);
    setCheckedSubItems([]);
  };
  // console.log('check respose of stock form' , checkOpenSubGrid);

  const postEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostEditScreenSessions`;
  const postKillScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostKillScreenSessions`;
  const getEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;
  const apiUrlLot = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;

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
      dispatch(setSessionId(""));
    }
  };

  const generateKillSessionPayload = () => ({
    action: "Inventory",
    data: { EDISCRSES_ID: sessionId },
    method: "PostKillScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  });

  const handleCloseModal = () => {
    setOnRefresh(true);
    dispatch(cleanCheckItems());
    const killSessionPayload = generateKillSessionPayload();
    sendRequest(
      postKillScreenSessions,
      "POST",
      killSessionPayload,
      killSessionRes,
      accessToken
    );
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
    setCheckedSubItems([]);
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
        SOURCE_PK: getData?.INVSTO_ID.toString(),
        SOURCE_TABLE: "STOCK_ORDER",
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
        SOURCE_NO: getData?.STOORD_NUMBER,
        SOURCE_PK: getData?.INVSTO_ID.toString(),
        SOURCE_TABLE: "STOCK_ORDER",
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

  const openSubGridWithSessionCheck = (getData) => {
    setCheckOpenSubGrid(getData.INVSTO_ID);
    const getAllTaskGet = (data) => {
      const getDataDet = {
        // statusId: getData.PO_CURRENT_STATUS,
        id: getData.INVSTO_ID,
        product: data.Result.Table1,
        form: data.Result.Results,
      };
      dispatch(orderProductUpdate(getDataDet));
      // setSubData((prev) => [...prev, getDataDet]);
    };

    const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;
    const payloadGet = {
      data: {
        INVSTO_ID: getData.INVSTO_ID,
        OFFSET: "+5.00",
      },
      action: "InventoryWeb",
      method: "GetSaleOrder",
      type: "rpc",
      tid: "144",
    };

    let finde = subData.some((data) => data.id == getData.INVSTO_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAllTaskGet, accessToken);
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
          addFooterComp: false,
          addFooterSubComp: false,
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
          // setHActive : setHActive ,
          // hActive : hActive ,
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVSTO_ID",
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
          subActiveKey: "TOTAL_PRODUCTS",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "INVSTO_ID",
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
    subHead,
    head,
    checkedSubItems,
  ]);

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
        GridColor: "#3F51B5",
      },
      data: {
        Griddata: RSubData[0]?.product,

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
        addFooterComp: false,
        // addFooterSubComp : false ,
        // subAddButton : false ,
        // GriddFooterAdd: PurchaseAddSubGrid,
        // SubGriddFooterAdd : PurchaseAddSubGrid ,
      },
      checkBox: {
        selectedRow: selectedSubRow,
        // checked: subChecked,
        // handleCheckboxChange: handleSubCheckboxChange,
      },
      subGridActive: {
        setHActive: setHActive,
        hActive: hActive,
        // subActiveKey : "PO_COUNT" ,
        // subInActiveVal : 0 ,
        // subGridOpen :subGridOpen , selectedRow
        // idKey : "PURORD_ID" ,
      },

      MoreOption: MoreOption,

      // MoreOpt : MoreOption ,
      // setEdite: setSubEdite,

      ref: itemGridRef,
      // fixHight : false
    };

    // setGridArrP(gridArr)
    setSubGridArr(gridArr);
  }, [stockOrderDetailData, subColaps, subHead, hActive]);

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
  const filterTabs = {
    // actionBtn: {
    //   option: option,
    //   label: "New",
    //   icon: IoIosAdd,
    //   onClick: newFunc,
    // },

    filter: {
      handleFilter: handleFilter,
      FilterComp: StockFilter,
    },
    // search: {
    //   searchShow: true,
    // },
  };
  const mainTabs = [
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
  const tabs = [
    {
      label: "Transfer",
      content: (
        <StockRightDrawer
          id={stockOrderFormDataId}
          rowId={stockOrderDetailDataId}
        />
      ),
    },
  ];
  const handleTransferCloseDrawer = () => {
    dispatch(setTransferDrawer(false));
    dispatch(setSelectedWarid({}));
    dispatch(setLocations({ sec: [], row: [], bin: [], loc: [] }));
  };
  const handleMultiTransferCloseDrawer = () => {
    dispatch(setMultiTransferDrawer(false));
    dispatch(setSelectedWarid({}));
    dispatch(setLocations({ sec: [], row: [], bin: [], loc: [] }));
  };
  const handleAssignDrawer = () => {
    dispatch(setAssignDrawer(false));
  };
  const handleMultiAssignDrawer = () => {
    dispatch(setMultiAssignDrawer(false));
  };
  const handleSplitDrawer = () => {
    dispatch(setSplitDrawer(false));
    dispatch(setLocations({ sec: [], row: [], bin: [], loc: [] }));
  };
  const subDataObj = RSubData?.find((item) => item.id === stockOrderFormDataId);
  const product = subDataObj?.product.find(
    (item) => item.INVSTODET_ID === stockOrderDetailDataId
  );
  const tabM = [
    {
      label: "Transfer",
      content: (
        <StockMultiRightDrawer
          id={stockOrderFormDataId}
          product={subDataObj?.product}
        />
      ),
    },
  ];
  const tabA = [
    {
      label: "Assign",
      content: (
        <AssignDrawer id={stockOrderFormDataId} product={subDataObj?.product} />
      ),
    },
  ];
  const tabS = [
    {
      label: "Split",
      content: (
        <SplitRightDrawer
          id={stockOrderFormDataId}
          product={subDataObj?.product}
        />
      ),
    },
  ];
  return (
    <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
      {loading == true && <Loading />}

      <div ref={containerRef}>
        <MainTabsGrid
          tabs={mainTabs}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, completedGridRef]}
          scroll={scrollChange}
          // gridHeader = {false}

          // tabsShow={false}
        />
      </div>
      <RightDrawer
        isOpen={isDrawr}
        onClose={handleCloseDrawer}
        heading="Conversation"
        tabs={Drawrtabs}
      />
      <CustomModal
        tabs={Modaltabs}
        isOpen={isModal}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Stock Order"
        number={poNumber}
        date={poDate}
      />
      {/* <StockOrderSelectedModal
        isOpen={isOpenS}
        checkedItems={checkedItems?.length}
        closeModal={closeModallSlected}
      /> */}
      <StSubSlectedModal
        isOpen={isOpenSub}
        checkedItems={checkedSubItems?.length}
        closeModal={closeModallSlected}
        checkedItemsData={checkedSubItems}
        orderId={checkOpenSubGrid}
      />
      <RightDrawer
        isOpen={transferDrawer}
        setIsDrawer={handleTransferCloseDrawer}
        onClose={handleTransferCloseDrawer}
        heading={`${product?.SKU_MANUFACTURE} | ${product?.DESCRIPTION}`}
        tabs={tabs}
      />
      <RightDrawer
        isOpen={multiTransferDrawer}
        setIsDrawer={handleMultiTransferCloseDrawer}
        onClose={handleMultiTransferCloseDrawer}
        heading={`${subDataObj?.form[0].STOORD_NUMBER}`}
        tabs={tabM}
      />
      <RightDrawer
        isOpen={assignDrawer}
        setIsDrawer={handleAssignDrawer}
        onClose={handleAssignDrawer}
        heading={`${product?.SKU_MANUFACTURE} | ${product?.DESCRIPTION}`}
        tabs={tabA}
      />
      <RightDrawer
        isOpen={multiAssignDrawer}
        setIsDrawer={handleMultiAssignDrawer}
        onClose={handleMultiAssignDrawer}
        heading={`${subDataObj?.form[0].STOORD_NUMBER}}`}
        tabs={tabA}
      />
      <RightDrawer
        isOpen={splitDrawer}
        setIsDrawer={handleSplitDrawer}
        onClose={handleSplitDrawer}
        heading={`${product?.SKU_MANUFACTURE} | ${product?.DESCRIPTION}`}
        tabs={tabS}
      />
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
}

export default StockGridView;
