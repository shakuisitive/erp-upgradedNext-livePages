import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";

const PermissionGridTable = () => {
  return (
    <div className="w-full flex flex-col mb-4">
      <div className="w-full flex justify-between rounded-tl-lg border-r border-y border-y-[#d0d4e4] border-r-[#d0d4e4] border-l-4 border-l-green-400 p-2">
        <div class="flex items-center">
          <input
            type="checkbox"
            value=""
            className="cursor-pointer"
          />
          <p className="text-[14px] text-customblack ml-2">Button</p>
        </div>
        <p className="text-[14px] text-customblack mr-2">View</p>
      </div>
      <div className="w-[calc(100%-4px)] flex justify-between border-x border-b border-b-[#d0d4e4] border-x-[#d0d4e4] p-2 ml-1 ">
        <div class="flex items-center">
          <input
            type="checkbox"
            value=""
            className="cursor-pointer"
          />
          <p className="text-[14px] text-customblack ml-2"></p>
        </div>
        <p className='text-[14px] leading-normal  line-clamp-1 text-green-500 mr-2'><FaCheck /></p>
      </div>
      <div className="w-[calc(100%-4px)] flex justify-between border-x border-b border-b-[#d0d4e4] border-x-[#d0d4e4] p-2 ml-1 ">
        <div class="flex items-center">
          <input
            type="checkbox"
            value=""
            className="cursor-pointer"
          />
          <p className="text-[14px] text-customblack ml-2"></p>
        </div>
        <p className='text-[14px] leading-normal  line-clamp-1 text-green-500 mr-2'><FaCheck /></p>
      </div>
      <div className="w-[calc(100%-4px)] flex justify-between border-x border-b border-b-[#d0d4e4] border-x-[#d0d4e4] p-2 ml-1 ">
        <div class="flex items-center">
          <input
            type="checkbox"
            value=""
            className="cursor-pointer"
          />
          <p className="text-[14px] text-customblack ml-2"></p>
        </div>
        <p className='text-[14px] leading-normal  line-clamp-1 text-green-500 mr-2'><FaCheck /></p>
      </div>
    </div>
  );
};

export default PermissionGridTable;
