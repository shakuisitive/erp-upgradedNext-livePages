"use client";

import GridTable from "../../../../../../components/misc/pureComponents/GridTable/GridTable";

import React, { useState, useEffect } from "react";
// import ModalOpen from '../../../../../../components/misc/GridTable/ModalOpen'
import useApiFetch from "../../../../../../customHook/useApiFetch";

function AudtLogGrid() {
  const [data, setData] = useState();
  const [errorM, setErrorM] = useState();

  let [error, sendRequest] = useApiFetch();
  const [colaps, setColaps] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);


  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  function getAllTask(data) {
    setData(data);
    // console.log("this is data in inner grid", data.Result.Table1);
    setErrorM(error);
  }

  useEffect(() => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  }, []);
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

    { title: "",slector:"", Wid: 220,  },
    { title: "Date Time",slector:"DateTime", Wid: 220,  },
    { title: "Message",slector: "Message", Wid: 450 },
    { title: "User",slector:"User", Wid: 250 },
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
      INVSTO_ID: 281142.0,
      OFFSET: "",
    },
    action: "InventoryWeb",
    method: "GetAuditLog",
    type: "rpc",
    tid: "144",
  };
  return (
    <div className=" bg-white min-h-[50%] h-full">
      <GridTable head={head} row={row} sethead={sethead} GridTitle="Activity"
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

export default AudtLogGrid;
