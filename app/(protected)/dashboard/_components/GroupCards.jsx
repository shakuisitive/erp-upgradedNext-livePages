import React from "react";
export default function GroupCard() {
  return (
    <div className="flip-card rounded-xl cursor-pointer   border-pink-400 border">
  <div className="flip-card-inner">
    <div className="flip-card-front bg-gray-50 rounded-xl items-center flex justify-center  ">
    <div><p className="font-samibold  my-2">EXPIRING/FOR DISPOSAL</p> </div>
    </div>
    <div className="flip-card-back rounded-xl bg-slate-200 flex items-center flex-col justify-center text-gray-700">
    <p className="font-light text-sm mt-1 ">(19.5 to 60 month left)</p>
    <p className="font-semibold text-lg my-2">177,283</p>
    </div>
  </div>
</div>
  );
}
