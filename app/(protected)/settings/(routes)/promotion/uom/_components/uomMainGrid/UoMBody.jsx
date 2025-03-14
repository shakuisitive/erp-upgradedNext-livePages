"use client";
import  react,{ useEffect, useRef, useState } from "react";
import Loading from "../../../../../../../../components/misc/loader/loading";
import { useDispatch, useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
import NewCustomModal from "../.././../../../../../../components/misc/pureComponents/custommodal/NewCustomModal"
import useApiFetch from "../../../../../.././../../customHook/useApiFetch";
import MainTabsGrid from "../../../../../../../../components/misc/bindComponent/MainTabsGrid" 
import { AiOutlineIssuesClose, IoIosRemoveCircleOutline } from "react-icons/io";
import {Administration} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant"

import UMFromModal from "../UMFromModal"
import UMRightDrawer from "../UMRightDrawer"
const UoMBody =() =>{
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
  
    const dispatch = useDispatch();
    const [errorM, setErrorM] = useState();
    const [data, setData] = useState();
  
    let [error, sendRequest] = useApiFetch();
    //   Refs
    const containerRef = useRef(null);
    const activeGridRef = useRef(null);
    // const completedGridRef = useRef(null);
    const onRefreshHandle = () => {
        setRefresh(true);
      }
      const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(closeModal());
      };
      const handleBtnClick = () => {
        setIsModalOpen(true);
        console.log("Modal Open On Button Click");
      };
      const getOptions = [
        {
          label: "New Part",
          icon: IoIosRemoveCircleOutline,
          onClick: handleBtnClick,
        },
        { label: "Non-Stock", icon: IoIosRemoveCircleOutline, onClick: () => {} },
        { label: "Duplicate", icon: IoIosRemoveCircleOutline, onClick: "" },
        { label: "Kit", icon: IoIosRemoveCircleOutline, onClick: "" },
        { label: "Bolton", icon: IoIosRemoveCircleOutline, onClick: "" },
      ];
      const [head, setHead] = useState([
        {
          title: "ID",
          slector: "UOM_ID",
          Wid: 407,
          Modal: UMRightDrawer,
           Drawer:UMFromModal,
        },
        {
          title: "Name",
          slector: "CODE",
          Wid: 200,
          Status: "",
          filter: "checkFilter",
          checkFilterOptions: ["NEW"],
        },
        {
          title: "description",
          slector: "DESCRIPTION",
          Wid: 200,
          Status: "",
          filter: "checkFilter",
          checkFilterOptions: ["NEW"],
        },
        {
            title: "Status",
          slector: "RECEIVING_STATUS",
          Wid: 150,
            Status: "",
        },
    ]);
    const ModalTabs = [
      {
        icon: <GoHome />,
        label: "Details", 
       
      },
    ];
const onRefresh = {
  onRefreshHandle: onRefreshHandle,
};
// const handleCloseModal = () => {
//     setIsModalOpen(false);
//     dispatch(closeModal());
//   };
const exportProps = {
    fileName: "",
    fileExtension: "xls",
//      datas: CsvData,
  };
  
//   APIs
// const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetUomList`;
// const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetUowList`;
const isOpenModal = useSelector((state) => state.pmSlices.isModal);
//   useEffects
// for api hit
useEffect(() => {
  let apiData = [
    {
      api: Administration.GetUoMList,
      payload: PayloadPartList,
      func: handlePartList,
      token: accessToken,
      title: "Active",
    },

  ];
  setAPIProp(apiData);
}, [accessToken]);
//  useEffect(() => {
//      sendRequest(apiPartList, "POST", PayloadPartList, handlePartList, accessToken);
//    }, [accessToken]);
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
  const colapsfunc = () => {
    if (colaps && !colapsComp) {
      setColaps(false);
      // setColapsComp(true);
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
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
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
  }, [data, colaps,  subData, head, hActive]);
// Payloads
const PayloadPartList = {
  data: {
    
        SEARCH		: "",
        ORDER		: "",
        RNUM_FROM	: "1",
        RNUM_TO 	: "100",
        ACTIVE_FLAG	: "Y"
      },
action: "Administration",
method: "GetUomList",
username: "admin",
type: "rpc",
tid: "144"
// SEARCH     	: "",
//     ORDER     	: "",
//     RNUM_FROM     : "1",
//     RNUM_TO       : "100",
//     ACTIVE_FLAG   : "Y"
//    },
//    action: "InventoryWeb",
//     method: "GetUowList",
//    username: "admin", 
//    type: "rpc",  
//     tid: "144"

    }
const filterTabs = {
  };
  function handlePartList(data) {
    setData(data.Result);
    setLoading(false);
    setErrorM(error);
  
  }

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

    //   Grid Head

   
    return(
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
        <NewCustomModal
       
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          tabs={ ModalTabs}
          
          heading="UOW"
        />
        {/* <options/> */}
      </div>
    )
}
export default UoMBody