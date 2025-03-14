import React from 'react'
import { useSelector } from 'react-redux';

const SubGridCostT = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridCostT);

  const round = Math.round(subGridTotal)
  return (
    <div className='w-full h-full flex justify-center items-center text-[14px] text-customblack'>
      $ {!subGridTotal > 0 ? 0 : `${round}.00`}
    </div>
  )
}

export default SubGridCostT