import React, { useState ,useRef,useEffect} from 'react'
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { updateforRefresh ,addRef,setValidCode,setNextIndex,setRefresh,setInputData} from '../../_redux/uowSlice';
import {getKeyByCondition} from '../../../../../../../app/(protected)/settings/_components/Functions/customeFunctions'
import { useDispatch, useSelector } from 'react-redux';
const InlineEditInput = ({data, rowData, index}) => {
    // const [InputData , setInputData] = useState([])
    let arr=useSelector(state=>state.uow.refArray); 
    let focus=useSelector(state=>state.uow.nextFocus);
    let username=useSelector(state=>state.uow.username);
    let userID=useSelector(state=>state.uow.user_ID);
    // let token=useSelector(state=>state.uow.token);
    let refresh=useSelector(state=>state.uow.refresh);
    let inputData=useSelector(state=>state.uow.inputData);
    let key=getKeyByCondition(rowData,data);
    let [error,sendRequest]=useApiFetch();
    const dispatch = useDispatch();
    let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostUOW";
    
    const [focusedInput, setFocusedInput] = useState(null);
    const [disable,setDisable] = useState(false);
    
    // const [formData,setFormData] = useState({
    //   TAX_ID: rowData.TAX_ID,
    //   TAX_CODE: rowData.TAX_CODE,
    //   DESCRIPTION:rowData.DESCRIPTION,
    //   ACTIVE_FLAG:rowData.ACTIVE_FLAG,
    //   NOTES: "",
    //   SEQ_NUMBER: "",
    //   TAX_PERCENTAGE_RATE:rowData.TAX_PERCENTAGE_RATE,
    //   USE_ID: userID,
    //   CUS_ID: null
    // });
     
    const token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
    const [formData,setFormData] = useState({

                        UOW_ID:rowData.UOW_ID,
                        UOW_NAME:rowData.UOW_NAME,
                      CUS_ID 		: null ,
                      CODE  		: rowData.UOW_CODE,
                      DESCRIPTION 	: rowData.DESCRIPTION, 
                      ACTIVE_FLAG 	: rowData.ACTIVE_FLAG,
                  
            // "action": "Administration",
            // "method": "PostUOW",
            // "username": "admin",
            // "type": "rpc",
            // "tid": "144"
        
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
      UOW_ID: formData.UOW_ID,
      CODE: formData.UOW_CODE,
      DESCRIPTION:formData.DESCRIPTION,
      ACTIVE_FLAG:formData.ACTIVE_FLAG.toUpperCase(),
    //   NOTES: "",
    //   SEQ_NUMBER: "",
    //   UOW_PERCENTAGE_RATE:formData.UOW_PERCENTAGE_RATE,
    //   USE_ID: userID,
      CUS_ID: null
    }
    
    //console.log(submitData)
    
    let newdata={
      data: submitData,
      action: "Administration",
      method: "GetUowCode",
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

export default InlineEditInput