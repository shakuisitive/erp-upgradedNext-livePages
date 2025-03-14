import React from "react";

const SubGridSubItem = ({ rowData }) => {
  const wDesc = rowData?.WAREHOUSE_DESC;
  const warehouse = rowData?.WAREHOUSE;

  return (
    <div>
      {warehouse} - {wDesc}
    </div>
  );
};

export default SubGridSubItem;
