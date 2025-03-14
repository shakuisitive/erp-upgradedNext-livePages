import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const UoWBody = dynamic(() => import("./_components/uowMainGrid/UoWBody"), {
  ssr: false,
});
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col">
      <div className="h-fit">
        <MainHeader
          heading="UOW"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        {/* <PMMainTab/> */}
        <UoWBody />
      </div>
    </div>
  );
};

export default page;
