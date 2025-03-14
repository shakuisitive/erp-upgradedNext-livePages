import React, { useEffect } from "react";
import {
  setAssignDrawer,
  setOrderIds,
  setRefresh,
  setStockOrder,
  setStockOrderDetailDataId,
  setTransferDrawer,
} from "../../redux/stockSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const FormGridAction = ({ data, rowData }) => {
  const dispatch = useDispatch();

  let [error, sendRequest] = useApiFetch();
  const subData = useSelector((state) => state.stockSlices.subData);
  const openModal = () => {
    if (data == 3909 || data == 3024) {
      dispatch(setStockOrderDetailDataId(rowData.INVSTODET_ID));
      dispatch(setStockOrder({ form: subData[0]?.form, detail: [rowData] }));
      dispatch(setTransferDrawer(true));
    } else if (rowData.USE_ID_ASSIGNED_TO == null) {
      dispatch(setStockOrderDetailDataId(rowData.INVSTODET_ID));
      dispatch(setStockOrder({ form: subData[0]?.form, detail: [rowData] }));
      dispatch(setAssignDrawer(true));
    }
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/PostLotReleaseFlag`;

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  let releaseItemsArray = {
    INVSTOORDDET_ID: rowData?.INVSTODET_ID,
    INVPARLOT_ID: rowData?.INVPARLOT_ID,
  };

  const payload = {
    data: {
      USE_ID: "2694",
      INVSTOORDDET: [releaseItemsArray],
    },
    action: "InventoryWeb",
    method: "PostLotReleaseFlag",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  function getAllTask(data) {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
    }
  }
  const releaseItem = () => {
    sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  };
  return (
    <div className="w-full flex items-center justify-center bg-customgreen">
      <button
        // onMouseEnter={() => onHover()}
        onClick={rowData.LOT_RELEASE_FLAG == "N" ? releaseItem : openModal}
        disabled={rowData.USE_ID_ASSIGNED_TO == null ? false : true}
        className={`w-full h-full flex items-center cursor-pointer justify-center ${
          rowData.LOT_RELEASE_FLAG == "N"
            ? "bg-blue-700"
            : data == 3909 || data == 3024
            ? "bg-yellow-700"
            : rowData.USE_ID_ASSIGNED_TO == null
            ? "bg-indigo-500"
            : "bg-gray-400"
        } `}
      >
        <p className="text-[14px] leading-normal  line-clamp-1 text-white">
          {rowData.LOT_RELEASE_FLAG == "N"
            ? "Release"
            : data == 3909 || data == 3024
            ? "Transfer"
            : rowData.USE_ID_ASSIGNED_TO == null
            ? "Assign"
            : "Assigned"}
        </p>
      </button>
    </div>
  );
};

export default FormGridAction;
