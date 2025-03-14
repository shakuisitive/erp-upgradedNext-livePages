import React from "react";
import { CiSearch } from "react-icons/ci";
function FormGridHeader() {
  return (
    <div className="flex justify-between items-center w-[90%]">
      <div className="flex items-center gap-2">
        {/* 1st button */}
        <button className="px-3 text-white font-semibold py-2 bg-[#007f9b] border border-white rounded-md ">+ New Count</button>
         {/* div structure */}
         <div className="flex ">
          <div className="w-[3px] h-[32px] bg-green-400">
            
          </div>
         </div>
      </div>
      <div>
        {/* 1st button */}
        <div className="flex items-center gap-1 px-1 py-2 hover:bg-gray-100 cursor-pointer rounded-sm">
        <CiSearch/>  <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default FormGridHeader;
