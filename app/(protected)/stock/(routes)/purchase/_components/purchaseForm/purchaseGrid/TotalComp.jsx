import React from 'react';
import { useSelector } from 'react-redux';

const TotalComp = () => {
    const subGridTotal = useSelector((state) => state.PurchaseSlices.subGridTotal);

    // Formatting subGridTotal as a currency string
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(subGridTotal);

    return (
        <div className='flex justify-center items-center size-full text-[13px] text-customblack leading-[37px]'>
            <div className='w-[100%]'>Sum : {formattedTotal}</div>
        </div>
    );
};

export default TotalComp;

