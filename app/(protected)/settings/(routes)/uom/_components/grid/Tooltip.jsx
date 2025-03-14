
// import React, { useState } from 'react'
// import useApiFetch from '../../../../../../../customHook/useApiFetch';
// import { useDispatch, useSelector } from 'react-redux';
// const Tooltip = ({ content, rowData, children }) => {
   

//     let [error, sendRequest] = useApiFetch();
//     const [isTooltipVisible, setTooltipVisible] = useState(false);
//     let refresh=useSelector(state=>state.discountGroup.refresh)
//     let url = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL + "Administration/PostUOM";
//     let accessToken = localStorage.getItem("tokenSession");

//     const [formData, setFormData] = useState({
   
//         UOM_ID:rowData.UOM_ID,
//         UOM_NAME:rowData.UOM_NAME,
//       CUS_ID 		: null ,
//       CODE  		: rowData.UOM_CODE,
//       DESCRIPTION 	: rowData.DESCRIPTION, 
//       ACTIVE_FLAG 	: rowData.ACTIVE_FLAG,
//     });
   
  
//     let dispatch = useDispatch();
//     let getAllTask = (data) => {
//     }


//     let activeClick = () => {
       
      
          
//         let newdata = {
//             data:{ 
//                 UOM_ID 		: rowData.UOM_ID ,
//                 CUS_ID 		: null  ,
//                 CODE   		:  rowData.UOM_CODE,
//                 DESCRIPTION 	: rowData.DESCRIPTION,
//                 ACTIVE_FLAG 	:  "Y"
//             },
//                 action: "Administration",
//                  method: "PostUO",
//                 username: "admin",
//                 type: "rpc",
//       tid: "144"
//     }
           


//              sendRequest(url, "POST", newdata, getAllTask, accessToken);   
//     };
//     let inactiveClick = () => {
       
      
    
//         let newdata = {
//             data:{ 
//                 UOM_ID 		: rowData.UOM_ID ,
//                 CUS_ID 		: null  ,
//                 CODE   		:  rowData.UOM_CODE,
//                 DESCRIPTION 	: rowData.DESCRIPTION,
//                 ACTIVE_FLAG 	:  "N"
//             },
//       action: "Administration",
//       method: "PostUOM",
//       username: "admin",
//       type: "rpc",
//       tid: "144"
//     }
//         sendRequest(url, "POST", newdata, getAllTask, accessToken);
//     }
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
//             >
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Tooltip