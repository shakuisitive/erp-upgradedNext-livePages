import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
const MultiLevelCategory = ({
  options,

  onChange,
  placeholder,
  optionID,
  optionValue,
  defaultSelectedIDs = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
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
      .split(" ,")
      .map((id) => {
        return options?.find((option) => option[optionID] === parseInt(id, 10));
      })
      .filter((option) => option !== undefined);

    setSelected(initialSelected);
    onChange(initialSelected);
  }, [defaultSelectedIDs]);

  const handleSelect = (option) => {
    if (!selected.some((item) => item[optionID] === option[optionID])) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    } else {
      handleRemove(option);
    }
  };

  const handleRemove = (option) => {
    const newSelected = selected.filter(
      (item) => item[optionID] !== option[optionID]
    );
    setSelected(newSelected);
    onChange(newSelected);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const createNestedStructure = (arr) => {
    const map = {};
    const roots = [];

    arr.forEach((item) => {
      map[item[optionID]] = { ...item, children: [] };
    });

    arr.forEach((item) => {
      if (item.PARCAT_ID_PARENT) {
        map[item.PARCAT_ID_PARENT]?.children.push(map[item[optionID]]);
      } else {
        roots.push(map[item[optionID]]);
      }
    });

    return roots;
  };

  const nestedOptions = createNestedStructure(options);

  const renderOptions = (options, level = 0) => {
    return options.map((option) => (
      <div key={option[optionID]}>
        <div className="flex items-center ml-2">
          {option.children.length > 0 && (
            <span
              className="cursor-pointer mr-2"
              onClick={() => toggleExpand(option[optionID])}
            >
              {expanded[option[optionID]] ? (
                <IoIosArrowDropup />
              ) : (
                <IoIosArrowDropdown />
              )}
            </span>
          )}
          <input
            type="checkbox"
            checked={selected.some(
              (item) => item[optionID] === option[optionID]
            )}
            onChange={() => handleSelect(option)}
            className="mr-2"
          />
          <div
            className="p-2 cursor-pointer hover:bg-gray-200 flex-1"
            onClick={() => handleSelect(option)}
          >
            {option[optionValue]}
          </div>
        </div>
        {expanded[option[optionID]] && option.children.length > 0 && (
          <div className="ml-[40px]">
            {renderOptions(option.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };
  const filteredOptions = nestedOptions.filter((option) =>
    option.CODE.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <input
            type="text"
            placeholder="Search "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full border-b border-customgreen focus:outline-none"
          />
          {filteredOptions.length > 0 ? (
            renderOptions(filteredOptions)
          ) : (
            <div className="p-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiLevelCategory;

/*
method to use 
const handleCategory = (newSelectedOptions) => {
    const Ids = newSelectedOptions.map((option) => option.PARCAT_ID);
    const parcatIDString = Ids.join(" ,");
    setAssignCat(parcatIDString);

    // console.log("Selected PARCAT_IDs:", parcatIDString);
  };
<MultiLevelCategory
          options={categoryList}
          onChange={handleCategory}
          placeholder="Select Category"
          optionID="PARCAT_ID"
          optionValue="CODE"
          // defaultSelectedIDs="1020159 , 1018955"
          defaultSelectedIDs={assignCat}
        />
*/
