"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalesOrderStatus from "./customComponents/SalesOrderStatus";
import SalesOrderCustType from "./customComponents/SalesOrderCustType";
import SalesOrderFilter from "./customComponents/SalesOrderFilter";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import {
  Administration,
  ItemMaster,
  Sales,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { GoHome } from "react-icons/go";

// import Owner from "../../../tax/_components/grid/Owner";

import { GrHomeRounded } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setCustomerList, setPartList } from "../../redux/salesOrder.slice";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import NewSalesOrderForm from "../NewSalesOrderForm/NewSalesOrderForm";
import { IoIosAdd } from "react-icons/io";
const SalesOrderBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [data, setData] = useState([]);
  const [inactiveData, setInactiveData] = useState();
  const [activeData, setActiveData] = useState();
  const [colaps, setColaps] = useState(false);
  const [subColaps, setSubColaps] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  let [error, sendRequest] = useApiFetch();

  //useSelectors

  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();
  //Arrays

  const [head, setHead] = useState([
    {
      title: "Sales Order",
      slector: "SALEORD_NUMBER",
      Wid: 300,
      filter: "textFilter",
      // customComp: ProdCategoryActivity,
      //   Modal: ProductTypeRightDrawer,
      //   Drawer: ProductTypeActivity,
    },

    {
      title: "Date",
      slector: "SALE_ORDER_DATE",
      //   customComp: EditProductType,
      Wid: 150,
      date: true,
    },
    {
      title: "Tracking #",
      slector: "TRACKING_NUMBER",
      //   customComp: EditProductType,
      Wid: 150,
    },
    {
      title: "Customer",
      slector: "CUSTOMER_NAME",
      //   customComp: EditProductType,
      Wid: 150,
    },
    {
      title: "Customer Type",
      slector: "MASS_CUSTOMER_FLAG",
      customComp: SalesOrderCustType,
      Wid: 150,
    },
    {
      title: "Phone",
      slector: "PHONE",
      //   customComp: EditProductType,
      Wid: 150,
    },
    {
      title: "Address",
      slector: "SHIPPING_ADDRESS",
      //   customComp: EditProductType,
      Wid: 150,
    },
    {
      title: "Status",
      slector: "SO_CURRENT_STATUS",
      customComp: SalesOrderStatus,
      Wid: 150,
    },
  ]);
  //Payloads
  const [payload, setPayload] = useState({
    data: {
      SEARCH: "",
      VOID_FLAG: "N",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      CUS_ID: "",
      WAR_ID: "",
      WEB_ORDER_FLAG: "N",
      BOLTON_ORDER_FLAG: "N",
      SPS_ORDER_FLAG: "N",
      INVALID_ORDER_FLAG: "N",
      EUT_ORDER_FLAG: "N",
      SO_STATUS: "",
      FINZ_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetSaleOrderList",
    type: "rpc",
    tid: "144",
  });

  //functions

  const handleGetPartDetList = (data) => {
    setData(data.Result.Results);
    // const dataInActive = data?.Result.Results?.filter((item) => {
    //   return item.SO_CURRENT_STATUS === "Ready to Pick";
    // });
    const dataActive = data?.Result.Results.filter(
      (item) =>
        item.SO_CURRENT_STATUS === "NEW" ||
        item.SO_CURRENT_STATUS === "INCOMPLETE DATA"
    );
    const dataInActive = data?.Result.Results.filter(
      (item) =>
        item.SO_CURRENT_STATUS === "Dispatched" ||
        item.SO_CURRENT_STATUS === "Ready to Pick" ||
        item.SO_CURRENT_STATUS === "Void"
    );
    // const dataActive = data?.Result.Results?.filter((item) => {
    //   return item.SO_CURRENT_STATUS === "NEW";
    // });

    // setActiveData(data.Result.Results);
    // setInactiveData(data.Result.Results);
    setActiveData(dataActive);
    setInactiveData(dataInActive);
  };
  useEffect(() => {
    sendRequest(
      Sales.GetSaleOrderList,
      "POST",
      payload,
      handleGetPartDetList,
      accessToken
    );
  }, [payload]);

  const handleSalesFilter = (e) => {
    const newData = {
      ...payload.data,
      SO_NUMBER: e.SkuN ? e.SkuN : "",
      SO_DATE_FROM: e.Df ? e.Df : "",
      SO_DATE_TO: e.Dt ? e.Dt : "",
      CUS_ID: e.CusI ? e.Cus : "",
      SO_STATUS: e.SoSt ? e.SoSt : "",
      PART_DETAILS: e.Sku ? e.Sku : "",
      EUT_ORDER_FLAG: e.Ch === "NC" ? "Y" : "N",
      BOLTON_ORDER_FLAG: e.Ch === "Bolton" ? "Y" : "N",
      SPS_ORDER_FLAG: e.Ch === "SPS" ? "Y" : "N",
    };
    const newPayload = { ...payload, data: newData };
    setPayload(newPayload);
  };
  const option = [];
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        setIsNewModalOpen(true);
      },
    },

    filter: {
      handleFilter: handleSalesFilter,
      FilterComp: SalesOrderFilter,
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

  // for token
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  const subColapsfunc = () => {};

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
          GridColaps: false,
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
        paginationList: {
          fixHight: "def",
          pagination: true,
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
        paginationList: {
          fixHight: "def",
          pagination: true,
        },

        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [inactiveData, activeData, colaps, colapsComp, head]);
  const getPartList = (data) => {
    dispatch(setPartList(data.Result.Results));
  };
  const getCustList = (data) => {
    dispatch(setCustomerList(data.Result));
  };
  const partPayload = {
    data: {
      OFFSET: "+4:00",
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: "Y",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
    },
    action: "ItemMaster",
    method: "",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };
  const custPayload = {
    data: {
      ACTIVE_FLAG: "Y",
      MASS_CUSTOMER_FLAG: "",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  };
  // for api
  useEffect(() => {
    if (accessToken) {
      sendRequest(
        ItemMaster.GetPartsList,
        "POST",
        partPayload,
        getPartList,
        accessToken
      );
      sendRequest(
        Administration.GetCustomersList,
        "POST",
        custPayload,
        getCustList,
        accessToken
      );
    }
    let apiData = {
      PromotionApiData: [
        {
          api: Sales.GetSaleOrderList,
          payload: payload,
          func: handleGetPartDetList,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);

  const tabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <NewSalesOrderForm />,
    },
  ];

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
      <NewCustomModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        tabs={tabs}
        heading="Sales Order"
      />
    </div>
  );
};

export default SalesOrderBody;
