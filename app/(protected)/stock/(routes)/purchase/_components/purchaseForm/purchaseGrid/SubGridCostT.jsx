import React from 'react';
import { useSelector } from 'react-redux';

const SubGridCostT = () => {
    const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridCostT);

    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(subGridTotal);

    return (
        <div className=' min-w-[70px] w-full h-full flex justify-center items-center text-[14px] text-customblack'>
           Avg : {formattedTotal}
        </div>
    );
};

export default SubGridCostT;
