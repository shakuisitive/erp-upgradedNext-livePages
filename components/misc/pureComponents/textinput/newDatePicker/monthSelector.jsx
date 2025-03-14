"use client";

import React, { useState } from "react";
import * as dateFns from "date-fns";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const MonthSelector = ({ selectedMonth, onChange, setIsMonthsVisible, isMonthsVisible, isYearsVisible, setIsYearsVisible }) => {
  // Function to handle month change
  const handleMonthChange = (month) => {
    const newMonth = parseInt(month);
    onChange(dateFns.setMonth(selectedMonth, newMonth - 1)); // Notify parent component about the change
    setIsMonthsVisible(!isMonthsVisible);
};

  // Generate an array of month names
  const months = dateFns.eachMonthOfInterval({
    start: dateFns.startOfYear(selectedMonth),
    end: dateFns.endOfYear(selectedMonth),
  });

  const toggleVisibility = () => {
    setIsMonthsVisible(!isMonthsVisible);
    isYearsVisible == true &&  setIsYearsVisible(false)
  };

  return (
    <div>
      <div
        className="flex justify-center items-center gap-2 border p-1 rounded-sm"
        onClick={() => toggleVisibility()}
      >
        <span className="w-[65px]">{dateFns.format(selectedMonth, "MMMM")}</span>
        {isMonthsVisible ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      {isMonthsVisible && (
        <div className="absolute px-[10px] pb-[10px] z-10 bottom-0 right-0 mt-0 h-[14rem] bg-white rounded-ee-lg w-[226px] animate-slide-in-right">
          <div className="grid grid-cols-3 gap-4">
            {months.map((month, index) => (
              <button onClick={() => handleMonthChange(dateFns.getMonth(month) + 1)} className="h-10" key={index}>{dateFns.format(month, "MMM")}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthSelector;
