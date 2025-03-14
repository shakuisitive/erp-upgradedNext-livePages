import React from "react";
import dynamic from "next/dynamic";

const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const ProductClassBody = dynamic(
  () => import("./_components/productClassMainListing/ProductClassBody"),
  { ssr: false }
);
const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Product Class"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <ProductClassBody />
      </div>
    </div>
  );
};

export default page;
