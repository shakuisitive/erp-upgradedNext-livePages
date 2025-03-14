"use client";
import React, { useEffect, useState } from "react";
import GridTable from "../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import AuditLogDateAndTime from "../purchaseForm/purchaseGrid/AuditLogDate&Time";
import AuditLogMessage from "../purchaseForm/purchaseGrid/AuditLogMessage";
import AuditLogUser from "../purchaseForm/purchaseGrid/AuditLogUser";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setRefresh } from "../../redux/Purchase.slice";

const PurchaseAuditLog = () => {
  const [colaps, setColaps] = useState(false);
  const [row, setRow] = useState([]);
  const [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const detailData = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const [head, setHead] = useState([
    { title: "", slector: "", Wid: 0 },

    {
      title: "Date Time",
      slector: "DATES",
      customComp: AuditLogDateAndTime,
      Wid: 150,
    },

    {
      title: "Message",
      slector: "MESSAGE",
      Wid: 120,
      customComp: AuditLogMessage,
    },

    {
      title: "User",
      slector: "USERNAME",
      Wid: 120,
      customComp: AuditLogUser,
    },
  ]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const payloadDetails = {
    data: {
      SOURCEORASEQ: detailData?.PURORD_ID,
      USE_ID: detailData?.USER_ID_PREPARED_BY,
      USER_NAME: detailData?.PREPARED_BY,
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
      dispatch(setRefresh(true));
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
          {/* <PurchaseGrid/> */}

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

export default PurchaseAuditLog;
