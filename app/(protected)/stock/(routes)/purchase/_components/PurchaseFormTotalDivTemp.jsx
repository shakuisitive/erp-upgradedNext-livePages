import React from 'react'
import { CiCalculator2 } from 'react-icons/ci'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux';

const PurchaseFormTotalDivT = () => {
    const subGridTotal = useSelector((state) => state.PurchaseSlices.subGridTotal);

    let round = Math.round(parseInt(subGridTotal))
  return (
    <div className=' bg-white w-full  rounded-[4px] text-customblack text-[14px] border border-gray-300 p-2'>
        <div className='flex py-2 hover:text-customblue'>
        <div className='w-2/4 flex  '><CiCalculator2 className=' w-[18px] h-[18px] text-[18px] mr-2'/>Sub :</div>
            <div className='w-2/4 text-[16px] text-right'>$ {round}</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
        <div className='w-2/4 flex '><IoDocumentTextOutline className=' w-[18px] h-[18px] text-[18px] mr-2'/>Tax :</div>
            <div className='w-2/4 text-[16px] text-right'>$ 305.5</div>
        </div>
        <div className='flex py-2 hover:text-customblue '>
            <div className='w-2/4' >Tottal</div>
            <div className='w-2/4 text-[16px] text-right' >$ 1235.5</div>
        </div>
        </div>
  )
}

export default PurchaseFormTotalDivT