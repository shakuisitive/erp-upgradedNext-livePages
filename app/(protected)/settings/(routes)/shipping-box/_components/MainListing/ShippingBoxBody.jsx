"use client";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import ShippingBoxFilter from "../ShippingBoxFilter";
import ShipBoxRightDrawer from "./ShipBoxRightDrawer";
import ShippingBoxWeight from "./customComponents/ShippingBoxWeight";
import ShippingBoxDimensionL from "./customComponents/ShippingBoxDimensionL";
import ShippingBoxDimensionW from "./customComponents/ShippingBoxDimensionW";
import ShippingBoxDimensionH from "./customComponents/ShippingBoxDimensionH";
import ShippingBoxAction from "./customComponents/ShippingBoxAction";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import InlineEditing from "../InlineEditing";
import { GoHome } from "react-icons/go";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const ShippingBoxBody = () => {
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

  const [head, setHead] = useState([
    {
      title: "Code",
      slector: "CODE",
      Wid: 250,
      filter: "textFilter",
      Modal: ShipBoxRightDrawer,
      customComp: InlineEditing,
      //   Drawer: CustomerFormModal,
    },
    {
      title: "Length",
      slector: "DIMENSION_L",
      Wid: 100,
      customComp: ShippingBoxDimensionL,
      // customComp: InlineEditing,
    },
    {
      title: "Width",
      slector: "DIMENSION_W",
      Wid: 100,
      customComp: ShippingBoxDimensionW,
    },
    {
      title: "Height",
      slector: "DIMENSION_H",
      Wid: 100,
      customComp: ShippingBoxDimensionH,
      // customComp: InlineEditing,
    },
    {
      title: "Weight",
      slector: "WEIGHT",
      Wid: 100,
      customComp: ShippingBoxWeight,
      // customComp: InlineEditing,
    },
    { title: "Notes", slector: "NOTES", Wid: 100 },
    { title: "Status", slector: "", Wid: 200, customComp: ShippingBoxAction },
  ]);

  const filterTabs = {
    actionBtn: {
      // option: option,
    },

    filter: {
      handleFilter: () => {},
      // FilterComp: ShippingBoxFilter,
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
  //Payloads
  const payloadShipBoxA = {
    data: {
      ACTIVE_FLAG: "Y",
      ORDER: "",
      RNUM_FROM: 1,
      RNUM_TO: 25,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetShippingBoxList",
    tid: "144",
    type: "rpc",
  };
  const payloadShipBox = {
    data: {
      ACTIVE_FLAG: "N",
      ORDER: "",
      RNUM_FROM: 1,
      RNUM_TO: 25,
      SEARCH: "",
    },
    action: "Administration",
    method: "GetShippingBoxList",
    tid: "144",
    type: "rpc",
  };
  //functions
  const handleShipBoxA = (data) => {
    setData(data.Result);
  };
  const handleShipBox = (data) => {
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
          GridColaps: true,
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
  }, [data, inactiveData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      ShipBoxApiData: [
        {
          api: Administration.GetShippingBoxList,
          payload: payloadShipBoxA,
          func: handleShipBoxA,
          token: accessToken,
          title: "Active",
        },
        {
          api: Administration.GetShippingBoxList,
          payload: payloadShipBox,
          func: handleShipBox,
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
          // gridHeader = {false}

          // tabsShow={false}
        />
      </div>
    </div>
  );
};

export default ShippingBoxBody;
