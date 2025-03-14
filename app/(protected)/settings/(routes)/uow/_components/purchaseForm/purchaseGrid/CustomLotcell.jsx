"use client";

import { useState, useEffect , useRef } from "react";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { updatePurchaseLot , onNextFocus } from "../../../redux/Purchase.slice";
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

const CustomLotcell = ({ data, rowData, index }) => {
  // // console.log('check lot data' , data , rowData);
  let [error, sendRequest] = useApiFetch();
  // const [lotList, setLotSlist] = useState([]);
  const [arr , setArr] = useState([])
  const [color , setColor] = useState()
  const dispatch = useDispatch();
  const focRef = useRef(null)

  const rowId = useSelector((state) => state.PurchaseSlices.formIndex);
  const lotList = useSelector((state) => state.PurchaseSlices.lotList);
  const FormStatus = useSelector((state) => state.PurchaseSlices.FormStatus);
  const purchseSubGridActF = useSelector((state) => state.PurchaseSlices.purchseSubGridActF);
  const dropdownRef = useRef(null)

  // console.log('check lot change' , color);

  const handleRefocusDropdown = () => {
    if( dropdownRef.current){
        dropdownRef.current.focus();
        // alert("parent side focus dropdown pressed")
    }   
    };

  useEffect(() => {

    if (purchseSubGridActF.index == index   && purchseSubGridActF.field == 'lot') {
    // // console.log("check orderQuantity" , purchseSubGridActF , FormStatus );
  
    
        // event.preventDefault(); 
       
        handleRefocusDropdown()
  
      
    }
  }, [purchseSubGridActF]);
  //  const checkUpdatelist = useSelector((state) => state.PurchaseSlices.postPurchaseDetail)
  // // console.log('checkUpdatelist' , lotList);
  const payload = {
    data: {
      PURORD_ID: rowId,
    },
    action: "InventoryWeb",
    method: "GetPurchaseLotList",
    type: "rpc",
    tid: "144",
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetPurchaseLotList`;
  // const token = localStorage.getItem("tokenSession");
let token = ''
  useEffect(()=>{
     token =  typeof  window !== "undefined"
    ? localStorage.getItem("tokenSession")
    : null;
  },[])
 

  // function getAllTask(data) {
  //   setLotSlist(data.Result);
  //   // // console.log("get lot list ", data.Result);

  //   // dispatch(subGridset(data.Result.INV_PURCHASE_ORDER_DETAILS_WV))
  //   //   setFormData(data.Result.INV_PURCHASE_ORDERS_WV[0])
  // }
  // useEffect(() => {
  //   sendRequest(apiUrl, "POST", payload, getAllTask, token);
  // }, []);

  // const setChange = (e) => {
  //  let expDate = "";
  //   lotList.map((data) => {
  //     if (data.LOT_NUMBER == e.target.value) {
  //       expDate = data.EXPIRY_DATE;
  //     }
  //   });
  //   data = {
  //     id: e.target.value,
  //     indexR: index,
  //     exp: expDate
  //   };

  //   dispatch(updatePurchaseLot(data));

  //   // // console.log('check lot change' , e.target.value);
  // };


  useEffect(() => {
    if (lotList.length > 0) { // Check if arr is not empty
      const sortedArr = [...lotList]; // Create a copy of arr
      sortedArr.sort((a, b) => {
        if (a.LOT_NUMBER === rowData.LOT_NUMBER  ) return -1; // 'Ali' comes before 'Ahmad' and 'Raza'
        if (b.LOT_NUMBER === rowData.LOT_NUMBER) return 1; // 'Ali' comes before 'Ahmad' and 'Raza'
        return 0; // Maintain order for other elements
      });
      setArr(sortedArr); // Update the state with the sorted array
    }
  }, [lotList, data]);

  useEffect(()=>{
   let colFil = lotList.filter((data)=> data.LOT_NUMBER == rowData.LOT_NUMBER )
    setColor(colFil[0]?.PURCHASE_GROUP_COLOR )
    // console.log('check color in lot ' , colFil[0]?.PURCHASE_GROUP_COLOR    , 'colfil' , colFil , 'rowDara' ,  rowData.LOT_NUMBER , 'lotList' , lotList );
  } , [lotList])



const setChange = (e) => {
  setColor(e.PURCHASE_GROUP_COLOR )
  let expDate = "";
  let invId = "";
  lotList.forEach((dataa) => {
    if (dataa.LOT_NUMBER === e.LOT_NUMBER) {
      expDate = dataa.EXPIRY_DATE;
      invId = dataa.INVPARLOT_ID;
    }
  });

 

  const updatedData = {
    id: e.LOT_NUMBER,
    indexR: index,
    exp: expDate,
    inv:invId,
  };

  // console.log('updatedData' , updatedData);

  dispatch(updatePurchaseLot(updatedData));

dispatch(onNextFocus({index:index + 1 , field:'lot'}))

};

  const handleOnFocus = () => {
  
    }

    const handleOnBlur = () => {
    
    }
  return (
    <div className="w-full h-full flex justify-center bg-[#E1EFF2] pr-[3px] items-center">
     <div style={{backgroundColor:`${color}`}} className={`p-[2px] mr-[2px] h-full`}></div>
      
      <Dropdown  options={arr} optionKey1="LOT_NUMBER" optionKey2="LOT_NUMBER" onSelectedOptionChanged ={setChange} placeholder="select lot" inputClassName="focus:outline-none w-full hover:bg-transparent 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-center" dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "p" isDisabled={FormStatus == "Issued to Vendor" ? false : true}
        onClearInputValue={false} onHandleFocus={handleOnFocus} onDefaultInput = {rowData?.LOT_NUMBER} onHandleBlur={handleOnBlur} forwardedRef={dropdownRef}
        />
    </div>
  );
};

export default CustomLotcell;
