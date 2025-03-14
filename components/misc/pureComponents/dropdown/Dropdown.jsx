import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import {
  onNextFocus,
  setIsRemoveLot,
} from "../../../../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";

const Dropdown = ({
  options,
  optionKey1,
  optionKey2,
  showValue,
  onSelectedOptionChanged,
  onNewOption,
  placeholder,
  inputClassName,
  dropdownClassName,
  customFocusKey,
  isDisabled,
  onClearInputValue,
  onHandleFocus,
  onHandleBlur,
  onDefaultInput,
  forwardedRef,
  onClearValue,
  isCreateOption,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);
  // const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = forwardedRef || useRef(null);
  const dropdownContainerRef = useRef(null);
  const rowDataa = useSelector((state) => state.PurchaseSlices.subGridState);

  const dispatch = useDispatch();

  // this effect is for handling top and bottom of the dropdown area
  useEffect(() => {
    function handleDropdownPosition() {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (dropdownRect.bottom > viewportHeight) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
    }
    if (isDropdownFocused) {
      window.addEventListener("resize", handleDropdownPosition);
      handleDropdownPosition();
    }
    return () => {
      window.removeEventListener("resize", handleDropdownPosition);
    };
  }, [isDropdownFocused]);

  // this is working for dropdown closing through click on entire screen
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownFocused(false);
    }
  };
  // this is relevant effect for closing the dropdown options
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //this effect is for handling keys to focus the inputfield
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.altKey && event.key === customFocusKey) {
        event.preventDefault();
        dropdownRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [customFocusKey]);

  // this effect will trigger when default input value will be received in props
  useEffect(() => {
    handleDefaultInput();
  }, [onDefaultInput]);

  //   const handleCustomKeypress = (event) => {
  //     if (customFocusKeys && customFocusKeys.some((keyCombo) => {
  //       const [ctrlKey, shiftKey, key] = keyCombo.split('+');
  //       return event.ctrlKey === ctrlKey && event.shiftKey === shiftKey && event.key === key;
  //     })) {
  //       dropdownRef.current.focus();
  //     }
  //   };

  //   useEffect(() => {
  //     document.addEventListener('keydown', handleCustomKeypress);
  //     return () => document.removeEventListener('keydown', handleCustomKeypress);
  //   }, [customFocusKeys]);

  // this is handling input value change
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setSelectedOption(null)

  //   //checking input value starts with '?'
  //   if (value.startsWith('?')) {
  //     setFilteredOptions(options);
  //   }

  //   // in all other case
  //   else {
  //     setFilteredOptions(options.filter(option =>
  //       option[optionKey1].toLowerCase().startsWith(value.toLowerCase()) ||
  //       option[optionKey2].toLowerCase().startsWith(value.toLowerCase())
  //     ));
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   setSelectedOption(null);

  //   // Checking input value starts with '?'
  //   if (value.startsWith("?")) {
  //     setFilteredOptions(options);
  //   } else {
  //     // this Determines if the value is numeric or not
  //     const isNumericValue = /^\d+$/.test(value);

  //     // Filter options based on whether the value is numeric or a string
  //     const filteredOptions = options.filter((option) => {
  //       const lowerCaseValue = value.toLowerCase();
  //       if (isNumericValue) {
  //         return (
  //           option[optionKey1].toString().startsWith(lowerCaseValue) ||
  //           option[optionKey2].toString().startsWith(lowerCaseValue)
  //         );
  //       } else {
  //         return option[optionKey1].toLowerCase().startsWith(lowerCaseValue);
  //       }
  //     });
  //     // Set the filtered options
  //     setFilteredOptions(filteredOptions);
  //   }
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedOption(null);
    // Checking input value starts with '?'
    if (value.startsWith("?")) {
      setFilteredOptions(options);
    } else {
      // this Determines if the value is numeric or not
      const isNumericValue = /^\d+$/.test(value);

      // Filter options based on whether the value is numeric or a string
      const filteredOptions = options.filter((option) => {
        const lowerCaseValue = value.toLowerCase();
        if (isNumericValue) {
          return (
            option[optionKey1]?.toString().startsWith(lowerCaseValue) ||
            option[optionKey2]?.toString().startsWith(lowerCaseValue)
          );
        } else {
          // Check if optionKey1 is an array
          if (Array.isArray(optionKey1)) {
            // If it's an array, check if any of the keys start with the value
            return optionKey1.some((key) =>
              option[key]?.toString().toLowerCase().startsWith(lowerCaseValue)
            );
          } else {
            // If it's a single key, directly check if its value starts with the value
            return option[optionKey1]?.toLowerCase().startsWith(lowerCaseValue);
          }
        }
      });
      // Set the filtered options
      setFilteredOptions(filteredOptions);
    }
  };

  // this is handling options through keys functionality
  const handleKeys = (e) => {
    if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? filteredOptions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "Backspace") {
      setIsDropdownFocused(true);
      setInputValue("");
      setSelectedOption(null);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setIsDropdownFocused(false);
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        const selectedOption = filteredOptions[highlightedIndex];
        setSelectedOption(selectedOption);
        if (onClearInputValue === false) {
          // Check if optionKey1 is an array
          if (Array.isArray(optionKey1)) {
            setInputValue(selectedOption[showValue]);
          } else {
            setInputValue(selectedOption[optionKey1]);
          }
          setIsDropdownFocused(false);
          onSelectedOptionChanged(selectedOption);
        } else if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length &&
          onClearInputValue == true
        ) {
          setInputValue("");
          setSelectedOption(filteredOptions[highlightedIndex]);
          onSelectedOptionChanged(filteredOptions[highlightedIndex]);
        } else {
          handleCreateNewOption(inputValue);
        }
      }
    } else if (e.key === "Tab") {
      if (isDropdownFocused) {
        e.preventDefault();
        dropdownRef.current.focus();
        setIsDropdownFocused(false);
      }
    }
  };

  const scrollDropdownContainer = (direction) => {
    if (dropdownContainerRef.current) {
      const container = dropdownContainerRef.current;
      const highlightedOption = container.querySelector(".highlighted");
      if (highlightedOption) {
        if (direction === "up") {
          container.scrollTop =
            highlightedOption.offsetTop - container.offsetTop;
        } else if (direction === "down") {
          const optionBottom =
            highlightedOption.offsetTop -
            container.offsetTop +
            highlightedOption.offsetHeight;
          const containerBottom = container.scrollTop + container.offsetHeight;
          if (optionBottom > containerBottom) {
            container.scrollTop = optionBottom - container.offsetHeight;
          }
        }
      }
    }
  };
  // this is handling newOtion which is not in array
  const handleCreateNewOption = (newOption) => {
    console.log("Creating new option click:", newOption);
    onNewOption(newOption);
    setIsDropdownFocused(false);
  };

  const handleOptionClick = (option) => {
    if (onClearInputValue) {
      setIsDropdownFocused(false);
      onSelectedOptionChanged(option);
      setSelectedOption(option);
      setInputValue("");
    } else {
      setIsDropdownFocused(false);
      setSelectedOption(option);
      // Check if optionKey1 is an array
      if (Array.isArray(optionKey1)) {
        setInputValue(option[showValue]);
      } else {
        // it will set the key directly if optionkey is not an array
        setInputValue(option[optionKey1]);
        // setIsRemove(true)
      }
      onSelectedOptionChanged(option);
      dispatch(setIsRemoveLot(true));
    }
  };

  // this is clearing the typed or selected value by clicking the cross icon
  const handleClearSelection = () => {
    setInputValue("");
    onClearValue && onClearValue();
    setSelectedOption(null);
    setIsDropdownFocused(false);
  };

  // this is handling input focus
  const handleInputFocus = () => {
    setIsDropdownFocused(true);
    onHandleFocus();
  };
  //this is for setting default input value
  const handleDefaultInput = () => {
    setInputValue(onDefaultInput);
  };
  const handleBlur = () => {
    // if (inputValue) {
    //   setIsDropdownFocused(false);
    // }

    onHandleBlur();
  };

  const handleClick = () => {
    if (isDropdownFocused) {
      setIsDropdownFocused(false);
    } else {
      setIsDropdownFocused(true);
    }
    // console.log("Down arrow clicked");

    // if (!inputValue) {
    //   setIsDropdownFocused(true);
    //       // setIsDropdownVisible(false)

    // }
    //  else if (!isDropdownFocused && inputValue) {
    //   setIsDropdownFocused(false);
    // }
  };

  let headingDisplayed = false;

  return (
    <div className="relative bg-[#f5f6f8] w-full">
      <div className="relative flex items-center w-full border-gray-300">
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          ref={dropdownRef}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeys}
          // onClick={handleClick}
          disabled={isDisabled}
          className={` min-w-[80px] w-full pl-1 pr-4 rounded-[4px] text-[14px]  ${
            isDisabled === "true" ? "bg-white" : "bg-white"
          }  ${inputClassName} overflow-hidden overflow-ellipsis`}
        />
        {inputValue && !onDefaultInput && (
          <button
            type="button"
            className="absolute right-2  focus:outline-none"
            onClick={handleClearSelection}
          >
            <RxCross2 className="text-gray-400" />
          </button>
        )}
        {/* {!inputValue && !onDefaultInput && (
           <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 focus:outline-none" >
            <IoIosArrowDown className="text-gray-400 " />
          </button>
        )} */}
      </div>

      {/* ${(isDropdownFocused || inputValue) && !(!isDropdownFocused && !inputValue) ? "" : "hidden"} */}
      {/* ${!(!isDropdownFocused && inputValue) ? "hidden" : ""} 
      ${isDropdownFocused || inputValue  ? "" : "hidden"} */}
      {isDropdownFocused && (
        <ul
          className={` absolute z-[502] min-w-[100px] text-customblack max-h-[144px] text-[14px] h-fit overflow-auto ${
            dropdownPosition === "top" ? "bottom-full" : "top-full"
          } ${dropdownClassName}  `}
        >
          {/* this will filter out the already selected option to not to show again in the list */}
          {filteredOptions
            ?.filter((option) => option !== selectedOption)
            ?.map((option, index) => (
              <li
                key={index}
                className={` py-1 cursor-pointer rounded-[4px] whitespace-nowrap overflow-hidden overflow-ellipsis ${
                  highlightedIndex === index ? "  py-1 highlighted" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {Array.isArray(optionKey1) ? (
                  <div className="whitespace-wrap overflow-ellipsis px-2 ">
                    {!headingDisplayed && (
                      <h4
                        className="font-semibold mb-1 flex justify-between item-center "
                        style={{ whiteSpace: "pre" }}
                      >
                        <span>SKU</span>
                        <span>DESCRIPTION</span>
                        <span>OH QTY</span>
                      </h4>
                    )}
                    <div
                      className={`flex items-start justify-between  gap-2 hover:bg-gray-300 py-1 ${
                        highlightedIndex === index ? "highlighted" : ""
                      } `}
                    >
                      {optionKey1.map((key, keyIndex) => (
                        <span key={keyIndex} className={` `}>
                          {option[key]?.length > 11
                            ? option[key].substring(0, 11) + "..."
                            : option[key]}
                          {keyIndex !== optionKey1.length - 1 && (
                            <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                          )}
                        </span>
                      ))}
                    </div>
                    {(headingDisplayed = true)}
                  </div>
                ) : (
                  <div className="col whitespace-wrap overflow-ellipsis hover:bg-gray-300 py-1 px-1">
                    {option[optionKey1]?.length > 20
                      ? option[optionKey1].substring(0, 20) + "..."
                      : option[optionKey1]}
                  </div>
                )}
              </li>
            ))}
          {/* this is working code but already selection option wont be cancel from the dropdown */}
          {/* {filteredOptions.map((option, index) => (
    <li
      key={index}
      className={`px-3 py-1 cursor-pointer hover:bg-customGray rounded-[4px] whitespace-nowrap overflow-hidden overflow-ellipsis ${
        highlightedIndex === index ? "bg-customGray px-3 py-1 rounded-[4px]" : ""
      }`}
      onClick={() => handleOptionClick(option)}
  
    >
      {Array.isArray(optionKey1) ? (
        optionKey1.map((key, keyIndex) => (
          <span key={keyIndex}>
            {option[key]}{keyIndex !== optionKey1.length - 1 && " "}
          </span>
        ))
      ) : (
        <span>{option[optionKey1]}</span>
      )}
    </li>
  ))} */}
          {filteredOptions.length <= 0 && isCreateOption && (
            <li
              className="px-3 py-1 cursor-pointer rounded-[4px] whitespace-nowrap overflow-hidden overflow-ellipsis bg-customGray"
              onClick={() => handleCreateNewOption(inputValue)}
            >
              {/* Create "{inputValue}" */}
              Create &quot;{inputValue}&quot;
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

// method to use
// const options = [
//   {id:0,
//   SUPPLIER:"CL - Nutranex",
//   VEN_ID:"NC3016",
// },
//  {id:1,
//   SUPPLIER:"Magnesium 2030",
//   VEN_ID:"NC4017",
// },
//  {id:2,
//   SUPPLIER:"Magnesium 2230",
//   VEN_ID:"NC5018",
// },
//  {id:3,
//   SUPPLIER:"Magnesium 2430",
//   VEN_ID:"NC6019",
// },
//  {id:4,
//   SUPPLIER:"Nutranex",
//   VEN_ID:"NC7016",
// },
//  {id:5,
//   SUPPLIER:"Pakistani-Supplier",
//   VEN_ID:"NC8016",
// },
// {id:6,
//   SUPPLIER:"Ncat",
//   VEN_ID:"NC8016",
// },
// ]

// const [selectedOption, setSelectedOption] = useState(null);
// const [newOption, setNewOption] = useState(null);

// const dropdownRef = useRef(null);

//  const handleCreateNewOption = (newOption) => {
//     setNewOption(newOption)
//     // console.log("checking new option on click parent", newOption);
//   }

//   const handleSelectedOptionChange = (option) => {
//     setSelectedOption(option);
//         console.log("checking selected value on click parent",option)
//   };

// const handleOnFocus = () => {

// }
// const handleOnBlur = () => {

// }

// const handleRefocusDropdown = () => {
//   if( dropdownRef.current){
//       dropdownRef.current.focus();
//       // alert("parent side focus dropdown pressed")
//   }
//   };

// after return()

// <Dropdown  options={options}  optionKey1="SUPPLIER" optionKey2="VEN_ID" showValue="" onSelectedOptionChanged ={handleSelectedOptionChange} onNewOption={handleCreateNewOption} placeholder="+ Lot" inputClassName="w-[200px] focus:outline-customLightBlue hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="w-[200px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "m" isDisabled={false} onClearInputValue={false} onHandleFocus = {handleOnFocus} onHandleBlur = {handleOnBlur} onDefaultInput = ""  forwardedRef={dropdownRef} />
//  <button onClick={handleRefocusDropdown}>Refocus Dropdown</button>

// or
{
  /* <Dropdown  options={options} optionKey1={["id","SUPPLIER" ,"Email"]} optionKey2="VEN_ID" onSelectedOptionChanged ={handleSelectedOptionChange} placeholder="+ Add product" inputClassName="w-[100px] focus:outline-customLightBlue hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal" dropdownClassName="w-[100px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "  customFocusKey = "m" isDisabled={false} onClearInputValue={false} onHandleFocus = {handleOnFocus} onHandleBlur = {handleOnBlur} onDefaultInput = ""  forwardedRef={dropdownRef} 
        /> */
}
