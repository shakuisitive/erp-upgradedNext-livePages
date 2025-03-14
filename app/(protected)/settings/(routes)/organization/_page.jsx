"use client";
import React from "react";

import dynamic from "next/dynamic";
const MainHeader = dynamic(
  () =>
    import(
      "../../../../../components/misc/pureComponents/mainHeader/MainHeader"
    ),
  { ssr: false }
);
const OrganizationBody = dynamic(
  () =>
    import(
      "./_components/organizationMainGrid/organizationmaingrid/OrganizationBody"
    ),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div className=" h-[93vh]  flex flex-col ">
      <div className="h-fit">
        <MainHeader
          heading="Organization"
          ptext="Welcome to contacts board! here you can store manage all of your contacts "
        />
      </div>
      <div>
        <OrganizationBody />
      </div>
    </div>
  );
};

export default page;
