import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../customHook/useApiFetch";
import GridTable from "../../pureComponents/GridTable/GridTable";
import Message from "./Message";
import DateandTime from "./DateandTime";
import User from "./User";
const ActivityLog = ({ payloadid }) => {

  console.log(payloadid, "check payload")
  const [row, setRow] = useState([]);

  const [colaps, setColaps] = useState(false);
  const [error, sendRequest] = useApiFetch();

  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const payloadDetails = {
    data: {
      SOURCEORASEQ: payloadid,
      USE_ID: 2694,
      USER_NAME: "admin",
      RNUM_FROM: "1",
      RNUM_TO: "100000",
    },
    action: "FieldOrderWeb",
    method: "GetAuditLog",
    type: "rpc",
    tid: "144",
  };
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },
    {
      title: "Date Time",
      slector: "DATES",
      customComp: DateandTime,
      Wid: 150,
    },

    {
      title: "Message",
      slector: "MESSAGE",
      customComp: Message,
      Wid: 120,
    },
    {
      title: "User",
      slector: "USERNAME",
      customComp: User,
      Wid: 120,
    },
  ]);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const getProdectDetailResR = (data) => {
    if (data) {
      setRow(data.Result);
    }
  };
  useEffect(() => {
    if (payloadid) {
      sendRequest(baseUrl, "POST", payloadDetails, getProdectDetailResR, token);
    }
  }, [payloadid]);

  const colapsfunc = () => {
    setColaps(!colaps);
  };

  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && !checkedAll) {
      setCheckedAll(true);
      const data = row.Result.map((SData, i) => {
        return { rowI: i, rowData: SData };
      });
      setCheckedItems(data);
    } else if (rowData == "all" && checkedAll) {
      setCheckedAll(false);
      setCheckedItems([]);
    } else {
      if (checked(rowI, rowData)) {
        setCheckedItems(
          checkedItems.filter(
            (item) => item.rowI !== rowI || item.rowData !== rowData
          )
        );
      } else {
        setCheckedItems([...checkedItems, { rowI, rowData }]);
      }
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between bg-white mb-2 rounded-t-md">
      <div>
        <GridTable
          head={head}
          row={row}
          setHead={setHead}
          GridColor="#4ade80"
          GridColaps={false}
          colaps={colaps}
          setColaps={setColaps}
          colapsfunc={colapsfunc}
          addButton={false}
          isChecked={checked}
          checkBoxShow={false}
          moreOptShow={false}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default ActivityLog;
