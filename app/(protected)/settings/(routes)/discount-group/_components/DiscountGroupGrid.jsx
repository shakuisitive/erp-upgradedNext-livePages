// "use client"

// import React, { useState, useEffect } from 'react'
// import GridTable from '../../../../../../components/misc/pureComponents/GridTable/GridTable'
// import ModalOpen from '../../../../../../components/misc/pureComponents/GridTable/ModalOpen'
// import useApiFetch from '../../../../../../customHook/useApiFetch'
// import { GoHome } from 'react-icons/go'
// import DiscountGroupForm from './DiscountGroupForm'
// //import PurchaseSiplitSubgrid from './PurchaseSiplitSubgrid'
// //import PurchaseGridCost from './PurchaseGridCost'
// import NewCustomModal from "../../../../../../components/misc/pureComponents/custommodal/NewCustomModal";
// import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
// import CustomModal from '../../../../../../components/misc/pureComponents/custommodal/CustomModal'
// import SlectedModall from './SlectedModall';

// const DiscountGroupGrid = () => {
//     let [error, sendRequest] = useApiFetch()

//   let [isOpen, setIsOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpenC, setIsModalOpenC] = useState(false);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [checkedAll, setCheckedAll] = useState(false);

//     //   const [head, setHead] = useState([{ title: 'SubItem', slector: 'SubItem', Wid: 250, customComp: ModalOpen }, { title: 'Part', slector: 'Part', Wid: 120 }, { title: 'Cost', slector: 'Cost', Wid: 100 }, { title: 'LastCost', slector: 'LastCost', Wid: 120 }, { title: 'OhQty', slector: 'OhQty', Wid: 120 }, { title: 'OrderQty', slector: 'OrderQty', Wid: 120 }, { title: 'UOM', slector: 'UOM', Wid: 120 }, { title: 'Conv', slector: 'Conv', Wid: 120 }, { title: 'CaseQty', slector: 'CaseQty', Wid: 120 }, { title: 'Split', slector: 'Split', Wid: 120 }, { title: 'Batch', slector: 'Batch', Wid: 120 }, { title: 'Expiry', slector: 'Expiry', Wid: 120 }])
//     //   const [row, setRow] = useState([{ SubItem: "item 1", Part: "NV325423", Cost: "$34.32", LastCost: '$25.34', OhQty: "500", OrderQty: "200", UOM: "EA", Conv: "12", CaseQty: "16.66", Split: "", Batch: "98569323", Expiry: "Jan 24 , 2026" }, { SubItem: "item 1", Part: "NV325423", Cost: "$34.32", LastCost: '$25.34', OhQty: "500", OrderQty: "200", UOM: "EA", Conv: "12", CaseQty: "16.66", Split: "", Batch: "98569323", Expiry: "Jan 24 , 2026" },])
//     const [head, setHead] = useState([
//       { title: 'Date Time', slector: 'DATES', Wid: 270, customComp: ModalOpen,date:true },
//       { title: 'Message', slector: 'MESSAGE', Wid: 120 },
//       { title: 'User', slector: 'USERNAME', Wid: 100  },
//      ])

//     const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`
//     const [row, setRow] = useState([])

//     const payload = {
//       data: {
//           SOURCEORASEQ: 289994,
//           RNUM_FROM: "1",
//           RNUM_TO: "100000"
//       },
//       action: "FieldOrderWeb",
//       method: "GetAuditLog",
//       type: "rpc",
//       tid: "144"
//   }

//     const accessToken =localStorage.getItem("tokenSession");

//     function getAllTask(data) {

//         setRow(data)

//        // console.log('data', data.Result.INV_PURCHASE_ORDER_DETAILS_WV);
//         // setErrorMessage(error)
//     }
//     useEffect(() => {
//         sendRequest(apiUrl, 'POST', payload, getAllTask, accessToken)

//     }, []);
//     console.log(row);
//     const [colaps , setColaps] = useState(false)
//     const [colapsComp , setColapsComp] = useState(false)
//     const colapsfunc =()=>{
//         if(colaps && !colapsComp){
//           setColaps(false)
//           setColapsComp(true)
//         }else{
//           setColaps(!colaps)
//         }}

//       const colapsfuncComp =()=>{
//         if(!colaps && colapsComp){
//           setColaps(true)
//           setColapsComp(false)
//         }else{
//           setColapsComp(!colapsComp)
//         }}

// const selectedRow = (index, data) => {
//   // console.log('check slected row Data and index' , index , data);
// };

// const handleCheckboxChange = (rowI, rowData) => {
//   if (rowData == "all" && checkedAll == false) {
//     setCheckedAll(true);
//     const arr = data?.Result.map((SData, i) => {
//       let obj = {};
//       obj = { rowI: i, rowData: SData };

//       return obj;
//     });

//     setCheckedItems(arr);
//   } else if (rowData == "all" && checkedAll == true) {
//     setCheckedAll(false);
//     setCheckedItems([]);
//   } else {
//     if (checked(rowI, rowData)) {
//       // Remove the item if it's already checked
//       setCheckedItems(
//         checkedItems.filter(
//           (item) => item.rowI !== rowI && item.rowData !== rowData
//         )
//       );
//     } else {
//       // Add the item if it's not checked
//       setCheckedItems([...checkedItems, { rowI, rowData }]);
//     }
//   }
// };
// const checked = (rowI, rowData) => {
//   return checkedItems.some(
//     (item) => item.rowI === rowI && item.rowData === rowData
//   );
// };

// useEffect(() => {
//   if (checkedItems.length > 0) {
//     // console.log('kuch data log hoa hai');
//     setIsOpen(true);
//   } else {
//     setIsOpen(false);
//   }
// }, [checkedItems]);

// const closeModallSlected = () => {};

// const closeModal = () => {
//   setIsModalOpen(false);
//   dispatch(colseNewModall());
// };
// const handleOpenModal = () => {
//   setIsModalOpen(true);
//   dispatch(openForm(index));
// };
// const handleCloseModal = () => {
//   setIsModalOpenC(false);
//   dispatch(closeModallForm());
// };
// const tabs = [
//   {
//     icon: <GoHome />,
//     label: "Details",
//     content: <DiscountGroupForm />,
//   },
// ];

// const tabsC = [
//   {
//     icon: <GoHome />,
//     label: "Details",
//     content: <DiscountGroupForm />,
//   },
//   { label: "Audit Log", content: <div>Content for Audit Log</div> },
// ];

// let handleApply=()=>{

// }

//     return (
//         <div>
//             <GridTable
//             head={head}
//             row={row?.Result}
//             setHead={setHead}
//             colaps={colaps}
//             setColaps={setColaps}
//             colapsfunc={colapsfunc}
//             GridColaps={false}

//             selectedRow={selectedRow}
//             MoreOption={MoreOption}
//             isChecked={checked}
//             handleCheckboxChange={handleCheckboxChange}

//             />
//                <NewCustomModal
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
//       <SlectedModall
//         isOpen={isOpen}
//         checkedItems={checkedItems.length}
//         closeModal={closeModallSlected}
//       />
//         </div>
//     )
// }

// export default DiscountGroupGrid
