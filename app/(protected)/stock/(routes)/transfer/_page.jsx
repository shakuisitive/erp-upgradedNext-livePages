"use client";
import React from "react";
import dynamic from "next/dynamic";

const TransferBody = dynamic(() => import("./_components/TransferBody"), {
  ssr: false,
});

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  {
    ssr: false,
  }
);
function page() {
  return (
    <div className="h-[93vh]  flex flex-col">
      <div className="h-fit">
        <MainHeader heading="Transfer" ptext="This is an example text " />
      </div>
      <div className="overflow-auto grow w-full ">
        <TransferBody />
      </div>
    </div>
  );
}

export default page;
