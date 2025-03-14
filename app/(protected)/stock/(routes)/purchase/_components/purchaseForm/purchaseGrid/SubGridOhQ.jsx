import React from 'react'
import { useSelector } from 'react-redux';

const SubGridOhQ = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridOhT);

  return (
    <div className='w-full h-full flex justify-center items-center text-[14px] text-customblack'>
     {!subGridTotal > 0 ? 0 : subGridTotal}
  </div>
  )
}

export default SubGridOhQ