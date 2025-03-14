import React from "react";
import dynamic from "next/dynamic";

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const BranchBody = dynamic(
  () => import("./_components/BranchMainListing/BranchBody"),
  { ssr: false }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Branch"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <BranchBody />
      </div>
    </div>
  );
};

export default page;
