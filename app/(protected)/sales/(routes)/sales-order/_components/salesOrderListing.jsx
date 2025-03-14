import React from "react";

const salesOrderListing = () => {
  return <div></div>;
};

export default salesOrderListing;

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// // import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
// import {
//   endpointPrefix,
//   useFetchHook,
// } from "../../../../../../customHook/useApiFetch";
// import useKeyPress from "../../../../../../customHook/useKeyPress";
// import { getLabel } from "../../../../../../constants/localization/labels.constants";
// import { getColor } from "../../../../../../constants/colors.constants";
// // import {
// //   colseNewModall,
// //   openNModall,
// // } from "../redux/Purchase.slice";
// import { GoHome } from "react-icons/go";
// import MainTabsGrid from "../../../../../../components/misc/bindComponent/MainTabsGrid";
// import {
//   boltonWebOrderSetter,
//   dataListingSetter,
//   ncWebOrderSetter,
// } from "../redux/salesOrder.actions";
// import Loading from "../../../../../../components/misc/loader/loading";
// // import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
// // import PurchaseSelectedModal from "./PurchaseSelectedModal";
// import { IoIosAdd } from "react-icons/io";
// import { ENUM_API } from "../../../../../../constants/apis.constants";
// import { useDispatch, useSelector } from "react-redux";
// import { checkNull, multiFiltersData } from "../../../../../../utils/utils";
// import { SALES_COLUMN } from "../constants/columns.constant";
// import { ENUM_GRIDS, GRID } from "../constants/grid.constants";
// import { ENUM_USER } from "../../../../../../constants/user.constants";
// import { setSalesStateProperty } from "../redux/salesOrder.slice";
// // import PurchaseFilter from "./globalComp/PurchaseFilter";

// const mainColumns = [
//   SALES_COLUMN.ORDER_NUMBER,
//   SALES_COLUMN.OWNER,
//   SALES_COLUMN.STATUS,
//   SALES_COLUMN.ORDER_DATE,
//   SALES_COLUMN.CUSTOMER,
//   SALES_COLUMN.WEB_ORDER,
//   SALES_COLUMN["TRACKING_#"],
//   SALES_COLUMN.ADDRESS,
//   SALES_COLUMN.CUSTOMER_TYPE,
//   SALES_COLUMN.CONTACT,
//   SALES_COLUMN.ACTION,
// ];

// const SalesOrderListing = () => {
//   const { apiCall } = useFetchHook();
//   const dispatch = useDispatch();

//   const { loading, dataList, boltonWebOrder, ncWebOrder } = useSelector(
//     (state) => state.salesOrder
//   );

//   console.log("loading", loading);

//   const firstGridRef = useRef(null);
//   const secondGridRef = useRef(null);
//   const containerRef = useRef(null);

//   const [seletedTabIndex, setSelectedTabIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const [colaps, setColaps] = useState(false);
//   const [checkedAll, setCheckedAll] = useState(false);
//   const [gridArr, setGridArr] = useState([]);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [mainActiveColumns, setMainActiveColumns] = useState(mainColumns);
//   const [mainCompletedColumns, setMainCompletedColumns] = useState(mainColumns);
//   const [webNcColumns, setWebNcColumns] = useState(mainColumns);
//   const [webBoltonColumns, setWebBoltonColumns] = useState(mainColumns);

//   const handleCheckboxChange = (rowI, rowData) => {
//     if (rowData == "all" && checkedAll == false) {
//       setCheckedAll(true);
//       const arr = dataList?.Results.map((SData, i) => {
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

//   const selectedRow = (index, data) => {
//     // console.log('check slected row Data and index' , index , data);
//   };

//   const mainGridArr = [
//     {
//       ...ENUM_GRIDS.ACTIVE,
//       colmnList: {
//         ...ENUM_GRIDS.ACTIVE.colmnList,
//         colmn: mainActiveColumns,
//         setColmn: setMainActiveColumns,
//       },
//       data: {
//         ...ENUM_GRIDS.ACTIVE.data,
//         Griddata: multiFiltersData(
//           ["Dispatched", "Void"],
//           dataList?.Results,
//           "SO_CURRENT_STATUS",
//           "not"
//         ),
//       },
//       colapsList: {
//         ...ENUM_GRIDS.ACTIVE.colapsList,
//         colaps: colaps,
//         setColaps: setColaps,
//         // colapsfunc: colapsfunc,
//       },
//       checkBox: {
//         selectedRow,
//         checked: checked,
//         handleCheckboxChange,
//       },
//       // ref: firstGridRef,
//     },
//     {
//       ...ENUM_GRIDS.COMPLETED,
//       colmnList: {
//         ...ENUM_GRIDS.COMPLETED.colmnList,
//         colmn: mainCompletedColumns,
//         setColmn: setMainCompletedColumns,
//       },
//       data: {
//         ...ENUM_GRIDS.COMPLETED.data,
//         Griddata: multiFiltersData(
//           ["Dispatched", "Void"],
//           dataList?.Results,
//           "SO_CURRENT_STATUS"
//         ),
//       },
//       colapsList: {
//         ...ENUM_GRIDS.COMPLETED.colapsList,
//         colaps: colaps,
//         setColaps: setColaps,
//         // colapsfunc: colapsfunc,
//       },
//       checkBox: {
//         selectedRow,
//         checked: checked,
//         handleCheckboxChange,
//       },
//       // ref: secondGridRef,
//     },
//   ];

//   const webOrderGridArr = [
//     {
//       ...GRID,
//       colmnList: {
//         ...GRID.colmnList,
//         colmn: webNcColumns,
//         setColmn: setWebNcColumns,
//       },
//       title: {
//         ...GRID.title,
//         GridTitle: getLabel("NC"),
//         GridColor: getColor("NC"),
//       },
//       data: {
//         ...GRID.data,
//         Griddata: ncWebOrder?.Results,
//       },
//       colapsList: {
//         ...GRID.colapsList,
//         colaps: colaps,
//         setColaps: setColaps,
//         // colapsfunc: colapsfunc,
//       },
//       checkBox: {
//         selectedRow,
//         checked: checked,
//         handleCheckboxChange,
//       },
//       // ref: firstGridRef,
//     },
//     {
//       ...GRID,
//       colmnList: {
//         ...GRID.colmnList,
//         colmn: webBoltonColumns,
//         setColmn: setWebBoltonColumns,
//       },
//       title: {
//         ...GRID.title,
//         GridTitle: getLabel("bolton"),
//         GridColor: getColor("bolton"),
//       },
//       data: {
//         ...GRID.data,
//         Griddata: boltonWebOrder?.Results,
//       },
//       colapsList: {
//         ...GRID.colapsList,
//         colaps: colaps,
//         setColaps: setColaps,
//         // colapsfunc: colapsfunc,
//       },
//       checkBox: {
//         selectedRow,
//         checked: checked,
//         handleCheckboxChange,
//       },
//       // ref: secondGridRef,
//     },
//   ];

//   useEffect(() => {
//     dispatch(dataListingSetter(apiCall));
//   }, []);

//   useEffect(() => {
//     if (seletedTabIndex === 0 || seletedTabIndex === 2) {
//       setGridArr(mainGridArr);
//     } else {
//       setGridArr(webOrderGridArr);
//     }
//   }, [dataList, boltonWebOrder, ncWebOrder]);

//   const payloadBuilder = (payload) => {
//     let salesConst = { ...ENUM_API.GetSaleOrderList };
//     if (checkNull(payload)) return salesConst;

//     for (let key of Object.keys(payload) ?? []) {
//       salesConst = {
//         ...salesConst,
//         PAYLOAD: {
//           ...salesConst.PAYLOAD,
//           data: { ...salesConst.PAYLOAD.data, [key]: payload[key] },
//         },
//       };
//     }
//     return salesConst;
//   };

//   const onTabChange = async (tab) => {
//     setSelectedTabIndex(tab);
//     if (tab === 0) {
//       dispatch(dataListingSetter(apiCall));
//       // setGridArr(mainGridArr);
//     }
//     if (tab === 1) {
//       dispatch(ncWebOrderSetter(apiCall, { WEB_ORDER_FLAG: "Y" }));
//       dispatch(boltonWebOrderSetter(apiCall, { BOLTON_ORDER_FLAG: "Y" }));
//       // apiCall.post(payloadBuilder({ EUT_ORDER_FLAG: "Y" }), ncWebOrderSetter);
//       // apiCall.post(
//       //   payloadBuilder({ WEB_ORDER_FLAG: "Y" }),
//       //   boltonWebOrderSetter
//       // );
//       // setGridArr(webOrderGridArr);
//     }
//     if (tab === 2) {
//       dispatch(dataListingSetter(apiCall, { SPS_ORDER_FLAG: "Y" }));
//       // apiCall.post(payloadBuilder({ SPS_ORDER_FLAG: "Y" }), dataListingSetter);
//       // setGridArr(mainGridArr);
//     }
//   };

//   console.log("GetSaleOrderList", dataList, mainGridArr);

//   const onKeyPress = (event) => {
//     if (event.key == "c") {
//       event.preventDefault();
//       setIsModalOpen(false);
//       //   dispatch(colseNewModall());
//     }
//   };

//   useKeyPress(["c"], onKeyPress);

//   const handleFilter = (e) => {
//     const newData = {
//       ...payload.data,
//       PO_STATUS: e.St ? e.St : "",
//       PO_NUMBER: e.Po ? e.Po : "",
//       VEN_ID: e.Sp ? e.Sp : "",
//       PART_DETAILS: e.sku ? e.sku : "",
//     };
//     // Create a new payload object with the updated data
//     const newPayload = { ...payload, data: newData };
//     // Update the state with the new payload object
//     setPayload(newPayload);
//   };

//   const newFunc = () => {
//     // dispatch(openNModall());
//   };

//   const option = {
//     label: "New",
//     icon: IoIosAdd,
//     onClick: newFunc,
//   };

//   const filterTabs = {
//     actionBtn: {
//       option: option,
//     },

//     filter: {
//       handleFilter: handleFilter,
//       //   FilterComp: PurchaseFilter,
//     },
//     // navigatorShow :  false ,
//     // sortShow : false ,
//     // hideShow : false ,

//     //  filterShow : false ,
//     //  search :{
//     //   searchShow : false
//     //  }
//     //  filterTool : false
//   };

//   // main tabs

//   const tabsmains = [
//     {
//       icon: <GoHome />,
//       label: getLabel("Main_Tab"),
//       Gridcontent: {
//         gridArr,
//         setGridArr,
//         handleApi: [
//           // {
//           //   api: endpointPrefix(ENUM_API.GetSaleOrderList.ENDPOINT),
//           //   payload: ENUM_API.GetSaleOrderList.PAYLOAD,
//           //   func: (data) =>
//           //     dispatch(
//           //       setSalesStateProperty({ title: "dataList", value: data })
//           //     ),
//           //   token: ENUM_USER?.token,
//           //   title: "Active",
//           //   pagination: true,
//           // },
//           // {
//           //   api: Administration.GetSupplierList,
//           //   payload: PayloadPartList,
//           //   func: handlePartList,
//           //   token: accessToken,
//           //   title: "Completed",
//           // },
//         ],
//         // // handleApi: aPIProp,
//         // defColmn: [],
//         // setDefColmn: (head) => console.log(head),
//         // // defColmn: head,
//         // // setDefColmn: setHead,
//         // filterTabs: filterTabs,
//         // refresh: refresh,
//         // setRefresh: setRefresh,
//         // toolBar : false
//       },
//     },
//     {
//       label: getLabel("Web_Order"),
//       Gridcontent: {
//         gridArr,
//         setGridArr: setGridArr,
//         //   handleApi: aPIProp,
//         //   defColmn: head,
//         //   setDefColmn: setHead,
//         //   filterTabs: filterTabs,
//         //   refresh: refresh,
//         //   setRefresh: setRefresh,
//         //   // toolBar : false
//       },
//     },
//     {
//       label: getLabel("SPS"),
//       Gridcontent: {
//         gridArr,
//         setGridArr: setGridArr,
//         // setGridArr: (list) => console.log(list),
//         // handleApi: [],
//         // // handleApi: aPIProp,
//         // defColmn: [],
//         // setDefColmn: (head) => console.log(head),
//         // // defColmn: head,
//         // // setDefColmn: setHead,
//         // filterTabs: filterTabs,
//         // refresh: refresh,
//         // setRefresh: setRefresh,
//         // toolBar : false
//       },
//     },
//   ];

//   const onRefreshHandle = () => {
//     setRefresh(true);
//   };
//   const onRefresh = {
//     onRefreshHandle: onRefreshHandle,
//   };
//   const exportProps = {
//     fileName: "",
//     fileExtension: "xls",
//     // datas: CsvData,
//     datas: [],
//   };

//   return (
//     <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
//       {loading ? (
//         <Loading />
//       ) : (
//         <div>
//           <MainTabsGrid
//             exportFileName=""
//             tabs={tabsmains}
//             onRefresh={onRefresh}
//             // exportProps={exportProps}
//             refArray={[]}
//             // refArray={[firstGridRef, secondGridRef]}
//             scroll={1}
//             handleTabs={onTabChange}
//           />
//         </div>
//       )}

//       {/* <NewCustomModal
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
//         number={poNumber}
//         date={poDate}
//       />
//       <PurchaseSelectedModal
//         isOpen={isOpen}
//         checkedItems={checkedItems?.length}
//         closeModal={closeModallSlected}
//       /> */}
//     </div>
//   );
// };

// export default SalesOrderListing;
