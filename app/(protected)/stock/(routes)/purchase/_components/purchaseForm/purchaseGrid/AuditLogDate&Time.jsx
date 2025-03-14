import React from "react";

const AuditLogDateAndTime = ({ rowData }) => {

  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeFormat = hours >= 12 ? "PM" : "AM";

    return `${year}-${month}-${day} / ${hours}:${minutes} ${timeFormat}`;
  };

  return (
    <div className="flex ml-2 items-start h-full w-full text-[14px] text-customblack">
      {formatDateAndTime(rowData?.DATES)}
    </div>
  );
};

export default AuditLogDateAndTime;
