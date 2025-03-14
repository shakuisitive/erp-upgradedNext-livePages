 "use client";
 import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import React, { useEffect, useRef, useState } from "react";
//  import TaxAdd from "../_components/grid/TaxAdd"
// import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable"
import Loading from "../../../../../../../components/misc/loader/loading";
import MainTabsGrid from "../../../../../../../components/misc/bindComponent/MainTabsGrid";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { GoHome } from "react-icons/go";
 import NewCustomModal from "../../../../../../../components/misc/pureComponents/custommodal/CustomModal";
 import ShippingCarrierStatus from "../Carriercomponents/ShippingCarrierStatus";
import { AiOutlineIssuesClose, IoIosRemoveCircleOutline } from "react-icons/io";
// import UWFormModal from "../UWFromModal";
// import UWRightDrawer from "../UWRightDrawer";
// import TaxRightDrawer from "../_components/grid/TaxRightDrawer"
// import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer"
// import ActivityLog from "../../../../../../components/misc/globalComponents/activitylog/ActivityLog";
// import TaxActivity from "./grid/TaxActivity";
// import Owner from "../_components/grid/Owner"
 import   InlineEditingCarrier from "../Carriercomponents/InlineEditingCarrier"
import {refreshing, closeDrawer} from "../../../../../settings/(routes)/tax/redux/taxSlice";
// import { Administration } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import { GrHomeRounded } from "react-icons/gr";

const ShippingcarrierBody = () => {
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
const [inactiveData, setInactiveData] = useState();
const [activeData, setActiveData] = useState();
const [errorM, setErrorM] = useState();
const [data, setData] = useState();
const InactiveGridRef = useRef(null);
const refreshing = useSelector((state) => state.tax.refreshing);
 const activityDrawer = useSelector(
   (state) => state.tax.activityDrawer
 );
 const detailData = useSelector( (state) => state.tax.formIndex   );
//  const formIndex = useSelector((state) => state.tax.formIndex);
//  const ParId = formIndex?.ID;
let [error, sendRequest] = useApiFetch();
const handleCloseDrawer = () => {
  dispatch(closeDrawer());
};
 
// const id =  formIndex?.TAX_ID
// console.log(id,formIndex?.TAX_ID,"--------------")
//   Refs
const containerRef = useRef(null);
const activeGridRef = useRef(null);
// const completedGridRef = useRef(null);
const dispatch = useDispatch();
const onRefreshHandle = () => {
  setRefresh(true);
};
const handleCloseModal = () => {
  setIsModalOpen(false);
};
const handleBtnClick = () => {
  setIsModalOpen(true);
  console.log("Modal Open On Button Click");
};
useEffect(() => {
  if (refreshing) {
    setRefresh(true);
    // dispatch(setRefreshing(false));
  }
}, [refreshing]);
const getOptions = [
  {
    label: "New Part",
    icon: IoIosRemoveCircleOutline,
    onClick: handleBtnClick,
  },
];
// const Drawertabs = [
//   {
//     label: "Activity",
//     icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
//     content: <ActivityLog 
//     payloadid={id}/>,
   
//   },
// ];
// console.log( payloadid={id},";;;;;;;;;;;;;")

const [head, setHead] = useState([
  {
    title: "Code",
    slector: "CODE",
    Wid: 407,
    //  Modal:TaxRightDrawer,
    //  Drawer: TaxActivity ,
     customComp: InlineEditingCarrier 

  },
  {
    title: "Name",
    slector: "NAME",
    Wid: 270,
    Status: "",
    filter: "checkFilter",
    checkFilterOptions: ["NEW"],
     ustomComp: InlineEditingCarrier ,
  },
 
  {
    title: "Description",
    slector: "DESCRIPTION",
    Wid: 150,
    Status: "",
    ustomComp: InlineEditingCarrier 
  //  Status: ShippingCarrierStatus

  },
  {
    title: "Status",
    slector: "ACTIVE_FLAG",
    Wid: 150,
     Status: ShippingCarrierStatus,
    hidden: false,
    def: false,
    edit: false,
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
  data: [],
};

//   APIs
// const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetUowList`;
const isOpenModal = useSelector((state) => state.pmSlices.isModal);
//   useEffects
// for api hit
useEffect(() => {
  let apiData = [
    {
      api: Administration.GetShipCarrierList,
      payload: PayloadPartList,
      func: handlePromotionA,
      token: accessToken,
      title: "Active",
    },
  ];
  setAPIProp(apiData);
}, [accessToken]);


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
        // GriddFooterAdd: TaxAdd,

      },
      checkBox: {
        selectedRow: selectedRow,
        checked: checked,
        handleCheckboxChange: handleCheckboxChange,
      },

      ref: activeGridRef,
      fixHight: false,
    },
   
  ];
  setGridArrP(gridArr);
}, [data, colaps, subData, head, hActive]);

// useEffect(() => {
//   const gridArr = [
//     {
//       colmnList: {
//         colmn: head,
//         setColmn: setHead,
//       },

//       title: {
//         GridTitle: "Active",
//         GridColor: "#4ade80",
//       },
//       data: {
//         Griddata: activeData,
//       },
//       colapsList: {
//         GridColaps: true,
//         colaps: colaps,
//         setColaps: setColaps,
//         colapsfunc: colapsfunc,
//       },
//       footerComp: {
//         addFooterComp: true,
//         addFooterSubComp: false,
//       },
//       checkBox: {
//         selectedRow: selectedRow,
//         checked: checked,

const PayloadPartList = {
  data: {
    ACTIVE_FLAG :null,
           RNUM_FROM: 1,
           RNUM_TO: 100,
           SEARCH: "",
           OTHER:"CODE ASC"
       },
       action: "Administration",
        method: "GetShipCarrierList",
         tid: "144",
        type: "rpc",
      username:"admin"
};

 const filterTabs = {
 }
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
    },
  },
];
return (
  <div className="w-full  h-fit  flex flex-col overflow-auto pb-5">
    {loading == true && <Loading />}
    <div ref={containerRef}>
      <MainTabsGrid
        tabs={tabsmains}
        addButton={true}
        onRefresh={onRefresh}
        exportProps={exportProps}
        refArray={[activeGridRef,InactiveGridRef]}
        scroll={scrollChange}
        // GriddFooterAdd={ TaxAdd}
      

      />
       
    </div>
    <NewCustomModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      tabs={ModalTabs}
      heading="Tax" 
      

    />
   {/* <RightDrawer
        isOpen={activityDrawer}
        onClose={handleCloseDrawer}
        heading={formIndex?.CODE}
        tabs={Drawertabs}
      />  */}
  </div>
);
};
export default ShippingcarrierBody;
