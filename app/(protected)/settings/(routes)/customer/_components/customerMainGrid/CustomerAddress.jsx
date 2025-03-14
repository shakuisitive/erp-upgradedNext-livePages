import React from "react";
import Tooltip from "../../../../../../../components/misc/pureComponents/GridTable/GridTooltip";

const CustomerAddress = ({ rowData }) => {
  //   console.log("rowData check ", rowData);
  const address = rowData.ADDRESS_1;
  const city = rowData.CITY;
  const province = rowData.PROVINCE;
  const postalCode = rowData.POSTAL_CODE;

  const fullAddress = `${address} ${city} ${province} ${postalCode}`;

  return (
    <div>
      <div className="flex justify-center items-center line-clamp-1 h-full px-2 w-full text-[14px] text-customblack">
        <Tooltip content={fullAddress}>
          <div className="h-full">
            <p className="line-clamp-1">{fullAddress}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default CustomerAddress;
