"use client";
import React, { useState } from "react";
// import DashbordNav from "./_components/DashbordNav";
// import TabsNav from "../../../components/misc/landingNavebar/TabsNav";
import Card from "./_components/cards/Card";
import LeftNavbarContent from "./_components/leftNavbarContent/LeftNavbarContent";
import Catagory from "./_components/catagories/Catagory";
import ProductList from "./_components/productList/ProductList";
import RightSideContent from "./_components/rightSideContent/RightSideContent";

const chartCardData = [
  {
    title: "Sales",
    activeQty: "20 Active",
    chart: "lineChart",
    amount: "550",
    change: "28%",
  },
  {
    title: "Purchase",
    activeQty: "15 Active",
    chart: "barChart",
    amount: "556",
    change: "12%",
  },
  {
    title: "Returns",
    activeQty: "2 Active",
    chart: "lineChart",
    amount: "550",
    change: "28%",
  },
];

function page() {
  const [currButton, setCurrButton] = useState("T-Shirt");
  const token = true;
  return (
    <div className="flex w-full flex-1  md:pt-[15px] md:pl-[8px] lgdesktop:px-[40px]   xl:pt-[25px] xl:px-[10px] 2xl:pr-[20px] 2xl:pl-[15px] lg:px-[20px] lg:pt-[18px]">
      <div className=" overflow-y-auto  lg:w-[18%]  md:w-[19%] xl:w-[22%] md:pr-[10px] ">
        <LeftNavbarContent />
      </div>
      {/* Main Content */}
      <div className="w-[50%] lg:w-[60%] xl:w-[53%] xl:gap-[40px] md:w-[55%] md:gap-[20px] flex flex-col lgdesktop:gap-4">
        <div className="flex [&>*:nth-child(odd)]:bg-[rgb(246,213,217)] [&>*:nth-child(even)]:bg-[#bee3f2]  w-full  md:px-0 px-10 md:gap-2  justify-evenly">
          {chartCardData.map(
            ({ title, activeQty, chart, amount, change, ...props }) => {
              return (
                <Card
                  title={title}
                  activeQty={activeQty}
                  chart={chart}
                  amount={amount}
                  change={change}
                />
              );
            }
          )}
        </div>
        <div className="w-full ">
          <Catagory currButton={currButton} setCurrButton={setCurrButton} />
          {currButton === "T-Shirt" && <ProductList />}
          {currButton === "Gaming" && "Gaming"}
          {currButton === "Shoes" && "Shoes"}
          {currButton === "Watch" && "Watch"}
          {currButton === "Gloves" && "Gloves"}
        </div>
      </div>
      <div className="w-[25%] lg:w-[22%]  md:w-[26%] xl:w-[25%] overflow-y-auto ">
        <RightSideContent />
      </div>
    </div>
  );
}

export default page;
