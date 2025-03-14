import React from "react";
// import DashboardNav from './_components/DashboardNav';
// import RAPBody from './_components/RAPBody';

import dynamic from 'next/dynamic'

const  RAPBody = dynamic(
  ()=> import("./_components/RAPBody") , 
  {
    ssr : false
  }
)

const DashboardNav = dynamic(
  ()=> import("./_components/DashboardNav") , 
  {
    ssr : false
  }
)
const page = () => {
  return (
    <div className=" h-[93vh] pb-5 flex flex-col ">
      <div className="h-fit">
        <DashboardNav
          heading="Roles & Permissions"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>

      <div className="overflow-auto  w-full ">
        <RAPBody/>
      </div>
    </div>
  );
};

export default page;
