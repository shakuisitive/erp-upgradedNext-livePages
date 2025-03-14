import React from "react";
import dynamic from "next/dynamic";
// import GlBody from "./_components/glMainlisting/glBody";

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const ChartBody = dynamic(
  () => import("./_components/ChartBody"),
  { ssr: false }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Chart Of Account"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <ChartBody />
      </div>
    </div>
  );
};

export default page;
