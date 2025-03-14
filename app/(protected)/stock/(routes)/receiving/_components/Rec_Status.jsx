import React from "react";
import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const RecStatusCell = ({ data }) => {
  

    const getBackgroundColor = (status) => {
        switch (status) {
          case "IN PROCESS":
            return "bg-green-300";
          case "NEW":
            return "bg-cyan-300";
          case "Void":
            return "bg-yellow-300";
          case "RE-STOCKED":
            return "bg-indigo-300";
          case "Reversed":
            return "bg-slate-300";
          case "READY FOR RELEASE":
            return "bg-teal-300";
          default:
            return "";
        }
    };

    return (
        <div className="w-full">
            <div
                className={`${getBackgroundColor(data)} h-full w-full text-white flex items-center justify-center text-center`}
            >
                <Tooltip content={data}>
                    <p className="py-1 text-[14px] text-white">{data}</p>
                </Tooltip>
            </div>
        </div>
    );
};

export default RecStatusCell;

