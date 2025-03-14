/* Create by Madiha Shaikh 25-Apr-2024
You need to pass options array for multiple button with a label prop  else pass label and handle function for single button . more descripton is at the end of the code */
import React, { useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropdownMenu = ({
  options,
  Icon,
  label,
  handleClick,
  setIsOpen,
  isOpen,
}) => {
  const tooltipRef = useRef(null);
  // console.log("option: ", options);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
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
      setIsOpen(false);
    }
  };

  return (
    <div className="relative items-center">
      <div className="mr-3 ml-2 flex pl-3 w-[125px] justify-between rounded-md bg-[#0073EA]">
        <div
          onClick={handleClick}
          className="flex text-white grow text-[14px] items-center border-r border-r-gray-500 cursor-pointer py-2 gap-[4px]"
        >
          {Icon && <Icon />}
          <span className="font-medium ">{label}</span>
        </div>
        <div className="text-white flex items-center px-2">
          <IoIosArrowDown
            onClick={options?.length > 0 ? toggleMenu : undefined}
            className="text-[18px]"
          />
        </div>
      </div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[170px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="flex flex-col items-center">
            {options.length === 0 ? (
              <div className="text-gray-500">No options available</div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

/* method to call from parent 

const handleApply = () => {
    console.log("Apply");
  };

  const handleSave = () => {
    console.log("Save");
  };

  const options = [
    { label: "Send Email",icon: IoIosRemoveCircleOutline, onClick: handleApply },
    { label: "Skip Email", icon: IoIosRemoveCircleOutline, onClick: handleSave },
  ];


after return()

for multiple buttons
<DropdownMenu options={options} label="New Part" icon: IoIosRemoveCircleOutline onClick: handleClick/>

for single Button
<DropdownMenu label="New Part" handleClick={handleClick}   />



previous code





import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropdownMenu = ({
  options,
  Icon,
  label,
  handleClick,
  setIsOpen,
  isOpen,
}) => {
  const tooltipRef = useRef(null);
  console.log("options:", options);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
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
  };

  if (!Array.isArray(options)) {
    console.error("Options should be an array");
    return <div className="text-red-500">Invalid options</div>;
  }

  if (options.length === 0) {
    return <div className="text-gray-500">No options available</div>;
  }
  return (
    <div className="relative items-center">
      <div className="mr-3 ml-2 flex pl-3 w-[120px] justify-between rounded-md bg-[#0073EA] ">
        <div
          onClick={() => handleClick()}
          className="flex text-white grow text-[14px] items-center border-r border-r-gray-500 cursor-pointer py-2 gap-[4px] align-middle  "
        >
          <span>{Icon && <Icon />}</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="text-white flex items-center px-2 ">
          <IoIosArrowDown
            onClick={options?.length > 0 ? toggleMenu : "hidden"}
            className="text-[18px] "
          />
        </div>
      </div>
      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute mt-2 w-[170px] bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 left-[60px]"
        >
          <div className="flex flex-col items-center">
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer flex items-center my-[2px] gap-4 py-1 pl-4 w-full text-customblack hover:bg-customLightGray"
                onClick={() => handleOptionClick(option.onClick)}
              >
                {option.icon && <option.icon />}
                <span>{option.label}</span>
              </div>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;








*/
