import React from "react";

const PurchaseExpireGrid = ({ rowData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  };

  const isExpired =
    rowData.EXPIRY_DATE && new Date(rowData.EXPIRY_DATE) < new Date();

  return (
    <div
      className={`w-full h-full flex justify-center items-center text-[14px] ${
        isExpired ? " text-red-600" : "text-customblack"
      }`}
    >
      {rowData?.EXPIRY_DATE && formatDate(rowData?.EXPIRY_DATE)}
    </div>
  );
};

export default PurchaseExpireGrid;
