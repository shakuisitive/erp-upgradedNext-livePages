"use client";

import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";

import React, { useState, useEffect } from "react";
// import ModalOpen from '../../../../../../components/misc/GridTable/ModalOpen'
import useApiFetch from "../../../../../../customHook/useApiFetch";
import { useSelector } from "react-redux";
import DateandTime from './../../../../../../components/misc/globalComponents/activitylog/DateandTime';
import User from './../../../../../../components/misc/globalComponents/activitylog/User';
import Message from './../../../../../../components/misc/globalComponents/activitylog/Message';

function StockActivityLog() {
  const [data, setData] = useState([]);
  const [errorM, setErrorM] = useState();

  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  let stockOrderFormDataId = useSelector((state) => state.stockSlices.stockOrderFormDataId);

  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  // console.log("data", data);

  const colapsfuncComp = () => {};
  const selectedRow = (index, data) => {
    // console.log('check slected row Data and index' , index , data);
  };
  const handleCheckboxChange = (rowI, rowData) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const arr = data?.Result.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };

        return obj;
      });

      setCheckedItems(arr);
    } else if (rowData == "all" && checkedAll == true) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        // Remove the item if it's already checked
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI && item.rowData !== rowData
          )
        );
      } else {
        // Add the item if it's not checked
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };
  const [head, sethead] = useState([
    { title: "", slector: "", Wid: 0 },
      {
        title: "Date Time",
        slector: "DATES",
        customComp : DateandTime,
        Wid: 150,
      },
      {
        title: "Message",
        slector: "MESSAGE",
        customComp : Message,
        Wid: 120,
      },
      {
        title: "User",
        slector: "USERNAME",
        customComp: User,
        Wid: 120,
      },
  ]);

  const [row, setRow] = useState([
    {
      DateTime: "04/18/2024",
      Message: "Stock Order has been created from Receiving: REC000473",
      User: "admin",
    },
    {
      DateTime: "04/18/2024",
      Message: "Stock Order has been created from Receiving: REC000473",
      User: "admin",
    },
  ]);

  const payload = {
    data: {
      SOURCEORASEQ: stockOrderFormDataId,
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      USER_NAME: "admin",
      USE_ID: "2694",
    },
    action: "InventoryWeb",
    method: "GetAuditLog",
    type: "rpc",
    tid: "144",
  };
  function getAllTask(data) {
    setData(data.Result);
    // console.log("this is data in inner grid", data.Result.Table1);
    setErrorM(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
  return (
    <div className=" bg-white h-full">
      <GridTable
        head={head}
        row={data}
        sethead={sethead}
        GridTitle="Activity"
        GridColor="green-400"
        colaps={colaps}
        setColaps={setColaps}
        colapsfunc={colapsfuncComp}
        addButton={false}
        isChecked={checked}
        handleCheckboxChange={handleCheckboxChange}
        selectedRow={selectedRow}
      />
    </div>
  );
}

export default StockActivityLog;
