import React from 'react'

const PurchaseFGridTotal = ({data , rowData}) => {
    // console.log('check rowData in total' , rowData);

    let total = rowData.QUANTITY * rowData.COST

    let round = Math.round(total)
  return (
    <div className='flex justify-center items-center h-full w-full text-[14px] text-customblack'>
           <div className=' w-[80px]'>$ <span className=''>{round}.00</span></div>
    </div>
  )
}

export default PurchaseFGridTotal