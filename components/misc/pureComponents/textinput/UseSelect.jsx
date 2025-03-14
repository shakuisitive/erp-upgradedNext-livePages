// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { FaAngleDown } from 'react-icons/fa';
// import { FaPencil } from 'react-icons/fa6';

// const InputSelect = ({ options }) => {
//     const [optionValue, setOptionValue] = useState('Please Select');
//     const [dropDownToggle, setDropDownToggle] = useState(false);
//     const dropdownRef = useRef(null);

//     const handleChange = (value) => {
//         setDropDownToggle(false); // Close dropdown after selection
//         setOptionValue(value);
//     };

//     const handleClickOutside = (event) => {
//         if (!dropdownRef.current.contains(event.target)) {
//             setDropDownToggle(false); // Close dropdown if clicked outside
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     }, []);

//     const toggleDropDown = () => {
//         setDropDownToggle(!dropDownToggle); // Toggle dropdown visibility
//     };

//     const generateOptions = useCallback((options) => {
//         return options.map((item, index) => (
//             <li key={index} onClick={() => handleChange(item.value)}>{item.label}</li>
//         ));
//     }, [options]);

//     return (
//         <div className='mb-2' ref={dropdownRef}>
//             <div onClick={toggleDropDown} className='relative w-80'>
//                 <input
//                     className='bg-white w-full focus:outline-none focus:unset border-b py-[8px] pl-[12px] first-letter:hover:border-gray-400 capitalize'
//                     type="text"
//                     readOnly
//                     value={optionValue}
//                 />
//                 <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center gap-2 border-l py-[4px] px-[12px]">
//                     <FaAngleDown className="text-gray-400" />
//                     <FaPencil className="text-green-300" />
//                 </div>
//                 <ul className={`absolute ${dropDownToggle ? 'block' : 'hidden'} mt-2 -left-1 top-[40px]  w-[101%] border border-customgreen shadow-md`}>
//                     {generateOptions(options)}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default InputSelect;

import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
const UseSelect = ({
  options,
  optionKeyId,
  optionKeyValue,
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  required,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleArrowClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <select
        value={value}
        className="bg-white w-full  border border-gray-300  focus:outline-none focus:border-0 py-[8px] pl-[12px]"
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
      >
        <option
          value=""
          disabled
          selected
          hidden
          className=" bg-white border border-gray-300 mt-1 rounded"
        >
          {placeholder}
        </option>
        {options && options.length > 0 ? (
          options.map((option, index) => {
            const keyId = String(option[optionKeyId] || "");
            const keyValue = String(option[optionKeyValue] || "");

            return (
              <option
                key={index}
                value={
                  keyId.length > 20 ? keyId.substring(0, 20) + "..." : keyId
                }
                className="bg-white border border-gray-300"
              >
                {keyValue.length > 20
                  ? keyValue.substring(0, 10) + "..."
                  : keyValue}
              </option>
            );
          })
        ) : (
          <option value="" disabled className="bg-white border border-gray-300">
            No options available
          </option>
        )}
      </select>

      <div className="absolute top-1/2 right-[6px] -translate-y-1/2 flex items-center justify-center gap-2 border-l py-[4px] px-[12px]">
        <FaAngleDown onClick={handleArrowClick} className="text-gray-400" />
        <FaPencil className="text-green-300" />
      </div>
    </div>
  );
};

export default UseSelect;

/*  method to use
<UseSelect
            id="mySelect"
            options={getUoM}
            optionKey="CODE"
            value="UOM_ID"
            onChange={handleSelectUoM}
          />
          */
{
  /* <select
        id={id}
        // value={value}
        onChange={handleChange}
        className="bg-white w-full focus:outline-none focus:unset border-b py-[8px] pl-[12px]"
      >
        {options &&
          options.map((option) => (
            <option key={option[optionKey]} value={option[value]}>
              {option[optionKey]}
            </option>
          ))}
      </select> */
}
