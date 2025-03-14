import React, { useState } from "react";
import UseInput from "../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";

const PeriodLeftForm = ({
    fiscalYear,
    setfiscalYear,
    startDate,
    setstartDate,
    endDate,
    setendDate,
    closingDate,
    setClosingDate,
    isError,
    setIsError,
}) => {
    const [isYearSelected, setIsYearSelected] = useState(false);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, index) => currentYear + index);

    const [selectedYear, setSelectedYear] = useState("");

    const handleYearChange = (event) => {
        const year = event.target.value;
        setSelectedYear(year);
        setIsYearSelected(true);

        // Set the start date to 1st of the current month in the selected year
        const currentMonth = new Date().getMonth(); // Get current month (0-based index)
        const startOfYear = new Date(year, currentMonth, 1); // Set date to 1st day of the selected year and current month
        setstartDate(startOfYear.toISOString().split("T")[0]); // Format to YYYY-MM-DD

        // Set the end date to December 31st of the selected year
        const endOfYear = new Date(year, 11, 31); // Set month to December (11), and day to 31st
        setendDate(endOfYear.toISOString().split("T")[0]); // Format to YYYY-MM-DD
    };

    const handleStartDate = (e) => {
        setstartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setendDate(e.target.value);
    };

    const handleCloseDate = (e) => {
        setClosingDate(e.target.value);
    };

    return (
        <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-20 tablet:w-full">
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Select Year: 
                </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="bg-white w-full border border-gray-300 focus:outline-none focus:border-0 py-[8px] pl-[12px]"
                >
                    <option value="">Select a Year</option>
                    {years.map((year) => (
                        <option
                            className="bg-white border border-gray-300 mt-1 rounded"
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="businessName">
                    Start Date<span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col">
                    <input
                        value={startDate}
                        className={isYearSelected ? "w-full focus:outline-none focus:unset border-b py-2 px-3" : "text-grey-400 border-red-500 w-full focus:outline-none focus:unset border rounded bg-dark-600 py-2 px-3"}
                        type="date"
                        disabled={!isYearSelected}
                        onChange={handleStartDate}
                    />
                    {/* Display error message if needed */}
                    {!startDate && isError && (
                        <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                            <FaCircleInfo />
                            <span className="text-red-500 ">Start Date Already Exist</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="businessName">
                    End Date
                </label>
                <div className="flex flex-col">
                    <input
                        value={endDate}
                        className={isYearSelected ? "w-full focus:outline-none focus:unset border-b py-2 px-3" : "text-grey-400 border-red-500 w-full focus:outline-none focus:unset border rounded bg-dark-600 py-2 px-3"}
                        type="date"
                        disabled={!isYearSelected}
                        onChange={handleEndDate}
                    />
                </div>
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="businessNumber">
                    Closing Date
                </label>
                <UseInput
                    type="date"
                    value={closingDate}
                    onChange={handleCloseDate}
                />
            </div>
        </div>
    );
};

export default PeriodLeftForm;
