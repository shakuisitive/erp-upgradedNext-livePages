import React from 'react'
import { useSelector } from 'react-redux';

const ReceivingQTotal = ({rowData}) => {
  const subGridCellTData = useSelector((state) => state.receivingSlices.subGridCellTData);
  return (
    <div className='w-full h-full  flex justify-center items-center text-[14px] text-customblack'>
     {subGridCellTData?.QtyR}
  </div>
  )
}

export default ReceivingQTotal