import React from "react";
import Image from "next/image";
function Promotions() {
  return (
    <div>
      {/* header header  */}
      <div className="flex items-center justify-between w-[93%]  m-auto py-2">
        <div className="flex items-center gap-2">
          <div className="w-[3.2rem] h-[3.2rem] p-2  border rounded-md border-gray-500 ">
            <Image width='auto' height='auto' className="" src="/icons/promotion-icon.png" alt="" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Promotions</h1>
            <p className="font-base text-[15px] bg-green">Total:32</p>
          </div>
        </div>
        <div className='p-2 text-center rounded-lg border bg-gray-50  cursor-pointer'>
          <p className="text-blue-600  ">Show More</p>
        </div>
      </div>
     <div className="w-[97%] h-[350px] m-auto bg-gray-200 rounded-xl shadow-md">
      {/* down rows */}
      <div className="flex items-center w-[90%]  m-auto  justify-between ">
        <div className="flex items-center justify-between my-1 w-[100%] py-2 border-b-2 border-gray-300">
          <div className="flex flex-col">
            <p className="font-bold text-base">test pr</p>
            {/* date */}
            <p className="font-light text-base">2023-12-11 - 2026-12-12</p>
          </div>
          <div>
            <p className="font-bold text-base">10%</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Promotions;
