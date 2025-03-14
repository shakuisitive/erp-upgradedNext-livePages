import React, { useState, useRef, useEffect } from "react";

const MultiLevelSelect = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
  optionID,
  optionValue,
  defaultSelectedIDs = "",
}) => {
  console.log("checking default options", options);
  // console.log("checking  id", optionID);
  // console.log("checking default Value", optionValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const initialSelected = defaultSelectedIDs

      .split(",")
      .map((id) => {
        return options?.find((option) => option[optionID] === parseInt(id, 10));
      })
      .filter((option) => option !== undefined);

    setSelected(initialSelected);
    onChange(initialSelected);
    console.log("checking initial", initialSelected);
    console.log("checking default id", defaultSelectedIDs);
  }, [defaultSelectedIDs, options]);

  const handleSelect = (option) => {
    if (!selected.some((item) => item[optionID] === option[optionID])) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  const handleRemove = (option) => {
    const newSelected = selected.filter(
      (item) => item[optionID] !== option[optionID]
    );
    setSelected(newSelected);
    onChange(newSelected);
  };

  const isSelected = (option) =>
    selected.some((item) => item[optionID] === option[optionID]);

  const filteredOptions = options?.filter((option) => !isSelected(option));

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="border bg-white p-2 cursor-pointer flex flex-wrap gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          selected.map((option) => (
            <span
              key={option[optionID]}
              className="bg-gray-200 text-gray-800 p-1 rounded flex items-center gap-1"
            >
              {option[optionValue]}
              <span
                className="cursor-pointer text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
              >
                &times;
              </span>
            </span>
          ))
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full border bg-white z-10 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option[optionID]}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(option)}
              >
                {option[optionValue]}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiLevelSelect;

// *****************last working code ************************************
// import React, { useState, useRef, useEffect } from "react";
// import {
//   IoIosArrowDown,
//   IoIosArrowDropdown,
//   IoIosArrowDropup,
//   IoIosArrowUp,
// } from "react-icons/io";

// const MultiLevelSelect = ({
//   options = [],
//   onChange,
//   placeholder,
//   defaultSelectedIDs = "",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const dropdownRef = useRef(null);

//   const productCategoryListR = options?.reduce((accProdCat, option) => {
//     if (option.PARCAT_ID_PARENT === null) {
//       const children = options.filter(
//         (prod) => prod.PARCAT_ID_PARENT === option.PARCAT_ID
//       );
//       accProdCat.push({
//         value: option.PARCAT_ID,
//         label: option.CODE,
//         isChild: false,
//         children: children.map((child) => ({
//           value: child.PARCAT_ID,
//           label: child.CODE,
//           isChild: true,
//         })),
//       });
//     }
//     return accProdCat;
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   useEffect(() => {
//     const initialSelected = defaultSelectedIDs
//       .split(" ,")
//       .map((id) =>
//         productCategoryListR.find((option) => option.value === parseInt(id, 10))
//       )
//       .filter((option) => option !== undefined);

//     setSelected(initialSelected);
//     onChange(initialSelected);
//   }, [defaultSelectedIDs]);

//   const handleSelect = (option) => {
//     if (!selected.some((item) => item.value === option.value)) {
//       const newSelected = [...selected, option];
//       setSelected(newSelected);
//       onChange(newSelected);
//     }
//   };

//   const handleRemove = (option) => {
//     const newSelected = selected.filter((item) => item.value !== option.value);
//     setSelected(newSelected);
//     onChange(newSelected);
//   };

//   const isSelected = (option) =>
//     selected.some((item) => item.value === option.value);

//   const toggleExpand = (option) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [option.value]: !prevExpanded[option.value],
//     }));
//   };

//   const renderOptions = (opts, level = 0) =>
//     opts.map((option) => (
//       <div key={option.value} className={level > 0 ? "pl-[22px]" : ""}>
//         <div className="p-2 flex items-center cursor-pointer hover:bg-gray-200">
//           {option.children && option.children.length > 0 && (
//             <span onClick={() => toggleExpand(option)} className="mr-2">
//               {expanded[option.value] ? (
//                 <IoIosArrowDropup className="text-[16px] text-customblack" />
//               ) : (
//                 <IoIosArrowDropdown className="text-[16px] text-customblack" />
//               )}
//             </span>
//           )}
//           <input
//             type="checkbox"
//             checked={isSelected(option)}
//             onChange={() => {
//               if (isSelected(option)) {
//                 handleRemove(option);
//               } else {
//                 handleSelect(option);
//               }
//             }}
//             className="mr-2"
//           />
//           <div>{option.label}</div>
//         </div>
//         {option.children &&
//           option.children.length > 0 &&
//           expanded[option.value] && (
//             <div>{renderOptions(option.children, level + 1)}</div>
//           )}
//       </div>
//     ));

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="border bg-white p-2 cursor-pointer flex flex-wrap gap-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selected.length > 0 ? (
//           selected.map((option) => (
//             <span
//               key={option.value}
//               className="bg-gray-200 text-gray-800 p-1 rounded flex items-center gap-1"
//             >
//               {option.label}
//               <span
//                 className="cursor-pointer text-gray-800"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(option);
//                 }}
//               >
//                 &times;
//               </span>
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">{placeholder}</span>
//         )}
//       </div>
//       {isOpen && (
//         <div className="absolute mt-1 w-full border bg-white z-10 max-h-60 overflow-y-auto">
//           {productCategoryListR.length > 0 ? (
//             renderOptions(productCategoryListR)
//           ) : (
//             <div className="p-2 text-gray-500">No options available</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelSelect;

// **************** good working code ********************
// import React, { useState, useRef, useEffect } from "react";
// import { CiCircleMinus } from "react-icons/ci";
// import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

// const MultiLevelSelect = ({
//   options: flatOptions,
//   selectedOptions,
//   onChange,
//   placeholder,
//   optionID,
//   optionValue,
//   defaultSelectedIDs = "",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [nestedOptions, setNestedOptions] = useState([]);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const initialSelected = defaultSelectedIDs
//       .split(" ,")
//       .map((id) => findOptionById(nestedOptions, parseInt(id, 10), optionID))
//       .filter((option) => option !== undefined);

//     setSelected(initialSelected);
//     onChange(initialSelected);
//   }, [defaultSelectedIDs]);
//   // nestedOptions, optionID, onChange;
//   useEffect(() => {
//     const nestedOptions = buildNestedOptions(flatOptions);
//     setNestedOptions(nestedOptions);
//   }, [flatOptions]);

//   const buildNestedOptions = (flatOptions) => {
//     const map = new Map();
//     const roots = [];

//     flatOptions.forEach((option) => {
//       map.set(option.PARCAT_ID, { ...option, children: [] });
//     });

//     flatOptions.forEach((option) => {
//       if (option.PARCAT_ID_PARENT) {
//         const parent = map.get(option.PARCAT_ID_PARENT);
//         if (parent) {
//           parent.children.push(map.get(option.PARCAT_ID));
//         }
//       } else {
//         roots.push(map.get(option.PARCAT_ID));
//       }
//     });

//     return roots;
//   };

//   const findOptionById = (optionsList, id, idKey) => {
//     for (let option of optionsList) {
//       if (option[idKey] === id) return option;
//       if (option.children) {
//         const found = findOptionById(option.children, id, idKey);
//         if (found) return found;
//       }
//     }
//     return undefined;
//   };

//   const handleSelect = (option) => {
//     if (!isSelected(option)) {
//       const newSelected = [...selected, option];
//       setSelected(newSelected);
//       onChange(newSelected);
//     } else {
//       handleRemove(option);
//     }
//   };

//   const handleRemove = (option) => {
//     const newSelected = selected.filter(
//       (item) => item[optionID] !== option[optionID]
//     );
//     setSelected(newSelected);
//     onChange(newSelected);
//   };

//   const isSelected = (option) =>
//     selected.some((item) => item[optionID] === option[optionID]);

//   const toggleExpand = (optionID) => {
//     setExpanded((prevExpanded) => ({
//       ...prevExpanded,
//       [optionID]: !prevExpanded[optionID],
//     }));
//   };

//   const renderOptions = (optionsList, level = 0) => {
//     return optionsList?.map((option) => {
//       const isSelectedOption = isSelected(option);
//       const childrenOptions = option.children || [];
//       const isExpanded = expanded[option[optionID]];

//       return (
//         <div key={option[optionID]}>
//           <div
//             className={`p-2 cursor-pointer hover:bg-gray-200  flex items-center`}
//             style={{ paddingLeft: `${level * 20}px` }}
//           >
//             {childrenOptions.length > 0 ? (
//               <span
//                 className={`mr-2 cursor-pointer`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleExpand(option[optionID]);
//                 }}
//               >
//                 {isExpanded ? (
//                   <IoIosArrowDropup className="text-[16px] text-customblack" />
//                 ) : (
//                   <IoIosArrowDropdown className="text-[16px] text-customblack" />
//                 )}
//               </span>
//             ) : (
//               <span className="ml-6" />
//               // <CiCircleMinus className="text-[18px] text-customblack mr-2" />
//             )}

//             <input
//               type="checkbox"
//               checked={isSelectedOption}
//               onChange={() => handleSelect(option)}
//               onClick={(e) => e.stopPropagation()}
//               className="mr-2"
//             />
//             <span>{option[optionValue]}</span>
//           </div>
//           {isExpanded && childrenOptions.length > 0 && (
//             <div>{renderOptions(childrenOptions, level + 1)}</div>
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="border bg-white p-2 cursor-pointer flex flex-wrap gap-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selected.length > 0 ? (
//           selected.map((option) => (
//             <span
//               key={option[optionID]}
//               className="bg-gray-200 text-gray-800 p-1 rounded flex items-center gap-1"
//             >
//               {option[optionValue]}
//               <span
//                 className="cursor-pointer text-gray-800"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(option);
//                 }}
//               >
//                 &times;
//               </span>
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">{placeholder}</span>
//         )}
//       </div>

//       {isOpen && (
//         <div className="absolute mt-1 w-full border bg-white z-10 max-h-60 overflow-y-auto">
//           {nestedOptions.length > 0 ? (
//             renderOptions(nestedOptions)
//           ) : (
//             <div className="p-2 text-gray-500">No options available</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelSelect;

// import React, { useState, useRef, useEffect } from "react";

// const MultiLevelSelect = ({
//   options,
//   selectedOptions,
//   onChange,
//   placeholder,
//   optionID,
//   optionValue,
//   defaultSelectedIDs = "",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState([]);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   useEffect(() => {
//     const initialSelected = defaultSelectedIDs
//       .split(",")
//       .map((id) => {
//         return findOptionById(options, parseInt(id, 10), optionID);
//       })
//       .filter((option) => option !== undefined);

//     setSelected(initialSelected);
//     onChange(initialSelected);
//   }, [defaultSelectedIDs, options]);

//   const findOptionById = (optionsList, id, idKey) => {
//     for (let option of optionsList) {
//       if (option[idKey] === id) return option;
//       if (option.children) {
//         const found = findOptionById(option.children, id, idKey);
//         if (found) return found;
//       }
//     }
//     return undefined;
//   };

//   const handleSelect = (option) => {
//     if (!selected.some((item) => item[optionID] === option[optionID])) {
//       const newSelected = [...selected, option];
//       setSelected(newSelected);
//       onChange(newSelected);
//     }
//   };

//   const handleRemove = (option) => {
//     const newSelected = selected.filter(
//       (item) => item[optionID] !== option[optionID]
//     );
//     setSelected(newSelected);
//     onChange(newSelected);
//   };

//   const isSelected = (option) =>
//     selected.some((item) => item[optionID] === option[optionID]);

//   const renderOptions = (optionsList, level = 0) => {
//     return optionsList?.map((option) => {
//       const isSelectedOption = isSelected(option);
//       const childrenOptions = option.children || [];

//       return (
//         <div key={option[optionID]}>
//           <div
//             className={`p-2 cursor-pointer hover:bg-gray-200`}
//             style={{ paddingLeft: `${level * 20}px` }}
//             onClick={() => handleSelect(option)}
//           >
//             {option[optionValue]}
//           </div>
//           {childrenOptions.length > 0 &&
//             renderOptions(childrenOptions, level + 1)}
//         </div>
//       );
//     });
//   };

//   const filteredOptions = options?.filter((option) => !isSelected(option));

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="border bg-white p-2 cursor-pointer flex flex-wrap gap-2"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selected.length > 0 ? (
//           selected.map((option) => (
//             <span
//               key={option[optionID]}
//               className="bg-gray-200 text-gray-800 p-1 rounded flex items-center gap-1"
//             >
//               {option[optionValue]}
//               <span
//                 className="cursor-pointer text-gray-800"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove(option);
//                 }}
//               >
//                 &times;
//               </span>
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">{placeholder}</span>
//         )}
//       </div>
//       {isOpen && (
//         <div className="absolute mt-1 w-full border bg-white z-10 max-h-60 overflow-y-auto">
//           {filteredOptions.length > 0 ? (
//             renderOptions(filteredOptions)
//           ) : (
//             <div className="p-2 text-gray-500">No options available</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelSelect;

// import { useState } from "react";

// const MultiLevelDropdown = ({ options }) => {
//   const [selectedOptions, setSelectedOptions] = useState({});

//   const toggleSelect = (option) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [option]: !prev[option],
//     }));
//   };

//   const renderOptions = (options, level = 0) => {
//     return (
//       <ul className={`pl-${level * 4}`}>
//         {options.map((option) => (
//           <li key={option.label} className="mb-2">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={selectedOptions[option.label] || false}
//                 onChange={() => toggleSelect(option.label)}
//                 className="mr-2"
//               />
//               <span onClick={() => toggleOpen(option.label)}>
//                 {option.label}
//                 {option.children && (
//                   <span className="ml-2">
//                     {openStates[option.label] ? "-" : "+"}
//                   </span>
//                 )}
//               </span>
//             </div>
//             {option.children &&
//               openStates[option.label] &&
//               renderOptions(option.children, level + 1)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return <div className="dropdown">{renderOptions(options)}</div>;
// };

// export default MultiLevelDropdown;
