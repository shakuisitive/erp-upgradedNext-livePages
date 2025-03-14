"use client";
import React, { useState, useEffect ,useRef} from "react";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import ReceivingStatus from "./ReceivingStatus";
import ReceivingAction from "./ReceivingAction"
import ReceivingPriority from "./ReceivingPriority";
import ReceivingFormModal from "./ReceivingFormModal";
import CustomScrollBar from "../../../../../../components/misc/pureComponents/multiScroll/CustomScrollBar";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import OpenDrawer from "./ReceivingOpenDrawer";
import FiltrationMGrid from "./ReceivingTopNav/FiltrationMGrid"
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import PurchaseGridPagination from "../../purchase/_components/PurchaseMainGrid/PurchaseGridPagination";
import CustomModal from "../../../../../../components/misc/pureComponents/custommodal/CustomModal";
import { GoHome } from "react-icons/go";
import ReceivingForm from "./ReceivingForm/ReceivingForm";
import { useSelector , useDispatch } from "react-redux";
import { closeModallForm } from "../redux/receivingSlices";
import ReceivingSelectedModal from "./ReceivingSelectedModal"
import ReceivingQtyInput from "./ReceivingForm/ReceivingQtyInput";
import ReceivingActivityLogForm from "../_components/ReceivingForm/ReceivingActivityLogForm"

const ReceivingGridView = () => {

const dispatch = useDispatch()

   const activeGridRef = useRef(null);
  const completedGridRef = useRef(null);
  const [scrollChange ,setScrollChange] = useState(1)

  const [head, setHead] = useState([
    {
      title: "Receiving #",
      slector: "RECEIVING_NUMBER",
      Wid: 275,
      filter: "textFilter",
      // Modal: ReceivingFormModal,
      Modal: OpenDrawer,
      // Drawer: OpenDrawer,
      Drawer: ReceivingFormModal,
      More:MoreOption , 
      
    },
    { title: "Receiving Date", slector: "REC_DATE", Wid: 150, date: true }, 
   
    {
      title: "Status",
      slector: "RECEIVING_STATUS",
      Wid: 150,
      Status: ReceivingStatus,
    },
    { title: "PO #", slector: "PO_NUMBER", Wid: 150 },
    { title: "PO Date", slector: "PO_DATE", Wid: 150, date: true },
    { title: "Inventory", slector: "INVENTORY", Wid: 200 },
    {
      title: "Action",
      slector: "RECEIVING_STATUS",
      Wid: 150,
      Status: ReceivingAction,
    },
   
    // { title: "Comments", slector: "Comments", Wid: 200 },
  ]);

  const [subHead, setSubHead] = useState([
    { title: "Lot", slector: "LOT_NUMBER", Wid: 250 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 150, date: true },
    { title: "SKU", slector: "SKU_MANUFACTURE", Wid: 150 },
    { title: "Description", slector: "DESCRIPTION", Wid: 250 },
    { title: "OhQty", slector: "QTY_ONHAND", Wid: 150 },
    { title: "OrderQty", slector: "QTY_ORDERED", Wid: 150 },
    // { title: 'CaseReceived',slector:'', Wid: 100 },
    { title: "CaseUOM", slector: "REORDERING_UOM", Wid: 150 },
    { title: "CaseQty", slector: "QTY_ORDERED", Wid: 150 },
    {
      title: "QtyReceieved",
      slector: "QUANTITY",
      Wid: 120,
      customComp: ReceivingQtyInput,
    },
    { title: "BO", slector: "BO_QUANTITY", Wid: 150 },
  ]);
  const [row, setRow] = useState([]);
  const [data, setData] = useState();
 const [colaps , setColaps] = useState(false)
  const [colapsComp , setColapsComp] = useState(false)
  let [error, sendRequest] = useApiFetch();
  const [compRow, setCompRow] = useState([]);
  let [isOpen, setIsOpen] = useState(true)
  let [isOpenS, setIsOpenS] = useState(false)
  const [checkedItems , setCheckedItems] = useState([])
  const [checkedAll , setCheckedAll] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subData ,  setSubData] = useState([])
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecievingList`;
  const getUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;
  const openModallForm = useSelector(
    (state) => state.receivingSlices.openModallForm
  );
  const tabs = [
    { 
      icon: <GoHome/>,
      label: 'Details', content: <ReceivingForm/>,
    },
    { label: 'Activity', content: <ReceivingActivityLogForm/> },
  ]; 
  const payload = {
    data: {
      SEARCH: "",
      VOID_FLAG: "",
      ORDER: "",
      LOC_ID: "",
      OFFSET: "",
      RNUM_FROM: "1",
      RNUM_TO: "50",

      PO_NUMBER: "",
      REC_NUMBER: "",
      REC_DATE_FROM: "",
      REC_DATE_TO: "",
      PART_DETAILS: "",
      LOT_NUMBER: "",
      LOT_EXPIRY_DATE: "",
      VEN_ID: "",
      REC_STATUS: "",
      WAR_ID: "",
      FINZ_FLAG: "",
    },
    action: "InventoryWeb",
    method: "GetRecievingList",
    type: "rpc",
    tid: "144",
  };

   const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem('tokenSession') : null;

  function getAllTask(data) {
    setRow(data.Result);

    setData(data);
    setErrorMessage(error);
  }
  useEffect(() => {
    data?.Result?.forEach((compRow) => {
      // console.log('checkING status', compRow.RECEIVING_STATUS );
      if (compRow?.RECEIVING_STATUS == "RE-STOCKED") {
        setCompRow((prev) => [...prev, compRow]);
      }
    });
  }, [data]);

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);

  useEffect(() => {
    if (openModallForm == true) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }

    // console.log("check modall in purchase", openModallForm, isModalOpenC);
  }, [openModallForm]);

  const colapsfunc =()=>{
    if(colaps && !colapsComp){
      setColaps(false)
      setColapsComp(true)
    }else{
      setColaps(!colaps)
    }
  }
  const colapsfuncComp =()=>{
    if(!colaps && colapsComp){
      setColaps(true)
      setColapsComp(false)
    }else{
      setColapsComp(!colapsComp)
    }
  }

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
   
  
  const selectedRow = (index , data) =>{
    // console.log('check slected row Data and index' , index , data);
      }

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
  const checked = (rowI , rowData) =>{

return checkedItems.some(item => item.rowI === rowI && item.rowData === rowData);
  }

  useEffect(()=>{
    if(checkedItems.length > 0){
      console.log('kuch data log hoa hai');
      setIsOpenS(true)
    }else{
      setIsOpenS(false)

    }
  },[checkedItems])

  const closeModallSlected = ()=>{

  }
  const handleApply = async () => {
    try{
    sendRequest(apiUrl,'POST',payload ,getAllTask,token)
    }
    catch(error){
    // console.log("Apply is not working")

    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(closeModallForm());
  };

// console.log('check sub data' , subData);
  const subGridOpen = (getData) => {
    const getAllTaskGet = (data) => {
      const getDataDet = {
        // statusId: getData.PO_CURRENT_STATUS,
        id: getData.INVREC_ID,
        product: data.Result.Table1,
        form: data.Result.Results,
      };
      setSubData((prev) => [...prev, getDataDet]);
    };


    const payloadGet = {
      data: {
        INVREC_ID: getData.INVREC_ID,

      },
      action: "InventoryWeb",
      method: "GetRecieving",
      offset:'+05:00',
      type: "rpc",
      tid: "144",
      username: "admin",
    };

    let finde = subData.some((data) => data.id == getData.INVREC_ID);
    if (finde == false) {
      sendRequest(getUrl, "POST", payloadGet, getAllTaskGet, accessToken);
    }
  };

  return (
      <div className="w-full  h-fit  flex flex-col overflow-auto pb-5 ">
         <div className="w-full pl-10 pt-3 pb-1 ">
        <FiltrationMGrid />
      </div>
      <CustomScrollBar change={scrollChange} refsArray={[activeGridRef, completedGridRef]}>
        <div ref={activeGridRef} className={` overflow-x-hidden   mt-1 h-fit `}>
        <GridTable
        head={head}
        row={data?.Result}
        setHead={setHead}
        setSubHead={setSubHead}
        subRow={subData}
        subHead={subHead}
        GridTitle="Active"
        GridColor="#4ade80"
        GridColaps={false}
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfunc}
        addButton={false}
        selectedRow={selectedRow}
        MoreOpt={MoreOption}
        MoreOption={MoreOption}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        subActiveKey={"TOTAL_PRODUCTS"}
        subGridOpen={subGridOpen}

        subInActiveVal={0}
        idKey={"INVREC_ID"}
        
      />
      </div>
      <div ref={completedGridRef} className={` my-2 overflow-y-auto overflow-x-hidden   mr- h-fit max-h-[450px]    `}>
        <GridTable
        head={head}
        row={compRow}
        setHead={setHead}
        // subHead={subHead}
        setSubHead={setSubHead}
        subRow={subData}
        subHead={subHead}
        GridTitle="Completed"
        GridColor="#f472b6"
        GridColaps={true}
        colaps={colapsComp}
        setColaps={setColapsComp}
        colapsfunc={colapsfuncComp}
        addButton={true}
        subAddButton = {true}
        GriddFooterAdd={PurchaseGridPagination}
        SubGriddFooterAdd={PurchaseGridPagination}
        selectedRow={selectedRow}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        MoreOpt={MoreOption}
        subActiveKey={"TOTAL_PRODUCTS"}
        subGridOpen={subGridOpen}

        subInActiveVal={0}
        idKey={"INVREC_ID"}
      />
      </div>
      </CustomScrollBar>
      <div>
        <div className="flex items-center border w-[250px] py-2 px-3 ml-16 rounded-md cursor-pointer ">
          <IoIosAdd className="text-customblack text-[30px]" />
          <select  className="w-full outline-none">
            <option value="25">Show 25</option>
            <option value="50">Show 50</option>
            <option value="100">Show 100</option>
            <option value="500">Show 500</option>
          </select>
          <IoIosArrowDown className="text-customblack text-[25px]" />
        </div>
      </div>
      <CustomModal tabs={tabs} isOpen={isModalOpen} onClickApply={handleApply} onClose={handleCloseModal} heading="Receiving Order" number="REC000895" date="" />
      <ReceivingSelectedModal
        isOpen={isOpenS}
        checkedItems={checkedItems?.length}
        closeModal={closeModallSlected}
      />
      </div>
      
    
  );
};

export default ReceivingGridView;
