import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaStore } from "react-icons/fa6";

function OrdersCard() {
  return (
    <div className="flex flex-col ">
      {/* header */}
      <div className="flex items-center justify-between w-[93%] m-auto py-4">
        <div>
          <p className="text-2xl font-bold">Orders</p>
        </div>
        <div className="text-2xl font-bold cursor-pointer p-2 border bg-gray-50 rounded-lg">
          <BiDotsHorizontalRounded />
        </div>
      </div>
      {/* down */}
      <div className="flex flex-col w-[95%]  m-auto rounded-xl bg-gray-200 h-[350px] py-3">
        {/* buttons */}
        <div>
          <div className="flex items-center justify-center gap-4 w-[60%] m-auto">
            <button className="flex items-center justify-between p-2 gap-2 hover:text-blue-800 bg-blue-500 text-white rounded-sm">
              <FcSalesPerformance /> Sales Order
            </button>
            <button className="flex items-center justify-between p-2 gap-2 hover:text-blue-800">
              <BiSolidPurchaseTag className="text-green-900" /> Purchase Order
            </button>
            <button className="flex items-center justify-between p-2 gap-2 hover:text-blue-800">
              <FaStore /> Stocks Order
            </button>
          </div>
          <hr className="border-1 w-[90%] border-gray-400 mx-auto my-3" />
        </div>
      </div>
    </div>
  );
}

export default OrdersCard;
