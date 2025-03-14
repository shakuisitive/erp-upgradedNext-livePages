import React from 'react'
import { useSelector } from 'react-redux';

const SubGridNetCF = () => {
  const subGridTotal = useSelector((state) => state.PurchaseSlices.SubGridNetCostT);
  // console.log(subGridTotal, "subGridTotal")

// console.log('check Net Tottal' , subGridTotal);

  return (
    <div className='flex justify-center items-center  size-full text-[13px]    text-customblack leading-[37px]'>
   
    <div className=' w-[70px]'>$ <span className='  '> {!subGridTotal > 0 ? 0 : subGridTotal}</span></div>
   
 </div>
  )
}

export default SubGridNetCF