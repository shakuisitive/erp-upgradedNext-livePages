import React from "react";
import ActionColumn from "./_components/ActionColumn";
import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const SessionBody = dynamic(
  () => import("./_components/sessionMainListing/SessionBody"),
  {
    ssr: false,
  }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Session Management"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <SessionBody />
      </div>
   </div>
  );
};

export default page;
