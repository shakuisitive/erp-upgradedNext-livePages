import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const ShippingBoxBody = dynamic(
  () => import("./_components/MainListing/ShippingBoxBody"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Shipping Box"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <ShippingBoxBody />
      </div>
    </div>
  );
};

export default page;
