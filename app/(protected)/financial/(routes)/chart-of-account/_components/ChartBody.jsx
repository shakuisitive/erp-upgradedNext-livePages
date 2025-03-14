"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import ChartStatus from "./customComponents/ChartStatus";
import ChartForm from "./customComponents/chartForm/ChartForm";
// import ChartBudget from "./customComponents/chartBudgetForm/ChartBudgetForm";
import ChartBudget from "./customComponents/chartBudgetForm/chartBudgetForm";
// import { GrHomeRounded } from "react-icons/gr";
// import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
// import ChartActivity from "../_components/customComponents/ChartActivity";
import ChartrightDrawer from "../_components/customComponents/ChartRightDrawer";
// import TaxARighdd from "../_components/"
// import useApiFetch from "../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import ChartFormModal from "../_components/customComponents/ChartFormModal";

// import HTdrawer from "../htCodeMainListing/HTdrawer";
// import HTowner from "../htCodeMainListing/customComponents/HTowner";
import { GoHome } from "react-icons/go";
// import HtCodeForm from "../htCodeForm/HtCodeForm";
import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import { IoIosAdd } from "react-icons/io";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
// import EditChartForm from "../_components/customComponents/EditedFormModal";
// import HtCodeStatus from "./customComponents/HtCodeStatus";
import {
  closeEditModal,
  setNewModal,
  setRefreshing,
} from "../_redux/chartSlice";
// import HTinlineEditing from "../../_components/htCodeMainListing/HTinlineEditing";
// import HtCodeFormModal from "./customComponents/HtCodeFormModal";

const Chartbody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [hActive, setHActive] = useState({});
  // const [compRow, setCompRow] = useState([]);
  // const [compRowA, setCompRowA] = useState([]);
  // const [accessToken, setAccessToken] = useState();
  // const [errorM, setErrorM] = useState();

  // let [error, sendRequest] = useApiFetch();
  //   Refs
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState();
  const [activeData, setActiveData] = useState();
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  //useSelectors
  const accessToken = useSelector((state) => state.user.tokenSession);
  // const activityDrawer = useSelector(
  //   (state) => state.ChartSlice.activityDrawer
  // );
  // const formIndex = useSelector((state) => state.ChartSlice.formIndex);
  // const refreshing = useSelector((state) => state.ChartSlice.refreshing);
  // const Token = useSelector((state) => state.user.tokenSession);
  // //   const refreshing = useSelector((state) => state.prodCategorySlice.refreshing);
  // const editFormModal = useSelector((state) => state.ChartSlice.editFormModal);

  //f
  //useSelectors
  // const chartFormIndex = useSelector((state) => state.ChartSlice.formIndex);
  // const chartEditModal = useSelector(
  //   (state) => state.ChartSlice.chartEditModal
  // );
  const editFormModal = useSelector((state) => state.ChartSlice.editFormModal);
  const newFormModal = useSelector((state) => state.ChartSlice.newFormModal);
  const formIndex = useSelector((state) => state.ChartSlice.formIndex);
  const refreshing = useSelector((state) => state.ChartSlice.refreshing);
  console.log(refreshing, "refreshing");

  // const updateSalePriority = useSelector(
  //   (state) => state.tax.updateSalePriority
  // );
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();
  // const chartID = chartFormIndex?.CHART_ID;

  // //f
  // const handleCloseModal = () => {
  //   dispatch(closeModal());
  //   setRefresh(true);
  //   setIsModalOpen(false);
  // };
  // useEffect(() => {
  //   if (updateSalePriority) {
  //     setRefresh(true);
  //   }
  // }, [updateSalePriority]);

  // //Arrays
  // const Drawertabs = [
  //   {
  //     label: "Activity",
  //     icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
  //     content: <ActivityLog payloadid={formIndex?.CHART_ID} />,
  //   },
  // ];

  const [head, setHead] = useState([
    {
      title: "Account Number",
      slector: "ACCOUNT_NUMBER",
      Wid: 300,
      filter: "textFilter",
      child: true,
      Modal: ChartrightDrawer,
      Drawer: ChartFormModal,

      //  customComp: ,
      //   Modal: HTdrawer,
      //   Drawer: HtCodeFormModal,
    },
    {
      title: "Code",
      slector: "CODE",
      Wid: 300,
      // filter: "textFilter",
      // child: true,
      // filter: "checkFilter",
      // checkFilterOptions: ["NEW"],
      //  customComp: ,
      //   Modal: HTdrawer,
      //   Drawer: HtCodeFormModal,
    },

    {
      title: " Name",
      slector: "ACCOUNT_NAME",
      Wid: 300,
      filter: "textFilter",
      // child: true,
      // filter: "checkFilter",
      // checkFilterOptions: ["NEW"],
      //  customComp: ,
      //   Modal: HTdrawer,
      //   Drawer: HtCodeFormModal,
    },

    // {
    //   title: "Description",
    //   slector: "DESCRIPTION",
    //   //   customComp: HTinlineEditing,
    //   Wid: 150,
    // },
    {
      title: "Proposed Budget",
      slector: "PROPOSED_BUDGET",
      //   customComp: HTinlineEditing,
      Wid: 150,
      // filter: "checkFilter",
      filter: "textFilter",
      // checkFilterOptions: ["NEW"],
    },
    {
      title: "Current Budget",
      slector: "CURRENT_BUDGET",
      //   customComp: HTinlineEditing,
      Wid: 150,
      // filter: "checkFilter",
      // filter: "textFilter",
      // checkFilterOptions: ["NEW"],
    },
    {
      title: "Gl Group",
      slector: "CATEGORY_GROUP",
      Wid: 270,
      Status: "",
      // filter: "checkFilter",
      filter: "textFilter",
      // checkFilterOptions: ["NEW"],
      //   customComp: HTowner,
    },

    {
      title: "Status",
      slector: "",
      Wid: 150,
      Status: ChartStatus,
    },
  ]);

  const option = [{}];
  const NewModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <ChartForm />,
    },
    {
      // icon: <GoHome />,
      label: "Budget",
      content: <ChartBudget />,
    },
    {
      // icon: <GoHome />,
      label: "Audit Log",
      content: <ChartForm />,
    },
  ];
  const EditModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <ChartForm />,
    },
    {
      label: "Activity Log",
      content: <ActivityLog payloadid={formIndex?.GLACC_ID} />,
    },
  ];

  const handleCloseModal = () => {
    // setIsModalOpen(false);
    dispatch(closeEditModal());
  };
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        dispatch(setNewModal());
      },
    },

    filter: {
      handleFilter: () => {},
      // FilterComp: PromotionFilter,
    },
    // navigatorShow :  false ,
    sortShow: false,
    // hideShow : false ,

    filterShow: false,
    //  search :{
    //   searchShow : false
    //  }
    //  filterTool : false
  };

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Details",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.PromotionApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  //Payloads
  const payload = {
    data: {
      RNUM_FROM:1,
      RNUM_TO:100,
      SEARCH: "",
      ACTIVE_FLAG: "Y",
      ORDER: "",
      OFFSET: "",
    },
    action: "Administration",
    method: "GetShipCarrierList",
    username: "sales",
    type: "rpc",
    tid: "144",
  };

  //functions

  // const handleCloseDrawer = () => {
  //   dispatch(closeDrawer());
  // };
  const handleGetPartDetList = (data) => {
    setData(data.Result || data.Results);
    const dataToUse = data?.Result || data?.Results;
    const dataInActive = dataToUse?.filter((item) => {
      return item.ACTIVE_FLAG === "N";
    });

    const dataActive = dataToUse.filter((item) => {
      return item.ACTIVE_FLAG == "Y";
    });

    setActiveData(dataActive);
    setInactiveData(dataInActive);
  };

  const onRefreshHandle = () => {
    setRefresh(true);
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  const exportProps = {
    fileName: "",
    fileExtension: "xls",
    data: [],
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
  const selectedRow = (index, data) => {};
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  //useEffect
  useEffect(() => {
    setRefresh(true);
    // dispatch(setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);

  // useEffect(() => {
  //   const Token =
  //     typeof localStorage !== "undefined"
  //       ? localStorage.getItem("tokenSession")
  //       : null;
  //   setAccessToken(Token);
  // }, []);

  // for token
  // useEffect(() => {
  //   const Token =
  //     typeof localStorage !== "undefined"
  //       ? localStorage.getItem("tokenSession")
  //       : null;
  //   setAccessToken(Token);
  // }, []);
  // for grid Array
  useEffect(() => {
    const gridArr = [
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },

        title: {
          GridTitle: "Active",
          GridColor: "#4ade80",
        },
        data: {
          Griddata: activeData,
        },
        colapsList: {
          GridColaps: true,
          colaps: colaps,
          setColaps: setColaps,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: false,
          addFooterSubComp: false,
          //   GriddFooterAdd: NewProdCategory,
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },

        ref: activeGridRef,
        fixHight: false,
      },
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },

        title: {
          GridTitle: "Inactive",
          GridColor: "#F87171",
        },
        data: {
          Griddata: inactiveData,
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
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },

        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [inactiveData, activeData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: ItemMaster.GetGlAccounts,
          payload: payload,
          func: handleGetPartDetList,
          token: accessToken,
          // token: Token,
          title: "Active",
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
          addButton={false}
          // GriddFooterAdd={TaxAdd}
        />
        {/* //   GriddFooterAdd={NewProdCategory} */}
      </div>
      <NewCustomModal
        isOpen={formIndex?.GLACC_ID ? editFormModal : newFormModal}
        onClose={handleCloseModal}
        tabs={formIndex?.GLACC_ID ? EditModalTabs : NewModalTabs}
        heading=" Chart Account Form"
      />
      {/* <RightDrawer
        isOpen={activityDrawer}
        onClose={handleCloseDrawer}
        heading={formIndex?.CODE}
        tabs={Drawertabs}
      /> */}
    </div>
  );
};

export default Chartbody;
