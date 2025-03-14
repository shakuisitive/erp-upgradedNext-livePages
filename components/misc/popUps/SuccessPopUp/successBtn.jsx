'use client';
import SuccessAlert from "./successPopup";
import { useState } from "react";

function SuccessBtn (){

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleSuccessButtonClick = () => {
        setShowSuccessAlert(true);
    };

    const handleCloseSuccessButtonClick = () => {
        setShowSuccessAlert(false);
    };
    return (
        <div>
            <button onClick={handleSuccessButtonClick}>Show Success Alert</button>
            {showSuccessAlert &&
                <div className='rounded-3xl border bg-white w-72 my-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <SuccessAlert />
                    <button  onClick={handleCloseSuccessButtonClick} className='rounded-3xl bg-green-400 text-white px-12 py-2 uppercase font-bold my-6'>Done</button>
                </div> 
            }
        </div>
    )
}
export default SuccessBtn;