"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoHome } from "react-icons/go";
import { AiOutlineIssuesClose, IoIosRemoveCircleOutline } from "react-icons/io";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import Loading from "../../../../../../../components/misc/loader/loading";
import { useDispatch, useSelector } from "react-redux";
import Owner from "./Owner";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import RightDrawer from "../RightDrawer";
import {
  setMainTaxList,
  closeModallForm,
  // setRefresh,
  setHeadRedux,
  setHeadReduxT,
} from "../../redux/LotNumberSlice";
const LotNumberBody = () => {
  const [hActive, setHActive] = useState({});

  //redux state

  let [subData, setSubData] = useState([]);
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const InactiveGridRef = useRef(null);

  //useeffect

  let [error, sendRequest] = useApiFetch();
  const [data, setData] = useState([]);

  let [head, setHead] = useState([
    {
      title: "WAREHOUSE",
      slector: "WAREHOUSE_DESC",
      Wid: 270,
      filter: "textFilter",
      Modal: RightDrawer,
      //  Drawer: OpenModal,
      hidden: false,
      def: false,
      edit: false,
    },

    {
      title: "LOT_NUMBER",
      slector: "LOT_BARCODE",
      Wid: 270,
      filter: "textFilter",
      // Modal: RightDrawer,
      //  Drawer: OpenModal,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "PG",
      Wid: 150,
      slector: "PG",
      //   customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Expiry",
      Wid: 150,
      slector: "EXPIRY",
      //   customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Remaining Days",
      Wid: 200,
      slector: "REMAINING DA",
      //    customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "OH_QUANTITY",
      Wid: 200,
      slector: "LOT_BARCODE",
      //    customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "AVL_QTY_LOT",
      Wid: 200,
      slector: "OH_QTY_LOT",
      //    customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Status",
      slector: "STATUS",
      Wid: 150,
      //   Status: TaxStatus,
      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "ACTION",
      slector: "action",
      Wid: 150,

      hidden: false,
      def: false,
      edit: false,
    },
    {
      title: "Name",
      Wid: 150,
      slector: "TAX_CODE",
      //   customComp: InlineEditInput,
      hidden: false,
      def: false,
      edit: false,
    },
  ]);

  //console.log(taxHead);
  const paymentTermPayload = {
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      ACTIVE_FLAG: "Y",
      // PAR_ID: "26",
      PURGRO_ID: "",
      WAR_ID: "",
      EXPIRY_FLAG: "",
    },
    action: "Administration",
    method: "GetPartLotAllList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const [compRow, setCompRow] = useState([]);
  //console.log('comp Row' , compRow);

  const accessToken = localStorage.getItem("tokenSession");
  const getAllTask = (data) => {
    setData(data.Result);
  };
  useEffect(() => {
    let apiData = [
      {
        api: Administration.GetPartLotALLList,
        payload: paymentTermPayload,
        func: getAllTask,
        token: accessToken,
        title: "Active",
      },
    ];

    setAPIProp(apiData);
  }, [accessToken]);

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
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

  const [scrollChange, setScrollChange] = useState(1);
  const activeGridRef = useRef(null);
  const InactivedGridRef = useRef(null);
  useEffect(() => {
    const container = activeGridRef.current;

    const handleOverflowChange = (entries) => {
      setScrollChange((pre) => pre + 1);
    };
    const resizeObserver = new ResizeObserver(handleOverflowChange);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  //--------------------select and pop up

  let [isOpen, setIsOpen] = useState(true);
  const [isModalOpenA, setIsModalOpenA] = useState(false);
  const [isModalOpenB, setIsModalOpenB] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
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
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  useEffect(() => {
    if (checkedItems.length > 0) {
      // console.log('kuch data log hoa hai');
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [checkedItems]);

  const closeModallSlected = () => {};

  const closeModal = () => {
    setIsModalOpenA(false);
  };
  const handleOpenModal = () => {
    setIsModalOpenA(true);
  };
  const handleCloseModal = () => {
    setIsModalOpenB(false);
  };
  const handleEdit = () => {};

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
  //   Arrays

  const options = [
    {
      label: "New Part",
      icon: IoIosRemoveCircleOutline,
      onClick: () => {},
    },
  ];
  const filterTabs = {};

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

          //  GriddFooterAdd: PurchaseGridAdd,
          //  SubGriddFooterAdd: PurchaseAddSubGrid,
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

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, colaps, subData, head, hActive]);
  //hide

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
  let setDataRowChange = () => {};
  const subGridOpen = (getData) => {
    // console.log(getData)
    const getDataDet = {
      statusId: getData.ACTIVE_FLAG,
      id: getData.TAX_ID,
      product: [getData],
    };
    setSubData((prev) => [...prev, getDataDet]);
  };
  // console.log("Sub DATa",subData)
  return (
    <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
      <div className="w-full pl-10 pt-3 pb-1 ">
        {/* <TabsNav/> */}
        {loading == true && <Loading />}
        <div ref={containerRef}>
          <MainTabsGrid
            tabs={tabsmains}
            onRefresh={onRefresh}
            exportProps={exportProps}
            refArray={[activeGridRef]}
            scroll={scrollChange}
          />
        </div>
      </div>
      <div
        ref={activeGridRef}
        className={`overflow-x-auto    mt-1 h-fit mr- `}
      ></div>

      <div></div>
    </div>
  );
};

export default LotNumberBody;
