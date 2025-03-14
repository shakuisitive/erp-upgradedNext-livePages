"use client";

import React, { useEffect, useState } from "react";
import * as dateFns from "date-fns";
import MonthSelector from "./monthSelector";
import YearSelector from "./YearSelector";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
// Assume you have created MonthSelector component

const DatePicker = ({ onDateChange, setIsDatePicker, setPastYears = 5 }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(dateFns.getYear(new Date()));
  const [selectedDate, setSelectedDate] = useState("");
  const [isMonthsVisible, setIsMonthsVisible] = useState(false);
  const [isYearsVisible, setIsYearsVisible] = useState(false);

  // Function to handle month change
  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    setSelectedMonth(dateFns.setYear(selectedMonth, newYear)); // Update selected month with the new year
  };

  const nextMonth = () => {
    const nextMonthDate = dateFns.addMonths(selectedMonth, 1);
    setSelectedMonth(nextMonthDate);
    if (dateFns.getYear(nextMonthDate) !== selectedYear) {
      setSelectedYear(dateFns.getYear(nextMonthDate));
    }
    isYearsVisible == true && setIsYearsVisible(false);
    isMonthsVisible == true && setIsMonthsVisible(false);
  };

  const prevMonth = () => {
    const prevMonthDate = dateFns.subMonths(selectedMonth, 1);
    setSelectedMonth(prevMonthDate);
    if (dateFns.getYear(prevMonthDate) !== selectedYear) {
      setSelectedYear(dateFns.getYear(prevMonthDate));
    }
    isYearsVisible == true && setIsYearsVisible(false);
    isMonthsVisible == true && setIsMonthsVisible(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateChange(dateFns.format(date, "MM/dd/yyyy"));
    setIsDatePicker(false);
  };

  // Generate the days of the selected month
  const monthStart = dateFns.startOfMonth(selectedMonth);
  const monthEnd = dateFns.endOfMonth(selectedMonth);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = [];
  let currentDate = startDate;
  while (days.length < 42) {
    // Ensure 42 days are generated
    days.push(currentDate);
    currentDate = dateFns.addDays(currentDate, 1);
    // if (dateFns.isSameDay(currentDate, monthEnd) && dateFns.getDay(currentDate) === 0) {
    //   break; // Stop if reached end of month and it's Sunday
    // }
  }

  // Render the calendar grid
  const todayDate = new Date();
  const formattedDate = dateFns.format(todayDate, "MM/dd/yyyy");
  return (
    <div className="box-border overflow-hidden  w-[226px] text-black text-xs border rounded-md bg-white shadow-lg z-30 flex-col flex justify-center items-center relative">
      {/* <div className="w-full px-[10px] rounded-sm mt-1">
        {selectedDate && (
          <div className="border p-1">Today: {dateFns.format(selectedDate, "MM/dd/yyyy")}</div>
        )}
      </div> */}
      <div className="w-full px-[10px] rounded-sm mt-1">
        <div className="border p-1">Today: {formattedDate}</div>
      </div>
      <div className="px-[10px] pt-[10px] flex justify-between items-center w-full">
        <MonthSelector
          selectedMonth={selectedMonth}
          onChange={handleMonthChange}
          isMonthsVisible={isMonthsVisible}
          setIsMonthsVisible={setIsMonthsVisible}
          isYearsVisible={isYearsVisible}
          setIsYearsVisible={setIsYearsVisible}
        />
        <YearSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onChange={handleYearChange}
          isYearsVisible={isYearsVisible}
          setIsYearsVisible={setIsYearsVisible}
          isMonthsVisible={isMonthsVisible}
          setPastYears={setPastYears}
          setIsMonthsVisible={setIsMonthsVisible}
        />
        <button onClick={prevMonth}>
          <MdArrowBackIos />
        </button>
        <button onClick={nextMonth}>
          <MdArrowForwardIos />
        </button>
      </div>
      <div className="p-[10px] w-full flex justify-center items-center">
        <div className=" h-[13.5rem] flex justify-between select-none cursor-pointer flex-col">
          <div className="flex justify-between m-2 ml-[-10px] mr-[-10px] px-[10px] py-0 bg-white">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="cursor-pointer min-w-[1.2em]">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {days.map((day, index) => {
              const isCurrentMonth = dateFns.isSameMonth(day, selectedMonth);
              const isSelected = dateFns.isSameDay(day, selectedDate);
              return (
                <div
                  key={index}
                  className={`flex justify-center items-center ${
                    !isCurrentMonth ? "text-[#aaa]" : ""
                  } ${isSelected ? "text-[#007bff]" : ""}`}
                  onClick={() => handleDateClick(day)}
                >
                  {dateFns.format(day, "d")}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
