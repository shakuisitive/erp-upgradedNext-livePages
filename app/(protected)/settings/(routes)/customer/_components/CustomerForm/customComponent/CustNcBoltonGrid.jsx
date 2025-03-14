"use client";
import React, { useEffect, useRef, useState } from "react";
import MainTabsGrid from "../../../../../../../../components/misc/bindComponent/MainTabsGrid";
import Loading from "../../../../../../../../components/misc/loader/loading";
import { GoHome } from "react-icons/go";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewPartPriceId,
  setPartPriceOverrideList,
} from "../../../_redux/customerSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import CustListPrice from "./CustListPrice";

const CustNcBolton = ({ newOption, partPriceList }) => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState();
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [boltonArr, setBoltonArr] = useState();
  const [data, setData] = useState();
  const [boltonData, setBoltonData] = useState();
  const [ncData, setNcData] = useState();

  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [newPartCode, setNewPartCode] = useState();

  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  //dispatch
  const dispatch = useDispatch();
  const [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const partPriceOverrideList = useSelector(
    (state) => state.customerSlice.partPriceOverrideList
  );

  const filteredBolton = partPriceOverrideList?.filter(
    (item) => item.BOLTON_FLAG === "Y"
  );
  const filteredNc = partPriceOverrideList?.filter(
    (item) => item.BOLTON_FLAG === "N"
  );
  const [filteredItems, setFilteredItems] = useState({
    boltonY: [],
    boltonN: [],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const boltonY = data.filter((item) => item.BOLTON_FLAG === "Y");
      const boltonN = data.filter((item) => item.BOLTON_FLAG === "N");
      setFilteredItems({ boltonY, boltonN });
    }
  }, [data]);

  // Destructure filteredItems state for easier access
  const { boltonY, boltonN } = filteredItems;
  // console.log("rowData Bolton:", filteredBolton);
  // console.log("rowData Nc:", filteredNc);
  //Arrays

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "SKU",
      slector: "SKU",
      Wid: 150,
    },

    {
      title: "Details",
      slector: "SKU_DESCRIPTION",
      Wid: 120,
    },
    {
      title: "MSRP",
      slector: "MSRP",
      Wid: 120,
    },
    {
      title: "List Price",
      slector: "LIST_PRICE",
      customComp: CustListPrice,
      Wid: 120,
    },
  ]);
  const option = {
    label: "Update ",

    onClick: () => {},
  };
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "Update",

      onClick: () => {},
    },
    navigatorShow: false,
    sortShow: false,
    hideShow: false,
    filterShow: false,
    // search: {
    //   searchShow: true,
    // },
    // filterTool: false,
  };

  const tabsmains = [
    {
      icon: <GoHome />,
      label: "NC",
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
    {
      label: "Bolton",
      Gridcontent: {
        gridArr: boltonArr,
        setGridArr: setGridArrP,
        handleApi: aPIProp.BranchApiDataA,
        defColmn: head,
        setDefColmn: setHead,
        filterTabs: filterTabs,
        refresh: refresh,
        setRefresh: setRefresh,
      },
    },
  ];
  //Payloads
  const payloadDetails = {
    data: {
      PARPRICLIST_ID: "",
      CODE: newOption,
      DESCRIPTION: "",
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "PostPartPriceList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  //functions
  const handleGetPartPriceOverride = (data) => {
    dispatch(setPartPriceOverrideList(data?.Result));
    setData(data?.Result);
  };
  const payloadPartPriceOverride = {
    data: {
      PARPRICLIST_ID: newPartCode || partPriceList,
    },
    action: "Administration",
    method: "GetPartPriceOverride",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePostPartPrice = (data) => {
    setNewPartCode(data?.Result);
    dispatch(setNewPartPriceId(data?.Result));
  };

  useEffect(() => {
    sendRequest(
      Administration.GetPartPriceOverride,
      "POST",
      payloadPartPriceOverride,
      handleGetPartPriceOverride,
      token
    );
  }, [newPartCode, partPriceList]);
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
    if (typeof window !== "undefined") {
      const Token = localStorage.getItem("tokenSession");
      setAccessToken(Token);
    }
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
          Griddata: boltonN,
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
        paginationList: {
          fixHight: "def",
          pagination: true,
        },

        ref: activeGridRef,
        fixHight: true,
      },
    ];
    const boltonArr = [
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
          Griddata: boltonY,
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
        paginationList: {
          fixHight: "def",
          pagination: true,
        },

        ref: activeGridRef,
        fixHight: true,
      },
    ];
    setBoltonArr(boltonArr);
    setGridArrP(gridArr);
  }, [data, boltonY, boltonN, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    if (newOption) {
      let apiData = {
        BranchApiDataA: [
          {
            api: Administration.PostPartPriceList,
            payload: payloadDetails,
            func: handlePostPartPrice,
            token: accessToken,
            title: "Active",
          },
        ],
      };
      setAPIProp(apiData);
    }
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
          refArray={[activeGridRef]}
          scroll={scrollChange}
        />
      </div>
    </div>
  );
};

export default CustNcBolton;
