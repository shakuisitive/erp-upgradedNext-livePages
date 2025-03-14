import React from "react";
// import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const SubHeadStatus = ({ rowData }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Y":
        return "bg-[#4ade80]";
      case "N":
        return "bg-[#EF5350]";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${getBackgroundColor(
          rowData?.ACTIVE_FLAG
        )} h-full w-full text-white flex items-center justify-center text-center`}
      >
        {/* <Tooltip content={data}> */}
        <p className="py-1 text-[14px] text-white">
          {rowData?.ACTIVE_FLAG == "Y" ? "Active" : "Inactive"}
        </p>
        {/* </Tooltip> */}
      </div>
    </div>
  );
};

export default SubHeadStatus;
