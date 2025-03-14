"use client";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import PromotionStatus from "./customComponent/PromotionStatus";
import PromotionFormModal from "./customComponent/PromotionFormModal";
import PromotionFilter from "../PromotionFilter";
import PromotionRightDrawer from "./PromotionRightDrawer";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { GoHome } from "react-icons/go";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { IoIosAdd } from "react-icons/io";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import PromotionForm from "../promotionFrom/PromotionForm";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  setCustomer,
  setNewPromoModal,
  setPartList,
  setPurchaseGroup,
} from "../../_redux/promotionSlice";
const PromotionBody = () => {
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
  let [error, sendRequest] = useApiFetch();
  //useSelectors
  const promoEditModal = useSelector(
    (state) => state.promotionSlice.promoEditModal
  );
  const newFormModal = useSelector(
    (state) => state.promotionSlice.newFormModal
  );
  const promoFormIndex = useSelector((state) => state.promotionSlice.formIndex);
  const promoID = promoFormIndex?.PROMO_ID;
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();
  //Arrays
  const option = {
    label: "New ",
    icon: IoIosAdd,
    onClick: () => {},
  };
  const NewmodalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <PromotionForm />,
    },
  ];

  const [head, setHead] = useState([
    {
      title: "Promo",
      slector: "NAME",
      Wid: 300,
      filter: "textFilter",
      Modal: PromotionRightDrawer,
      Drawer: PromotionFormModal,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      Wid: 150,
    },
    {
      title: "Start Date",
      slector: "PROMO_START_DATE",
      Wid: 100,
      date: true,
    },
    {
      title: "End Date",
      slector: "PROMO_END_DATE",
      Wid: 100,
      date: true,
    },
    {
      title: "Min",
      slector: "MINIMUM_QUANTITY",
      Wid: 100,
    },
    {
      title: "Max",
      slector: "MAXIMUM_QUANTITY",
      Wid: 100,
    },
    { title: "Based On", slector: "PROMO_BASED_ON", Wid: 100 },
    { title: "Value", slector: "PROMO_VALUE", Wid: 100 },
    { title: "Status", slector: "", Wid: 150, customComp: PromotionStatus },
  ]);

  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        dispatch(setNewPromoModal());
      },
    },

    filter: {
      handleFilter: () => {},
      FilterComp: PromotionFilter,
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
  const payloadPromotionA = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: null,
    },
    action: "Administration",
    method: "GetBranchList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  //functions
  const handleCloseModal = () => {
    dispatch(closeModal());
    setRefresh(true);
  };
  const handlePromotionA = (data) => {
    setData(data.Result);
    const dataInActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG == "N";
    });
    const dataActive = data?.Result?.filter((item) => {
      return item.ACTIVE_FLAG == "Y";
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
  const payloadCustomer = {
    data: {
      SEARCH: "",
      ORDER: "",
      ACTIVE_FLAG: "Y",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "10000",
    },
    action: "Administration",
    method: "GetCustomersList",
    type: "rpc",
    tid: "144",
  };
  const payloadParts = {
    data: {
      SEARCH: "",
      ORDER: "PAR_ID DESC",
      ACTIVE_FLAG: "Y",
      RNUM_FROM: "1",
      RNUM_TO: "100",
    },
    action: "ItemMaster",
    method: "GetPartsList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPurchaseG = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      OFFSET: "",
      ACTIVE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "GetPurchaseGroupList",
    username: "ncadm",
    type: "rpc",
    tid: "144",
  };

  const handleCustomer = (data) => {
    dispatch(setCustomer(data?.Result));
  };
  const handleParts = (data) => {
    dispatch(setPartList(data?.Result.Results));
  };
  const handlePurchaseG = (data) => {
    dispatch(setPurchaseGroup(data?.Result));
  };
  //useEffect
  useEffect(() => {
    sendRequest(
      Administration.GetCustomersList,
      "POST",
      payloadCustomer,
      handleCustomer,
      accessToken
    );
    sendRequest(
      ItemMaster.GetPartsList,
      "POST",
      payloadParts,
      handleParts,
      accessToken
    );
    sendRequest(
      Administration.GetPurchaseGroupList,
      "POST",
      payloadPurchaseG,
      handlePurchaseG,
      accessToken
    );
  }, [accessToken]);
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

        ref: InactiveGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [inactiveData, activeData, colaps, colapsComp, head]);
  // for api
  useEffect(() => {
    let apiData = {
      PromotionApiData: [
        {
          api: Administration.GetPromotionList,
          payload: payloadPromotionA,
          func: handlePromotionA,
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
        />
      </div>
      <NewCustomModal
        isOpen={promoID ? promoEditModal : newFormModal}
        onClose={handleCloseModal}
        tabs={NewmodalTabs}
        heading="Promotion"
      />
    </div>
  );
};

export default PromotionBody;
