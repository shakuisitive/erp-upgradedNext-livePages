// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
// import useApiFetch from "../../../../../../customHook/useApiFetch";
// import DiscountGroupModal from "./DiscountGroupModal";
// import { InlineEditInput } from "./InlineEditInput";
// import DiscountGroupStatus from "./DiscountGroupStatus";
// import DiscountGroupDrawer from "./DiscountGroupDrawer";
// import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
// // import SlectedModall from "./SlectedModall";
// import { useDispatch, useSelector } from "react-redux";
// import { GoHome } from "react-icons/go";
// import DiscountGroupForm from "./DiscountGroupForm";
// // new imports
// import Loading from "../../../../../../components/misc/loader/loading";
// import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
// import {
//   Administration,
//   ItemMaster,
// } from "../../../../../../components/misc/pureComponents/constants/apiConstant";

// const DiscountGroupBody = () => {
//   // let refresh=useSelector(state=>state.discountGroup.refresh)
//   let dispatch = useDispatch();
//   let [error, sendRequest] = useApiFetch();
//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [errorM, setErrorM] = useState();

//   let [isOpen, setIsOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpenC, setIsModalOpenC] = useState(false);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [checkedAll, setCheckedAll] = useState(false);

//   // new imports
//   const [compRowA, setCompRowA] = useState([]);
//   let [subData, setSubData] = useState([]);
//   const [hActive, setHActive] = useState({});
//   let [gridArrP, setGridArrP] = useState();
//   let [aPIProp, setAPIProp] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   // const supplierHead = useSelector((state) => state.supplier.supplierHead);
//   const [accessToken, setAccessToken] = useState();

//   let arr = useSelector((state) => state.discountGroup.refArray);
//   const [compRow, setCompRow] = useState([]);

//   const containerRef = useRef(null);

//   // Api hit
//   useEffect(() => {
//     let apiData = [
//       {
//         api: Administration.GetDiscountList,
//         payload: PayloadDiscountList,
//         func: handleDiscountList,
//         token: accessToken,
//         title: "Active",
//       },
//       // {
//       //   api: Administration.GetSupplierList,
//       //   payload: PayloadPartList,
//       //   func: handlePartList,
//       //   token: accessToken,
//       //   title: "Completed",
//       // },
//     ];
//     setAPIProp(apiData);
//   }, [accessToken]);

//   // Payloads
//   const PayloadDiscountList = {
//     data: {
//       ACTIVE_FLAG: "Y",
//       RNUM_FROM: 1,
//       RNUM_TO: 25,
//       SEARCH: "",
//       OFFSET: "",
//       ORDER: "",
//     },
//     action: "Administration",
//     method: "GetDiscountGroupList",
//     username: "admin",
//     type: "rpc",
//     tid: "144",
//   };

//   //   Functions
//   function handleDiscountList(data) {
//     setData(data.Result);
//     setLoading(false);
//     setErrorM(error);
//   }

//   const [colaps, setColaps] = useState(false);
//   const [colapsComp, setColapsComp] = useState(false);

//   //scroll
//   const [scrollChange, setScrollChange] = useState(1);
//   const activeGridRef = useRef(null);
//   const completedGridRef = useRef(null);

//   //select

//   const closeModal = () => {
//     setIsModalOpen(false);
//     dispatch(colseNewModall());
//   };
//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//     dispatch(openForm(index));
//   };
//   const handleCloseModal = () => {
//     setIsModalOpenC(false);
//     // dispatch(closeModallForm());
//   };
//   let handleApply = () => {};
//   const selectedRow = (index, data) => {
//     // console.log('check slected row Data and index' , index , data);
//   };
//   const handleCheckboxChange = (rowI, rowData) => {
//     if (rowData == "all" && checkedAll == false) {
//       setCheckedAll(true);
//       const arr = data?.Result.map((SData, i) => {
//         let obj = {};
//         obj = { rowI: i, rowData: SData };

//         return obj;
//       });

//       setCheckedItems(arr);
//     } else if (rowData == "all" && checkedAll == true) {
//       setCheckedAll(false);
//       setCheckedItems([]);
//     } else {
//       if (checked(rowI, rowData)) {
//         // Remove the item if it's already checked
//         setCheckedItems(
//           checkedItems.filter(
//             (item) => item.rowI !== rowI && item.rowData !== rowData
//           )
//         );
//       } else {
//         // Add the item if it's not checked
//         setCheckedItems([...checkedItems, { rowI, rowData }]);
//       }
//     }
//   };
//   const checked = (rowI, rowData) => {
//     return checkedItems.some(
//       (item) => item.rowI === rowI && item.rowData === rowData
//     );
//   };

//   const colapsfunc = () => {
//     if (colaps && !colapsComp) {
//       setColaps(false);
//       setColapsComp(true);
//     } else {
//       setColaps(!colaps);
//     }
//   };
//   const filterTabs = {
//     // actionBtn: {
//     //   option: options,
//     // },
//     // handleFilter: handleFilter,
//     // navigatorShow :  false ,
//     // sortShow : false ,
//     // hideShow : false ,
//     //  filterShow : false ,
//     //  search :{
//     //   searchShow : false
//     //  }
//     //  filterTool : false
//   };
//   const colapsfuncComp = () => {
//     if (!colaps && colapsComp) {
//       setColaps(true);
//       setColapsComp(false);
//     } else {
//       setColapsComp(!colapsComp);
//     }
//   };
//   const handleEdit = () => {};
//   const onRefreshHandle = () => {
//     setRefresh(true);
//   };

//   const onRefresh = {
//     onRefreshHandle: onRefreshHandle,
//   };
//   const closeModallSlected = () => {};
//   const exportProps = {
//     fileName: "",
//     fileExtension: "xls",
//     // datas: CsvData,
//   };

//   const tabs = [
//     {
//       icon: <GoHome />,
//       label: "Details",
//       content: <DiscountGroupForm />,
//     },
//   ];
//   const tabsC = [
//     {
//       icon: <GoHome />,
//       label: "Details",
//       content: <DiscountGroupForm />,
//     },
//     { label: "Audit Log", content: <div>Content for Audit Log</div> },
//   ];

//   // Arrays

//   const [head, setHead] = useState([
//     {
//       title: "CODE",
//       slector: "CODE",
//       Wid: 270,
//       filter: "textFilter",
//       Modal: DiscountGroupModal,
//       Drawer: DiscountGroupDrawer,
//     },
//     {
//       title: "Name",
//       Wid: 150,
//       slector: "NAME",
//       customComp: InlineEditInput,
//     },

//     {
//       title: "Description",
//       Wid: 200,
//       slector: "DESCRIPTION",
//       customComp: InlineEditInput,
//     },
//     {
//       title: "Discount Percentage",
//       slector: "DISCOUNT_PERCENTAGE",
//       filter: "checkFilter",
//       Wid: 100,
//       customComp: InlineEditInput,
//     },
//     {
//       title: "Status",
//       slector: "ACTIVE_FLAG",
//       Wid: 150,
//       Status: DiscountGroupStatus,
//     },
//   ]);
//   const [subHead, setSubHead] = useState([
//     { title: "SubItem", slector: "NAME", Wid: 250 },
//   ]);

//   const tabsmains = [
//     {
//       icon: <GoHome />,
//       label: "Details",
//       Gridcontent: {
//         gridArr: gridArrP,
//         setGridArr: setGridArrP,
//         handleApi: aPIProp,
//         defColmn: head,
//         setDefColmn: setHead,
//         filterTabs: filterTabs,
//         refresh: refresh,
//         setRefresh: setRefresh,
//         // toolBar : false
//       },
//     },
//     {
//       icon: <GoHome />,
//       label: "Special",
//       Gridcontent: {
//         gridArr: gridArrP,
//         setGridArr: setGridArrP,
//         handleApi: aPIProp,
//         defColmn: head,
//         setDefColmn: setHead,
//         // filterTabs: filterTabs,
//         refresh: refresh,
//         setRefresh: setRefresh,
//         // toolBar : false
//       },
//     },
//   ];

//   useEffect(() => {
//     if (compRowA.length > 0) {
//       const container = containerRef?.current;
//       const handleOverflowChange = (entries) => {
//         setScrollChange((pre) => pre + 1);
//       };
//       const resizeObserver = new ResizeObserver(handleOverflowChange);
//       resizeObserver?.observe(container);

//       return () => {
//         resizeObserver?.disconnect();
//       };
//     }
//   }, [compRowA]);

//   useEffect(() => {
//     const Token =
//       typeof localStorage !== "undefined"
//         ? localStorage.getItem("tokenSession")
//         : null;
//     setAccessToken(Token);
//   }, []);

//   // for grid Array
//   useEffect(() => {
//     const gridArr = [
//       {
//         colmnList: {
//           colmn: head,
//           setColmn: setHead,
//         },
//         subColumnList: {
//           subComln: subHead,
//           setSubColmn: setSubHead,
//         },
//         title: {
//           GridTitle: "Active",
//           GridColor: "#4ade80",
//         },
//         data: {
//           Griddata: data,

//           subGridData: subData,
//         },
//         colapsList: {
//           GridColaps: false,
//           colaps: colaps,
//           setColaps: setColaps,
//           colapsfunc: colapsfunc,
//         },
//         footerComp: {
//           addFooterComp: true,
//           addFooterSubComp: false,

//           // GriddFooterAdd: PurchaseGridAdd,
//           // SubGriddFooterAdd: PurchaseAddSubGrid,
//         },
//         checkBox: {
//           selectedRow: selectedRow,
//           checked: checked,
//           handleCheckboxChange: handleCheckboxChange,
//         },
//         subGridActive: {
//           setHActive: setHActive,
//           hActive: hActive,
//           //   subActiveKey: "PO_COUNT",
//           //   subInActiveVal: 0,
//           //   subGridOpen: subGridOpen,
//           //   idKey: "PURORD_ID",
//         },

//         // MoreOpt: PMGridMoreOption,
//         setEdite: handleEdit,

//         ref: activeGridRef,
//         fixHight: false,
//       },
//     ];
//     setGridArrP(gridArr);
//   }, [data, colaps, colapsComp, subData, head, hActive]);

//   return (
//     <div className=" w-full  h-full flex flex-col ">
//       {loading == true && <Loading />}
//       <div ref={containerRef}>
//         <MainTabsGrid
//           tabs={tabsmains}
//           onRefresh={onRefresh}
//           exportProps={exportProps}
//           refArray={[activeGridRef /*,completedGridRef*/]}
//           scroll={scrollChange}
//           // gridHeader = {false}

//           // tabsShow={false}
//         />
//       </div>

//       <NewCustomModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         tabs={tabs}
//         heading="Purchase Order"
//       />
//       <CustomModal
//         tabs={tabsC}
//         isOpen={isModalOpenC}
//         onClose={handleCloseModal}
//         onClickApply={handleApply}
//         heading="Purchase Order"
//       />
//       {/* <SlectedModall
//         isOpen={isOpen}
//         checkedItems={checkedItems.length}
//         closeModal={closeModallSlected}
//       /> */}
//     </div>
//   );
// };

// export default DiscountGroupBody;
