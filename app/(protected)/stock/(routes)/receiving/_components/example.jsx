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

const BranchBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState();
  const [inactiveData, setInactiveData] = useState();

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);

  //Arrays
  const option = {
    label: "New Part",
    // icon: IoIosAdd,
    onClick: () => {},
  };

  const [head, setHead] = useState([
    {
      title: "Code",
      slector: "CODE",
      Wid: 350,
      filter: "textFilter",
      Modal: BranchRightDrawer,
      //   Drawer: CustomerFormModal,
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
    },

    filter: {
      handleFilter: () => {},
      FilterComp: BranchFilter,
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
      ACTIVE_FLAG: "Y",
      ORDER: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "25",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetBranchList",
    tid: "144",
    type: "rpc",
  };
  const payloadBranch = {
    data: {
      ACTIVE_FLAG: "N",
      ORDER: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "25",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetBranchList",
    tid: "144",
    type: "rpc",
  };
  //functions
  const handleBranchA = (data) => {
    setData(data.Result);
  };
  const handleBranch = (data) => {
    setInactiveData(data.Result);
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
    // datas: CsvData,
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
        // subColumnList: {
        //   subComln: subHead,
        //   setSubColmn: setSubHead,
        // },
        title: {
          GridTitle: "Active",
          GridColor: "#4ade80",
        },
        data: {
          Griddata: data,
          //   subGridData: subData,
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
        // subGridActive: {
        //   // setHActive: setHActive,
        //   // hActive: hActive,
        //   subActiveKey: "UOM_ID_REORDERING",
        //   subInActiveVal: 0,
        //   subGridOpen: subGridOpen,
        //   idKey: "PAR_ID",
        // },
        // MoreOpt: CustomerMoreOption,
        ref: activeGridRef,
        fixHight: true,
      },
      {
        colmnList: {
          colmn: head,
          setColmn: setHead,
        },
        // subColumnList: {
        //   subComln: subHead,
        //   setSubColmn: setSubHead,
        // },
        title: {
          GridTitle: "Inactive",
          GridColor: "#F87171",
        },
        data: {
          Griddata: inactiveData,
          //   subGridData: subData,
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
        // subGridActive: {
        //   // setHActive: setHActive,
        //   // hActive: hActive,
        //   subActiveKey: "UOM_ID_REORDERING",
        //   subInActiveVal: 0,
        //   subGridOpen: subGridOpen,
        //   idKey: "PAR_ID",
        // },
        // MoreOpt: CustomerMoreOption,
        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, colaps, colapsComp, head]);
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
        {
          api: Administration.GetBranchList,
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
    </div>
  );
};

export default BranchBody;