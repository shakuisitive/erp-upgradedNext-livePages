"use client";
import React, { useEffect, useRef, useState } from "react";
import TaxAdd from "../_components/grid/TaxAdd";
import Loading from "../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import TaxStatus from "../_components/grid/TaxStatus";
import { Administration } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import { IoIosAdd } from "react-icons/io";
import { closeDrawer, setRefreshing } from "../redux/taxSlice";
import TaxRightDrawer from "../_components/grid/TaxRightDrawer";
import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import TaxActivity from "./grid/TaxActivity";
import Owner from "../_components/grid/Owner";
import InlineEditInput from "./grid/inlineEditInput";
import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { GrHomeRounded } from "react-icons/gr";
import { setNewModal, closeModal } from "../redux/taxSlice";
import TaxForm from "./taxForm/taxform";
import TaxName from "./customComponent/taxName";
import TaxName2 from "./customComponent/taxName2";
import TaxRatevalue2 from "./customComponent/taxRateValueTwo";
import TaxRateValue from "./customComponent/taxRateValue";

const TaxBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState();
  const [activeData, setActiveData] = useState();
  const [colapse, setColapse] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  //ff
  const [errorM, setErrorM] = useState();

  let [error, sendRequest] = useApiFetch();

  //useSelectors
  const refreshing = useSelector((state) => state.tax.refreshing);
  const activityDrawer = useSelector((state) => state.tax.activityDrawer);
  const formIndex = useSelector((state) => state.tax.formIndex);
  const Token = useSelector((state) => state.user.tokenSession);

  //f
  //useSelectors
  const taxFormIndex = useSelector((state) => state.tax.formIndex);
  const taxEditModal = useSelector((state) => state.tax.taxEditModal);
  const newFormModal = useSelector((state) => state.tax.newFormModal);

  const updateSalePriority = useSelector(
    (state) => state.tax.updateSalePriority
  );

  const taxID = taxFormIndex?.TAX_ID;

  //f
  const handleCloseModal = () => {
    dispatch(closeModal());
    setRefresh(true);
    setIsModalOpen(false);
  };

  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();

  //Arrays
  const Drawertabs = [
    {
      label: "Activity",
      icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
      content: <ActivityLog payloadid={formIndex?.TAX_ID} />,
    },
  ];

  const [head, setHead] = useState([
    {
      title: "Province Name",
      slector: "PROVINCE_NAME",
      Wid: 407,
      Modal: TaxRightDrawer,
      Drawer: TaxActivity,
      // customComp:InlineEditInput,
    },
    {
      title: "Owner",
      slector: "CODE",
      Wid: 270,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      customComp: Owner,
    },

    {
      title: " Tax Name",
      slector: "NAME",
      Wid: 150,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      // customComp: TaxName,
    },
    {
      title: " Tax Rate",
      slector: "TAX_VALUE",
      Wid: 150,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      // customComp: TaxRateValue,
      // Status: UowStatus
    },
    {
      title: " Tax Name Two",
      slector: "OTHER_NAME",
      Wid: 150,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      // customComp:TaxName2,
      // Status: UowStatus
    },

    {
      title: "TAX Value Two",
      selector: "OTHER_VALUE",
      wid: 150,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      customComp: TaxRatevalue2,
    },

    {
      title: "Status",
      slector: "ACTIVE_FLAG",
      Wid: 150,
      Status: TaxStatus,
      hidden: false,
      def: false,
      edit: false,
    },
  ]);

  const onRefreshHandle = () => {
    setRefresh(true);
  };

  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };

  const newFuncForm = () => {
    // dispatch(setnewInputFocus(true));
    // inputFocus()
    //Correct way to dispatch the action
  };
  //  const option= [ {

  //   }]

  const handleSearch = (e) => {
    clickHandler();
    clickHandler_body;
  };

  // const filterTabs = {
  //   actionBtn: {
  //   //  option: option,
  //   //    label: "New",
  //   //   icon: IoIosAdd,
  //   //    onClick: () => {

  //   //      dispatch();
  //   //    },
  //    },

  //   filter: {
  //     handleFilter: () => {},
  //     // FilterComp: PromotionFilter,
  //   },
  //   //  navigatorShow :  false ,
  //   sortShow: false,
  // //  hdeShow : false ,

  //   filterShow: false,
  //   //  search :{
  //   //   searchShow : false,
  //   //  }
  //   //  filterTool : false
  // };

  ////f

  const option = [];
  const handleFilter = () => {};
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        // setIsModalOpen(true);
        dispatch(setNewModal());
      },
    },
    filter: {
      handleFilter: handleFilter,
      // FilterComp: taxeFilter,
    },
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
        //  filterTabs: filterTabs,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : falses
      },
    },

    //f
  ];

  //Payloads
  const PayloadPartList = {
    action: "Administration",
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: 1,
      RNUM_TO: 25,
      PROSTA_ID: "",
      PROSTATAX_ID: "",
      ACTIVE_FLAG: "",
    },
    method: "GetAdmProvinceStateTaxesList",
    tid: "144",
    type: "rpc",
    username: "SALES",
  };
  ///f
  const NewModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <TaxForm />,
    },
  ];
  const EditModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <TaxForm />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={taxID} />,
    },
    // {
    //   label: "Location",
    //   content: <WarehouseLocation />,
    // },
  ];

  //f

  //functions
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const handleGetPartDetList = (data) => {
    setData(data.Result?.Results);
    const dataInActive = data?.Result?.Results.filter((item) => {
      return item.ACTIVE_FLAG === "N";
    });
    const dataActive = data?.Result?.Results.filter((item) => {
      return item.ACTIVE_FLAG === "Y";
    });

    setActiveData(dataActive);
    setInactiveData(dataInActive);
  };

  const exportProps = {
    fileName: "",
    fileExtension: "xls",
    data: data,
  };
  const colapsfunc = () => {
    if (colapse && !colapsComp) {
      setColapse(false);
      setColapsComp(true);
    } else {
      setColapse(!colapse);
    }
  };
  const colapsfuncComp = () => {
    if (!colapse && colapsComp) {
      setColapse(true);
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
    // dispatch(setRefreshing(true));
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);

  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);

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
          colaps: colapse,
          setColaps: setColapse,
          colapsfunc: colapsfunc,
        },
        footerComp: {
          addFooterComp: true,
          addFooterSubComp: false,
          GriddFooterAdd: TaxAdd,
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
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },

        ref: InactiveGridRef,
        fixHight: false,
      },
    ];

    setGridArrP(gridArr);
  }, [inactiveData, activeData, colapse, colapsComp, head]);

  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: Administration.GetAdmProvinceStateTaxesList,
          payload: PayloadPartList,
          func: handleGetPartDetList,
          token: Token,
          title: "Active",
        },
      ],
    };
    console.log(apiData, "apiData");

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
    <>
      <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
        {loading == true && <Loading />}
        <div ref={containerRef}>
          <MainTabsGrid
            tabs={tabsmains}
            onRefresh={onRefresh}
            exportProps={exportProps}
            refArray={[activeGridRef, InactiveGridRef]}
            scroll={scrollChange}
            addButton={true}
            GriddFooterAdd={TaxAdd}
          />
        </div>

        <NewCustomModal
          isOpen={taxID ? taxEditModal : newFormModal}
          onClose={handleCloseModal}
          tabs={taxID ? EditModalTabs : NewModalTabs}
          heading="Tax Rules"
        />

        <RightDrawer
          isOpen={activityDrawer}
          onClose={handleCloseDrawer}
          heading={formIndex?.CODE}
          tabs={Drawertabs}
        />
      </div>
    </>
  );
};
export default TaxBody;
