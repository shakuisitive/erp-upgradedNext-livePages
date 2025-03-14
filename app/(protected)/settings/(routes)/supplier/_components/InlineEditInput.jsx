import React, { useState ,useRef,useEffect} from 'react'
import useApiFetch from '../../../../../../customHook/useApiFetch';
import { useDispatch, useSelector } from 'react-redux';
import { addRef,setValidCode,setNextIndex} from '../redux/supplierSlice';
import {getKeyByCondition} from './customeFunction'
export const InlineEditInput = ({data, rowData, index}) => {
// console.log(rowData)
let arr=useSelector(state=>state.supplier.refArray); 
let focus=useSelector(state=>state.supplier.nextFocus);
let username=useSelector(state=>state.supplier.username);
let user_ID = useSelector(state => state.supplier.user_ID);
let [error,sendRequest]=useApiFetch();
let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostPaymentTerm";
let accessToken=localStorage.getItem("tokenSession");

const [focusedInput, setFocusedInput] = useState(null);
const [enabled,setEnabled] = useState(true);
//new ch
const [formData,setFormData] = useState({
  VEN_ID: rowData.VEN_ID,
  CODE: rowData.CODE,
  NAME: "",
  SUPPLIER_DESCRIPTION: rowData.SUPPLIER_DESCRIPTION,
  CITY: rowData.CITY,
  ADDRESS_1: rowData.ADDRESS_1,
  ADDRESS_2: rowData.ADDRESS_2,
  POSTAL_CODE:rowData.POSTAL_CODE,
  PHONE_1: rowData.PHONE_1,
  PHONE_2:rowData.PHONE_2,
  FAX_1: rowData.FAX_1,
  COUNTRY:rowData.COUNTRY,
  PROVINCE: rowData.PROVINCE,
  EMAIL: rowData.EMAIL,
  NOTES: rowData.NOTES,
  PREFERRED_FLAG:rowData.PREFERRED_FLAG,
  ACTIVE_FLAG:rowData.ACTIVE_FLAG,
  LONGITUDE:rowData.LATITUDE,
  LATITUDE: rowData.LATITUDE,
  VENDOR_FLAG: rowData.VENDOR_FLAG,
  SUPPLIER_FLAG: rowData.SUPPLIER_FLAG,
  PAYTERM_DAYS: rowData.PAYTERM_DAYS,
  CUS_ID: rowData.CUS_ID,
  CONTACT_NAME:rowData.CONTACT_NAME,
  IM: rowData.IM,
  VENGRO_ID: rowData.VENGRO_ID,
  USE_ID: rowData.USE_ID
})
// console.log(formData)
let getAllTask = (data) =>{
    // console.log(data)
    // dispatch(updateforRefresh(true))
   
  }

let key=getKeyByCondition(rowData,data);
// console.log("kes",key)

const inputRefs = useRef([]);
const [click, setClick] = useState(0);
const [current, setCurrent] = useState();
//const [counter, setCounter] = useState(0);
const dispatch = useDispatch();
// useEffect(() => {
//   const handleKeyDown = (event) => {
//     // Access information about the key pressed
//     const keyPressed = event.key;

//     const keyCode = event.keyCode;

//     if (keyPressed === 'Control') {
//       // Ctrl+Shift are pressed
//       console.log('Ctrl+Shift pressed');
//       setCounter(counter + 1);
//       //setFocusedInput(0);
//       dispatch(setFocusedInput({value:0}))
//     }

    


//   };

//   window.addEventListener('keydown', handleKeyDown);

//   return () => {
//     window.removeEventListener('keydown', handleKeyDown);
//   };
// }, [counter, focusedInput]);


window.addEventListener('keydown', function (event) {
  // Access information about the key pressed
  const keyPressed = event.key;
//console.log(keyPressed,counter)
  const keyCode = event.keyCode;
//   console.log("ctrl pressed")
  if (keyPressed==='Control') {
      // Ctrl+Shift are pressed
    //  console.log("Ctrl+Shift pressed");
      setEnabled(false);
      setFocusedInput(0);
      dispatch(setNextIndex(0))
  }
});

const handleArrowKey = (e) => {

    
  //console.log(`handleArrowKey`,e.key);
  const maxColumns = 2; 
  const maxRows = Math.floor(arr.length  / maxColumns); 
  let currentIndex=focus
  let nextIndex;
  
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    e.preventDefault();
    
    nextIndex = currentIndex - 1; 
  } else if (e.key === 'ArrowRight' && currentIndex < arr.length - 1) {
    e.preventDefault();
    nextIndex = currentIndex + 1; 
  } else if (e.key === 'ArrowUp' && currentIndex >= maxColumns) {
    nextIndex = currentIndex - maxColumns; 
  } else if (e.key === 'ArrowDown' && currentIndex < arr.length - maxColumns) {
    nextIndex = currentIndex + maxColumns; 
  } else if(e.key==='Enter'){

    let newdata={
        data: formData,
        action: "Administration",
        method: "PostSuppliers",
        username:username,
        type: "rpc",
        tid: "144"
    }
    console.log(newdata)
    if(rowData[key]!==formData[key]){
        sendRequest(url,"POST",newdata,getAllTask,accessToken);
        nextIndex = currentIndex + 1; 
    }else{
        console.log("not hit api ")
    }

  }else {
    return;
  }

  setFocusedInput(nextIndex);    
  dispatch(setNextIndex(nextIndex))
//   console.log('previous', currentIndex);
//   console.log('next index', nextIndex);

  
};



useEffect(() => {
 // inputRefs.current[focusedInput]?.focus();
 arr[focus]?.focus();
 
   

}, [focus]);



// useEffect(() => {
//   (ref) => {
//     inputRefs.current[index] = ref;
//   };
// }, [index]);
let newdata;
useEffect(() => {
  dispatch(addRef(inputRefs.current[index]));
}, [index]);

let handleChange=(e)=>{
    console.log(key,e.target.value)
    setFormData({...formData,[key]:e.target.value});
}
let onBlurHandler=()=>{

    newdata={
        data: formData,
        action: "Administration",
        method: "PostDiscountGroup",
        username: "testuser",
        type: "rpc",
        tid: "144"
    }
    if(rowData[key]!==formData[key]){
        sendRequest(url,"POST",newdata,getAllTask,accessToken);
       
    }

}
console.log("form input value",formData)
  return (
    <div className='text-gray-500 text-[14px] flex w-full justify-center items-center'>

          {
             (
                  <input
                      type='text'
                      className='w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg'
                     
                     
                      value={formData[key]} 
                      onKeyDown={handleArrowKey}
                      onChange={handleChange}
                      onBlur={onBlurHandler}
                   
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                     
                      
                      />
              ) 
          }
          
        
        </div>
  )
}






























