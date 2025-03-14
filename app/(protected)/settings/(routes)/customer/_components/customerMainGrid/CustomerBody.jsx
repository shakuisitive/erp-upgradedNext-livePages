"use client";
import React, { useEffect, useRef, useState } from "react";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import Loading from "../../../../../../../components/misc/loader/loading";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import CustomerRightDrawer from "../CustomerRightDrawer";
import CustomerFormModal from "../CustomerFormModal";
import CustomerFilter from "./customComponents/CustomerFilter";
import CustomerMoreOption from "../CustomerMoreOption";
import { GoHome } from "react-icons/go";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { payloadMass, payloadPrepay } from "../customerPayloadConstant";
import CustomerAddress from "./CustomerAddress";
import CustomerDetails from "../CustomerForm/CustomerDetials";
import CustomerPayment from "../CustomerForm/customerPayment/CustomerPayment";
import CustomerShipTo from "../CustomerForm/customerShipTo/CustomerShipTo";
import CustomerTax from "../CustomerForm/customerTax/CustomerTax";
import CustomerPromotion from "../CustomerForm/customerPromotion/CustomerPromotion";
import CustomerDistribution from "../CustomerForm/customerDistribution/CustomerDistribution";
import CustomerStatus from "./customComponents/CustomerStatus";
import CustomerType from "./customComponents/CustomerType";
import {
  setPurchaseG,
  setCountryList,
  setProvince,
  setWarehouse,
  setDiscountG,
  setPaymentTerm,
  closeModal,
  setPartPriceList,
  setNewModal,
  setPromotionList,
  setTaxes,
} from "../../_redux/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";

const CustomerBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [prepayGridArr, setPrepayGridArr] = useState();
  let [massGridArr, setMassGridArr] = useState();
  const [data, setData] = useState();
  const [prepayData, setPrepayData] = useState();
  const [massData, setMassData] = useState();
  let [subData, setSubData] = useState([]);
  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [exportListData, setExportListData] = useState([]);
  let [error, sendRequest] = useApiFetch();
  const CustEditForm = useSelector((state) => state.customerSlice.isModal);
  const newFormModal = useSelector((state) => state.customerSlice.newFormModal);
  const custFormIndex = useSelector((state) => state.customerSlice.formIndex);
  const custID = custFormIndex?.CUS_ID;

  const [payload, setPayload] = useState({
    data: {
      ACTIVE_FLAG: "",
      MASS_CUSTOMER_FLAG: "",
      OFFSET: "",
      ORDER: "CUS_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 25,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetCustomersList",
    tid: "144",
    type: "rpc",
  });

  const dispatch = useDispatch();

  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);

  // for token
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  //Arrays
  const option = [{}];
  const NewModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <CustomerDetails />,
    },
  ];
  const MassModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <CustomerDetails />,
    },
    {
      label: "Payment",
      content: <CustomerPayment />,
    },
    {
      label: "Tax",
      content: <CustomerTax />,
    },
    {
      label: "Promotion",
      content: <CustomerPromotion />,
    },
    {
      label: "ShipTo",
      content: <CustomerShipTo />,
    },
    {
      label: "Distribution",
      content: <CustomerDistribution />,
    },
    {
      label: "Activity",
      content: <ActivityLog payloadid={custID} />,
    },
  ];
  const PrepayModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <CustomerDetails />,
    },
    {
      label: "Payment",
      content: <CustomerPayment />,
    },

    {
      label: "Promotion",
      content: <CustomerPromotion />,
    },
    {
      label: "ShipTo",
      content: <CustomerShipTo />,
    },

    {
      label: "Activity",
      content: <ActivityLog payloadid={custID} />,
    },
  ];

  const [head, setHead] = useState([
    {
      title: "Name",
      slector: "CUSTOMER_NAME",
      Wid: 350,
      filter: "textFilter",
      Modal: CustomerRightDrawer,
      Drawer: CustomerFormModal,
    },
    {
      title: "Phone",
      slector: "PHONE_1",
      Wid: 100,
    },
    {
      title: "Shipping Address",
      slector: "BARCODE_NUMBER",
      Wid: 200,
      customComp: CustomerAddress,
    },
    {
      title: "Billing Address",
      slector: "BARCODE_NUMBER",
      customComp: CustomerAddress,
      Wid: 200,
    },
    {
      title: "Approval Date",
      slector: "CREDIT_LIMIT_APPROVAL_DATE",
      Wid: 100,
      date: true,
    },
    { title: "PO Group", slector: "PURCHASE_GROUP", Wid: 100 },
    {
      title: "Type",
      slector: "QTY_AVAILABLE",
      customComp: CustomerType,
      Wid: 100,
    },
    { title: "Discount", slector: "DISCOUNT_PERCENTAGE", Wid: 100 },

    {
      title: "Status",
      slector: "Status",
      Status: CustomerStatus,
      Wid: 100,
    },
  ]);
  const [subHead, setSubHead] = useState([
    {
      title: "Name",
      slector: "NAME",
      Wid: 250,
    },
    {
      title: "Location",
      slector: "LOCATION_NUMBER",
      Wid: 120,
    },
    {
      title: "Email",
      slector: "EMAIL",
      Wid: 250,
    },
    {
      title: "Address",
      slector: "ADDRESS",
      Wid: 100,
    },

    { title: "City", slector: "CITY", Wid: 100 },
    { title: "Province", slector: "PROVINCE", Wid: 100 },
    {
      title: "Status",
      slector: "ACTIVE_FLAG",
      // Status: CustomerStatus,
      Wid: 120,
    },
  ]);

  const handleFilter = (e) => {
    const newData = {
      ...payload.data,
      CUS_NAME: e.Cn ? e.Cn : "",
      ADDRESS: e.Ca ? e.Ca : "",
      CITY: e.City ? e.City : "",
      PO_GROUP: e.Pg ? e.Pg : "",
      MASS_CUSTOMER_FLAG: e.Ct ? e.Ct : "",
    };
    const newPayload = { ...payload, data: newData };
    setPayload(newPayload);
  };
  const getAllTaskF = (data) => {
    if (data) {
      setCompRowA(data?.Result);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    sendRequest(
      Administration.GetCustomersList,
      "POST",
      payload,
      handleGetAll,
      accessToken
    );
  }, [payload]);
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      // icon: IoIosAdd,
      onClick: () => {
        // setIsModalOpen(true);
        dispatch(setNewModal());
      },
    },

    filter: {
      handleFilter: handleFilter,
      FilterComp: CustomerFilter,
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
        handleApi: aPIProp.getAllData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Prepay",
      Gridcontent: {
        gridArr: prepayGridArr,
        setGridArr: setPrepayGridArr,
        handleApi: aPIProp.prepayData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
    {
      label: "Mass",
      Gridcontent: {
        gridArr: massGridArr,
        setGridArr: setMassGridArr,
        handleApi: aPIProp.massData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  //payloads
  const taxPayload = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "GetTaxesList",
    type: "rpc",
    tid: "144",
  };
  const promotionPayload = {
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
    type: "rpc",
    tid: "144",
  };
  const payloadProvinces = {
    data: {},
    action: "Administration",
    method: "GetProvinceState",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPayterm = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      OFFSET: "",
      ACTIVE_FLAG: "",
      ORDER: "",
    },
    action: "Administration",
    method: "GetPaymentTermList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadCountryList = {
    data: {},
    action: "Administration",
    method: "GetCountryList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPurchaseGroup = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      OFFSET: "",
      ACTIVE_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetPurchaseGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadDiscount = {
    data: {
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "",
      OFFSET: "",
      ORDER: "",
    },
    action: "Administration",
    method: "GetDiscountGroupList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadWarehouse = {
    data: {
      SEARCH: "",
    },
    action: "InventoryWeb",
    method: "GetWarehouse",
    username: "admin",
    password: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPartPrice = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetPartPriceList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  //functions
  const handleGetAll = (data) => {
    setData(data?.Result);
    if (data) {
      const dataActive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "Y";
      });
      setCompRowA(dataActive);
      setExportListData(data?.Result);
      setLoading(false);
    }
    if (data) {
      const dataInactive = data?.Result?.filter((item) => {
        return item.ACTIVE_FLAG == "N";
      });
      setCompRow(dataInactive);
    }
  };

  const handlePrepay = (data) => {
    setPrepayData(data?.Result);
  };
  const handleMass = (data) => {
    setMassData(data?.Result);
  };
  const handleCountryList = (data) => {
    dispatch(setCountryList(data?.Result));
  };
  const handleDiscount = (data) => {
    dispatch(setDiscountG(data?.Result));
  };
  const handleWarehouse = (data) => {
    dispatch(setWarehouse(data?.Result));
  };
  const handlePartPriceList = (data) => {
    dispatch(setPartPriceList(data?.Result));
  };
  const handlePurchaseGroup = (data) => {
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Administration.GetDiscountList,
        "POST",
        payloadDiscount,
        handleDiscount,
        accessToken
      );

      sendRequest(
        Administration.GetPartPriceList,
        "POST",
        payloadPartPrice,
        handlePartPriceList,
        accessToken
      );
    }
    const response = data?.Result;
    console.log("response PG ", response);
    dispatch(setPurchaseG(response));
  };
  const handlePayterm = (data) => {
    dispatch(setPaymentTerm(data?.Result));
  };
  const handleProvinces = (data) => {
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Administration.GetCountryList,
        "POST",
        payloadCountryList,
        handleCountryList,
        accessToken
      );
      sendRequest(
        Administration.GetPurchaseGroupList,
        "POST",
        payloadPurchaseGroup,
        handlePurchaseGroup,
        accessToken
      );
    }
    // setMassData(data.Result);
    dispatch(setProvince(data?.Result));
  };
  const handleTaxesList = (data) => {
    dispatch(setTaxes(data.Result));
  };
  const handlePromotionList = (data) => {
    dispatch(setPromotionList(data.Result));
  };

  const subGridOpen = (getData) => {
    const handleSubGrid = (data) => {
      const getDataDet = {
        id: getData.CUS_ID,
        product: data.Result,
      };
      setSubData((prev) => [...prev, getDataDet]);
    };
    const payloadSubGrid = {
      data: {
        CUS_ID: getData.CUS_ID,
      },
      action: "Administration",
      method: "GetCustomerBranchList",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    let find = subData.some((data) => data.id == getData.CUS_ID);
    if (find == false) {
      sendRequest(
        Administration.GetCustomerBranchList,
        "POST",
        payloadSubGrid,
        handleSubGrid,
        accessToken
      );
    }
  };
  const handleCloseModal = () => {
    // setIsModalOpen(false);
    dispatch(closeModal());
    setRefresh(true);
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
    data: exportListData,
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

  //useEffects

  useEffect(() => {
    sendRequest(
      Administration.GetProvinceState,
      "POST",
      payloadProvinces,
      handleProvinces,
      accessToken
    );
    sendRequest(
      Administration.GetPaymentTermList,
      "POST",
      payloadPayterm,
      handlePayterm,
      accessToken
    );
    sendRequest(
      ItemMaster.GetWarehouse,
      "POST",
      payloadWarehouse,
      handleWarehouse,
      accessToken
    );
    sendRequest(
      Administration.GetTaxesList,
      "POST",
      taxPayload,
      handleTaxesList,
      accessToken
    );
    sendRequest(
      Administration.GetPromotionList,
      "POST",
      promotionPayload,
      handlePromotionList,
      accessToken
    );
  }, [accessToken]);

  // for grid Array
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
        },
        checkBox: {
          selectedRow: selectedRow,
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },
        subGridActive: {
          subActiveKey: "CUSTOMER_BRANCH_COUNT",
          subInActiveVal: 0,
          subGridOpen: subGridOpen,
          idKey: "CUS_ID",
        },
        MoreOpt: CustomerMoreOption,
        ref: activeGridRef,
        fixHight: false,
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
          checked: checked,
          handleCheckboxChange: handleCheckboxChange,
        },

        paginationList: {
          fixHight: "def",
          pagination: true,
        },
        ref: InactiveGridRef,
      },
    ];
    setGridArrP(gridArr);
    const prepayArr = [
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
          Griddata: prepayData,
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

        MoreOpt: CustomerMoreOption,
        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setPrepayGridArr(prepayArr);
    const massArr = [
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
          Griddata: massData,
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

        MoreOpt: CustomerMoreOption,
        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setMassGridArr(massArr);
  }, [data, prepayData, subData, massData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      getAllData: [
        {
          api: Administration.GetCustomersList,
          payload: payload,
          func: handleGetAll,
          token: accessToken,
          title: "Active",
        },
        {
          api: Administration.GetCustomersList,
          payload: payload,
          func: handleGetAll,
          token: accessToken,
          title: "Inactive",
        },
      ],
      massData: [
        {
          api: Administration.GetCustomersList,
          payload: payloadMass,
          func: handleMass,
          token: accessToken,
          title: "Active",
        },
      ],
      prepayData: [
        {
          api: Administration.GetCustomersList,
          payload: payloadPrepay,
          func: handlePrepay,
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

      <NewCustomModal
        isOpen={custID ? CustEditForm : newFormModal}
        onClose={handleCloseModal}
        tabs={
          custFormIndex?.MASS_CUSTOMER_FLAG === "Y"
            ? MassModalTabs
            : custFormIndex?.MASS_CUSTOMER_FLAG === "N"
            ? PrepayModalTabs
            : NewModalTabs
        }
        heading="Customer"
      />
    </div>
  );
};

export default CustomerBody;
