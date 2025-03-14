import React from "react";
import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const DiscountGroupBody = dynamic(
  () => import("./_components/discountGMainListing/DiscountGBody"),
  {
    ssr: false,
  }
);

const DiscoutGroup = () => {
  return (
    <div className=" h-[88vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Discount Group"
          ptext="Welcome to contacts board! here you can store manage all of your contacts"
        />
      </div>

      <div className="overflow-auto  grow w-full ">
        <DiscountGroupBody />
      </div>
    </div>
  );
};

export default DiscoutGroup;
