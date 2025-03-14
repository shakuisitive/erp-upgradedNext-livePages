import React from "react";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const GridPagination = ({ pageCount, handlePagination, title, totalRow }) => {
  const [num, setNum] = useState(1);
  const [numT, setNumT] = useState(25);

  useEffect(() => {
    setNumT(pageCount);
    setNum(1);
  }, [pageCount]);
  useEffect(() => {
    if (num) {
      if (handlePagination) {
        handlePagination(num, numT, title);
      }
    }
  }, [num, numT]);

  const setFor = () => {
    let number = num == 1 ? pageCount : num + +pageCount;
    setNumT(+numT + +pageCount);
    setNum(number);
  };
  const setBack = () => {
    if (num > 1) {
      let numberb = +num - +pageCount;
      if (numberb < 1) {
        setNum(1);
        setNumT(+numT - +pageCount);
      } else {
        setNum(numberb);
        setNumT(+numT - +pageCount);
      }
    }
  };
  return (
    <div className="flex text-[14px] text-customblack pl-5 my-1">
      {num}-{numT} of {totalRow ? totalRow : "4000"}
      <div className="flex justify-between w-[50px] ml-3 items-center text-[18px] ">
        <div onClick={setBack} className="cursor-pointer">
          <IoIosArrowBack />
        </div>
        <div onClick={setFor} className="cursor-pointer">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default GridPagination;
