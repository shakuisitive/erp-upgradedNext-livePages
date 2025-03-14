"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import {
  Administration,
  Inventory,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import HTdrawer from "../htCodeMainListing/HTdrawer";
import HTowner from "../htCodeMainListing/customComponents/HTowner";
import { GoHome } from "react-icons/go";
import HtCodeForm from "../htCodeForm/HtCodeForm";
import ActivityLog from "../../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
import { IoIosAdd } from "react-icons/io";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import HtCodeStatus from "./customComponents/HtCodeStatus";
import {
  closeEditModal,
  setNewModal,
  setRefreshing,
} from "../../_redux/htCodeSlice";
import HTinlineEditing from "../../_components/htCodeMainListing/HTinlineEditing";
import HtCodeFormModal from "./customComponents/HtCodeFormModal";

const HTCodeBody = () => {
  //states
  const [scrollChange, setScrollChange] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [accessToken, setAccessToken] = useState();
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
  const accessToken = useSelector((state) => state.user.tokenSession);

  //   const refreshing = useSelector((state) => state.prodCategorySlice.refreshing);
  const editFormModal = useSelector((state) => state.htCodeSlice.editFormModal);
  const newFormModal = useSelector((state) => state.htCodeSlice.newFormModal);
  const formIndex = useSelector((state) => state.htCodeSlice.formIndex);
  const refreshing = useSelector((state) => state.htCodeSlice.refreshing);
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const InactiveGridRef = useRef(null);
  const dispatch = useDispatch();
  //Arrays

  const [head, setHead] = useState([
    {
      title: "Code",
      slector: "CODE",
      Wid: 300,
      filter: "textFilter",
      child: true,
      //  customComp: ,
      Modal: HTdrawer,
      Drawer: HtCodeFormModal,
    },
    {
      title: "Owner",
      slector: "CODE",
      Wid: 270,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
      customComp: HTowner,
    },
    {
      title: "Name",
      slector: "CODE",
      customComp: HTinlineEditing,
      Wid: 150,
    },
    {
      title: "Description",
      slector: "DESCRIPTION",
      customComp: HTinlineEditing,
      Wid: 150,
    },
    {
      title: "Tranportation Fee",
      slector: "TRANSPORATION_FEE",
      customComp: HTinlineEditing,
      Wid: 150,
    },

    {
      title: "Status",
      slector: "",
      Wid: 150,
      Status: HtCodeStatus,
    },
  ]);

  const option = [{}];
  const NewModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <HtCodeForm />,
    },
  ];
  const EditModalTabs = [
    {
      icon: <GoHome />,
      label: "Details",
      content: <HtCodeForm />,
    },
    {
      label: "Activity Log",
      content: <ActivityLog payloadid={formIndex?.HT_CODE_ID} />,
    },
  ];
  const handleCloseModal = () => {
    // setIsModalOpen(false);
    dispatch(closeEditModal());
  };
  const filterTabs = {
    actionBtn: {
      option: option,
      label: "New",
      icon: IoIosAdd,
      onClick: () => {
        dispatch(setNewModal());
      },
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
      ORDER: "CODE DESC",
    },
    action: "Administration",
    method: "GetHarmonizedTarrifCodeList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  //functions

  const handleGetPartDetList = (data) => {
    setData(data.Result || data.Results);
    const dataToUse = data?.Result || data?.Results;
    const dataInActive = dataToUse?.filter((item) => {
      return item.ACTIVE_FLAG === "N";
    });

    const dataActive = dataToUse.filter((item) => {
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

  //useEffect
  useEffect(() => {
    setRefresh(true);
    // dispatch(setRefreshing(false));
  }, [refreshing]);
  useEffect(() => {
    dispatch(setRefreshing(false));
  }, [refresh]);

  // for token
  // useEffect(() => {
  //   const Token =
  //     typeof localStorage !== "undefined"
  //       ? localStorage.getItem("tokenSession")
  //       : null;
  //   setAccessToken(Token);
  // }, []);
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
          //   GriddFooterAdd: NewProdCategory,
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
          api: Administration.GetHarmonizedTarrifCodeList,
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
          //   GriddFooterAdd={NewProdCategory}
        />
      </div>
      <NewCustomModal
        isOpen={formIndex?.HT_CODE_ID ? editFormModal : newFormModal}
        onClose={handleCloseModal}
        tabs={formIndex?.HT_CODE_ID ? EditModalTabs : NewModalTabs}
        heading="Harmonized Tarrif Code"
      />
    </div>
  );
};

export default HTCodeBody;
