import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const VendorBody = dynamic(
  () => import("./_components/vendorMainGrid/VendorBody"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div className=" h-[88vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Vendor"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>

      <div className="overflow-auto  grow w-full ">
        <VendorBody />
      </div>
    </div>
  );
};

export default page;
