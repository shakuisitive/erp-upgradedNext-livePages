import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { SlRefresh } from "react-icons/sl";
// import PurchaseFilter from "../../../app/(protected)/stock/(routes)/purchase/_components/globalComp/PurchaseFilter"

const GridFilter = ({ setIsOpen, handleFilter, FilterComp }) => {
  const [filterState, setFilterState] = useState([]);
  const [reset, setReset] = useState(false);
  // console.log('filter state in filter' , filterState);
  const filterStart = () => {
    if (filterState) {
      //   dispatch(gridFilter(filterState))
      setIsOpen(null);
      handleFilter(filterState);
      // console.log('filter state hai bhai');
    } else {
      // console.log('filter state nhi  hai bhai');
    }
  };

  const Comp = FilterComp;

  const handleRest = () => {
    setFilterState({});
    setReset(true);
  };

  // console.log('check reset' , reset);
  return (
    <div className="">
      <div className="flex justify-between items-center mb-8 ">
        <p className=" font-medium leading-[22px] text-[#323338] text-[16px] ">
          Filter Orders
        </p>
        <div className="flex justify-center">
          <div className="flex border rounded-full px-3 bg-white overflow-hidden items-center w-fit border-[#d0d4e4]">
            <input
              className="px-3 py-4 w-[550px]"
              placeholder="Search here"
              type="text"
            />
            <IoIosSearch className="text-[30px]" />
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div onClick={handleRest} className="flex gap-2">
            <p className="text-gray-400 text-[14px] mb-5 mt-5  ">Reset</p>
            <SlRefresh className="text-[20px] text-customIcon ml-4 mb-5 mt-5" />
          </div>
          <button
            onClick={filterStart}
            className={` border border-[#d0d4e4]  ${
              filterState ? "text-customblack" : "text-[#d0d4e4]"
            } py-1 h-fit px-3 rounded-md `}
          >
            Apply Filter
          </button>
        </div>
      </div>

      <Comp
        filterState={filterState}
        setFilterState={setFilterState}
        reset={reset}
        setReset={setReset}
      />
    </div>
  );
};

export default GridFilter;
