import React from "react";
import { useSelector } from "react-redux";

const formatCurrency = (number) => {
  const [integerPart, decimalPart] = number.toFixed(2).split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedInteger}.${decimalPart}`;
};

const PMGridCost = () => {
  const rowData = useSelector((state) => state.pmSlices.partList);
  const activeItems = rowData.filter((item) => item.ACTIVE_FLAG === "Y");
  const sumOH = rowData.reduce(
    (total, item) => total + (item.STANDARD_COST || 0),
    0
  );

  const formattedSumOH = `$${formatCurrency(sumOH)}`;

  return (
    <div className="text-[14px] text-customblack font-medium py-2">
      {formattedSumOH}
    </div>
  );
};

export default PMGridCost;
