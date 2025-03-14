import React from 'react'

const PurchaseGridUom = ({rowData}) => {
  return (
    <div className='w-full h-full flex justify-center items-center text-[14px] text-customblack'>
       {rowData?.REORDERING_UOM == null ? 'EA' : rowData?.REORDERING_UOM}
    </div>
  )
}

export default PurchaseGridUom