import React from 'react'

const SubPurchaseUomF = ({rowData }) => {
  return (
    <div className='flex justify-center items-center h-full w-full text-[14px] text-customblack'>
        {rowData?.REORDERING_UOM == null ? 'EA' : rowData?.REORDERING_UOM}</div>
  )
}

export default SubPurchaseUomF