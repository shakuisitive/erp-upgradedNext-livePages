"use client";

import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";

import React, { useState, useEffect } from "react";
// import ModalOpen from '../../../../../../components/misc/GridTable/ModalOpen'
import useApiFetch from "../../../../../../customHook/useApiFetch";

function AudtLogGrid() {
  const [data, setData] = useState();
  const [errorM, setErrorM] = useState();

  let [error, sendRequest] = useApiFetch();

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
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
  console.log("data", data);

  const [head, sethead] = useState([
    { title: "Date Time", Wid: 220, date: true },
    { title: "Message", Wid: 450 },
    { title: "User", Wid: 250 },
  ]);

  const [row, setRow] = useState([
    {
      DateTime: "2023 jan 02",
      Message: "Stock Order has been created from Receiving: REC000473",
      User: "test user",
    },
  ]);
  const payload = {
    data: {
      INVSTO_ID: 281142.0,
      OFFSET: "",
    },
    action: "InventoryWeb",
    method: "GetAuditLog",
    type: "rpc",
    tid: "144",
  };
  return (
    <div className=" bg-white min-h-[50%]">
      <GridTable head={head} row={row} sethead={sethead} />
    </div>
  );
}

export default AudtLogGrid;
