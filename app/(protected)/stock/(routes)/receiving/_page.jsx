"use client";
import React, { useState, useRef } from "react";
// import ReceivingGridView from "./_components/ReceivingGridView";
// import DashboardNav from "../../../../../components/misc/landingNavebar/DashboardNav";
// import Dropdown from "../../../../../components/misc/dropdown/Dropdown";
// import useKeyPress from "../../../../../customHook/useKeyPress";
import MainHeader from "../../../../../components/misc/pureComponents/mainHeader/MainHeader";
import dynamic from "next/dynamic";

const ReceivingBody = dynamic(() => import("./_components/ReceivingBody"), {
  ssr: false,
});


const ReceivingMHeader = dynamic(() =>
  import("./_components/ReceivingTopNav/ReceivingMHeader")
);

export default function Receiving() {
  


  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Receiving Order"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div className="overflow-auto grow w-full ">
        <ReceivingBody />
      </div>
    </div>
  );
}
