import React from 'react'
// import  DashboardNav from "../../../../../components/misc/landingNavebar/DashboardNav";
// import PaymentTermBody from './_components/PaymentTermBody';

import dynamic from 'next/dynamic'

const TaxBody = dynamic(
  ()=> import("./_components/taxBody") , 
  {
    ssr : false
  }
)

const DashboardNav = dynamic(
  ()=> import("./_components/header/taxHeader") , 
  {
    ssr : false
  }
)
const page = () => {
  return (
    <div className=" h-[88vh]  flex flex-col ">

<div className="h-fit">
      <DashboardNav heading="Tax" ptext="Welcome to contacts board! here you can store manage all of your contacts "/>
      </div>

      <div className="overflow-auto  grow w-full ">
        
      <TaxBody/>
      </div>

    </div>
  )
}

export default page