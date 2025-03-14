import React from "react";

import dynamic from "next/dynamic";

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const CustomerBody = dynamic(
  () => import("./_components/customerMainGrid/CustomerBody"),
  { ssr: false }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Customer"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <CustomerBody />
      </div>
    </div>
  );
};

export default page;
