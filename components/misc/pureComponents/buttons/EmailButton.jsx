import React from 'react';
import { FaTelegramPlane } from "react-icons/fa";



const EmailButton = ({ onClick, label }) => {
    return (
        <button
            className="flex items-center space-x-2 bg-cyan-200 hover:bg-cyan-400 text-cyan-600 hover:text-white font-semibold py-2 px-4 rounded gap-2"
            onClick={onClick}
        >
            <span className="text-lg"><FaTelegramPlane /></span>
            {label}
        </button>
    );
};

export default EmailButton;

// ********************Method to call************
// const handleClick = () => {
//    console.log("Cancel Button Clicked");
//   };
// <EmailButton label="Cancel" onClick={handleClick}/>
