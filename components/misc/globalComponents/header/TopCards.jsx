import React from "react";
import { useSelector } from "react-redux";

function TopCards({ pClassName }) {
  const dashboardPurgroTotal = useSelector(
    (state) => state.dashboardSlice.dashboardPurgroTotal
  );

  return (
    <div
      className={`rounded-lg shadow-lg bg-[#fff] z-20 w-[500px] overflow-auto absolute h-[350px] ${pClassName} grid grid-cols-2 gap-5 p-4`}
    >
      {dashboardPurgroTotal?.map((item, index) => (
        <div className="flex items-center gap-4" key={index}>
          <span
            className="w-[35px] h-[35px] rounded-md flex items-center text-white justify-center"
            style={{ backgroundColor: item.COLOR_CODE }}
          ></span>
          <div className="flex flex-col gap-1 items-start">
            <p className="m-0 text-xs font-medium">{item.CODE}</p>
            <small className="text-xs text-gray-400">{item.DESCRIPTION}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopCards;
