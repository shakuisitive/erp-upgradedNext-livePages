import React from "react";
import { useSelector } from "react-redux";

const OHqty = ({ rowData, data }) => {
  const subData = useSelector((state) => state.TransferSlice.subData);
  console.log(subData, "check subData");

  //   const difference = subData.product.map((item, index) => {
  //     item.ONHAND_QTY_FROM - item.QUANTITY;
  //   });
  //   console.log("subData", subData);

  return (
    <div>
      <p>{/* <p>{difference}</p> */}</p>
    </div>
  );
};

export default OHqty;
