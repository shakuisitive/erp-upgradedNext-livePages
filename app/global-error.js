"use client";

// import { Html } from "next/document";
import React from "react";
// import { RxCross2 } from "react-icons/rx";


export default function Error({  reset }) {
  return (
    <html>
        <body>
        <h2 className="text-2xl font-samibold">Something went wrong</h2>
        <button onClick={()=>reset()} >Try Again</button>
        </body>
    </html>
  );
}

