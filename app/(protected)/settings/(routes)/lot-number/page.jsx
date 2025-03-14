import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const LotNumberBody = dynamic(
  () => import("../lot-number/_components/lotNumberMainGrid/LotNumberBody"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="lot-number"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <LotNumberBody />
      </div>
    </div>
  );
};

export default page;
