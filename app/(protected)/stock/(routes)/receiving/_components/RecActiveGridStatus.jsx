import React from "react";
import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";


const RecActiveGridStatus = ({ data }) => {
    console.log("ReceivingAvtive status",data)
  return (
    <div className="w-full ">
      <div
        className={`${
          data == "RE-STOCKED" ? "bg-cyan-500" : ""
        } h-full w-full text-white flex items-center justify-center text-center`}
      >
        <Tooltip content={data}>
          <p className="py-1 text-[14px] text-white">{
            data ? data : 'hello'
          }</p>
        </Tooltip>
      </div>
    </div>
  );
};

export default RecActiveGridStatus;
