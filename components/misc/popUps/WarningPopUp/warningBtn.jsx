'use client';
import WarningAlert from "./warning";
import { useState } from "react";

function WarningBtn (){
    const [showWarnAlert, setShowWarnAlert] = useState(false);
    const handleWarnButtonClick = () => {
        setShowWarnAlert(true);
    };

    const handleCloseWarnButtonClick = () => {
        setShowWarnAlert(false);
    };
    return (
        <div>
          <button onClick={handleWarnButtonClick}>Show Warning Alert</button>

          {showWarnAlert &&
                <div className='rounded-3xl border bg-white w-72 my-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <WarningAlert />
                    <button onClick={handleCloseWarnButtonClick} className='rounded-3xl bg-yellow-400 text-white px-12 py-2 uppercase font-bold my-6'>Ok</button>
                </div>
            }
        </div>
    )
}
export default WarningBtn;