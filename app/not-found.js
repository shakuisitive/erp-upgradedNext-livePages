

import React from "react";
import Link from "next/link";

export default function NotFound() {

  return (
    <div className="flex flex-col ">
      <div
        className="flex  flex-col  bg-cover h-[90vh] bg-[url('/error/bg1.jpg')]  bg-norepeat p-10 sm:p-30"
      
      >
        <h1
          className="text-[80px] md:text-[150px] font-extrabold text-dark-70 mt-15"
        
        >
          404
        </h1>
        <p className="text-xl font-light">
          OOPS! Something went wrong here
        </p>
        <Link href='/' className="text-blue-600">Return Home</Link>
      </div>
    </div>
  );
}

