"use client";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import BranchStatus from "./customComponent/BranchStatus";
import BranchFilter from "../BranchFilter";
import BranchRightDrawer from "./BranchRightDrawer";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { GoHome } from "react-icons/go";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { IoIosAdd } from "react-icons/io";
import BranchForm from "../BranchForm/BranchForm";
import BranchWarehouse from "./customComponent/BranchWarehouse";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  setNewModal,
  setOrganization,
  setWarehouse,
} from "../../_redux/branchSlice";
import BranchFormModal from "./customComponent/BranchFormModal";
const BranchBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);

  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState([]);

  const [inactiveData, setInactiveData] = useState();
  const [activeData, setActiveData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  //useSelectors

  const locEditModal = useSelector((state) => state.branchSlice.locEditModal);
  const newFormModal = useSelector((state) => state.branchSlice.newFormModal);
  const locFormIndex = useSelector((state) => state.branchSlice.formIndex);
  const locID = locFormIndex?.LOC_ID;
  //Arrays
  const option = {
    label: "New ",
    icon: IoIosAdd,
    onClick: () => {},
  };
  const modalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <BranchForm />,
    },
    {
      label: "Warehouse",
      content: <BranchWarehouse />,
    },
    {
      // icon: <GoHome />,
      label: "Activity",
      content: <ActivityLog payloadid={locID} />,
    },
  ];
  const NewmodalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <BranchForm />,
    },
  ];
  const [head, setHead] = useState([
    {
      title: "Code",
      slector: "CODE",
      Wid: 350,
      filter: "textFilter",
      Modal: BranchRightDrawer,
      Drawer: BranchFormModal,
    },
    {
      title: "Branch Name",
      slector: "BRANCH_NAME",
      Wid: 150,
    },
    {
      title: "Email",
      slector: "EMAIL",
      Wid: 150,
      //   date: true,
    },
    {
      title: "Address",
      slector: "ADDRESS_1",
      Wid: 100,
      //   date: true,
    },
    {
      title: "City",
      slector: "CITY",
      Wid: 100,
    },

    { title: "Status", slector: "", Wid: 150, customComp: BranchStatus },
  ]);

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
      handleFilter: () => {},
      // FilterComp: BranchFilter,
    },
    filterShow: false,
    sortShow: false,
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
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  //Payloads
  const payloadBranchA = {
    data: {
      ACTIVE_FLAG: null,
      ORDER: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "50",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetBranchList",
    tid: "144",
    type: "rpc",
  };
  const dispatch = useDispatch();
  //payloads
  const payloadCorporate = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "GetBranchList",
    username: "admin",
    password: "1234",
    type: "rpc",
    tid: "144",
  };
  const payloadWarehouse = {
    data: {
      SEARCH: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: null,
    },
    action: "Administration",
    method: "GetWarehousesList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleCorporate = (data) => {
    dispatch(setOrganization(data?.Result));
  };
  const handleWarehouse = (data) => {
    dispatch(setWarehouse(data?.Result));
  };
  //   useEffects
  // for api hit
  useEffect(() => {
    sendRequest(
      Administration.GetCorporateList,
      "POST",
      payloadCorporate,
      handleCorporate,
      accessToken
    );
    sendRequest(
      Administration.GetWarehousesList,
      "POST",
      payloadWarehouse,
      handleWarehouse,
      accessToken
    );
  }, [accessToken]);
  //functions
  const handleBranchA = (data) => {
    setData(data.Result);
    const dataInActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG == "N";
    });
    const dataActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG == "Y";
    });

    setInactiveData(dataInActive);
    setActiveData(dataActive);
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
    setRefresh(true);
    // setIsModalOpen(false);
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
    data: data,
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
  //useEffect
  // for token
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Token = localStorage.getItem("tokenSession");
      setAccessToken(Token);
    }
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

        ref: activeGridRef,
        fixHight: true,
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
  }, [activeData, inactiveData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      BranchApiDataA: [
        {
          api: Administration.GetBranchList,
          payload: payloadBranchA,
          func: handleBranchA,
          token: accessToken,
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
        />
      </div>
      <NewCustomModal
        isOpen={locID ? locEditModal : newFormModal}
        onClose={handleCloseModal}
        tabs={locID ? modalTabs : NewmodalTabs}
        heading="Branch"
      />
    </div>
  );
};

export default BranchBody;
