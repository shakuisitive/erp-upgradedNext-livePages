import React, { useState, useRef, useEffect, useCallback } from "react";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

export const DropDownInput = ({ options }) => {
  const [optionValue, setOptionValue] = useState("Please Select");
  const [dropwDownToggle, setDropwDownToggle] = useState(false);
  const dropdownRef = useRef(null);

  const generateOptions = useCallback((options) => {
    return options.map((item, index) => {
      if (Array.isArray(item.chiledren)) {
        return (
          <li
            key={index + "child"}
            onClick={() =>
              handleChange(item.chiledren.map((child) => child.value).join(","))
            }
            data-contextmenu="dropdown"
          >
            {item.chiledren.map((child) => child.value).join(" ")}
          </li>
        );
      }
      return (
        <li
          key={index}
          onClick={() => handleChange(item.value)}
          data-contextmenu="dropdown"
        >
          {item.value}
        </li>
      );
    });
  });

  const handleChange = (value) => {
    setDropwDownToggle(!dropwDownToggle);
    setOptionValue(value.split(",")[0]);
  };

  const handleClickOutside = (event) => {
    const contextMenuValue = event.target.getAttribute("data-contextmenu");
    if (!contextMenuValue == "dropdown" || contextMenuValue == null) {
      setDropwDownToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-2" ref={dropdownRef}>
      <div
        onClick={() => setDropwDownToggle(!dropwDownToggle)}
        className="relative w-80"
        data-contextmenu="dropdown"
      >
        <input
          className="border border-gray-200 text-gray-400 w-80 px-3 py-2 rounded-lg hover:border-gray-400 focus:outline-none capitalize"
          type="text"
          readOnly
          value={optionValue}
          data-contextmenu="dropdown"
        />
        <SlArrowDown className="absolute p-2 text-[1.8rem] top-1/2 right-3  transform -translate-y-1/2 hover:bg-gray-200 text-gray-500 cursor-pointer  rounded-sm" />
        <ul
          className={`absolute ${
            dropwDownToggle ? "block" : "hidden"
          } mt-2 w-80 border border-gray-200 rounded-lg`}
        >
          {generateOptions(options)}
        </ul>
      </div>
    </div>
  );
};
export default DropDownInput;
