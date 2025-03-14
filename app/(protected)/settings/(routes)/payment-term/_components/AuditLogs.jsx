import React, { useEffect, useState } from 'react'

import GridTable from '../../../../../../components/misc/pureComponents/GridTable/GridTable';
import useApiFetch from '../../../../../../customHook/useApiFetch';
import MoreOption from '../../../../../../components/misc/pureComponents/GridTable/MoreOption';

import {Message} from "./Message"

const AuditLogs = () => {
    let [error, sendRequest] = useApiFetch()
    
  let [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenC, setIsModalOpenC] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
    const [head, setHead] = useState([
        { title: 'Date Time', slector: 'DATES', Wid: 270,date:true }, 
        { title: 'Message', slector: 'MESSAGE', Wid: 120,customComp:Message }, 
        { title: 'User', slector: 'USERNAME', Wid: 100  }, 
        { title: '', slector: '', Wid: 100 ,date:true }, 
       ])
  
      const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`
      const [row, setRow] = useState([])
  
      const payload = {
        data: {
            SOURCEORASEQ: 289994,
            RNUM_FROM: "1",
            RNUM_TO: "100000"
        },
        action: "FieldOrderWeb",
        method: "GetAuditLog",
        type: "rpc",
        tid: "144"
    }
  
  
  
      const accessToken =localStorage.getItem("tokenSession");
  
      function getAllTask(data) {
  
          setRow(data)
  
         // console.log('data', data.Result.INV_PURCHASE_ORDER_DETAILS_WV);
          // setErrorMessage(error)
      }
      useEffect(() => {
          sendRequest(apiUrl, 'POST', payload, getAllTask, accessToken)
  
  
  
      }, []);

      const [colaps , setColaps] = useState(false)
      const [colapsComp , setColapsComp] = useState(false)
      const colapsfunc =()=>{
          if(colaps && !colapsComp){
            setColaps(false)
            setColapsComp(true)
          }else{
            setColaps(!colaps)
          }}
        
        const colapsfuncComp =()=>{
          if(!colaps && colapsComp){
            setColaps(true)
            setColapsComp(false)
          }else{
            setColapsComp(!colapsComp)
          }}
  
          
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
    setIsModalOpenC(false);
    dispatch(closeModallForm()); 
  };


  let handleApply=()=>{

  }
  

  return (

    <>
      <div className="  h-[98%] mt-[4px] border w-[98%]  flex ml-3  bg-white  rounded-lg">
       

        <GridTable 
            head={head} 
            row={row?.Result} 
            setHead={setHead} 
            colaps={colaps}
            setColaps={setColaps}
            colapsfunc={colapsfunc}
            GridColaps={false}
            GridTitle={"Audit Logs"}
            GridColor={"green-400"}
            selectedRow={selectedRow}
            MoreOption={MoreOption}
            isChecked={checked}
            handleCheckboxChange={handleCheckboxChange}

            />
        </div>
        
    </>
  )
}

export default AuditLogs


