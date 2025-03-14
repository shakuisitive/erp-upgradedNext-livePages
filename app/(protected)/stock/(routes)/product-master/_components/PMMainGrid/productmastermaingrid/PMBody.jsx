import React, { useEffect, useRef, useState } from "react";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import CommonApiFetch from "../../../../../../../../components/misc/pureComponents/ApiFetch/CommonApiFetch";
import PMDetail from "../../PMForm/PMDetailTab/PMDetail";
import PMKit from "../../PMForm/PMKitTab/PMKit";
import PMCost from "../../PMForm/PMCostTab/PMCost";
import PMCustomerPart from "../../PMForm/PMCustomerPartTab/PMCustomerPart";
import PMVendorPart from "../../PMForm/PMVendorPartTab/PMVendorPart";
import PMActivitylog, {
  PMActivitylogs,
} from "../../PMForm/PMActivity/PMActivitylog";
import PMPrice from "../../PMForm/PMPriceTab/PMPrice";
import PMGridOHQty from "./customComponent/PMGridOHQty";
import PMGridAvlQty from "./customComponent/PMGridAvlQty";
import PMGridCost from "./customComponent/PMGridCost";
import PMGridPrice from "./customComponent/PMGridPrice";
import PMNewPart from "./customComponent/PMNewPart";
import PMVariance from "../../PMForm/PMVarianceTab/PMVariance";
import PMWebAttributes from "../../PMForm/PMWebAttributesTab/PMWebAttributes";
import PMUpsale from "../../PMForm/PMUpsaleTab/PMUpsale";
import PMGridOwner from "./customComponent/PMGridOwner";
import PMGridType from "./customComponent/PMGridType";

import PMFormModal from "../PMFormModal";
import PMKitFormModal from "../../PMForm/PMKitTab/components/pmKitFormModal/PMKitFormModal";
import PMRightDrawer from "../PMRightDrawer";
import PMFilter from "../../PMFilter";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import PMGridMoreOption from "../../PMGridMoreOption";
import SubGridLocation from "../../PMSubGrid/DetailSubGrid/SubGridLocation";
import SubGridSubItem from "../../PMSubGrid/DetailSubGrid/SubGridSubItem";
import SubHeadStatus from "../../PMMainGrid/pmSubHead/SubHeadStatus";
import SubGridGroup from "../../PMSubGrid/DetailSubGrid/SubGridGroup";
import PMKitStatus from "../../PMForm/PMKitTab/pmKitGrid/pmKitGridComponents/PMKitStatus";
import {
  AiOutlineIssuesClose,
  IoIosAdd,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  NewModal,
  clearKitDetForm,
  clearKitSubGrid,
  clearPartData,
  closeKitModal,
  closeModal,
  loaderToggle,
  setBrand,
  setCostDrawer,
  setDuplicateDrawer,
  setLoader,
  setNewKitClose,
  setNewKitOpen,
  setPartList,
  setProdCat,
  setPurchaseGroup,
  setReportDrawer,
  setWareHouse,
} from "../../../redux/pmSlice";
import NewCustomModal from "../../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import {
  Administration,
  Inventory,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  payloadPartsList,
  PayloadKitList,
  payloadSpecial,
  payloadBolton,
  payloadNonStock,
  payloadInactive,
  payloadSubGrid,
} from "../../pmPayloadConstant";
import Loading from "../../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../../components/misc/bindComponent/MainTabsGrid";
import PMGridMoreOption from "../../PMGridMoreOption";
import ActivityLog from "../../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import PMKitFilter from "../../PMForm/PMKitTab/pmKitGrid/pmKitGridComponents/PMKitFilter";
import ReportForm from "../../PMForm/reportDrawer/ReportForm";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import PdfModal from "../../../../../../../../components/misc/pureComponents/modal/PdfModal";
import PMSelectedModal from "./customComponent/PMSelectedModal";
import DuplicateForm from "../../PMForm/duplicateFormDrawer/DuplicateForm";

const PMMainGrid = () => {
  // alert(errorMessage.purchase.zeroQty);
  // states
  const [accessToken, setAccessToken] = useState();
  const [spTotalRow, setSpTotalRow] = useState([]);
  const [boltonTotalRow, setBoltonTotalRow] = useState([]);
  const [nStockTotalRow, setNStockTotalRow] = useState([]);
  const [totalRows, setTotalRows] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [specialProp, setSpecialProp] = useState([]);
  let [boltonProp, setBoltonProp] = useState([]);
  let [nStockProp, setNStockProp] = useState([]);
  let [inActiveProp, setInActiveProp] = useState([]);
  let [kitProp, setKitProp] = useState([]);
  let [subGridArr, setSubGridArr] = useState();
  const [SubcheckedAll, setSubCheckedAll] = useState(false);
  const [checkedSubItems, setCheckedSubItems] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [kitGridArr, setKitGridArr] = useState();
  let [spGridArr, setSpGridArr] = useState();
  let [boltonGridArr, setBoltonGridArr] = useState();
  let [nStockGridArr, setNStockGridArr] = useState();
  let [inActiveGridArr, setInActiveGridArr] = useState();
  let [subData, setSubData] = useState([]);
  const [scrollChange, setScrollChange] = useState(1);
  const [loading, setLoading] = useState(null);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKitOpen, setIsKitOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  const dispatch = useDispatch();
  const [errorM, setErrorM] = useState();
  const [data, setData] = useState();
  const [kitData, setKitData] = useState([]);
  const [spData, setSpData] = useState();
  const [boltonData, setBoltonData] = useState();
  const [nStockData, setNStockData] = useState();
  const [inActiveData, setInActiveData] = useState();
  const [apiFetch, setApiFetch] = useState(false);
  const [kitActiveData, setKitActiveData] = useState([]);
  const [kitInActiveData, setKitInActiveData] = useState([]);
  const [pdf, setPdf] = useState({});
  const [pdfModal, setPdfModal] = useState(false);
  const [exportData, setExportData] = useState([]);
  // const [isReportDrawer, setIsReportDrawer] = useState(false);
  const [isCheckedOpen, setIsCheckedOpen] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  //useSelectors
  // const refreshing = useSelector((state) => state.pmSlices.refresh);
  const isDrawer = useSelector((state) => state.pmSlices.duplicateDrawer);

  const subGroupList = useSelector((state) => state.commonSlices.subGroupList);
  const EditForm = useSelector((state) => state.pmSlices.isModal);
  const newForm = useSelector((state) => state.pmSlices.isModal);
  const KitEditForm = useSelector((state) => state.pmSlices.isKitModal);
  const isReportDrawer = useSelector((state) => state.pmSlices.reportDrawer);
  const duplicateDrawer = useSelector(
    (state) => state.pmSlices.duplicateDrawer
  );
  const refreshing = useSelector((state) => state.pmSlices.refresh);
  const formIndex = useSelector((state) => state.pmSlices.formIndex);
  const kitFormIndex = useSelector((state) => state.pmSlices.kitFormIndex);
  const pmPartList = useSelector((state) => state.pmSlices.partList);
  const isKitNewOpen = useSelector((state) => state.pmSlices.isNewkitOpen);
  const Token = useSelector((state) => state.user.tokenSession);
  const ParId = formIndex?.PAR_ID;
  const KitId = kitFormIndex?.KIT_ID;
  // const Token =
  //   typeof localStorage !== "undefined"
  //     ? localStorage.getItem("tokenSession")
  //     : null;
  const [payload, setPayload] = useState({
    data: {
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: "Y",
      SEARCH: "",
      RNUM_FROM: "1",
      RNUM_TO: "25",
      OH_QTY_FROM: "",
      OH_QTY_TO: "",
      WAR_ID: "",
      EXPIRY_DATE_FROM: "",
      EXPIRY_DATE_TO: "",
    },
    action: "ItemMaster",
    method: "GetKitList",
    username: "admin",
    type: "rpc",
    tid: "144",
  });

  const [mainPayload, setMainPayload] = useState({
    data: {
      SEARCH: "",
      ACTIVE_FLAG: "",
      OFFSET: "+4:00",
      ORDER: "PAR_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 25,
    },
    action: "ItemMaster",
    method: "GetPartsList",
    username: "admin",
    type: "rpc",
    tid: "144",
  });

  useEffect(() => {
    if (subGroupList?.length === 0) {
      setApiFetch(true);
    }
  }, [subGroupList]);
  useEffect(() => {
    if (checkedItems.length > 0) {
      setIsCheckedOpen(true);
    } else {
      setIsCheckedOpen(false);
    }
  }, [checkedItems]);
  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const kitactiveGridRef = useRef(null);
  const kitInactiveGridRef = useRef(null);
  const InactiveGridRef = useRef(null);

  // ];
  const handleApply = () => {
    // console.log("hello");
  };

  const NewModalTab = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <PMDetail />,
    },
  ];
  const handleCloseModal = () => {
    dispatch(setCostDrawer(true));
    dispatch(closeModal());
    // setIsModalOpen(false);
    // setRefresh(true);
    // dispatch(setRefresh());
  };
  const KitModalTab = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <PMKit />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={kitFormIndex?.KIT_ID} />,
    },
  ];
  const newKitModalTab = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <PMKit />,
    },
  ];
  const EditModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <PMDetail />,
    },
    {
      label: "Customer Part",
      content: <PMCustomerPart />,
    },
    {
      label: "Vendor Part",
      content: <PMVendorPart />,
    },
    {
      label: "UpSale",
      content: <PMUpsale/>,
    },
    {
      label: "Cost",
      content: <PMCost />,
    },
    {
      label: "Price",
      content: <PMPrice onClose={handleCloseModal} />,
    },
    {
      label: "Web Attributes",
      content: <PMWebAttributes />,
    },
    {
      label: "Variance",
      content: <PMVariance />,
    },
    {
      label: "Part Identifier",
      content: <div>This is Part Identifier content</div>,
    },
    {
      label: "Promotion",
      content: <div>This is Promotion content</div>,
    },
    {
      label: "Activity",
      content: <PMActivitylogs />,
    },
  ];

  const [kitHead, setKitHead] = useState([
    {
      title: "Kit",
      slector: "CODE",
      Wid: 250,
      filter: "textFilter",
      child: true,
      Modal: PMRightDrawer,
      Drawer: PMKitFormModal,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: PMGridOwner,
      hidden: false,
      def: false,
      edit: false,
      sticky: true,
      TComp: "",
    },
    {
      title: "Kit Date",
      slector: "KIT_DATE",
      Wid: 150,
      Status: "",
      // filter: "checkFilter",
      // checkFilterOptions: ["NEW"],
      date: true,
    },
    { title: "Description", slector: "DESCRIPTION", Wid: 160 },
    { title: "Status", slector: "Status", Wid: 150, Status: PMKitStatus },
    { title: "OH Qty", slector: "OH_QTY", Wid: 100 },
    { title: "AV Qty", slector: "AVL_QTY", Wid: 100 },
    { title: "Start Date", slector: "START_DATE", Wid: 150, date: true },
    { title: "End Date", slector: "END_DATE", Wid: 150, date: true },

    { title: "Price", slector: "PRICE", Wid: 100 },
  ]);
  const [head, setHead] = useState([
    {
      title: "Product",
      slector: "PAR_CODE",
      Wid: 300,
      filter: "textFilter",
      sticky: true,
      // edit: true,
      Modal: PMRightDrawer,
      Drawer: PMFormModal,
      child: true,
    },
    // {
    //   title: "Owner",
    //   slector: "",
    //   Wid: 100,
    //   customComp: PMGridOwner,
    //   hidden: false,
    //   def: false,
    //   edit: false,
    //   sticky: true,
    //   TComp: "",
    // },

    { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 200, edit: true },
    // {
    //   title: "Type",
    //   slector: "Type",
    //   Wid: 100,
    //   Status: PMGridType,
    //   // filter: "checkFilter",
    //   // checkFilterOptions: ["Stock", "Non Stock"],
    //   hidden: false,
    //   def: false,
    //   // edit: true,
    // },
    { title: "UPC", slector: "UPC_MANUFACTURE", Wid: 200, edit: true },
    {
      title: "Description",
      slector: "DESCRIPTION",
      Wid: 300,
      edit: true,
    },
    // { title: "Preffered Supplier", slector: "SUPPLIER", Wid: 150 },
    {
      title: "OH Qty",
      slector: "OH_QUANTITY",
      Wid: 80,
      tottal: true,
      TComp: PMGridOHQty,
      edit: true,
    },

    {
      title: "AV Qty",
      slector: "QTY_AVAILABLE",
      Wid: 80,
      tottal: true,
      TComp: PMGridAvlQty,
    },
    {
      title: "Cost",
      slector: "STANDARD_COST",
      Wid: 80,
      tottal: true,
      TComp: PMGridCost,
    },
    {
      title: "Price",
      slector: "PRICE",
      Wid: 80,
      tottal: true,
      TComp: PMGridPrice,
    },
    // {
    //   title: "Status",
    //   slector: "Status",
    //   Wid: 100,
    //   Status: SubHeadStatus,
    //   // filter: "checkFilter",
    //   // checkFilterOptions: ["Active", "Inactive"],
    // },
  ]);
  const [subHead, setSubHead] = useState([
    {
      title: "SubItem",
      slector: "NAME",
      Wid: 280,
      customComp: SubGridSubItem,
    },
    {
      title: "Location",
      slector: "LOCATION",
      Wid: 120,
      customComp: SubGridLocation,
    },
    { title: "Lot Number", slector: "LOT_NUMBER", Wid: 120 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120, date: true },
    { title: "Rem Months", slector: "Rem_Months", Wid: 120 },
    {
      title: "Group",
      slector: "PURCHASE_GROUP",
      Wid: 120,
      customComp: SubGridGroup,
    },
    { title: "OH Qty", slector: "OH_QUANTITY", Wid: 120 },
    { title: "AV Qty", slector: "AVL_QUQNTITY", Wid: 120 },
    { title: "Min/Max", slector: "MinMax", Wid: 120 },
  ]);

  const handleKitFilter = (e) => {
    const newData = {
      ...payload.data,
      EXPIRY_DATE_FROM: e.Df ? e.Df : "",
      EXP_DATE_TO: e.Dt ? e.Dt : "",
      WAR_ID: e.Wn ? e.Wn : "",
      OH_QTY_FROM: e.Of ? e.Of : "",
      OH_QTY_TO: e.Ot ? e.Ot : "",
    };
    const newPayload = { ...payload, data: newData };
    setPayload(newPayload);
  };

  const handleMainPartFilter = (e) => {
    const newData = {
      ...mainPayload.data,
      EXPIRY_DATE_FROM: e.Df ? e.Df : "",
      EXP_DATE_TO: e.Dt ? e.Dt : "",
      WAR_ID: e.Wn ? e.Wn : "",
      OH_QTY_FROM: e.Of ? e.Of : "",
      OH_QTY_TO: e.Ot ? e.Ot : "",
      PAR_ID: e.Pi ? e.Pi : "",
      INVPARLOT_ID: e.lot ? e.lot : "",
      WARSTOLOC_ID: e.Wl ? e.Wl : "",
      PARBRA_ID: e.Pc ? e.Pc : "",
      PARCAT_ID: e.Br ? e.Br : "",
      PURGROID: e.Pg ? e.Pg : "",
      ACTIVE_FLAG: e.Fg === "Show All" ? "" : "",
      BOLTON_FLAG: e.Fg === "Bolton" ? "Y" : "",
      SPECIAL_FLAG: e.Fg === "Special" ? "Y" : "",
      NON_STOCK_FLAG:
        e.Fg === "Non Stock Item" ? "N" : e.Fg === "Stock Item" ? "Y" : "",
    };
    const newPayload = { ...mainPayload, data: newData };
    setMainPayload(newPayload);
  };

  useEffect(() => {
    sendRequest(
      ItemMaster.GetPartsList,
      "POST",
      mainPayload,
      handlePartList,
      Token
    );
  }, [mainPayload]);

  useEffect(() => {
    sendRequest(ItemMaster.GetKitList, "POST", payload, handleKitList, Token);
  }, [payload]);

  const handleCloseReportDrawer = () => {
    dispatch(setReportDrawer(false));
    // setIsReportDrawer(false);
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

  const handleNewKitModalOpen = () => {
    dispatch(clearKitDetForm());
    dispatch(setNewKitOpen());
  };

  const option = [
    {
      label: "Kit",
      icon: IoIosAdd,
      onClick: handleNewKitModalOpen,
    },
    {
      label: "Report",
      icon: IoIosAdd,
      onClick: () => {
        // setIsReportDrawer(true);
        dispatch(setReportDrawer(true));
      },
    },
  ];
  useEffect(() => {
    if (isReportDrawer) {
      setIsCheckedOpen(false);
    }
  }, [isReportDrawer]);
  const handleNewPartModelOpen = () => {
    dispatch(clearPartData());
    dispatch(NewModal());
    // dispatch(closeModal());
    // setIsModalOpen(true);
  };

  const filterTabs = {
    actionBtn: {
      option: option,
      label: "+ New Part",
      // icon: IoIosAdd,
      onClick: handleNewPartModelOpen,
    },

    // actionBtn: {
    //   option: option,
    //   label: "New Part",
    //   // icon: IoIosAdd,
    //   onClick: handleNewPart,
    // },

    filter: {
      handleFilter: handleMainPartFilter,
      FilterComp: PMFilter,
      // popup: {
      //   icon: null, // Your icon
      //   // lable: "Filters",
      //   wid: "400px", // Specify the width you want to pass
      // },
    },

    // navigatorShow :  false ,
    sortShow: false,
    // hideShow : false ,

    //  filterShow : false ,
    //  search :{
    //   searchShow : false
    //  }
    //  filterTool : false
  };
  const kitFilterTabs = {
    filter: {
      handleFilter: handleKitFilter,
      FilterComp: PMKitFilter,
    },
    sortShow: false,
  };
  const spFilterTabs = {
    filter: {
      handleFilter: handleMainPartFilter,
      FilterComp: PMFilter,
    },
    sortShow: false,
  };

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Main Tab",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.partApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Special",
      Gridcontent: {
        gridArr: spGridArr,
        setGridArr: setSpGridArr,
        handleApi: specialProp.spApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: spFilterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Kits",
      Gridcontent: {
        gridArr: kitGridArr,
        setGridArr: setKitGridArr,
        handleApi: kitProp.kitApiData,
        defColmn: kitHead,
        setDefColmn: setKitHead,
        filterTabs: kitFilterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Non-Stock",
      Gridcontent: {
        gridArr: nStockGridArr,
        setGridArr: setNStockGridArr,
        handleApi: nStockProp.nStockApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: spFilterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Bolton",
      Gridcontent: {
        gridArr: boltonGridArr,
        setGridArr: setBoltonGridArr,
        handleApi: boltonProp.BoltonApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: spFilterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Inactive",
      Gridcontent: {
        gridArr: inActiveGridArr,
        setGridArr: setInActiveGridArr,
        handleApi: inActiveProp.inActiveApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: spFilterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  // console.log("totalrow check: ", totalRows);
  //   Functions
  function handlePartList(data) {
    setTotalRows(data?.Result?.Table1[0]?.TOTAL_COUNT);
    // setData(data?.Result?.Results);
    if (data.CODE === "SUCCESS") {
      setExportData(data?.Result?.Results);

      const dataActive = data?.Result?.Results?.filter((item) => {
        return item.ACTIVE_FLAG === "Y";
      });
      setCompRowA(dataActive);
      dispatch(setPartList(dataActive));
      setErrorM(error);
    }
    if (data.CODE === "SUCCESS") {
      const inactiveData = data?.Result?.Results?.filter((item) => {
        return item.ACTIVE_FLAG === "N";
      });

      setCompRow(inactiveData);
      setLoading(inactiveData);
    }
  }
  // console.log("total row", kitData[0]?.TOTALROW);
  const kitTotalRow = kitData[0]?.TOTALROW;
  function handleKitList(data) {
    if (data.CODE === "SUCCESS") {
      setExportData(data?.Result);
      const dataActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "Y";
      });
      setKitActiveData(dataActive);
      const dataInActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "N";
      });
      setKitInActiveData(dataInActive);
      setKitData(data?.Result);
      // setData(data?.Result);
      // dispatch(setLoader(false));

      setErrorM(error);
    }
  }

  function handleSpList(data) {
    if (data.CODE === "SUCCESS") {
      setSpTotalRow(data?.Result.Table1[0].SPECIAL_ACTIVE);
      setSpData(data?.Result?.Results);
      setExportData(data?.Result?.Results);
    }

    // dispatch(setLoader(false));

    // setLoading(false);
    setErrorM(error);
  }
  function handleBoltonList(data) {
    if (data.CODE === "SUCCESS") {
      setBoltonTotalRow(data?.Result.Table1[0].BOLTON);

      setBoltonData(data?.Result?.Results);
      setExportData(data?.Result?.Results);
    }

    // dispatch(setLoader(false));

    // setLoading(false);
    setErrorM(error);
  }
  function handleNStockList(data) {
    if (data?.CODE === "SUCCESS") {
      setNStockData(data?.Result?.Results);
      setExportData(data?.Result?.Results);
      setNStockTotalRow(data?.Result?.Table1[0].SHOW_ALL_NON_STOCK_ACTIVE);
    }

    // dispatch(setLoader(false));

    // setLoading(false);
    setErrorM(error);
  }
  function handleInActiveList(data) {
    if (data?.CODE === "SUCCESS") {
      const inactiveData = data?.Result?.Results?.filter((item) => {
        return item.ACTIVE_FLAG == "N";
      });
      setExportData(data?.Result?.Results);
      setInActiveData(inactiveData);
      setTotalRows(data?.Result?.Table1[0]?.TOTAL_COUNT);
    }

    // dispatch(setLoader(false));

    // setLoading(false);
    setErrorM(error);
  }

  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      console.log("function clicked");
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

  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };

  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result?.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems([]);
      // console.log("rowData all false: ", arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (isChecked(rowI, rowData)) {
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };

  const isChecked = (rowI, rowData) => {
    return checkedItems?.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  const handleSubCheckboxChange = (rowI, rowData) => {
    // if (subGridStatus == "Initiated" || subGridStatus == "New") {
    //   const order = subData?.filter(
    //     (itemsub) => itemsub.id == checkOpenSubGrid
    //   );
    //   if (rowData == "all" && SubcheckedAll == false) {
    //     setSubCheckedAll(true);
    //     const arr = order[0]?.product?.map((SData, i) => {
    //       let obj = {};
    //       obj = { rowI: i, rowData: SData };
    //       return obj;
    //     });
    //     setCheckedSubItems(arr);
    //   } else if (rowData == "all" && SubcheckedAll == true) {
    //     setSubCheckedAll(false);
    //     setCheckedSubItems([]);
    //   } else {
    //     if (isSubChecked(rowI, rowData)) {
    //       setCheckedSubItems(
    //         checkedSubItems.filter(
    //           (item) => item.rowI !== rowI && item.rowData !== rowData
    //         )
    //       );
    //     } else {
    //       setCheckedSubItems([...checkedSubItems, { rowI, rowData }]);
    //     }
    //   }
    // }
  };
  const isSubChecked = (rowI, rowData) => {
    // return checkedSubItems.some(
    //   (item) => item.rowData.PURORDDET_ID === rowData.PURORDDET_ID
    // );
  };
  const subGridOpen = (getData) => {
    const handleSubGrid = (data) => {
      // console.log("grid data sub grid", data);
      const getDataDet = {
        id: getData.PAR_ID,
        product: data.Result,
      };
      setSubData((prev) => [...prev, getDataDet]);
    };
    const payloadSubGrid = {
      data: {
        ACTIVE_FLAG: "Y",
        EXPIRY_FLAG: "N",
        ORDER: "",
        PAR_ID: getData.PAR_ID,
        RNUM_FROM: 1,
        RNUM_TO: 100,
        SEARCH: "",
        WAR_ID: "",
      },
      method: "GetPartLotList",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    let find = subData.some((data) => data.id == getData.PAR_ID);
    if (find == false) {
      sendRequest(
        Administration.GetPartLotALLList,
        "POST",
        payloadSubGrid,
        handleSubGrid,
        Token
      );
    }
  };
  useEffect(() => {
    if (refreshing) {
      setRefresh(true);
      setIsCheckedOpen(false);
    }
  }, [refreshing]);

  const handleKitCloseModal = () => {
    dispatch(setNewKitClose());
    dispatch(closeKitModal());
    dispatch(clearKitSubGrid());
  };

  const onRefreshHandle = () => {
    setRefresh(true);
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  // const Testdata = [{ id: 1, label: "hello" }];
  const exportProps = {
    fileName: "Download",
    fileExtension: "csv",
    data: exportData,
  };

  useEffect(() => {
    sendRequest(
      ItemMaster.GetKitList,
      "POST",
      PayloadKitList,
      handleKitList,
      Token
    );
  }, []);

  // for token

  // for grid Array
  const handleCloseDrawer = () => {
    // setIsDrawer(false);
    dispatch(setDuplicateDrawer(false));
    dispatch(clearPartData());
  };
  const tabs = [
    {
      label: "Duplicate",
      content: (
        <DuplicateForm
          setEMessage={setEMessage}
          onClose={handleCloseDrawer}
          setIsErrorMessage={setIsErrorMessage}
        />
      ),
    },
  ];
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
          addFooterComp: true,
          addFooterSubComp: false,

          GriddFooterAdd: PMNewPart,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
          handleSubCheckboxChange: handleSubCheckboxChange,
          isSubChecked: isSubChecked,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          subActiveKey: "details_lot_count",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "PAR_ID",
        },
        // MoreOpt: PMGridMoreOption,
        ref: activeGridRef,
        fixHight: false,

        // paginationList: {
        //   fixHight: "def",
        //   pagination: true,
        // },
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
          GridTitle: "Inactive",
          GridColor: "#FF0000",
        },
        data: {
          Griddata: compRow,
        },
        colapsList: {
          GridColaps: true,
          colaps: colapsComp,
          setColaps: setColapsComp,
          colapsfunc: colapsfuncComp,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        // subGridActive: {
        //   hActive: hActive,
        //   setHActive: setHActive,
        //   subActiveKey: "PO_COUNT",
        //   subInActiveVal: 0,
        //   subGridOpen: subGridOpen,
        //   idKey: "PURORD_ID",
        // },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: totalRows,
        },

        // MoreOption: PMGridMoreOption,

        ref: InactiveGridRef,
      },
    ];
    setGridArrP(gridArr);

    const KitArr = [
      {
        colmnList: {
          colmn: kitHead,
          setColmn: setKitHead,
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
          Griddata: kitActiveData,
          // subGridData: subData,
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

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },

        MoreOpt: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: kitactiveGridRef,
        fixHight: false,
      },
      {
        colmnList: {
          colmn: kitHead,
          setColmn: setKitHead,
        },
        subColumnList: {
          subComln: subHead,
          setSubColmn: setSubHead,
        },
        title: {
          GridTitle: "Inactive",
          GridColor: "#FF0000",
        },
        data: {
          Griddata: kitInActiveData,

          // subGridData: subData,
        },
        colapsList: {
          GridColaps: true,
          colaps: colapsComp,
          setColaps: setColapsComp,
          colapsfunc: colapsfuncComp,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        // subGridActive: {
        //   hActive: hActive,
        //   setHActive: setHActive,
        //   subActiveKey: "PO_COUNT",
        //   subInActiveVal: 0,
        //   subGridOpen: subGridOpen,
        //   idKey: "PURORD_ID",
        // },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: kitTotalRow,
        },

        MoreOption: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: kitInactiveGridRef,
        // fixHight : true
      },
    ];
    setKitGridArr(KitArr);

    const specialArr = [
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
          Griddata: spData,
          // subGridData: subData,
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

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: spTotalRow,
        },
        MoreOpt: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setSpGridArr(specialArr);

    const boltonArr = [
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
          Griddata: boltonData,
          // subGridData: subData,
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

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: boltonTotalRow,
        },
        MoreOpt: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setBoltonGridArr(boltonArr);

    const nStockArr = [
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
          Griddata: nStockData,
          // subGridData: subData,
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

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: nStockTotalRow,
        },

        MoreOpt: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setNStockGridArr(nStockArr);

    const inActiveArr = [
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
          GridTitle: "Inactive",
          GridColor: "#FF0000",
        },
        data: {
          Griddata: inActiveData,
          // subGridData: subData,
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

          // GriddFooterAdd: PurchaseGridAdd,
          // SubGriddFooterAdd: PurchaseAddSubGrid,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: isChecked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          // setHActive: setHActive,
          // hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },
        paginationList: {
          fixHight: "def",
          pagination: true,
          totalRow: totalRows,
        },
        MoreOpt: PMGridMoreOption,
        // setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setInActiveGridArr(inActiveArr);
  }, [
    compRowA,
    compRow,
    kitActiveData,
    kitInActiveData,
    spData,
    boltonData,
    nStockData,
    inActiveData,
    data,
    colaps,
    colapsComp,
    subData,
    head,
    checkedItems,
  ]);
  // for api
  useEffect(() => {
    let apiData = {
      partApiData: [
        {
          api: ItemMaster.GetPartsList,
          payload: mainPayload,
          func: handlePartList,
          token: Token,
          title: "Active",
        },
        {
          api: ItemMaster.GetPartsList,
          payload: mainPayload,
          func: handlePartList,
          token: Token,
          title: "Inactive",
        },
      ],
    };
    let inActiveApi = {
      inActiveApiData: [
        {
          api: ItemMaster.GetPartsList,
          payload: payloadInactive,
          func: handleInActiveList,
          token: Token,
          title: "Active",
        },
      ],
    };
    let nStockApi = {
      nStockApiData: [
        {
          api: ItemMaster.GetPartsList,
          payload: payloadNonStock,
          func: handleNStockList,
          token: Token,
          title: "Active",
        },
      ],
    };
    let boltonApi = {
      BoltonApiData: [
        {
          api: ItemMaster.GetPartsList,
          payload: payloadBolton,
          func: handleBoltonList,
          token: Token,
          title: "Active",
        },
      ],
    };
    let kitApi = {
      kitApiData: [
        {
          api: ItemMaster.GetKitList,
          payload: PayloadKitList,
          func: handleKitList,
          token: Token,
          title: "Active",
        },
      ],
    };
    let specialApi = {
      spApiData: [
        {
          api: ItemMaster.GetPartsList,
          payload: payloadSpecial,
          func: handleSpList,
          token: Token,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
    setSpecialProp(specialApi);
    setBoltonProp(boltonApi);
    setInActiveProp(inActiveApi);
    setNStockProp(nStockApi);
    setKitProp(kitApi);
  }, [Token]);
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
  return (
    <>
      {apiFetch == true && <CommonApiFetch />}
      {!loading ? (
        <Loading />
      ) : (
        // <span>hello</span>
        <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
          <div ref={containerRef}>
            <MainTabsGrid
              tabs={tabsmains}
              onRefresh={onRefresh}
              exportProps={exportProps}
              refArray={[activeGridRef, InactiveGridRef]}
              scroll={scrollChange}
              collapse={colapsfunc}
            />
          </div>

          <NewCustomModal
            isOpen={ParId ? EditForm : newForm}
            onClose={handleCloseModal}
            tabs={ParId ? EditModalTabs : NewModalTab}
            heading="Product Master"
          />
          <NewCustomModal
            isOpen={KitId ? KitEditForm : isKitNewOpen}
            onClose={handleKitCloseModal}
            tabs={KitId ? KitModalTab : newKitModalTab}
            heading="kit"
          />
          <RightDrawer
            isOpen={isReportDrawer}
            // setIsDrawer={setIsReportDrawer}
            onClose={handleCloseReportDrawer}
            heading={`Report Filters`}
            tabs={reportTabs}
          />
          <PMSelectedModal
            isOpen={isCheckedOpen}
            checkedItems={checkedItems?.length}
            closeModal={() => {
              setIsCheckedOpen(false);
              setCheckedItems([]);
            }}
            checkedSubItems={checkedItems}
            // checkAll={checkedAll}
          />
          {pdfModal && (
            <PdfModal
              setPdf={setPdf}
              pdf={pdf}
              setPdfModal={setPdfModal}
              pdfModal={pdfModal}
            />
          )}
          <RightDrawer
            isOpen={isDrawer}
            onClose={handleCloseDrawer}
            heading="Duplicate Form"
            tabs={tabs}
          />
        </div>
      )}
    </>
  );
};

export default PMMainGrid;
