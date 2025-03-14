
// import React, { useSta644444te } from 'react'

// import useApiFetch from '../../../../../../../customHook/useApiFetch';
// import { useDispatch, useSelector } from 'react-redux';
// //import { updateforRefresh } from '../_redux/DiscountGroupSlice';

// const Tooltip = ({ content, rowData, children }) => {
   

//     let [error, sendRequest] = useApiFetch();
//     const [isTooltipVisible, setTooltipVisible] = useState(false);
//     let refresh=useSelector(state=>state.discountGroup.refresh)
//     let url = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostDiscountGroup";
//     let accessToken = localStorage.getItem("tokenSession");

//     const [formData, setFormData] = useState({
//         NAME: rowData.NAME,
//         DISGRP_ID: rowData.DISGRP_ID,
//         DESCRIPTION: rowData.DESCRIPTION,
//         ACTIVE_FLAG: rowData.ACTIVE_FLAG,
//         DISCOUNT_VALUE: rowData.DISCOUNT_VALUE,
//         DISCOUNT_PERCENTAGE: rowData.DISCOUNT_PERCENTAGE,
//         CODE: rowData.CODE,
//     });
   
  
//     let dispatch = useDispatch();
//     let getAllTask = (data) => {
       
//        // dispatch(updateforRefresh(true))

//     }


//     let activeClick = () => {
       
      
        
//             let newdata = {
//                 data: {
//                     NAME: rowData.NAME,
//                     DISGRP_ID: rowData.DISGRP_ID,
//                     DESCRIPTION: rowData.DESCRIPTION,
//                     ACTIVE_FLAG: "Y",
//                     DISCOUNT_VALUE: rowData.DISCOUNT_VALUE,
//                     DISCOUNT_PERCENTAGE: rowData.DISCOUNT_PERCENTAGE,
//                     CODE: rowData.CODE,
//                 },
//                 action: "Administration",
//                 method: "PostDiscountGroup",
//                 username: "testuser",
//                 type: "rpc",
//                 tid: "144"
//             }
           


//              sendRequest(url, "POST", newdata, getAllTask, accessToken);
    
//            // setTooltipVisible(false);
        

     
    
        
//     };
//     let inactiveClick = () => {
       
      
//         let newdata = {
//             data: {
//                 NAME: rowData.NAME,
//                 DISGRP_ID: rowData.DISGRP_ID,
//                 DESCRIPTION: rowData.DESCRIPTION,
//                 ACTIVE_FLAG: "N",
//                 DISCOUNT_VALUE: rowData.DISCOUNT_VALUE,
//                 DISCOUNT_PERCENTAGE: rowData.DISCOUNT_PERCENTAGE,
//                 CODE: rowData.CODE,
//             },
//             action: "Administration",
//             method: "PostDiscountGroup",
//             username: "testuser",
//             type: "rpc",
//             tid: "144"
//         }
//         sendRequest(url, "POST", newdata, getAllTask, accessToken);
//         // setTooltipVisible(false);
//     }

//     //   console.log("this is log" , content);
//     return (
//         <div onClick={() => setTooltipVisible(!isTooltipVisible)}  className="group relative text-white text-center w-full">
//             {isTooltipVisible && (
//                 <div onMouseLeave={()=>setTooltipVisible(false)} className="absolute z-10  bg-white w-[170px] p-4  text-sm shadow-lg mt-8">
//                     <div  className={` cursor-pointer bg-green-400`}>
//                         <p onClick={activeClick} className='p-1 w-full m-1'>Active</p>
//                     </div>

//                     <div  className={` cursor-pointer bg-red-600`}>
//                         <p  onClick={inactiveClick} className='p-1 w-full m-1'>Inactive</p>
//                     </div>

//                 </div>
//             )}
//             <div
//                 className="inline-block   cursor-pointer"

//             // onDoubleClick={() => setTooltipVisible(false)}
//             >
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Tooltip