// import React, { useState } from 'react'

// const TooltipStatus = ({ content, children ,statusClick}) => {
//     const [isTooltipVisible, setTooltipVisible] = useState(false);
//     const [periority, setPeriority] = useState(["", "Medium", "Low"])
//     const [selectValue,setSelectValue] = useState();

//     const onSelect=(val)=>{
//         console.log("cliced",val)
//         setSelectValue(val);
//         statusClick(val);
//         setTooltipVisible(false);

//     }
//     //   console.log("this is log" , content);
//     return (
//         <div className="group relative  ">
//             {isTooltipVisible && (
//                 <div className="absolute z-10  bg-white text-black w-[170px] p-4 rounded-md text-sm shadow-lg mt-8">
//                     <div>

//                             <div  className={` cursor-pointer  bg-green-400  my-2 p-1 w-full shadow-md text-white text-center`}>
//                         <p onClick={()=>onSelect("Y")}>Active</p>
//                         </div>

//                             <div className={` cursor-pointer  bg-red-400  my-2 p-1 w-full shadow-md text-white text-center`}>
//                             <p onClick={()=>onSelect("N")}>inctive</p>
//                         </div>

//                     </div>
//                 </div>
//             )}
//                     <div
//                         className="inline-block   cursor-pointer"
//                         onClick={() => setTooltipVisible(!isTooltipVisible)}
//                     // onDoubleClick={() => setTooltipVisible(false)}
//                     >
//                         {children}
//                     </div>
//                 </div>
//             );
// };

//             export default TooltipStatus
