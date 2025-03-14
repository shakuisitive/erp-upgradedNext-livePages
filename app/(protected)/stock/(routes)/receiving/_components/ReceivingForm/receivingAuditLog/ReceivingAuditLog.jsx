"use client";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import GridTable from '../../../../../../../../components/misc/pureComponents/GridTable/GridTable'
import RAuditLogDateAndTime from './RAuditLogDateAndTime';
import RAuditLogMessage from './RAuditLogMessage';
import RAuditLogUser from './RAuditLogUser'


const ReceivingAuditLog = () => {
  const [colaps, setColaps] = useState(false);
  const [row, setRow] = useState([]);
  const [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  
  const detailData = useSelector( (state) => state.receivingSlices.receivingDetails);

  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;

  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    {
      title: "Date Time",
      slector: "DATES",
      customComp: RAuditLogDateAndTime,
      Wid: 150,
    },

    {
      title: "Message",
      slector: "MESSAGE",
      Wid: 120,
      customComp: RAuditLogMessage,
    },

    {
      title: "User",
      slector: "USERNAME",
      Wid: 120,
      customComp: RAuditLogUser,
    },
  ]);
 

  const payloadDetails = {
    data: {
      SOURCEORASEQ: detailData?.INVREC_ID,
      USE_ID: '2694',
      USER_NAME: 'admin',
      RNUM_FROM: "1",
      RNUM_TO: "100000",
    },
    action: "FieldOrderWeb",
    method: "GetAuditLog",
    type: "rpc",
    tid: "144",
  };

  const getProdectDetailResR = (data) => {
    if (data) {
      setRow(data);
    }
  };

  useEffect(() => {
    if (detailData) {
      sendRequest(baseUrl, "POST", payloadDetails, getProdectDetailResR, token);
    }
  }, [detailData]);

  const colapsfunc = () => {
    if (colaps) {
      setColaps(false);
    } else {
      setColaps(!colaps);
    }
  };
  const checked = (rowI, rowData) => {
    return checkedItems.some(
      (item) => item.rowI === rowI && item.rowData === rowData
    );
  };

  const handleCheckboxChange = (rowI, rowData, data) => {
    if (rowData == "all" && checkedAll == false) {
      setCheckedAll(true);
      const data = arr?.Result?.map((SData, i) => {
        let obj = {};
        obj = { rowI: i, rowData: SData };
        //console.log("obj", obj);

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
  return (
    <>
      <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
        <div className="">
          <GridTable
            head={head}
            row={row?.Result}
            setHead={setHead}
            // onCloseMode={onCloseMode}
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
    </>
  );
};

export default ReceivingAuditLog;
