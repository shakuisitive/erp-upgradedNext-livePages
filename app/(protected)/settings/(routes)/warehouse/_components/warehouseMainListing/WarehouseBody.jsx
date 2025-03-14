"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineIssuesClose,
  IoIosAdd,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../../../components/misc/loader/loading";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import WarehouseStatus from "./customComponents/WarehouseStatus";
import WarehouseFormModal from "./customComponents/WarehouseFormModal";
import WarehouseFilter from "../WarehouseFilter";
import WarehouseOwner from "../WarehouseOwner";
import WarehouseForm from "../warehouseForm/WarehouseForm";
import WarehouseLocation from "./customComponents/WarehouseLocation";
import WarehouseRightDrawer from "./WarehouseRightDrawer";
import {
  closeModal,
  setBranch,
  setNewModal,
  setPriority,
  setWarehouseMainList,
} from "../../_redux/warehouseSlice";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import SalesPriority from "./customComponents/SalesPriority";
const WarehouseBody = () => {
  const [accessToken, setAccessToken] = useState();
  const [hActive, setHActive] = useState({});
  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [subData, setSubData] = useState([]);
  const [scrollChange, setScrollChange] = useState(1);
  const [loading, setLoading] = useState(false);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [errorM, setErrorM] = useState();
  const [data, setData] = useState([]);

  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);

  //useSelectors
  const warEditModal = useSelector(
    (state) => state.warehouseSlice.warEditModal
  );
  const newFormModal = useSelector(
    (state) => state.warehouseSlice.newFormModal
  );
  const warFormIndex = useSelector((state) => state.warehouseSlice.formIndex);
  const updateSalePriority = useSelector(
    (state) => state.warehouseSlice.updateSalePriority
  );
  const warID = warFormIndex?.WAR_ID;
  const onRefreshHandle = () => {
    setRefresh(true);
  };
  const handleCloseModal = () => {
    dispatch(closeModal());
    setRefresh(true);
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (updateSalePriority) {
      setRefresh(true);
    }
  }, [updateSalePriority]);
  const [head, setHead] = useState([
    {
      title: "ID",
      slector: "WAR_ID",
      Wid: 407,
      Modal: WarehouseRightDrawer,
      Drawer: WarehouseFormModal,
    },
    {
      title: "Owner",
      slector: "",
      Wid: 100,
      customComp: WarehouseOwner,
    },
    {
      title: "Name",
      slector: "WAREHOUSE_CODE",
      Wid: 200,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      Wid: 250,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
    },
    {
      title: "Warehouse Priority",
      slector: "SALES_PRIORITY",
      Wid: 90,
      customComp: SalesPriority,
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
    },
    {
      title: "Status",
      slector: "RECEIVING_STATUS",
      Wid: 150,
      Status: WarehouseStatus,
    },
  ]);
  // const [inActivedHead, setInActiveHead] = useState([
  //   {
  //     title: "ID",
  //     slector: "WAR_ID",
  //     Wid: 407,
  //     Modal: WarehouseRightDrawer,
  //     Drawer: WarehouseFormModal,
  //   },
  //   {
  //     title: "Owner",
  //     slector: "",
  //     Wid: 100,
  //     customComp: WarehouseOwner,
  //   },
  //   {
  //     title: "Name",
  //     slector: "WAREHOUSE_CODE",
  //     Wid: 200,
  //     Status: "",
  //     filter: "checkFilter",
  //     checkFilterOptions: ["NEW"],
  //   },

  //   {
  //     title: "Description",
  //     slector: "DESCRIPTION",
  //     Wid: 250,
  //     Status: "",
  //     filter: "checkFilter",
  //     checkFilterOptions: ["NEW"],
  //   },
  //   {
  //     title: "Warehouse Priority",
  //     slector: "SALES_PRIORITY",
  //     Wid: 90,
  //     // customComp: SalesPriority,
  //     filter: "checkFilter",
  //     checkFilterOptions: ["NEW"],
  //   },
  //   {
  //     title: "Status",
  //     slector: "RECEIVING_STATUS",
  //     Wid: 150,
  //     Status: WarehouseStatus,
  //   },
  // ]);
  const NewModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <WarehouseForm />,
    },
  ];
  const EditModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <WarehouseForm />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={warID} />,
    },
    {
      label: "Location",
      content: <WarehouseLocation />,
    },
  ];
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };

  const exportProps = {
    fileName: "",
    fileExtension: "xls",
    data: data,
  };
  const dispatch = useDispatch();
  //payloads
  const payloadBranch = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      OFFSET: "",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetBranchList",
    username: "admin",
    password: "1234",
    type: "rpc",
    tid: "144",
  };
  const handleBranch = (data) => {
    dispatch(setBranch(data?.Result));
  };
  //   useEffects
  // for api hit
  useEffect(() => {
    sendRequest(
      Administration.GetBranchList,
      "POST",
      payloadBranch,
      handleBranch,
      accessToken
    );
  }, [accessToken]);
  useEffect(() => {
    let apiData = [
      {
        api: Administration.GetWarehousesList,
        payload: PayloadPartList,
        func: handlePartList,
        token: accessToken,
        title: "Active",
      },
    ];
    setAPIProp(apiData);
  }, [accessToken]);

  useEffect(() => {
    if (compRowA.length > 0) {
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
  }, [compRowA, compRow]);
  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      setColaps(false);
      // setColapsComp(true);
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
  const selectedRow = (index, data) => {};

  const handleCheckboxChange = (rowI, rowData) => {
    if (data == "all" && checkedAll == false) {
      setCheckedAll(true);

      const arr = compRowA?.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        return obj;
      });

      setCheckedItems(arr);
    } else if (data == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
      // dispatch(setIsCheckedFItem([]))
    } else {
      if (checked(rowI, data)) {
        // Remove the item if it's already checked
        setCheckedItems(checkedItems.filter((item) => item.rowI !== rowI));
        // dispatch(removeSameIndex(rowI));
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData: data }]);
        // dispatch(setIsCheckedFItem(rowI));
      }
    }
    // if (rowData == "all" && checkedAll == false) {
    //   setCheckedAll(true);
    //   const arr = data?.Result.map((SData, i) => {
    //     let obj = {};
    //     obj = { rowI: i, rowData: SData };

    //     return obj;
    //   });

    //   setCheckedItems(arr);
    // } else if (rowData == "all" && checkedAll == true) {
    //   setCheckedAll(false);
    //   setCheckedItems([]);
    // } else {
    //   if (checked(rowI, rowData)) {
    //     // Remove the item if it's already checked
    //     setCheckedItems(
    //       checkedItems.filter(
    //         (item) => item.rowI !== rowI && item.rowData !== rowData
    //       )
    //     );
    //   } else {
    //     // Add the item if it's not checked
    //     setCheckedItems([...checkedItems, { rowI, rowData }]);
    //   }
    // }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some((item) => item.rowI === rowI);
    // return checkedItems.some((item) => item === rowData);
  };
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
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          setHActive: setHActive,
          hActive: hActive,
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
          GridTitle: "InActive",
          GridColor: "#FF0000",
        },
        data: {
          Griddata: compRow,

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
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          setHActive: setHActive,
          hActive: hActive,
        },

        ref: completedGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [compRow, compRowA, colaps, subData, head, hActive]);
  const handleFilter = () => {};
  // Payloads
  const PayloadPartList = {
    data: {
      SEARCH: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      ACTIVE_FLAG: null,
      OFFSET: "",
      ORDER: "",
    },
    action: "Administration",
    method: "GetWarehousesList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const option = [
    // {
    //   label: "New",
    //   icon: IoIosAdd,
    //   onClick: () => {},
    // },
  ];
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
      FilterComp: WarehouseFilter,
    },
  };
  function handlePartList(data) {
    setData(data.Result);
    if (data) {
      const dataActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "Y";
      });
      const dataInActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "N";
      });
      setCompRowA(dataActive);
      setCompRow(dataInActive);
      dispatch(setWarehouseMainList(dataActive));
      // dispatch(setPriority(dataActive));
    }
    setLoading(false);
    setErrorM(error);
  }

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
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];

  //   Grid Head

  return (
    <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, completedGridRef]}
          scroll={scrollChange}
        />
      </div>

      <NewCustomModal
        isOpen={warID ? warEditModal : newFormModal}
        onClose={handleCloseModal}
        tabs={warID ? EditModalTabs : NewModalTabs}
        heading="Warehouse"
      />
    </div>
  );
};
export default WarehouseBody;
