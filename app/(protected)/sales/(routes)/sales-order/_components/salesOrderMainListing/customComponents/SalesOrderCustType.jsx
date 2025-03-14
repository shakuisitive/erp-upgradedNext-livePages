import React from "react";
// import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const SalesOrderCustType = ({ rowData }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Y":
        return "bg-[#0dc5cb]";
      case "N":
        return "bg-[#a29da3]";
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
        {/* <Tooltip content={data}> */}
        <p className="py-1 text-[14px] text-white">
          {rowData?.MASS_CUSTOMER_FLAG == "Y" ? "Mass" : "Prepaid"}
        </p>
        {/* </Tooltip> */}
      </div>
    </div>
  );
};

export default SalesOrderCustType;
