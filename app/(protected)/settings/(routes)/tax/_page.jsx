import React from "react"
import dynamic from "next/dynamic";
import  Taxform from "./_components/taxForm/taxform";
import Modal from "../../../../../components/misc/pureComponents/modal/Modal";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const TaxBody = dynamic(() => import("./_components/taxBody"), {
  ssr: false,
});
const page = () => {
  return (
    <div className=" h-[88vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Tax Rules"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
   
    

      <div className="overflow-auto  grow w-full ">
    
        <TaxBody />
        {/* <Taxform/> */}
      </div>
    </div>
  );
};

export default page;
