import React from 'react'
import { useSelector } from 'react-redux';

const SubGridLCostF = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridLCost);


  return (
    <div className='flex justify-center items-center  size-full text-[13px]    text-customblack leading-[37px]'>
   
    <div className=' min-w-[70px] w-full'>Avg : $<span className=' '>{parseFloat(subGridTotal).toFixed(2)}</span></div>
   
 </div>
  )
}

export default SubGridLCostF