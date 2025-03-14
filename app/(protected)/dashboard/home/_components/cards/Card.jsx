import React from "react";
import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
// bg-[#f6d5d9]
const Card = ({ title, change, chart, activeQty, amount, ...props }) => {
  return (
    <div
      className={`w-[28%] md:w-[28%] lg:w-[28%] xl:w-[28%] 2xl:w-[28%] 2xl:h-[17.7vw] lgdesktop:w-[29%] lgdesktop:h-[17.3vw] lgdesktop:p-[10px] xl:h-[17.7vw] md:h-[17.7vw] md:text-[12px]  shadow-lg lg:h-[17.7vw]   rounded-md`}
    >
      <div className=" flex flex-col  items-start md:py-[13px] md:px-[10px] h-full justify-between lg:px-[30px] lg:py-[20px] ">
        <div className="flex flex-col">
          <p className=" xl:text-xl 2xl:text-2xl lg:text-lg lgdesktop:text-3xl md:text-[14px] font-bold text-sky-600">
            {title}
          </p>
          <span className="xl:text-sm 2xl:text-lg lg:text-xs lgdesktop:text-lg text-xs text-gray-400">
            {activeQty}
          </span>
        </div>
        {chart === "lineChart" ? <LineChart /> : <BarChart />}
        <div className="flex flex-col">
          <p className=" text-sm text-gray-800 font-semibold">
            <span className=" text-sm xl:text-2xl 2xl:text-3xl lg:text-2xl lgdesktop:text-5xl font-semibold">
              $
            </span>
            <span className=" xl:text-4xl 2xl:text-[55px] lgdesktop:text-6xl lg:text-4xl md:text-2xl font-semibold">
              {amount}
            </span>
            <span className=" text-sm xl:text-sm lg:text-sm lgdesktop:text-3xl font-semibold">
              +
            </span>
          </p>
          <span className="text-xs xl:text-sm md:text-[10px] 2xl:text-[16px] lg:text-sm lgdesktop:text-lg font-semibold">
            {change} this Week
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
