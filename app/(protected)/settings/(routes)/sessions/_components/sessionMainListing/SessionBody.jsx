"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import SessionFilter from "../SessionFilter";
import SessionRightDrawer from "./SessionRightDrawer";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { GoHome } from "react-icons/go";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import ActionColumn from "../ActionColumn";
import { setRefreshing } from "../../_redux/sessionSlice";

const SessionBody = () => {
  // States
  const [scrollChange, setScrollChange] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState();
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const gridrefresh = useSelector((state) => state.sessionSlice.refresh);
  console.log("checking refresh", gridrefresh);

  let [error, sendRequest] = useApiFetch();
  // Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();
  // Arrays
  // const option = {
  //   label: "New Part",
  //   onClick: () => {},
  // };
  const [head, setHead] = useState([
    {
      title: "Order#",
      slector: "SOURCE_NO",
      Wid: 250,
      filter: "textFilter",
      Modal: SessionRightDrawer,
    },
    {
      title: "Program",
      slector: "SOURCE_TABLE",
      Wid: 200,
    },
    {
      title: "Date",
      slector: "SESSION_START_DATE",
      Wid: 100,
      date: true,
    },
    {
      title: "Time",
      slector: "",
      Wid: 100,
    },
    {
      title: "Username",
      slector: "USERNAME",
      Wid: 100,
    },
    {
      title: "Action",
      slector: "",
      Wid: 150,
      customComp: ActionColumn,
    },
  ]);

  const filterTabs = {
    actionBtn: {
      // option: option,
    },
    filter: {
      handleFilter: () => {},
      // FilterComp: SessionFilter,
    },
    filterShow: false,
    sortShow: false,
  };

  useEffect(() => {
    if (gridrefresh) {
      setRefresh(true);
      dispatch(setRefreshing(false));
    }
  }, [gridrefresh]);
  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Main Tab",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.SessionApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
      },
    },
  ];

  const payloadSession = {
    data: {
      OFFSET: "+4:00",
      ORDER: "EDISCRSES_ID DESC",
      ACTIVE_FLAG: "Y",
      RNUM_FROM: "1",
      RNUM_TO: "100",
    },
    action: "Inventory",
    method: "GetEditScreenSessionsList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleSession = (data) => {
    setData(data.Result);
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
    if (rowData === "all" && checkedAll === false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData === "all" && checkedAll === true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
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

  const selectedRow = (index, data) => {};

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);

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
          Griddata: data,
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
        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, colaps, colapsComp, head]);

  useEffect(() => {
    let apiData = {
      SessionApiData: [
        {
          api: Administration.GetEditScreenSessionsList,
          payload: payloadSession,
          func: handleSession,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);

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
    <div className="w-full h-fit flex flex-col overflow-auto pb-5">
      {loading && <Loading />}
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

export default SessionBody;
