import React from "react";
import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
import { useSelector } from "react-redux";

const Card = () => {
  const purchaseList = useSelector(
    (state) => state.dashboardSlice.purchaseList
  );
  const saleList = useSelector((state) => state.dashboardSlice.saleList);
  const saleReturn = useSelector((state) => state.dashboardSlice.saleReturn);

  const totalCostSum = purchaseList?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.TOTAL_COST;
  }, 0);

  function formatNumber(num) {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    }
    return num?.toString();
  }
  const formattedToShort = formatNumber(totalCostSum);

  const totalSalesOrderSum = saleList?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.SALE_ORDER_TOTAL;
  }, 0);
  const totalSalesOrderRSum = saleReturn?.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.SALE_RETURN_TOTAL;
  }, 0);

  const formattedTotalSalesOrder = totalSalesOrderSum?.toLocaleString();
  const formattedTotalSalesROrder = totalSalesOrderRSum?.toLocaleString();

  return (
    <div className="flex  items-center xl:justify-between gap-2 md:gap-5  md:px-5 flex-col md:flex-row">
      <div className="flex flex-col w-full   bg-[#f6d5d9] shadow-lg py-8 px-3 rounded-md">
        <div className=" flex flex-col items-start justify-center gap-4 pl-3">
          <div className="flex flex-col">
            <p className=" text-lg font-bold text-gray-700">Sales</p>
            <span className=" text-xs text-gray-400">
              {saleList[0]?.TOTALROW} Active
            </span>
          </div>
          <LineChart />
          <div className="flex flex-col">
            <p className=" text-sm font-semibold">
              <span className=" text-sm font-semibold">$</span>
              <span className=" text-2xl font-bold">
                {formattedTotalSalesOrder}
              </span>
              <span className=" text-sm font-semibold">+</span>
            </p>
            <span className="text-xs font-semibold">28% this Week</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3  w-full bg-[#bee3f2] shadow-lg py-8 px-3 rounded-md ">
        <div className="flex flex-col items-start justify-center gap-4 pl-3">
          <div className="flex flex-col">
            <p className=" text-lg font-bold text-gray-700">Purchase</p>
            <span className=" text-xs text-gray-400">
              {purchaseList[0]?.TOTALROW} Active
            </span>
          </div>
          <BarChart />
          <div className="flex flex-col">
            <p className=" text-sm font-semibold">
              <span className=" text-sm font-semibold">$</span>
              <span className=" text-2xl font-bold">{formattedToShort}</span>
              <span className="text-xs font-semibold">+</span>
            </p>
            <span className="text-xs font-semibold">28% this Week</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-3 w-full bg-[#f6d5d9] shadow-lg py-8 px-3 rounded-md">
        <div className="flex flex-col items-start justify-center gap-4 pl-3">
          <div className="flex flex-col">
            <p className=" text-lg font-bold text-gray-700">Returns</p>
            <span className=" text-xs text-gray-400">
              {saleReturn[0]?.TOTALROW} Active
            </span>
          </div>
          <LineChart />
          <div className="flex flex-col">
            <p className=" text-sm font-semibold">
              <span className=" text-sm font-semibold">$</span>
              <span className=" text-2xl font-bold">
                {formattedTotalSalesROrder}
              </span>
              <span className=" text-sm font-semibold">+</span>
            </p>
            <span className="text-xs font-semibold">28% this Week</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
