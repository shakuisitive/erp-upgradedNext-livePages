// // import react from react 

import { useEffect, useRef, useState } from "react";
// import NewButton from "../../../../../../../../components/misc/pureComponents/buttons/NewButton";
import NewButton from "../../../../../components/misc/pureComponents/buttons/NewButton"
import CustomScrollBar from "../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar"
// import CustomScrollBar from "../../../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
// import PMFormModal from "../PMFormModal";
// import PMRightDrawer from "../PMRightDrawer";
// import RightDrawer from "../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
// import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
// import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import UowRightDrawer from './UowRightDrawer'
import UowFromModal from "./UowFromModal"
import useApiFetch from "../../../../../customHook/useApiFetch";
import GridTable from '../../../../../components/misc/pureComponents/GridTable/GridTable'
// import MoreOption from "../../../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import Purshasebody from "./_components/PurchaseBody"

 const UowMainGrid = () => {
//   // states
//   const [accessToken, setAccessToken] = useState();
//   const [scrollChange, setScrollChange] = useState(1);
//   const [colaps, setColaps] = useState(false);
//   const [colapsComp, setColapsComp] = useState(false);
//   const [checkedItems, setCheckedItems] = useState([]);
//   const [checkedAll, setCheckedAll] = useState(false);

//   const [errorM, setErrorM] = useState();
//   const [data, setData] = useState();

// let [error, sendRequest] = useApiFetch();
//   //   Refs
//   const activeGridRef = useRef(null);
//   const completedGridRef = useRef(null);

//   //   APIs
//   const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetUowList`;
  
//   //   useEffects
//   useEffect(() => {
//     const container = activeGridRef.current;

//     const handleOverflowChange = (entries) => {
//       setScrollChange((pre) => pre + 1);
//     };
//     const resizeObserver = new ResizeObserver(handleOverflowChange);
//     resizeObserver.observe(container);

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     const Token =
//       typeof localStorage !== "undefined"
//         ? localStorage.getItem("tokenSession")
//         : null;
//     setAccessToken(Token);
//   }, []);

//   useEffect(() => {
//     sendRequest(apiPartList, "POST", PayloadPartList, handlePartList, accessToken);
//   }, [accessToken]);

//   // Payloads
//   const PayloadPartList = {
//     data: {
//         SEARCH     	: "",
//         ORDER     	: "",
//         RNUM_FROM     : "1",
//         RNUM_TO       : "100",
//         ACTIVE_FLAG   : "Y"
//         },
//        action: "InventoryWeb",
//         method: "GetUowList",
//         username: "admin", 
//           type: "rpc",  
//           tid: "144"
// }

//   //   Functions
//   function handlePartList(data) {
//     setData(data?.Result);
//     setErrorM(error)
//   }
//   const colapsfunc = () => {
//     if (colaps && !colapsComp) {
//       setColaps(false);
//       setColapsComp(true);
//     } else {
//       setColaps(!colaps);
//     }
//   };
//   const colapsfuncComp = () => {
//     if (!colaps && colapsComp) {
//       setColaps(true);
//       setColapsComp(false);
//     } else {
//       setColapsComp(!colapsComp);
//     }
//   };
//   const handleCheckboxChange = (rowI, rowData) => {
//     if (rowData == "all" && checkedAll == false) {
//       setCheckedAll(true);
//       const arr = data?.Result.map((SData, i) => {
//         let obj = {};
//         obj = { rowData: SData };

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
//         //  Add the item if it's not checked
//        setCheckedItems([...checkedItems, { rowI, rowData }]);
//       }
//     }
//   };
//   const selectedRow = (index, data) => {
//     // console.log('check slected row Data and index' , index , data);
//   };
//   const checked = (rowI, rowData) => {
//     return checkedItems.some(
//       (item) => item.rowI === rowI && item.rowData === rowData
//     );
//   };

//   //   Grid Head
//   const [head, setHead] = useState([
//     {
//         title: "ID",
//         slector: "UOW_ID",
//         Wid: 250,
//          filter: "textFilter",
//         //  Modal: ReceivingFormModal,
//         // Modal: UowFromModal,
//         //  Drawer: UowRightDrawer,
//         // Purshasebody : Purshasebody
//       },
//       { title: "Name", slector: "CODE", Wid: 150},
//       {
//         title: "Description",
//         slector: "DESCRIPTION",
//         Wid: 150,
//         Status: "",
//       },
    
//       {
//         title: "Status",
//         slector: "RECEIVING_STATUS",
//         Wid: 150,
//         Status: "",
//       },
//   ]);
//   // const [row, setRow] = useState([
//   //   {ID:""},
//   //   {Name:""},
//   //   {Desription:""}
//   // ])
// //   console.log('+++++++++++++++++',data)
// //    const data1 = [
// //     {
// //       // ACTIVE_FLAG : "Y",
// //     CODE :  "GFGFG",
// //     DESCRIPTION:  "gfgf",
// //     // RNUM : 7,
// //     // TOTALROW : 7,
// //     UOW_ID : 334393
// // }];
//  return (
//     <div className="flex flex-col">
//       {/* <div>
//         <NewButton label="New" />
//       </div> */}
//       <div>
//         <CustomScrollBar
//           change={scrollChange}
//           refsArray={[activeGridRef, completedGridRef]}
//         >
//           <div ref={activeGridRef} className="overflow-x-hidden mt-1 h-fit ">
//            <GridTable
//               head={head}
//               row={data}
//               // row={compRowA}
//               //setHead={setHead}
//               // setSubHead={setSubHead}
//               // subHead={subHead}
//               //  formModal={CustomModal}
//               GridTitle="Active"
//               GridColor="green-400"
//               GridColaps={false}
//               colaps={colaps}
//               setColaps={setColaps}
//               colapsfunc={colapsfunc}
//               isChecked={checked}
//               handleCheckboxChang e={handleCheckboxChange}
//             />
//           </div>
//           <div
//              ref={completedGridRef}
//             className="my-2 overflow-y-auto overflow-x-hidden  h-fit max-h-[450px] "
//           >
//           </div>
//         </CustomScrollBar>
//         {/* <Purshasebody/> */}
const [accessToken, setAccessToken] = useState();
const [scrollChange, setScrollChange] = useState(1);
const [colaps, setColaps] = useState(false);
const [colapsComp, setColapsComp] = useState(false);
const [checkedItems, setCheckedItems] = useState([]);
const [checkedAll, setCheckedAll] = useState(false);

const [errorM, setErrorM] = useState();
const [data, setData] = useState();

let [error, sendRequest] = useApiFetch();
//   Refs
const activeGridRef = useRef(null);
const completedGridRef = useRef(null);

//   APIs
const apiPartList = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetUowList`;

//   useEffects
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

useEffect(() => {
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  setAccessToken(Token);
}, []);

useEffect(() => {
  sendRequest(apiPartList, "POST", PayloadPartList, handlePartList, accessToken);
}, [accessToken]);

// Payloads
const PayloadPartList = {
  data: {
    
             SEARCH     	: "",
               ORDER     	: "",
               RNUM_FROM     : "1",
               RNUM_TO       : "100",
               ACTIVE_FLAG   : "Y"
              },
              action: "InventoryWeb",
               method: "GetUowList",
              username: "admin", 
              type: "rpc",  
               tid: "144"
    };
      //   Functions
function handlePartList(data) {
  setData(data.Result);
  setErrorM(error)
}
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

//   Grid Head
const [head, setHead] = useState([
  {
    title: "ID",
    slector: "UOW_ID",
    Wid: 275,
    // item:center
    // filter: "textFilter",
    // Modal: PMFormModal,
    // Drawer: PMRightDrawer,
  },
  {
    title: "Name",
    slector: "CODE",
    Wid: 250,
    Status: "",
    filter: "checkFilter",
    checkFilterOptions: ["NEW"],
  },
  {
    title: "description",
    slector: "DESCRIPTION",
    Wid: 250,
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
  // { title: "Barcode", slector: "BARCODE_NUMBER", Wid: 160 },
  // { title: "UPC", slector: "UPC_MANUFACTURE", Wid: 160 },
  // { title: "Short Description", slector: "DESCRIPTION", Wid: 200 },
  // { title: "OH Qty", slector: "OH_QUANTITY", Wid: 160 },

  // { title: "AV Qty", slector: "QTY_AVAILABLE", Wid: 250 },
  // { title: "Cost", slector: "STANDARD_COST", Wid: 250 },
  // { title: "Price", slector: "PRICE", Wid: 250 },
]);
//   const [row, setRow] = useState([
//     {
//       Budget: "2023 jan 02",
//       Type: "New",
//       Barcode: "test user",
//       UPC: "test user",
//       ShortDesc: "test user",
//       OH_Qty: "test user",
//       AV_Qty: "test user",
//       Cost: "test user",
//       Price: "test user",
//     },
//   ]);
// console.log('-----colab---------',colaps)
// console.log('-----data---------',data)
// console.log('-----head---------',head)
// console.log('-----checked---------',checked)
// console.log('-----setHead---------',setHead)
// const data1 = [
//       {
//         // ACTIVE_FLAG : "Y",
//       CODE :  "my code",
//       DESCRIPTION:  "this description",
//       // RNUM : 7,
//       // TOTALROW : 7,
//       UOW_ID : 11111,
//       RECEIVING_STATUS : true
//   }];

return (
  
  <div className="flex flex-col">
    <div>
      <NewButton label="New" />
    </div>
    <div>
      <CustomScrollBar
        change={scrollChange}
        refsArray={[activeGridRef, completedGridRef]}
      >
        <div ref={activeGridRef} 
        //  className="overflow-x-hidden   mt-1 h-fit "
        //  className="my-2 overflow-y-auto overflow-x-hidden  h-fit max-h-[450px] "
        className="flex-1 mx-2"
        >
          <GridTable 
            head={head}
            row={data}
            setHead={setHead}
            // setSubHead={setSubHead}
            // subHead={subHead}
            // formModal={CustomModal}
            GridTitle="Active"
            GridColor="green-400"
            // GridColaps={false}
            // colaps={colaps}
            // setColaps={setColaps}
            // colapsfunc={colapsfunc}
            // isChecked={checked}
            // handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div
          ref={completedGridRef}
          className="my-2 overflow-y-auto overflow-x-hidden  h-fit max-h-[450px] "
        >
          {/* <GridTable
            head={head}
            // row={data}
            setHead={setHead}
            //   setSubHead={setSubHead}
            //   subHead={subHead}
            // formModal={CustomModal}
            GridTitle="InActive"
            GridColor="pink-400"
            colaps={colapsComp}
            setColaps={setColapsComp}
            colapsfunc={colapsfuncComp}
            GridColaps={true}
            addButton={true}
            //   GriddFooterAdd={StockOrderGridPagination}
            isChecked={checked}
            handleCheckboxChange={handleCheckboxChange}
            selectedRow={selectedRow}
            // MoreOpt={MoreOption}
          /> */}
        </div>
      </CustomScrollBar>
    </div>
  </div>
);
};

//       </div>
//     </div>
//   );
// };

 export default UowMainGrid;
