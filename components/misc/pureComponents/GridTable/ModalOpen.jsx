// import React from 'react'
"use client";
// import { BiMessageSquareAdd } from "react-icons/bi";
// import CustomModal from "../../custommodal/CustomModal";
// import PurchaseForm from "../../../../app/(protected)/stock/(routes)/purchase/_components/PurchaseForm";
// import { GoHome } from "react-icons/go";

import React, { useState, useEffect } from "react";
import { GrExpand } from "react-icons/gr";

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className=" h-fit ">
      {isTooltipVisible && (
        <div className="absolute z-10 bg-gray-600 text-white w-fit max-w-fit p-2 rounded-md text-sm shadow-lg -mt-16">
          <div>{content}</div>
        </div>
      )}
      <div
        className=" cursor-pointer  "
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onClick={() => setTooltipVisible(false)}
      >
        {children}
      </div>
    </div>
  );
};

function ModalOpen({ data, length, child, Modall, rowIndex, Drawer }) {
  let Comp = Modall;
  let [index, setIndex] = useState();

  useEffect(() => {
    setIndex(rowIndex);
  }, [data]);

  return (
    <div className=" group  flex justify-between w-full text-[14px]   pl-2 items-center">
      <div className="flex">
        {data?.length > 10 ? (
          <Tooltip content={data}>
            <div className="h-full">
              <p
                className={`line-clamp-1 ${
                  data.length > 20 ? "line-clamp-1" : ""
                }`}
              >
                {data.length > 10 ? `${data.slice(0, 10)}...` : data}
              </p>
            </div>
          </Tooltip>
        ) : (
          <span>{data}</span>
        )}
        <span
          className={`ml-2 ${
            length === 0 || (length === undefined && child) ? "hidden" : ""
          } bg-gray-300 text-gray-500 flex w-[20px]  text-[12px]  justify-center items-center rounded-sm `}
        >
          {length}
        </span>{" "}
      </div>
      <div className="flex h-full items-center">
        {Drawer && <Drawer index={index} />}
        <Tooltip content="Start conversation">
          <div className=" flex items-center h-full px-4  pt-2 pb-2 border-l ">
            {Comp && <Comp index={index} />}
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default ModalOpen;
