import React from "react";
import Image from "next/image";
function TopSelling() {
  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between w-[93%]  m-auto py-2">
        <div className="flex items-center gap-2">
          <div className="w-[3.2rem] h-[3.2rem] p-2  border rounded-md border-gray-500 ">
            <Image width='auto' height='auto' className="" src="/icons/top-selling.webp" alt="" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Top Selling Products</h1>
            <p className="font-base text-[15px] bg-green">Last Month</p>
          </div>
        </div>
      </div>
      {/* bottom container */}
      <div className="w-[97%] h-[350px] m-auto bg-gray-200 rounded-xl">

      </div>
    </div>
  );
}

export default TopSelling;
