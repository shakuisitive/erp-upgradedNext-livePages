import React, { useState, useEffect } from "react";
import ModalOpen from "../../../../../../components/misc/GridTable/ModalOpen";
import GridTable from "../../../../../../components/misc/GridTable/GridTable";
import useApiFetch from "../../../../../../customHook/useApiFetch";

const ReceivingInnerGrid = () => {
  const [data, setData] = useState();
  //     const [row, setRow] = useState([
  // ])
  const [head, setHead] = useState([
    { title: "Lot", slector: "LOT_NUMBER", Wid: 250, customComp: ModalOpen },
    { title: "Expiry", slector: "EXPIRY_DATE", Wid: 250 },
    { title: "SKU", slector: "SKU_MANUFACTURE", Wid: 100 },
    { title: "Description", slector: "DESCRIPTION", Wid: 250 },
    { title: "OhQty", slector: "QTY_ONHAND", Wid: 120 },
    { title: "OrderQty", slector: "QTY_ORDERED", Wid: 120 },
    // { title: 'CaseReceived',slector:'', Wid: 100 },
    { title: "CaseUOM", slector: "UOM_ID_REORDERING", Wid: 120 },
    { title: "CaseQty", slector: "", Wid: 120 },
    // { title: 'QtyReceieved',slector:'', Wid: 120 },
    { title: "BO", slector: "BO_QUANTITY", Wid: 120 },
  ]);

  let [error, sendRequest] = useApiFetch();

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetRecieving`;

  const payload = {
    data: {
      INVREC_ID: "116212",
      OFFSET: "+5:00",
    },
    action: "InventoryWeb",
    method: "GetRecieving",
    type: "rpc",
    tid: "144",
  };

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNjkzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiZXhwIjoxNzA5NTUxODIyLCJpc3MiOiJwcmVjaXNldGVjLmNhIiwiYXVkIjoicHJlY2lzZXRlYy5jYSJ9.IdBhRM9Zsb4etJu-VN197_iKovHuKIBUaKkWJVamXHU";

  function getAllTask(data) {
    setData(data);
    // console.log('this is inner api data: ' , data);
    setErrorMessage(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  return (
    <div className="">
      <GridTable row={data?.Result.Table1} head={head} setHead={setHead} />
    </div>
  );
};

export default ReceivingInnerGrid;
