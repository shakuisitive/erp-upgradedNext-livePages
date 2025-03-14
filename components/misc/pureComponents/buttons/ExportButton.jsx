import React from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const ExportButton = ({ onClick, label }) => {
    return (
        <button
            className="flex items-center font-semibold space-x-2 bg-indigo-100 hover:bg-indigo-400 text-indigo-500 hover:text-white py-2 px-4 rounded gap-2"
            onClick={onClick}
        >
            <span className="text-lg"><MdOutlineKeyboardArrowDown /></span>
            {label}
        </button>
    );
};

export default ExportButton;

// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <ExportButton label="Cancel" onClick={handleClick}/>