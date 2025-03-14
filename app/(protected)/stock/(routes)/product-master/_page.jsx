"use client";
import React from "react";
import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const PMBody = dynamic(
  () => import("./_components/PMMainGrid/productmastermaingrid/PMBody"),
  { ssr: false }
);

const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Product Master"
          ptext="Welcome to Produt Master! here you can create and manage new products and kits"
        />
      </div>
      <div>
        <PMBody />
      </div>
    </div>
  );
};

export default page;
