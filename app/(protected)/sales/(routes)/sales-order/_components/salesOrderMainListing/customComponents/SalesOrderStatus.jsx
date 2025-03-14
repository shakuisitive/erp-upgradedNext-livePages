import React from "react";
// import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const SalesOrderStatus = ({ rowData }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case "NEW":
        return "bg-[#4ade80]";
      case "Ready to Pick":
        return "bg-[#FF0000]";
      case "Dispatched":
        return "bg-[#4ade80]";
      case "Void":
        return "bg-[#FF0000]";
      case "INCOMPLETE":
        return "bg-[#FF0000]";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${getBackgroundColor(
          rowData?.SO_CURRENT_STATUS
        )} h-full w-full text-white flex items-center justify-center text-center`}
      >
        <p className="py-1 text-[14px] text-white">
          {rowData?.SO_CURRENT_STATUS === "NEW"
            ? "NEW"
            : rowData?.SO_CURRENT_STATUS === "Ready to Pick"
            ? "Ready to Pick"
            : rowData?.SO_CURRENT_STATUS === "Dispatched"
            ? "Dispatched"
            : rowData?.SO_CURRENT_STATUS === "Void"
            ? "Void"
            : rowData?.SO_CURRENT_STATUS === "INCOMPLETE DATA"
            ? "INCOMPLETE"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default SalesOrderStatus;
