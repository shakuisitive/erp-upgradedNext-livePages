import React from 'react';

const ReceivingPriority = () => {
  const data = "High";

  return (
    <div className={`w-full flex items-center justify-center ${data === "High" ? "bg-red-400" : data === "Issued to Vendor" ? "bg-cyan-400" : data === "NEW" ? "bg-zinc-400" : data === "Void" ? "bg-yellow-400" : data === "RE-STOCKED" ? "bg-indigo-500" : data === "Reversed" ? "bg-slate-500" : ""}`}>
      <p className='text-[14px] text-white'>{data}</p>
    </div>
  );
};

export default ReceivingPriority;
