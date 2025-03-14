"use client" 
import React , {useState , useEffect,useRef} from 'react'
import useApiFetch from '../../../../../../../customHook/useApiFetch'
// import  PaymentTermModall   from './taxFormModal'
// import {InlineEditInput} from "./InlineEditInput"
import TaxStatus from "./grid/TaxStatus";

import { useDispatch, useSelector } from 'react-redux'

import SlectedModall from '../../../discount-group/_components/SlectedModall'
import {Administration} from "../../../../../../../components/misc/pureComponents/constants/apiConstant"

import { AiOutlineIssuesClose, IoIosRemoveCircleOutline } from "react-icons/io";

import { GoHome } from "react-icons/go";
import TabsNav from './header/taxNav';
import RightDrawer from "./RightDrawer/RightDrawerModal"
import MainTabsGrid from  "../../../../../../../components/misc/bindComponent/MainTabsGrid"
import Owner from "./grid/Owner";
import Loading from "../../../../../../loading"
import {
  setMainTaxList,
  closeModallForm,
  setRefresh,
  setHeadRedux,
  setHeadReduxT
} from "../redux/taxSlice"
import { IoIosAdd, IoIosArrowDown } from 'react-icons/io'
import InlineEdit from "./grid/inlineEditInput"


const TaxBody = () => {
  //localState 
  const [hActive,setHActive] = useState({})




  //redux state
  let refresh=useSelector(state=>state.tax.Refresh)
  let index=useSelector(state=>state.tax.index);
  let count=useSelector(state=>state.tax.countArray);
  const OpenNewModall =useSelector((state) => state.tax.OpenNewModall);
  const openModallForm = useSelector((state) => state.tax.openModallForm);
  const searchedData=useSelector(state=>state.tax.searchedData)[0];
  const isHitApi=useSelector(state=>state.tax.isHitApi);
  const taxHead = useSelector((state) => state.tax.taxHead);
  const username=useSelector((state) => state.tax.username);
  const token=useSelector((state) => state.tax.token);
  let [subData , setSubData] = useState([])
  let [aPIProp, setAPIProp] = useState([]);
  let [gridArrP, setGridArrP] = useState();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const InactiveGridRef = useRef(null);
  // const closeModall = useSelector((state) => state.PurchaseSlices.closeModall);
//console.log("body",isHitApi,refresh,searchedData)
//useeffect
console.log("refresh",refresh)
  const dispatch=useDispatch();
  useEffect(() => {
    if (OpenNewModall == true) {
      setIsModalOpenA(true);
    } else {
      setIsModalOpenA(false);
    }
  }, [OpenNewModall]);
  useEffect(() => {
    if (openModallForm == true) {
      setIsModalOpenB(true);
    } else {
      setIsModalOpenB(false);
    }

    console.log('check modall in purchase' , openModallForm , isModalOpenA );
  }, [openModallForm]);

  // const apiUrl =`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Administration/GetTaxesList`
 

  let [error, sendRequest] = useApiFetch()
  const [data, setData] = useState([])
  const [head, setHead] = useState([
    {
      title: 'ID',
      slector: 'TAX_ID',
      Wid: 270,
      filter: "textFilter",
    Modal: RightDrawer,
    //  Drawer: OpenModal,
     hidden:false , 
     def:false  ,
     edit:false
    },
    
    {
      title : "Owner" ,
      slector: "",
      Wid: 100,
      customComp:Owner,
      hidden:false,
      def:false ,
      edit:false
    },
    {
      title: 'Name',
      Wid: 150,
      slector: 'TAX_CODE',
    //   customComp: InlineEditInput,
      hidden:false , 
      def:false  ,
      edit:false
    },

    {
      title: 'Description',
      Wid: 200,
      slector: 'DESCRIPTION',
    //    customComp: InlineEditInput,
       hidden:false , 
       def:false  ,
       edit:false
     
    },
    {
      title: 'Status',
      slector: 'ACTIVE_FLAG',
      Wid: 150,
      Status: TaxStatus,
      hidden:false , 
      def:false  ,
      edit:false
    },
    {
      title: 'Tax Rate',
      slector: 'TAX_PERCENTAGE_RATE',
      Wid: 150,
     
      hidden:false , 
      def:false  ,
      edit:false
    }
  ])


  let [headTwo, setHeadTwo] = useState([
    {
      title: 'ID',
      slector: 'TAX_ID',
      Wid: 270,
      filter: "textFilter",
    Modal: RightDrawer,
    //  Drawer: OpenModal,
     hidden:false , 
     def:false  ,
     edit:false
    },
    
    {
      title : "Owner" ,
      slector: "",
      Wid: 100,
      customComp:Owner,
      hidden:false,
      def:false ,
      edit:false
    },
    {
      title: 'Name',
      Wid: 150,
      slector: 'TAX_CODE',
    //   customComp: InlineEditInput,
      hidden:false , 
      def:false  ,
      edit:false
    },

    {
      title: 'Description',
      Wid: 200,
      slector: 'DESCRIPTION',
    //    customComp: InlineEditInput,
       hidden:false , 
       def:false  ,
       edit:false
     
    },
    {
      title: 'Status',
      slector: 'ACTIVE_FLAG',
      Wid: 150,
      Status: TaxStatus,
      hidden:false , 
      def:false  ,
      edit:false
    },{
      title: 'Tax Rate',
      slector: 'TAX_PERCENTAGE_RATE',
      Wid: 150,
     
      hidden:false , 
      def:false  ,
      edit:false
    }
  ])
  const [subHead , setSubHead] = useState([
    {
      title: 'ID',
      slector: 'TAX_ID',
      Wid: 270,
      b:true,
     
    
     hidden:false , 
     def:false  ,
     edit:false
    },
    
   
    {
      title: 'Name',
      Wid: 150,
      slector: 'TAX_CODE',
      customComp:InlineEdit,
      hidden:false , 
      def:false  ,
      edit:false
    },

    {
      title: 'Description',
      Wid: 200,
      slector: 'DESCRIPTION',
      customComp:InlineEdit,
       hidden:false , 
       def:false  ,
       edit:false
     
    },
    {
      title: 'Status',
      slector: 'ACTIVE_FLAG',
      Wid: 150,
      customComp:InlineEdit,
      hidden:false , 
      def:false  ,
      edit:false
    },{
      title: 'Tax Rate',
      slector: 'TAX_PERCENTAGE_RATE',
      Wid: 150,
      customComp:InlineEdit,
      hidden:false , 
      def:false  ,
      edit:false
    }
  ]);





  useEffect(()=>{
    if(taxHead != head){
    setHead(taxHead)
    }
  } , [taxHead])
//console.log(taxHead);
const paymentTermPayload={
  data: {
    SEARCH: "",
    ORDER: "",
    RNUM_FROM: 1,
    RNUM_TO: 50,
    ACTIVE_FLAG: ""
  },
  action: "Administration",
  method: "GetTaxesList",
  type: "rpc",
  tid: "144"
}
//const apiUrl=`http://localhost:8080/Result`
const [compRow , setCompRow] = useState([])
//console.log('comp Row' , compRow);



 const accessToken =localStorage.getItem("tokenSession");





function getAllTask(data) {
  //  console.log("fetchc",data)
  if(searchedData?.Result?.length>0){
    setData(searchedData);
    setData(searchedData?.Result);
  }else{
    let sort=data?.Result.sort((a, b) => b.TAX_ID - a.TAX_ID);

    setData(sort)
    dispatch(setMainTaxList(data?.Result));
  }



  dispatch(setMainTaxList(data));
  // console.log('data' , data);
  setErrorMessage(error)
}
// console.log("all data",data)
useEffect(()=>{
  
  data?.forEach((comp)=>{
    //console.log('check========', comp.ACTIVE_FLAG );
  if(comp?.ACTIVE_FLAG == "N" && compRow?.TAX_ID!==comp?.TAX_ID){
    setCompRow((prev) => [...prev, comp]);
    //console.log('comp Row', compRow);
  }
  }
  )
},[data,refresh])
useEffect(() => {
  let apiData = [
    {
      api: Administration.GetTaxesList,
      payload:  paymentTermPayload,
      func:getAllTask,
      token: accessToken,
      title: "Active",
    },
     {
       api: Administration.GetTaxesList,
     payload: paymentTermPayload,
       func: getAllTask,
       token: accessToken,
       title: "InActive",
   }
  ];
  console.log('========apiDATA===',apiData)
   setAPIProp(apiData);
}, [accessToken] ,[refresh]);
// useEffect(() => {
//   sendRequest( apiUrl, 'POST', paymentTermPayload, getAllTask, accessToken)



// }, [refresh]);

const [colaps , setColaps] = useState(false)
const [colapsComp , setColapsComp] = useState(false)
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


const [scrollChange ,setScrollChange] = useState(1)
const activeGridRef = useRef(null);
 const InactivedGridRef = useRef(null);
useEffect(()=>{
  const container = activeGridRef.current;
 
  const handleOverflowChange = (entries) => {
         setScrollChange(pre=>pre+1)
  };
  const resizeObserver = new ResizeObserver(handleOverflowChange);
  resizeObserver.observe(container);

  return () => {
    resizeObserver.disconnect();
  };
},[])

//--------------------select and pop up

let [isOpen, setIsOpen] = useState(true);
const [isModalOpenA, setIsModalOpenA] = useState(false);
const [isModalOpenB, setIsModalOpenB] = useState(false);
const [checkedItems, setCheckedItems] = useState([]);
const [checkedAll, setCheckedAll] = useState(false);
const selectedRow = (index, data) => {
  // console.log('check slected row Data and index' , index , data);
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
const checked = (rowI, rowData) => {
  return checkedItems.some(
    (item) => item.rowI === rowI && item.rowData === rowData
  );
};

useEffect(() => {
  if (checkedItems.length > 0) {
    // console.log('kuch data log hoa hai');
    setIsOpen(true);
  } else {
    setIsOpen(false);
  }
}, [checkedItems]);

const closeModallSlected = () => {};


const closeModal = () => {
  setIsModalOpen(false);
  dispatch(colseNewModall());
};
const handleOpenModal = () => {
  setIsModalOpen(true);
  dispatch(openForm(index));
};
const handleCloseModal = () => {
  setIsModalOpenB(false);
  dispatch(closeModallForm()); 
};
// const tabsA = [
//   {
//     icon: <GoHome />,
//     label: "Details",
//     content: <DiscountGroupForm/>,
//   },
// ];

// const tabsB = [
//   {
//     icon: <GoHome />,
//     label: "Details",
//     content: (
//       <div>
//         <PaymentTermForm/>
//       </div>
//     ),
//   },
//   { label: "Audit Log", content: (<div><AuditLogs/></div>) },
// ];
const handleEdit = () => {};

const handleBtnClick = () => {
  setIsModalOpen(true);
  console.log("Modal Open On Button Click");
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
  // datas: CsvData,
};
//   Arrays

const options = [
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
let handleApply=()=>{

}
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
        GridColaps: false,
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

      // MoreOpt: PMGridMoreOption,
      setEdite: handleEdit,

      ref: activeGridRef,
      fixHight: false,
    },
    //ya sa ban hoga
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
        GridTitle: "Inactive",
        GridColor: "#f472b6",
      },
      data: {
        Griddata: data,

        subGridData: subData,
      },
      colapsList: {
        GridColaps: true,
        // colaps: colapsComp,
        setColaps: setColapsComp,
        // colapsfunc: colapsfuncComp,
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
      // subGridActive: {
      //   hActive: hActive,
      //   setHActive: setHActive,
      //   subActiveKey: "PO_COUNT",
      //   subInActiveVal: 0,
      //   subGridOpen: subGridOpen,
      //   idKey: "PURORD_ID",
      // },
      paginationList: {
        fixHight: "def",
        pagination: true,
      },

      // MoreOption: PMGridMoreOption,
      setEdite: handleEdit,

      ref: InactivedGridRef,
      // fixHight : true
    },
  ];
  setGridArrP(gridArr);
}, [data, colaps,  subData, head, hActive]);
//hide 
useEffect(()=>{
  dispatch(setHeadRedux(headTwo))

},[])
const setEdite = (e, i, title, selector) => {
  if (e.key === "Enter" && e.target.value !== "hidden") {
    // console.log('check key press header', i, title, selector);
    const updatedHead = [...head]; // Create a copy of the array
    updatedHead[i] = { ...updatedHead[i], title: e.target.value }; // Update the specific item's title
    updatedHead[i] = {...updatedHead[i] , def: true}
    setHead(updatedHead); // Update the local state
    let hData = {
index : i , 
hData : e.target.value,
cat : true
    }
    dispatch(setHeadReduxT(hData))
    setHActive({}); // Assuming this sets the active state
  } else if (e.key === "Enter" && e.target.value === "hidden") {
    const updatedHead = [...head]; // Create a copy of the array
    updatedHead[i] = { ...updatedHead[i], hidden: true }; // Update the specific item's hidden property
    setHead(updatedHead); // Update the local state
    setHActive({}); // Assuming this sets the active state
    dispatch(setHeadRedux(updatedHead)); // Dispatch action to update Redux state
  }
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
      // toolBar : false
    },
  },
  {
    icon: <GoHome />,
    label: "Special",
    Gridcontent: {
      gridArr: gridArrP,
      setGridArr: setGridArrP,
      handleApi: aPIProp,
      defColmn: head,
      setDefColmn: setHead,
      // filterTabs: filterTabs,
      refresh: refresh,
      setRefresh: setRefresh,
      // toolBar : false
    },
  },
];
let setDataRowChange=()=>{

}
const subGridOpen = (getData) =>{
  // console.log(getData)
  const getDataDet = {
    statusId: getData.ACTIVE_FLAG,
    id: getData.TAX_ID , 
    product : [getData],
  }
  setSubData(prev => [...prev, getDataDet]);
  }
  



// console.log("Sub DATa",subData)
  return (
    <div className=" w-full  h-fit  flex flex-col overflow-auto pb-5 ">
      <div className="w-full pl-10 pt-3 pb-1 ">
      <TabsNav/>
      {loading == true && <Loading />}
      <div ref={containerRef}>
        <MainTabsGrid
          tabs={tabsmains}
          onRefresh={onRefresh}
          exportProps={exportProps}
          refArray={[activeGridRef, InactiveGridRef]}
          scroll={scrollChange}
        // gridHeader = {false}
        // tabsShow={false}
        />
      </div>

          {/* tabsShow={false} */}
       
      </div>
      {/* <CustomScrollBar change={scrollChange} refsArray={[activeGridRef, completedGridRef]}>      */}
         <div ref={activeGridRef} className={`overflow-x-auto    mt-1 h-fit mr- `}>
         
        {/* <GridTable */}
         
          {/* // head={head}
          //  row={data}
          // setHead={setHead}  
          // setSubHead={setSubHead}
          // subRow={subData}
          // subHead={subHead} 
          // GridTitle='Active' 
          // GridColor="green-400" 
          // GridColaps={true}
          // colaps={colaps}
          // setColaps={setColaps}
          // colapsfunc={colapsfunc}
          // addButton={true}
          // subAddButton={true}
          // GriddFooterAdd={TaxAdd}
          // selectedRow={selectedRow}
          // MoreOption={MoreOption}
          // isChecked={checked}
          // handleCheckboxChange={handleCheckboxChange}
          // setEdite={setEdite}
          // setHActive={setHActive}
          // hActive={hActive}
          // subGridOpen={subGridOpen}
          // subActiveKey={'TAX_ID'}
          // idKey={'TAX_ID'} */}

          
          {/* /> */}
        </div>
        <div ref={InactivedGridRef} className={`  my-2 overflow-x-hidden overflow-y-auto ml-[0.5%] mr-[0.2%] ${colapsComp == true ? "h-fit" : "flex-1"}    `}>
          
        {/* <GridTable  */}
        {/* // head={head} 
        // row={compRow} 
        // setHead={setHead} 
      
       
        // formModal={CustomModal} 
        // GridTitle='Inactive' 
        // GridColor="red-400" 
        // GridColaps={true}
        // colaps={colapsComp}
        // setColaps={setColapsComp}
        // colapsfunc={colapsfuncComp}

        
        // selectedRow={selectedRow}
        // MoreOption={MoreOption}
        // isChecked={checked}
        // handleCheckboxChange={handleCheckboxChange} */}
       
       {/* /> */}
      
      </div>
      <div>
  {/* <div className="flex items-center border w-[250px] py-2 px-3 ml-16 rounded-md cursor-pointer ">
    <IoIosAdd className="text-customblack text-[30px]"/>
    <select onChange={setDataRowChange} className="w-full outline-none">
      <option value="25">Show 25</option>
      <option value="50">Show 50</option>
      <option value="100">Show 100</option>
      <option value="500">Show 500</option>
    </select>
    <IoIosArrowDown className="text-customblack text-[25px]" />
  </div> */}
</div>
      {/* </CustomScrollBar> */}
      {/* <NewCustomModal
        isOpen={isModalOpenA}
        onClose={closeModal}
        tabs={tabsA}
        heading="Payment Term"
      />
      <CustomModal
        tabs={tabsB}
        isOpen={isModalOpenB}
        onClose={handleCloseModal}
        onClickApply={handleApply}
        heading="Payment Term"
      /> */}
      <SlectedModall
        isOpen={isOpen}
        checkedItems={checkedItems.length}
        closeModal={closeModallSlected}
      />
    </div>
  )
}

export default TaxBody