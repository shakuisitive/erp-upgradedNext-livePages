import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const PaymentTermBody = dynamic(() => import("./_components/PaymentTermBody"), {
  ssr: false,
});

const page = () => {
  return (
    <div className=" h-[88vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Payment Term"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>

      <div className="overflow-auto  grow w-full ">
        <PaymentTermBody />
      </div>
    </div>
  );
};

export default page;
