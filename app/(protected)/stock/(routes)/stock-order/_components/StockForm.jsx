"use client";
import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";
import React, { useState, useEffect } from "react";
import useApiFetch from "../../../../../../customHook/useApiFetch";
import StockFormHeader from "./StockFormHeader";
import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import InputTextEut from "../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { useSelector } from "react-redux";
import TopModal from "./TopModal";
import CheckBox from "./CheckBox"
import moment from "moment";
import MoreOption from "../../../../../../components/misc/pureComponents/GridTable/MoreOption";
import ReceivingSelectedModal from "../../receiving/_components/ReceivingSelectedModal";

function StockForm() {
  //code for opeining sub modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData,setFormData] = useState({
    ref:"",
    notes:""
  });
  const setFormDataHandler = (e) =>{
    setFormData(pre=>{
      pre[e.target.name]=e.target.value
      return {...pre};
    })
  }
 
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // dispatch(openForm(index))
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [itemPriority, setItemPriority] = useState("High");
  const getSlect = (e) => {
    setItem(e.target.value);
  };
  // dtat for fetching inner form
  let id = useSelector((state) => state.stockSlices?.formIndex);
  // console.log("This is my id", id?.INVSTO_ID);
  const [data, setData] = useState();
  const [item, setItem] = useState(data);
  const [errorM, setErrorM] = useState();
  const [colaps, setColaps] = useState(false);
   const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let [isOpenS, setIsOpenS] = useState(false)

  let [error, sendRequest] = useApiFetch();

useEffect(()=>{
    if(checkedItems?.length > 0){
    //   console.log('kuch data log hoa hai');
      setIsOpenS(true)
    }else{
      setIsOpenS(false)

    }
  },[checkedItems])

  const closeModallSlected = ()=>{
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;
  const [head, sethead] = useState([
    { title: "Location", slector: "LOCATION", Wid: 250 },
    { title: "check", slector:"", Wid : 20, customComp:CheckBox},
    { title: "Lot", slector: "LOT_NUMBER", Wid: 120 },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 120, date: true },
    { title: "MTH", Wid: 120 },
    { title: "Name", slector: "DESCRIPTION", Wid: 120 },
    { title: "OH Qty", slector: "QTY_ONHAND", Wid: 120 },
    { title: "Qty Recd", slector: "QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector: "QTY_ONHAND1", Wid: 120 },
    { title: "SUK", slector: "SKU_MANUFACTURE", Wid: 120 },
  ]);
  const payload = {
    data: {
      INVSTO_ID: `${id?.INVSTO_ID}`,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  };

  //  const accessToken = localStorage.getItem('tokenSession');
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNjkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiZXhwIjoxNzA5NTc0MTAyLCJpc3MiOiJwcmVjaXNldGVjLmNhIiwiYXVkIjoicHJlY2lzZXRlYy5jYSJ9.98afPFcw_qh1Y-U_jyDGGQ2Rj4GRZduB1rpAP7CwpJk";

  function getAllTask(data) {
    setData(data);
    // console.log(data);
    setErrorM(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  // console.log("data", data);


  const formInputArray = [
    {label:"Rec #",value:data?.Result.Results[0].RECEIVING_NUMBER,isDisabled:true},
    {label:"Receoving Date",value:data?.Result.Results[0].RECEIVING_DATE,isDisabled:true},
    {label:"Create By",value:"",isDisabled:true},
    {label:"Supplier",value:data?.Result.Results[0].SUPPLIER,isDisabled:true},
    {label:"Address",value:data?.Result.Results[0].ADDRESS_1,isDisabled:true},
    {label:"Phone",value:data?.Result.Results[0].SUPPLIER_PHONE,isDisabled:true},
    {label:"Email",value:data?.Result.Results[0].SUPPLIER_EMAIL,isDisabled:true},
    {label:"Ref",isDisabled:false,onChange:setFormDataHandler,name:'ref'},
    {label:"Notes",isDisabled:false,onChange:setFormDataHandler,name:"notes"}
  ]

  const formDataSubmitHandler = (e) =>{
    e.preventDefault();
    // console.log(formData);
  }
const colapsfuncComp = () => {};
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
  return (
    <div className=" w-full h-[68vh] flex gap-2">
      <div className="relative w-[70%]  bg-white  p-4 shadow-sm shadow-gray-400 ">
        <div className="mb-2">
          <StockFormHeader />
        </div>

        <div className="overflow-x-auto overflow-y-auto min-h-[40vh]">
          <GridTable head={head} setHead={sethead} row={data?.Result?.Table1} colaps={colaps}
              setColaps={setColaps}
              colapsfunc={colapsfuncComp}
              GridTitle="Items"
              GridColor="green-400"
              addButton={false}
              selectedRow={selectedRow}
              MoreOpt={MoreOption}
              MoreOption={MoreOption}
              isChecked={checked}
              handleCheckboxChange={handleCheckboxChange} />
          {/* <div>
            <button onClick={handleOpenModal} className="p-2 bg-green-500">
              Edit
            </button>
            <TopModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              heading="Transfer Inventory"
            />
          </div> */}
        </div>
        <ReceivingSelectedModal
        isOpen={isOpenS}
        checkedItems={checkedItems?.length}
        closeModal={closeModallSlected}
      />
      </div>
      <div className="w-[30%] h-[100%] p-4 bg-white shadow-sm shadow-gray-400 overflow-auto">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Tooltip content="Edit">
                <MdEdit className="text-[25px] border  bg-purple-200 rounded-lg cursor-pointer p-1 text-purple-500 hover:text-white hover:bg-purple-500" />
              </Tooltip>
              <Tooltip content="Perview">
                <FaRegEye className="text-[25px] rounded-lg border cursor-pointer p-1 bg-sky-100 text-sky-500 hover:text-white hover:bg-sky-400" />
              </Tooltip>
              <Tooltip content="Export">
                <HiOutlineDocumentArrowDown className="text-[25px] cursor-pointer rounded-lg border p-1 bg-indigo-100 text-indigo-500 hover:text-white hover:bg-indigo-400" />
              </Tooltip>
            </div>
            <div className="flex items-center flex-col">
              <p className="H text-gray-800 text-right  text-[20px]">
                {" "}
                {data?.Result?.Results?.[0]?.STOORD_NUMBER ?? "ST034567"}
              </p>
              <p className="H text-gray-500  text-right ">
                {data?.Result?.Results?.[0]?.STO_DATE
                  ? moment(data?.Result?.Results?.[0]?.STO_DATE).format(
                      "MMM Do"
                    )
                  : "January 24"}
              </p>
            </div>
          </div>

          <div className="w-full mt-4 mb-4">
            <div className="w-full bg-yellow-400 text-white flex justify-center items-center font-semibold py-2 rounded-md">
              Working on it
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full bg-orange-500 text-white flex justify-center items-center font-semibold rounded-md py-2">
              High
            </div>
          </div>
          {/* in put fields */}
          <div>
            <form onSubmit={formDataSubmitHandler} className="space-y-4">
              {formInputArray.map(input=>{
                return <InputTextEut
                label={input.label}
                value={input.value}
                isDisabled={input.isDisabled}
                onChange={input.onChange&&input.onChange} 
                name= {input.name&&input.name}
                />
              })}
              <button type="submit">Submit</button>
            </form>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default StockForm;
