import React from "react";
import dynamic from "next/dynamic";
import ForexBody from "./_components/forexMainListing/forexBody";

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const ForexeBody = dynamic(
  () => import("./_components/forexMainListing/forexBody"),
  { ssr: false }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Foreign Exchange"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
       <ForexBody/>
      </div>
    </div>
  );
};

export default page;
