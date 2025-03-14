import React from "react";
// import Tooltip from "../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const PMGridType = ({ rowData }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Y":
        return "bg-[#f59e0b]";
      case "N":
        return "bg-[#14b8a6]";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div
        className={`${getBackgroundColor(
          rowData?.NON_STOCK_ITEM_FLAG
        )} h-full w-full text-white flex items-center justify-center text-center`}
      >
        {/* <Tooltip content={data}> */}
        <p className="py-1 text-[14px] text-white">
          {rowData?.NON_STOCK_ITEM_FLAG == "Y" ? "Non Stock" : "Stock"}
        </p>
        {/* </Tooltip> */}
      </div>
    </div>
  );
};

export default PMGridType;
