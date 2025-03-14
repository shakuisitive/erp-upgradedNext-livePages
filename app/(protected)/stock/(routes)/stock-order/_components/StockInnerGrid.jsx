"use client";

import GridTable from "../../../../../../components/misc/GridTable/GridTable";
import React, { useState, useEffect } from "react";
// import ModalOpen from '../../../../../../components/misc/GridTable/ModalOpen'
import useApiFetch from "../../../../../../customHook/useApiFetch";
function StockInnerGrid() {
  const [data, setData] = useState();
  const [errorM, setErrorM] = useState();

  let [error, sendRequest] = useApiFetch();

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;
  const [head, sethead] = useState([
    { title: "Location", slector:'LOCATION', Wid: 250 },
    { title: "Lot", slector:"LOT_NUMBER", Wid: 120 },
    { title: "Expiry",slector:"EXPIRY_DATE", Wid: 120, date: true },
    { title: "MTH", Wid: 120 },
    { title: "Name",slector:"DESCRIPTION", Wid: 120 },
    { title: "OH Qty", slector:"QTY_ONHAND", Wid: 120 },
    { title: "Qty Recd", slector:"QTY_RECEIVED", Wid: 120 },
    { title: "Stock Qty", slector:'QTY_ONHAND1', Wid: 120 },
    { title: "SUK", slector:"SKU_MANUFACTURE", Wid: 120 },
    
  ]);
  const payload = {
    data: {
      INVSTO_ID: 281142.0,
      OFFSET: "",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  };
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNjkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiZXhwIjoxNzA5NTc0MTAyLCJpc3MiOiJwcmVjaXNldGVjLmNhIiwiYXVkIjoicHJlY2lzZXRlYy5jYSJ9.98afPFcw_qh1Y-U_jyDGGQ2Rj4GRZduB1rpAP7CwpJk";

  function getAllTask(data) {
    setData(data);
    // console.log("this is data in inner grid", data.Result.Table1);
    setErrorM(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  // console.log("data", data);

  // const [row, setRow] = useState([
  //   {
  //     Location: "00-00-00-00",
  //     Lot: "po00067",
  //     Expiry: "2023 jan 02",
  //     MTH: "123",
  //     Name: "XTF",
  //     OHQty: "222",
  //     QtyRecd: "12",
  //     StockQty: "234",
  //     Split: "",
  //   },
  // ]);
  return (
    <div>
      <GridTable head={head} setHead={sethead} row={data?.Result.Table1} />
    </div>
  );
}

export default StockInnerGrid;
