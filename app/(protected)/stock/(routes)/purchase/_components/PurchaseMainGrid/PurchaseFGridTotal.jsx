import React from 'react';

const PurchaseFGridTotal = ({ data, rowData }) => {
    let total = rowData.QUANTITY * rowData.COST;

    // Formatting total as a currency string
    const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(total);

    return (
        <div className='flex justify-center items-center h-full w-full text-[14px] text-customblack'>
            <div className='w-[80px] '>{formattedTotal}</div>
        </div>
    );
};

export default PurchaseFGridTotal;
