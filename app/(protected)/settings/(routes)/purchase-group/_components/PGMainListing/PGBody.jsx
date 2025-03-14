"use client";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import PGColor from "../customComponent/PGColor";
import PGDescription from "../customComponent/PGDescription";
import PGFilter from "../PGFilter";
import PGMoreOption from "../PGMoreOption";
import PGRightDrawer from "./PGRightDrawer";
import PurchaseGActivity from "../customComponent/PurchaseGActivity";

import { GoHome } from "react-icons/go";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, setRefreshing } from "../../_redux/purchaseGSlice";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import { GrHomeRounded } from "react-icons/gr";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";

const PGBody = () => {
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
  const dispatch = useDispatch();

  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  //useSelectors
  const refreshing = useSelector((state) => state.purchaseGSlice.refreshing);
  const activityDrawer = useSelector(
    (state) => state.purchaseGSlice.activityDrawer
  );
  const formIndex = useSelector((state) => state.purchaseGSlice.formIndex);
  //Arrays
  const Drawertabs = [
    {
      label: "Activity",
      icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
      content: <ActivityLog payloadid={formIndex?.PURGRO_ID} />,
    },
  ];
  const [head, setHead] = useState([
    {
      title: "Group Name",
      slector: "CODE",
      Wid: 300,
      filter: "textFilter",
      Modal: PGRightDrawer,
      Drawer: PurchaseGActivity,
    },
    {
      title: "Color",
      slector: "COLOR_CODE",
      Wid: 200,
      customComp: PGColor,
    },
    {
      title: " Description",
      slector: "DESCRIPTION",
      Wid: 200,
      customComp: PGDescription,

      //   date: true,
    },
    {
      title: " Cycle Start",
      slector: "CYCLE_START_DAYS",
      Wid: 200,
      //   date: true,
    },
    {
      title: " Cycle End",
      slector: "CYCLE_END_DAYS",
      Wid: 200,
      //   date: true,
    },
  ]);

  const filterTabs = {
    actionBtn: {
      // option: option,
    },

    filter: {
      handleFilter: () => {},
      // FilterComp: PGFilter,
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
      label: "Main Tab",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.PGApiData,
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
  const payloadPG = {
    data: {
      ACTIVE_FLAG: "",
      ORDER: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetBranchList",
    tid: "144",
    type: "rpc",
  };
  //functions
  const handlePG = (data) => {
    setData(data?.Result);

    const inactive = data?.Result?.filter((item) => {
      return item.ACTIV_FLAG === "N";
    });
    setInactiveData(inactive);
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
  useEffect(() => {
    if (refreshing == true) {
      onRefreshHandle();

      // setRefresh(true);
    }
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);
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
        MoreOpt: PGMoreOption,
        ref: activeGridRef,
        fixHight: false,
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
          GridTitle: "InActive",
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
        MoreOpt: PGMoreOption,
        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, inactiveData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      PGApiData: [
        {
          api: Administration.GetPurchaseGroupList,
          payload: payloadPG,
          func: handlePG,
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
          // gridHeader = {false}

          // tabsShow={false}
        />
      </div>
      <RightDrawer
        isOpen={activityDrawer}
        onClose={() => {
          dispatch(closeDrawer());
        }}
        heading={formIndex?.CODE}
        tabs={Drawertabs}
      />
    </div>
  );
};

export default PGBody;
