import React from 'react'
import { useSelector } from 'react-redux';

const SubGridLCostF = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridLCost);

let round = Math.round(parseInt(subGridTotal))

  return (
    <div className='flex justify-center items-center  size-full text-[13px]    text-customblack leading-[37px]'>
   
    <div className=' w-[70px]'>$ <span className='  '> {round}.00</span></div>
   
 </div>
  )
}

export default SubGridLCostF