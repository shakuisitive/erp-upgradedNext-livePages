import React from "react";

const CustomerType = ({ rowData }) => {
  //   console.log("customer status", rowData);

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Y":
        return "bg-[#FFDB58]";
      case "N":
        return "bg-[#D1D5DB]";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${getBackgroundColor(
          rowData?.MASS_CUSTOMER_FLAG
        )} h-full w-full text-white flex items-center justify-center text-center`}
      >
        <p className="py-1 text-[14px] text-white">
          {rowData?.MASS_CUSTOMER_FLAG == "Y" ? "Mass" : "Prepaid"}
        </p>
      </div>
    </div>
  );
};

export default CustomerType;
