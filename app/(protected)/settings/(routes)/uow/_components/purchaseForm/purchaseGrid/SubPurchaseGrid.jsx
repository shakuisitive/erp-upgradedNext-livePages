import React from 'react'

const SubPurchaseGrid = (rowData) => {
  
  const caseVal = rowData?.QUANTITY / rowData?.CONVERSION_INTO_STOCKING_UOM;
  const roundValue = Math.round(caseVal)
  return (
    <div className='flex justify-center items-center text-[14px] text-customblack h-full'>
      {roundValue}.00
    </div>
  )
}

export default SubPurchaseGrid