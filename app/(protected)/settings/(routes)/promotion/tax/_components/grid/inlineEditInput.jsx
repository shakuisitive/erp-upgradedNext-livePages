import React, { useState ,useRef,useEffect} from 'react'
import useApiFetch from '../../../../../../../../customHook/useApiFetch';
import { useDispatch, useSelector } from 'react-redux';
import { updateforRefresh ,addRef,setValidCode,setNextIndex,setRefresh,setInputData} from '../../redux/taxSlice';
import {getKeyByCondition} from '../../../../../_components/Functions/customeFunctions'
 const InlineEditInput = ({data, rowData, index}) => {

let arr=useSelector(state=>state.tax.refArray); 
let focus=useSelector(state=>state.tax.nextFocus);
let username=useSelector(state=>state.tax.username);
let userID=useSelector(state=>state.tax.user_ID);
let token=useSelector(state=>state.tax.token);
let refresh=useSelector(state=>state.tax.refresh);
let inputData=useSelector(state=>state.tax.inputData);
let key=getKeyByCondition(rowData,data);
let [error,sendRequest]=useApiFetch();
const dispatch = useDispatch();
let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostTaxes";

const [focusedInput, setFocusedInput] = useState(null);
const [disable,setDisable] = useState(false);

const [formData,setFormData] = useState({
  TAX_ID: rowData.TAX_ID,
  TAX_CODE: rowData.TAX_CODE,
  DESCRIPTION:rowData.DESCRIPTION,
  ACTIVE_FLAG:rowData.ACTIVE_FLAG,
  NOTES: "",
  SEQ_NUMBER: "",
  TAX_PERCENTAGE_RATE:rowData.TAX_PERCENTAGE_RATE,
  USE_ID: userID,
  CUS_ID: null
});

let handleChange=(e)=>{
  
  const {name,value}=e.target
  console.log(name,value)

  setFormData((prev)=>({...prev,[name]:value}));
  
}



useEffect(() => {
  dispatch(setInputData(formData))
  console.log("redux state",inputData,"localState",formData)

},[formData,dispatch])

let submitData={
  TAX_ID: formData.TAX_ID,
  CODE: formData.TAX_CODE,
  DESCRIPTION:formData.DESCRIPTION,
  ACTIVE_FLAG:formData.ACTIVE_FLAG.toUpperCase(),
  NOTES: "",
  SEQ_NUMBER: "",
  TAX_PERCENTAGE_RATE:formData.TAX_PERCENTAGE_RATE,
  USE_ID: userID,
  CUS_ID: null
}

//console.log(submitData)

let newdata={
  data: submitData,
  action: "Administration",
  method: "PostTaxes",
  username: username,
 type: "rpc",
 tid: "144"
}

let getAllTask = (data) =>{
    console.log(data)
    dispatch(setRefresh(!refresh));
   
  }




const inputRefs = useRef([]);
const [click, setClick] = useState(0);
const [current, setCurrent] = useState();
//const [counter, setCounter] = useState(0);

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
  
  if (keyPressed==='Control') {
      // Ctrl+Shift are pressed
    //  console.log("Ctrl+Shift pressed");
      
      setFocusedInput(0);
      dispatch(setNextIndex(0))
  }
});

const handleArrowKey = (e) => {

    
  //console.log(`handleArrowKey`,e.key);
  const maxColumns = 3; 
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

    
    if(rowData[key]!==formData[key]){
        sendRequest(url,"POST",newdata,getAllTask,token);
        nextIndex = currentIndex + 1; 
    }else{
      console.log("enter Next part")
    }

  }else {
    return;
  }

  setFocusedInput(nextIndex);    
  dispatch(setNextIndex(nextIndex))
 

  
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

useEffect(() => {
  dispatch(addRef(inputRefs.current[index]));
}, [index]);


let onBlurHandler=()=>{

    
    if(rowData[key]!==formData[key]){
        sendRequest(url,"POST",newdata,getAllTask,token);
       
    }

}
//console.log(formData);


  return (
    <div className='text-gray-500 text-[14px] flex w-full justify-center items-center'>

          {
             (
                  <input
                      type='text'
                      className='w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg'
                     
                      name={key}
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



export default  InlineEditInput


























