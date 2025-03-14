import React, { useState } from "react";

const PromotionStatus = ({ rowData, data }) => {
  //   const [loading, setLoading] = useState();
  //   console.log("RowData", rowData);
  //   console.log("Data", data);
  const action = rowData.ACTIVE_FLAG;
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    if (action == "Y") {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div className="size-full relative">
      <div
        onClick={togglePopover}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          action == "Y" ? "bg-green-400" : "bg-red-400"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {action == "Y" ? "Active" : "Inactive"}
        </p>
      </div>

      {/* {isOpen && (
        <div className=" absolute -left-[60px]  mt-2 w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
          <div className="p-4">
            <div
              onClick={handleOpenModal}
              className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-cyan-400 ${
                data == "Initiated" ? "flex" : "hidden"
              } justify-center items-center`}
            >
              Issued to Vendor
            </div>

            <div
              onClick={handleOpenModal}
              className={`cursor-pointer  my-2 p-1 w-full shadow-md text-white text-center bg-indigo-500 ${
                data == "Issued to Vendor" ? "flex" : "hidden"
              } justify-center items-center`}
            >
              Ready for Receiving
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PromotionStatus;
