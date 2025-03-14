import React from "react";
import Image from "next/image";

function LatestProductsCard() {
  return (
    <div  className="flex  flex-col">
      <div className="flex items-start justify-center my-2  py-2 flex-col">
        {/* header */}
        <div className="flex items-center justify-start w-[93%] py-2 m-auto">
          <div className="flex items-center gap-2">
            <div className="w-[3.2rem] h-[3.2rem] p-2  border rounded-md bg-white border-gray-500">
              <Image width='auto' height='auto' src="icons/new-products.png" alt="img" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Latest Products</h1>
              <p className="font-base text-[15px] bg-green">Total:32</p>
            </div>
          </div>
        </div>
        {/* botom container */}
        <div className="flex flex-col h-[800px] bg-gray-200 rounded-xl w-[95%] mx-auto py-2">
          {/* bottom rows */}
          <div className="flex items-center justify-between p-2 cursor-pointer hover:scale-95 transition-all duration-300 shadow-md w-[92%] m-auto border-dotted border-4 rounded-lg my-1 border-white bg-blue-100">
            <div>
              <p className="font-semibold">ASPRIN</p>
              <p className="font-light">123321SKU</p>
              <p className="font-extralight"> 121243334533</p>
            </div>
            <div>
              <p className="text-blue-900 font-semibold">$26.00</p>
              <p className="font-light">OH QTY</p>
              <p className="font-extralight">233</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 cursor-pointer hover:scale-95 transition-all duration-300 shadow-md w-[92%] m-auto border-dotted border-4 rounded-lg my-1 border-white bg-blue-100">
            <div>
              <p className="font-semibold">ASPRIN</p>
              <p className="font-light">123321SKU</p>
              <p className="font-extralight"> 121243334533</p>
            </div>
            <div>
              <p className="text-blue-900 font-semibold">$26.00</p>
              <p className="font-light">OH QTY</p>
              <p className="font-extralight">233</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 cursor-pointer hover:scale-95 transition-all duration-300 shadow-md w-[92%] m-auto border-dotted border-4 rounded-lg my-1 border-white bg-blue-100">
            <div>
              <p className="font-semibold">ASPRIN</p>
              <p className="font-light">123321SKU</p>
              <p className="font-extralight"> 121243334533</p>
            </div>
            <div>
              <p className="text-blue-900 font-semibold">$26.00</p>
              <p className="font-light">OH QTY</p>
              <p className="font-extralight">233</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestProductsCard;
