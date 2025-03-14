import React, { useEffect, useRef, useState } from "react";
import { AiOutlineIssuesClose, IoIosRemoveCircleOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/pmSlice";
import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import OrganizationFormModal from './customComponents/OrganizationFormModal'
import OrganizationRightDrawer from './customComponents/OrganizationRightDrawer'
import OrganizationGridMoreOption from './customComponents/OrganizationGridMoreOption'

const PMMainGrid = () => {
  // alert(errorMessage.purchase.zeroQty);
  // states
  const [accessToken, setAccessToken] = useState();
  const [hActive, setHActive] = useState({});
  const [compRow, setCompRow] = useState([]);
  const [compRowA, setCompRowA] = useState([]);
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  let [subData, setSubData] = useState([]);
  const [scrollChange, setScrollChange] = useState(1);
  const [loading, setLoading] = useState(false);
  const [colaps, setColaps] = useState(false);
  const [colapsComp, setColapsComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const [errorM, setErrorM] = useState();
  const [data, setData] = useState();

  let [error, sendRequest] = useApiFetch();
  //   Refs
  const containerRef = useRef(null);
  const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);

  //   APIs
  // const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}ItemMaster/GetPartsList`;
  //Selectors
  const isOpenModal = useSelector((state) => state.pmSlices.isModal);
  // for api hit
  useEffect(() => {
    let apiData = [
      {
        api: Administration.GetCorporateList,
        payload: PayloadPartList,
        func: handlePartList,
        token: accessToken,
        title: "Active",
      },
      
    ];
    setAPIProp(apiData);
  }, [accessToken]);

  // Payloads
  const PayloadPartList = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "",
      CORPORATE_NAME: "",
      ADDRESS_1: "",
      PHONE_1: "",
      EMAIL: "",
    },
    action: "Administration",
    method: "GetBranchList",
    username: "admin",
    password: "1234",
    type: "rpc",
    tid: "144",
  };

  //   Functions
  function handlePartList(data) {
    setData(data.Result);
    setLoading(false);
    setErrorM(error);
  }
  const filterTabs = {
    // actionBtn: {
    //   option: options,
    // },
    // handleFilter: handleFilter,
    // navigatorShow :  false ,
    // sortShow : false ,
    // hideShow : false ,
    //  filterShow : false ,
    //  search :{
    //   searchShow : false
    //  }
    //  filterTool : false
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
  const subGridOpen = () => {
    setSubRow(subRow);
  };
 
  
  const onRefreshHandle = () => {
    setRefresh(true);
  };
  const onRefresh = {
    onRefreshHandle: onRefreshHandle,
  };
  const exportProps = {
    fileName: "Download",
    fileExtension: "csv",
    data: [],
  };
  const handleEdit = () => {};

  //   Arrays

  const options = [
    {
      label: "New Part",
      icon: IoIosRemoveCircleOutline,
      onClick: ()=>{},
    }
  ];
  

  const [head, setHead] = useState([
    {
      title: "Name",
      slector: "CORPORATE_NAME",
      Wid: 400,
      filter: "textFilter",
      Modal: OrganizationRightDrawer,
      Drawer: OrganizationFormModal,
    },
    {
      title: "Address",
      slector: "ADDRESS_1",
      Wid: 250,
      Status: "",
      filter: "checkFilter",
      checkFilterOptions: ["NEW"],
    },
    {
      title: "Phone",
      slector: "PHONE_1",
      Wid: 150,
      // filter: "checkFilter",
      hidden: false,
      def: false,
    },
    {
      title: "Email",
      Wid: 300,
      slector: "EMAIL",
      // date: true,
      hidden: false,
      def: false,
    },
    {
      title: "Status",
      Wid: 50,
      mWid: 60,
      slector: "ACTIVE_FLAG",
      // date: true,
      hidden: false,
      def: false,
    },
    {
      title: "Action",
      Wid: 50,
      slector: "CORPORATE_CODE",
      // Status: PurchaseMGridAction,
      // mWid: 200,
      hidden: false,
      def: false,
    },
  ]);
  const [subHead, setSubHead] = useState([
    { title: "SubItem", slector: "CORPORATE_NAME", Wid: 250 },
    /*  { title: "Location", slector: "LOCATION", Wid: 120 },
    { title: "Lot Number", slector: "Lot_number", Wid: 120, date: true },
    { title: "Expiry", slector: "Expiry", Wid: 120 },
    { title: "Rem Months", slector: "Rem_Months", Wid: 120 },
    { title: "OH Qty", slector: "OH_Qty", Wid: 120 },
    { title: "AV Qty", slector: "AV_Qty", Wid: 120 },
    { title: "Min/Max", slector: "MinMax", Wid: 120 }, */
  ]);
  const [subRow, setSubRow] = useState([
    {
      SubItem: "NC-Main Inventory",
      LOCATION: "10101010",
      Lot_number: "Lot253467",
      Expiry: "25 Apr",
      Rem_Months: "12",
      OH_Qty: "540",
      AV_Qty: "540",
      MinMax: "10/100",
    },
  ]);
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
  //   useEffects
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
        subGridActive: {
          setHActive: setHActive,
          hActive: hActive,
          //   subActiveKey: "PO_COUNT",
          //   subInActiveVal: 0,
          //   subGridOpen: subGridOpen,
          //   idKey: "PURORD_ID",
        },

        MoreOpt: OrganizationGridMoreOption,
        setEdite: handleEdit,

        ref: activeGridRef,
        fixHight: false,
      },
    ];
    setGridArrP(gridArr);
  }, [data, colaps, colapsComp, subData, head, hActive]);

  return (
    <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef /*,completedGridRef*/]}
          scroll={scrollChange}
          // gridHeader = {false}

          // tabsShow={false}
        />
      </div>

      
    </div>
  );
};

export default PMMainGrid;
