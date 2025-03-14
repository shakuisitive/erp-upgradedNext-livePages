'use client';
import InfoAlert from "./infoPopup";
import { useState } from "react";

function InfoBtn (){

    const [showInfoAlert, setShowInfoAlert] = useState(false);

    const handleInfoButtonClick = () => {
        setShowInfoAlert(true);
    };

    const handleCloseInfoButtonClick = () => {
        setShowInfoAlert(false);
    };
    return (
        <div>
            <button onClick={handleInfoButtonClick}>Show Info Alert</button>
            {showInfoAlert &&
                <div className='rounded-3xl border bg-white w-72 my-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <InfoAlert />
                    <button onClick={handleCloseInfoButtonClick} className='rounded-3xl bg-blue-400 text-white px-12 py-2 uppercase font-bold my-6'>Ok</button>
                </div>
            }
        </div>
    )
}
export default InfoBtn;