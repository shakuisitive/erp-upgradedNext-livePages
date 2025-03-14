// import React from 'react'

const PurchaseMGridValue = ({data}) => {
 const number =  Number(data).toFixed(2)
//  // console.log('check fixed number' , number);
  return (
    <div className='flex justify-center items-center  size-full text-[13px]  text-customblack leading-[37px]'>
   
   <div className=' line-clamp-1 w-[100px]'>$ <span className='  '>{number}</span></div>
  
</div>
  )
}

export default PurchaseMGridValue