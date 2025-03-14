import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const WarehouseBody = dynamic(
  () => import("./_components/warehouseMainListing/WarehouseBody"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Warehouse"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <WarehouseBody />
      </div>
    </div>
  );
};

export default page;
