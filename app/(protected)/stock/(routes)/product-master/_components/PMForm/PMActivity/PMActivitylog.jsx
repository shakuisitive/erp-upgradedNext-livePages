import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridTable from "../../../../../../../../components/misc/pureComponents/GridTable/GridTable";
import { setRefresh } from "../../../../purchase/redux/Purchase.slice";
import MainHeader from "../../../../../../../../components/misc/pureComponents/mainHeader/MainHeader";
import PMActivityDateandTime from "../PMActivity/PMActivityDateandTime"
import PMActivityMessage from "../PMActivity/PMActivityMessage"
import PMActivityUser from "../PMActivity/PMActivityUser"
import {Slice,formIndex } from "../../../redux/pmSlice"
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
export const PMActivitylogs = () => {

    const [row, setRow] = useState([]);
    const dispatch = useDispatch();
    const [colaps, setColaps] = useState(false);
    const [error, sendRequest] = useApiFetch();
   const detailData = useSelector( (state) => state.pmSlices.formIndex   );
   

    const baseUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetAuditLog`;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  
    const payloadDetails = {
      data: {
        SOURCEORASEQ:detailData?.PAR_ID,
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
        customComp: PMActivityDateandTime,
        Wid: 150,
      },
      {
        title: "Message",
        slector: "MESSAGE",
        customComp: PMActivityMessage,
        Wid: 120,
      },
      {
        title: "User",
        slector: "USERNAME",
        customComp: PMActivityUser,
        Wid: 120,
      },
    ]);
  
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
  
    // Sample data for demonstration
    // useEffect(() => {
    //   const sampleData = [
    //     {
    //       DATES: "2024-05-18 12:34:56",
    //       MESSAGE: "Purchase order created",
    //       USERNAME: "admin"
    //     },
    //     {
    //       DATES: "2024-05-18 14:22:31",
    //       MESSAGE: "Purchase order approved",
    //       USERNAME: "admin"
    //     }
    //   ];
    //   setRow({ Result: sampleData });
    // }, []);

    const getProdectDetailResR = (data) => {
      if (data) {
        setRow(data.Result);
        dispatch(setRefresh(true));
      }
    };
    useEffect(() => {
      if (detailData) {
        sendRequest(baseUrl, "POST", payloadDetails, getProdectDetailResR, token);
      }
    }, [detailData]);

   
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
      <div className="flex flex-col gap-4 w-full justify-between bg-white mb-2 rounded-t-md">
       
       
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
  export default PMActivitylogs;



