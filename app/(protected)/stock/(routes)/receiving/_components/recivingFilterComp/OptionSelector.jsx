
import React, { useState } from "react";

const OptionSelector = ({list, onChangeFun, listName, selectedItem = "", propertyName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    //setSearchTerm(e.target.value);
    onChangeFun(e.target.value)
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    //setSearchTerm(option);
    onChangeFun(option)
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={selectedItem}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder={listName}
        className="w-full py-2 px-4 rounded border focus:outline-none focus:border-0 cursor-pointer"
      />
      {isOpen && (
        <ul className="absolute left-0 right-0 max-h-32 overflow-y-auto bg-white border border-gray-300 mt-1 rounded">
          {list
            .filter((option) =>
              option[propertyName].toLowerCase().startsWith(selectedItem.toLowerCase())
            )
            .slice(0, 4) // Limit to 4 options
            .map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option[propertyName])}
                className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              >
                {option[propertyName]}
              </li>
            ))}
          {list
            .filter((option) =>
              option[propertyName].toLowerCase().startsWith(selectedItem.toLowerCase())
            )
            .slice(4) // Display the rest of the options in scrollable view
            .map((option, index) => (
              <li
                key={index + 4}
                onClick={() => handleOptionClick(option[propertyName])}
                className="cursor-pointer py-2 px-4 hover:bg-gray-100"
              >
                {option[propertyName]}
              </li>
            ))}
          {list.filter((option) =>
            option[propertyName].toLowerCase().startsWith(selectedItem.toLowerCase())
          ).length === 0 && (
            <li className="py-2 px-4">No matching options</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default OptionSelector;

