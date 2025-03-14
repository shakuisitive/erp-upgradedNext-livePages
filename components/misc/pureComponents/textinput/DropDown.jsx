// DropdownSelect.js

// import React from 'react';

// const Dropdown = ({ options, onSelect }) => {
//   const renderOptions = (items, depth = 0) => {
//     return items.map((item) => (
//       <React.Fragment key={item.value}>
//         <option value={item.value} className={`pl-${depth * 4}`}>
//           {item.value || (item.children ? item.children.map(child => child.value).join(" ") : '')}
//         </option>
//         {item.children && renderOptions(item.children, depth + 1)}
//       </React.Fragment>
//     ));
//   };

//   return (
//     <div className="inline-block relative">
//       <select
//         onChange={(e) => onSelect(options.find((item) => item.value === e.target.value))}
//         className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
//       >
//         <option value="" disabled selected>
//           Please Select
//         </option>
//         {renderOptions(options)}
//       </select>
//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//         <svg
//           className="fill-current h-4 w-4"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//         >
//           <path
//             d="M10 12a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-.707.293z"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;

import React from 'react';

const DropDown = ({ options }) => {
  return (
    <select className="p-2 border rounded">
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
          {option.children &&
            option.children.map((child, childIndex) => (
              <span key={childIndex}>
                {child.label}: {child.value ? child.value : 'N/A'}{' '}
              </span>
            ))}
        </option>
      ))}
    </select>
  );
};
export default DropDown;
