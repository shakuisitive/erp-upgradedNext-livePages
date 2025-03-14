import React from 'react'
// import {SubGridDisAv} from '../redux/Purchase.slice'
import { useSelector } from 'react-redux';

const SubGridDisAv = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridDisAv);

  return (
    <div className='w-full h-full flex justify-center items-center text-[14px] text-customblack'>
       {!subGridTotal > 0 ? 0 : subGridTotal}%
        </div>
  )
}

export default SubGridDisAv