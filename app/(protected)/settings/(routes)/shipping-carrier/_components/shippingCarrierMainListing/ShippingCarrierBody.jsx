"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { GoHome } from "react-icons/go";
// import NewProductType from "./customComponents/NewProductType";
import EditShippingCName from "./customComponents/EditShippingCName";
import EditShippingCNotes from "./customComponents/EditShippingCNotes";
import EditShippingCDesc from "./customComponents/EditShippingCDesc";
import ShippingCStatus from "./customComponents/ShippingCStatus";
import ShippingCRightDrawer from "./customComponents/ShippingCRightDrawer";
import ShippingCActivityLog from "./customComponents/ShippingCActivityLog";
// import Owner from "../../../tax/_components/grid/Owner";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import RightDrawer from "../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import { GrHomeRounded } from "react-icons/gr";
import {
  closeDrawer,
  setInputData,
  setRefreshing,
} from "../../_redux/shippingCSlice";

const ShippingCarrierBody = () => {
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
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  //useSelectors
  const refreshing = useSelector((state) => state.shippingCSlice.refreshing);
  const activityDrawer = useSelector(
    (state) => state.shippingCSlice.activityDrawer
  );
  const formIndex = useSelector((state) => state.shippingCSlice.formIndex);
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
      content: <ActivityLog payloadid={formIndex?.SHIP_CARRIER_ID} />,
    },
  ];

  const [head, setHead] = useState([
    {
      title: "Code",
      slector: "CODE",
      Wid: 300,
      filter: "textFilter",
      // customComp: ProdCategoryActivity,
      Modal: ShippingCRightDrawer,
      Drawer: ShippingCActivityLog,
    },
    // {
    //   title: "Owner",
    //   slector: "",
    //   Wid: 100,
    //   customComp: Owner,
    //   hidden: false,
    //   def: false,
    //   edit: false,
    // },
    {
      title: "Name",
      slector: "NAME",
      customComp: EditShippingCName,
      Wid: 150,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      customComp: EditShippingCDesc,
      Wid: 150,
    },
    {
      title: "Notes",
      slector: "NOTES",
      customComp: EditShippingCNotes,
      Wid: 150,
    },

    {
      title: "Status",
      slector: "",
      Wid: 150,
      Status: ShippingCStatus,
    },
  ]);

  const filterTabs = {
    actionBtn: {
      // option: option,
      // label: "New",
      // icon: IoIosAdd,
      // onClick: () => {
      //   // dispatch(setNewPromoModal());
      // },
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
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      ORDER: "SHIP_CARRIER_ID DESC",
    },
    action: "Administration",
    method: "GetShipCarrierList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  //functions
  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };
  const handleGetPartDetList = (data) => {
    setData(data.Result);
    const dataInActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG === "N";
    });
    const dataActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG === "Y";
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
  const selectedRow = (index, data) => {};
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  //useEffect
  useEffect(() => {
    setRefresh(true);
    if (refreshing) {
      dispatch(setInputData(activeData));
    }
    // dispatch(setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);

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
          //   GriddFooterAdd: NewProductType,
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
  }, [inactiveData, activeData, colaps, colapsComp, head]);
  //   console.log("active Data: ", activeData);
  //   console.log("inactive Data: ", inactiveData);
  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: Administration.GetShipCarrierList,
          payload: payload,
          func: handleGetPartDetList,
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
          addButton={false}
          //   GriddFooterAdd={NewProductType}
        />
      </div>
      <RightDrawer
        isOpen={activityDrawer}
        onClose={handleCloseDrawer}
        heading={formIndex?.CODE}
        tabs={Drawertabs}
      />
    </div>
  );
};

export default ShippingCarrierBody;
