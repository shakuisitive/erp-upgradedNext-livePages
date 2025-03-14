import React, { useState, useRef, useEffect } from "react";

const MultiSelect = ({
  options,
  selectedOptions,
  onChange,
  placeholder,
  optionID,
  optionValue,
  defaultSelectedIDs = "",
}) => {
  // console.log("checking default options", options);
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

export default MultiSelect;

// import React, { useState, useRef, useEffect } from "react";

// const MultiSelect = ({ options, selectedOptions, onChange, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(selectedOptions || []);
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

//   const handleSelect = (option) => {
//     const newSelected = selected.includes(option)
//       ? selected.filter((item) => item !== option)
//       : [...selected, option];
//     setSelected(newSelected);
//     onChange(newSelected);
//   };

//   const isSelected = (option) => selected.includes(option);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <div
//         className="border p-2 cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selected.length > 0 ? (
//           selected.join(", ")
//         ) : (
//           <span className="text-gray-500">{placeholder}</span>
//         )}
//       </div>
//       {isOpen && (
//         <div className="absolute mt-1 w-full border bg-white z-10 max-h-60 overflow-y-auto">
//           {options.map((option) => (
//             <div
//               key={option}
//               className={`p-2 cursor-pointer ${
//                 isSelected(option) ? "bg-gray-300" : ""
//               }`}
//               onClick={() => handleSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelect;
