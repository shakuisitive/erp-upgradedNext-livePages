import React from 'react'
import {  BiSortAlt2 } from "react-icons/bi";

const GridSort = () => {
  return (
    <div className=" border cursor-pointer text-14px text-customblack hover:bg-customHover rounded-[4px] border-transparent items-center gap-2 p-1 flex">
    <BiSortAlt2 className="text-[18px] text-customIcon" />
    Sort
  </div>
  )
}

export default GridSort
