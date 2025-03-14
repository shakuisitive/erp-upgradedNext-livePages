import React from "react";

const VendorStatus = ({ rowData }) => {
  // console.log("customer status", rowData);

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Y":
        return "bg-[#4ade80]";
      case "N":
        return "bg-[#FF0000]";
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
        <p className="py-1 text-[14px] text-white">
          {rowData?.ACTIVE_FLAG == "Y" ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default VendorStatus;
