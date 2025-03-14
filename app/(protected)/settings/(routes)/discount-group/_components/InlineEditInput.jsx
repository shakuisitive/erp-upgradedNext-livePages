// import React, { useState ,useRef,useEffect} from 'react'
// import useApiFetch from '../../../../../../customHook/useApiFetch';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateforRefresh ,addRef,setValidCode,setNextIndex} from '../_redux/DiscountGroupSlice';
// import {getKeyByCondition} from './customFunctions'
// export const InlineEditInput = ({data, rowData, index}) => {

// let arr=useSelector(state=>state.discountGroup.refArray);
// let focus=useSelector(state=>state.discountGroup.nextFocus);

// let [error,sendRequest]=useApiFetch();
// let url=process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL+"Administration/PostDiscountGroup";
// let accessToken=localStorage.getItem("tokenSession");

// const [focusedInput, setFocusedInput] = useState(null);
// const [enabled,setEnabled] = useState(true);
// const [formData,setFormData] = useState({
//     NAME:rowData.NAME,
//     DISGRP_ID:rowData.DISGRP_ID,
//     DESCRIPTION:rowData.DESCRIPTION,
//     ACTIVE_FLAG:rowData.ACTIVE_FLAG,
//     DISCOUNT_VALUE:rowData.DISCOUNT_VALUE,
//     DISCOUNT_PERCENTAGE:rowData.DISCOUNT_PERCENTAGE,
//     CODE:rowData.CODE,
// })

// let getAllTask = (data) =>{
//     console.log(data)
//     dispatch(updateforRefresh(true))

//   }

// let key=getKeyByCondition(rowData,data);

// const inputRefs = useRef([]);
// const [click, setClick] = useState(0);
// const [current, setCurrent] = useState();
// //const [counter, setCounter] = useState(0);
// const dispatch = useDispatch();
// // useEffect(() => {
// //   const handleKeyDown = (event) => {
// //     // Access information about the key pressed
// //     const keyPressed = event.key;

// //     const keyCode = event.keyCode;

// //     if (keyPressed === 'Control') {
// //       // Ctrl+Shift are pressed
// //       console.log('Ctrl+Shift pressed');
// //       setCounter(counter + 1);
// //       //setFocusedInput(0);
// //       dispatch(setFocusedInput({value:0}))
// //     }

// //   };

// //   window.addEventListener('keydown', handleKeyDown);

// //   return () => {
// //     window.removeEventListener('keydown', handleKeyDown);
// //   };
// // }, [counter, focusedInput]);

// window.addEventListener('keydown', function (event) {
//   // Access information about the key pressed
//   const keyPressed = event.key;
// //console.log(keyPressed,counter)
//   const keyCode = event.keyCode;

//   if (keyPressed==='Control') {
//       // Ctrl+Shift are pressed
//     //  console.log("Ctrl+Shift pressed");
//       setEnabled(false);
//       setFocusedInput(0);
//       dispatch(setNextIndex(0))
//   }
// });

// const handleArrowKey = (e) => {

//   //console.log(`handleArrowKey`,e.key);
//   const maxColumns = 3;
//   const maxRows = Math.floor(arr.length  / maxColumns);
//   let currentIndex=focus
//   let nextIndex;

//   if (e.key === 'ArrowLeft' && currentIndex > 0) {
//     e.preventDefault();

//     nextIndex = currentIndex - 1;
//   } else if (e.key === 'ArrowRight' && currentIndex < arr.length - 1) {
//     e.preventDefault();
//     nextIndex = currentIndex + 1;
//   } else if (e.key === 'ArrowUp' && currentIndex >= maxColumns) {
//     nextIndex = currentIndex - maxColumns;
//   } else if (e.key === 'ArrowDown' && currentIndex < arr.length - maxColumns) {
//     nextIndex = currentIndex + maxColumns;
//   } else if(e.key==='Enter'){

//     let newdata={
//         data: formData,
//         action: "Administration",
//         method: "PostDiscountGroup",
//         username: "testuser",
//         type: "rpc",
//         tid: "144"
//     }
//     if(rowData[key]!==formData[key]){
//         sendRequest(url,"POST",newdata,getAllTask,accessToken);
//         nextIndex = currentIndex + 1;
//     }

//   }else {
//     return;
//   }

//   setFocusedInput(nextIndex);
//   dispatch(setNextIndex(nextIndex))
//   console.log('previous', currentIndex);
//   console.log('next index', nextIndex);

// };

// useEffect(() => {
//  // inputRefs.current[focusedInput]?.focus();
//  arr[focus]?.focus();

// }, [focus]);

// // useEffect(() => {
// //   (ref) => {
// //     inputRefs.current[index] = ref;
// //   };
// // }, [index]);

// useEffect(() => {
//   dispatch(addRef(inputRefs.current[index]));
// }, [index]);

// let handleChange=(e)=>{
//     setFormData({...formData,[key]:e.target.value});
// }
// let onBlurHandler=()=>{

//      let newdata={
//         data: formData,
//         action: "Administration",
//         method: "PostDiscountGroup",
//         username: "testuser",
//         type: "rpc",
//         tid: "144"
//     }
//     if(rowData[key]!==formData[key]){
//         sendRequest(url,"POST",newdata,getAllTask,accessToken);

//     }

// }
// //console.log(formData);
//   return (
//     <div className='text-gray-500 text-[14px] flex w-full justify-center items-center'>

//           {
//              (
//                   <input
//                       type='text'
//                       className='w-full text-center h-full group hover:bg-gray-50 hover:shadow-lg'

//                       value={formData[key]}
//                       onKeyDown={handleArrowKey}
//                       onChange={handleChange}
//                       onBlur={onBlurHandler}

//                       ref={(ref) => {
//                         inputRefs.current[index] = ref;
//                       }}

//                       />
//               )
//           }

//         </div>
//   )
// }
