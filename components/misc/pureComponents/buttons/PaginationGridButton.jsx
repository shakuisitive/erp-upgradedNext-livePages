import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

const PaginationGridButton = ({
  options,
  Icon,
  label,
  handleClick,
  setIsOpen,
  isOpen,
}) => {
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (onClick) => {
    if (typeof onClick === "function") {
      onClick();
    }
    setIsOpen(false);
  };

  // Check if there's enough space to show the dropdown below
  const getDropdownPosition = () => {
    if (!buttonRef.current) return "bottom"; // default to bottom if button not available

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    return spaceBelow >= 200 ? "bottom" : "top"; // You can adjust '200' based on your dropdown height
  };

  const dropdownPosition = getDropdownPosition();

  return (
    <div className="relative items-center">
      <div
        ref={buttonRef}
        className="mr-3 ml-10 flex pl-3 w-[300px] justify-between rounded-md bg-white border"
      >
        <div
          onClick={handleClick}
          className="flex text-customblack grow text-[14px] items-center cursor-pointer py-2 gap-[4px] align-middle"
        >
          <IoAdd className="text-[18px] text-customblack" />
          <span className="font-medium">
            Show {label !== undefined ? label : "25"}
          </span>
        </div>
        <div className="text-gray-400 flex items-center px-2">
          <IoIosArrowDown
            onClick={options?.length > 0 ? toggleMenu : undefined}
            className="text-[18px]"
          />
        </div>
      </div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className={`absolute w-[250px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 ${
            dropdownPosition === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
          } left-[60px]`}
        >
          <div className="flex flex-col items-center">
            {Array.isArray(options) && options.length > 0 ? (
              options.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer flex items-center my-[2px] gap-4 py-1 pl-4 w-full text-customblack hover:bg-customLightGray"
                  onClick={() => handleOptionClick(option.onClick)}
                >
                  {option.icon && <option.icon />}
                  <span>{option.label}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No options available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationGridButton;
