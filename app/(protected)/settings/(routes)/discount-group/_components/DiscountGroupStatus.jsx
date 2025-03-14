// import React, { useState } from 'react'
// import DiscountGroupTooltip from './DiscountGroupTooltip';
// const DiscountGroupStatus = ({data,rowData,index}) => {

//   const [open ,setOpen]=useState(false);

//          return (

//           <div className='w-full '>
//             <div className={`w-full ${data==="Y"?"bg-green-400":"bg-red-400"} text-white flex justify-center items-center font-semibold  py-2`}>
//               <DiscountGroupTooltip content={data} rowData={rowData}>

//                 <p>
//                   {data=="Y"?"Active":"Inactive"}
//                 </p>
//               </DiscountGroupTooltip>

//             </div>
//           </div>
//     // <>
//     // <div onClick={()=>setOpen(!open)} className={`w-full flex items-center justify-center ${data == "Y" ? "bg-green-400" :data == "N" ?  "bg-red-400" : data == "Initiated" ?  "bg-zinc-400" :data == "Void" ? "bg-yellow-400":data == "Ready for Receiving" ? "bg-indigo-500" : ""} `}>

//     //     <p onClick={()=>setOpen(!open)} className='text-[14px] text-white'>{data && data==="Y"?"Active":"InActive"}</p>
//     // </div>
//     // {
//     //   open && <div className='relative'>
//     //       <div className='absolute z-10 top-0'>
//     //         <select>
//     //           <option className='p-4 bg-red-500'><span>Active</span></option>
//     //         </select>
//     //       </div>
//     //    </div>
//     // }
//     // </>
//   )
// }

// export default DiscountGroupStatus
