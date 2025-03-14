// const TextFields=({label,type,placeholder,events,value,name,disabled})=>{
//     const combinedEvents = { ...events };

//     return   <div className=" w-full ">
//         <div className="md:flex md:items-center mb-6">
//     <div className="w-[30%] ">
//       <label className="block text-gray-500 font-md md:text-left   mb-1 md:mb-0 pr-4" for="inline-full-name">
//        {label}
//       </label>
//     </div>
//     <div className="w-[60%]">
//     <input className={`bg-gray-200 appearance-none border-2  border-gray-200 rounded w-full py-2 px-4
//      text-gray-700 leading-tight focus:outline-none  focus:bg-white focus:border-purple-500
//      ${type==='number'?"text-right":""}
//      `}
//     id="inline-full-name"
//         type={type} value={value} placeholder={placeholder}
//         name={name}

//         {...combinedEvents}

//         disabled={disabled}

//         />
//     </div>
//   </div>

// </div>
// }

// TextFields.defaultProps={
//     events:{}
// }

// export default TextFields;
