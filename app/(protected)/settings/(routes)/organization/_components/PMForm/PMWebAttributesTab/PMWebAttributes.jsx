import React, { useState } from 'react'
import PMAttributeLeft from './Header/PMAttributeLeft';
import PMAttributeRight from './Header/PMAttributeRight';
import {
    IoIosArrowDown,
    IoIosArrowUp,
} from "react-icons/io";
const PMCost = () => {
    const [isHeader, setIsHeader] = useState(true);
    const [isHeader1, setIsHeader1] = useState(true);

    return (
        <div className="">
            <div className="ml-[58px] my-4">
                <button
                    className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                    onClick={() => setIsHeader(!isHeader)}
                >
                    {isHeader ? (
                        <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                    ) : (
                        <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                    )}
                    Header
                </button>
            </div>
            {isHeader && (
                <div className="ml-10 ">
                    <div className="flex px-4 mr-2 gap-4 desktop:flex-row tablet:flex-col">
                        <div className="w-1/2 tablet:w-full">
                            <PMAttributeLeft />
                        </div>
                        <div className="w-1/2 tablet:w-full">
                            <PMAttributeRight />
                        </div>
                    </div>
                </div>
            )}
             <div className="ml-[58px] my-4">
                <button
                    className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                    onClick={() => setIsHeader1(!isHeader1)}
                >
                    {isHeader ? (
                        <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                    ) : (
                        <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                    )}
                    Additional Tabs
                </button>
            </div>
            {isHeader1 && (
                <div className="ml-10 ">
                    <div className="flex px-4 mr-2 gap-4 desktop:flex-row tablet:flex-col">
                        <div className="w-1/2 tablet:w-full">
                            <PMAttributeRight />
                        </div>
                        <div className="w-1/2 tablet:w-full">
                            <PMAttributeRight />
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default PMCost
