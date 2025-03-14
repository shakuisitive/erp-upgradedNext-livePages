'use client';
import { useState } from "react";
import DangerAlert from "./dangerPopup";
function DangerBtn() {
    const [showDangerAlert, setShowDangerAlert] = useState(false);

    const handleDangerButtonClick = () => {
        setShowDangerAlert(true);
    };

    const handleCloseDangerButtonClick = () => {
        setShowDangerAlert(false);
    };
    return (
        <div>
            <button onClick={handleDangerButtonClick}>Show Danger Alert</button>

               {showDangerAlert &&
                <div className='rounded-3xl border bg-white w-72 my-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <DangerAlert />
                    <button onClick={handleCloseDangerButtonClick} className='rounded-3xl bg-red-400 text-white px-12 py-2 uppercase font-bold my-6'>try again</button>
                </div>
            }
        </div>
    )
}
export default DangerBtn;