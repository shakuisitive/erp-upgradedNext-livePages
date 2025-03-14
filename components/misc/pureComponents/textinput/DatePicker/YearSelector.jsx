import React, { useState } from "react";
import * as dateFns from "date-fns";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const YearSelector = ({ selectedYear, onChange, isYearsVisible, setIsYearsVisible, setIsMonthsVisible, isMonthsVisible }) => {
  // Function to handle year change
  const handleYearChange = (year) => {
    const newYear = parseInt(year);
    onChange(newYear); // Notify parent component about the change
    setIsYearsVisible(!isYearsVisible);
  };

  const toggleVisibility = () => {
    setIsYearsVisible(!isYearsVisible);
    isMonthsVisible == true &&  setIsMonthsVisible(false)
  };

  // Generate an array of years (you can adjust the range as needed)
  const years = Array.from(
    { length: 21 },
    (_, index) => selectedYear - 5 + index
  );

  return (
    <div>
      {/* <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select> */}
      <div
        className="flex justify-center items-center gap-2 border p-1 rounded-sm"
        onClick={() => toggleVisibility()}
      >
        <span className="w-[30px]">{selectedYear}</span>
        {isYearsVisible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      {isYearsVisible && (
        <div className="absolute px-[10px] pb-[10px] z-10 bottom-0 right-0 mt-0 h-[14rem] bg-white rounded-ee-lg w-[226px] animate-slide-in-right">
          <div className="grid grid-cols-3 gap-4">
            {years.map((year, index) => (
              <button onClick={() => handleYearChange(year)} key={index}>{year}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearSelector;
