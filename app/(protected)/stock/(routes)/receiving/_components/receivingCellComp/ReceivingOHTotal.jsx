import React from 'react'
import { useSelector } from 'react-redux';

const ReceivingOHTotal = ({rowData}) => {
  const subGridCellTData = useSelector((state) => state.receivingSlices.subGridCellTData);
  return (
    <div className='w-full h-full  flex justify-center items-center text-[14px] text-customblack'>
     {subGridCellTData?.OhT}
  </div>
  )
}

export default ReceivingOHTotal;