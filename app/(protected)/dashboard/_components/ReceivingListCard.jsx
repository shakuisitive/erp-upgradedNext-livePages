import React from 'react'
import Image from 'next/image'
function ReceivingList() {
  return (
    <div className='flex flex-col'>
      {/* header */}
      <div className="flex items-center justify-between w-[90%]  m-auto py-2">
        <div className="flex items-center gap-2">
          <div className="w-[3.2rem] h-[3.2rem] p-2  border rounded-md bg-white border-gray-500 ">
            <Image width='auto' height='auto' className="" src="/icons/recevinglist-icon.png" alt="" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Receiving List</h1>
            <p className="font-base text-[15px] bg-green">320 Orders</p>
          </div>
        </div>
        <div className='p-2 text-center rounded-lg border bg-gray-50  cursor-pointer'>
          <p className="text-blue-600  ">Show More</p>
        </div>
      </div>
        {/* down rows */}
     <div className='w-[97%] h-[350px] m-auto bg-gray-200 rounded-xl shadow-md'>
    
      <div className="flex items-center justify-between w-[90%]  m-auto">
       
      </div>
    </div>
    </div>
  )
}

export default ReceivingList