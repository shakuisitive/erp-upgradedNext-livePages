import React from "react";
import Tooltip from "./../../../../../../components/misc/pureComponents/tooltip/Tooltip";

const PurchaseVendorDetail = ({ data }) => {
  return (
    <div>
      <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
        <Tooltip content={data}>
          <div className="h-full">

          <p className="line-clamp-1">{data}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default PurchaseVendorDetail;
