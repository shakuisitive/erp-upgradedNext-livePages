"use client";
import React, { useState, useEffect, useRef } from "react";

import SupplierFormModal from "./customComponents/SupplierFormModal";

import { GoHome } from "react-icons/go";

import RightDrawer from "./customComponents/SupplierRightDrawer";

import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const SupplierBody = () => {
  //localState
  const [hActive, setHActive] = useState({});

  //redux state
  const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let [subData, setSubData] = useState([]);

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [scrollChange, setScrollChange] = useState(1);

  //--------------------select and pop up

  let [isOpen, setIsOpen] = useState(true);
  const [accessToken, setAccessToken] = useState();

  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const closeModallSlected = () => {};

  // Payloads
  const paymentTermPayload = {
    data: {
      SEARCH: "",
      ORDER: "VEN_ID DESC",
      RNUM_FROM: 1,
      RNUM_TO: 1000,
      OFFSET: "+05::00",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetSupplierList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  useEffect(() => {
    let apiData = {
      ShipBoxApiData: [
        {
          api: Administration.GetSupplierList,
          payload: paymentTermPayload,
          func: getAllTask,
          token: accessToken,
          title: "Active",
        },
      ],
    };

    setAPIProp(apiData);
  }, [accessToken]);

  const [compRow, setCompRow] = useState([]);

  // Refs
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const containerRef = useRef(null);

  // Functions

  let handleApply = () => {};
  const selectedRow = (index, data) => {};
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
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  function getAllTask(data) {
    setData(data.Result);
  }
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
  const filterTabs = {};
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
  const handleEdit = () => {};

  // Arrays

  const [head, setHead] = useState([
    {
      title: "CODE",
      slector: "SUPPLIER_CODE",
      Wid: 270,
      filter: "textFilter",
      Modal: RightDrawer,
      Drawer: SupplierFormModal,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Name",
      Wid: 150,
      slector: "ADDRESS_2",
      // customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },

    {
      title: "Phone",
      Wid: 200,
      slector: "PHONE_1",
      // customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Address",
      Wid: 200,
      slector: "ADDRESS_1",
      // customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Description",
      Wid: 200,
      slector: "SUPPLIER_DESCRIPTION",
      // customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Status",
      slector: "ACTIVE_FLAG",
      Wid: 150,
      // Status: DiscountGroupStatus,
      hidden: false,
      def: false,
      edit: false,
    },
  ]);

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "Details",
      Gridcontent: {
        gridArr: gridArrP,
        setGridArr: setGridArrP,
        handleApi: aPIProp.ShipBoxApiData,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
        // toolBar : false
      },
    },
  ];
  const [subHead, setSubHead] = useState([
    { title: "SubItem", slector: "SubItem", Wid: 250 },
  ]);

  // useEffects

  //hide

  useEffect(() => {
    if (checkedItems.length > 0) {
      // console.log('kuch data log hoa hai');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  useEffect(() => {
    data?.forEach((comp) => {
      //console.log('check========', comp.ACTIVE_FLAG );
      if (comp?.ACTIVE_FLAG == "N" && compRow?.PAYTER_ID !== comp?.PAYTER_ID) {
        setCompRow((prev) => [...prev, comp]);
        //console.log('comp Row', compRow);
      }
    });
  }, [data, refresh]);

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
  }, [compRowA]);

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
          Griddata: data,

          subGridData: subData,
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
        subGridActive: {
          setHActive: setHActive,
          hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },

        // MoreOpt: PMGridMoreOption,
        setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, colaps, colapsComp, subData, head, hActive]);

  return (
    <div className=" w-full  h-full flex flex-col ">
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef]}
          scroll={scrollChange}
          // gridHeader = {false}
          // tabsShow={false}
        />
      </div>
    </div>
  );
};

export default SupplierBody;
