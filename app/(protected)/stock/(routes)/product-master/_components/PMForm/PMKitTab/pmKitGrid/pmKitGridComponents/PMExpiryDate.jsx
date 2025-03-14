import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";

const PMExpiryDate = ({ rowData }) => {
 console.log('row data single', rowData)
  let date = new Date(rowData?.EXPIRY_DATE);

  let formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="w-full h-full flex justify-center items-center  text-customblack">
      {rowData?.NON_STOCK_ITEM_FLAG === "N" ? (
        <span className="text-[14px]">{formattedDate}</span>
      ) : (
        <div className="flex items-center justify-center w-full">
          <Tooltip content="non-stock item dont need expity date">
            <FaCircleInfo className=" fill-blue-700" />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default PMExpiryDate;
