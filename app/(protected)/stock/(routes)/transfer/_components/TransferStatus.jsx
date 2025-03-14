import React, { useState } from "react";

const TransferStatus = ({ rowData, data }) => {
  //   const [loading, setLoading] = useState();
  //   console.log("RowData", rowData);
  //   console.log("Data", data);
  const action = rowData.TRANSFER_STATUS;
  const [isOpen, setIsOpen] = useState(false);

  //   const togglePopover = () => {
  //     if (action == "NEW") {
  //       setIsOpen(!isOpen);
  //     }
  //   };
  return (
    <div className="size-full relative">
      <div
        // onClick={togglePopover}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          action === "NEW"
            ? "bg-green-500"
            : action === "Completed"
            ? "bg-indigo-500"
            : action === "Void"
            ? "bg-red-500"
            : "bg-gray-500"
        }`}
      >
        <p className="text-[14px] leading-normal line-clamp-1 text-white">
          {action === "NEW"
            ? "New"
            : action === "Completed"
            ? "Completed"
            : action === "Void"
            ? "Void"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default TransferStatus;
