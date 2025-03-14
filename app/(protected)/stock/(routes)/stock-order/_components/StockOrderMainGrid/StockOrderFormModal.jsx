import React, { useState } from "react";
import { openForm, setSessionId } from "../../redux/stockSlice";
import { useDispatch } from "react-redux";
import { stockOrderForm } from "../../redux/stockSlice";
import { GrExpand } from "react-icons/gr";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const StockOrderFormModal = ({ index }) => {

  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const postEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/PostEditScreenSessions`;
  const getEditScreenSessions = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}Inventory/GetEditScreenSessions`;

  const postSessionRes = (data) => {
    dispatch(setSessionId(data.Result));
  };
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const getOpenSession = {
    action: "Inventory",
    data: {
      SOURCE_PK: index?.INVSTO_ID.toString(),
      SOURCE_TABLE: "STOCK_ORDER",
      LOGGED_IN_USER_ID: "2694",
    },
    method: "GetEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };
  const sessionPayload = {
    action: "Inventory",
    data: {
      EDISCRSES_ID: "",
      SOURCE_NO: index?.STOORD_NUMBER,
      SOURCE_PK: index?.INVSTO_ID.toString(),
      SOURCE_TABLE: "STOCK_ORDER",
      USE_ID: "2694",
    },
    method: "PostEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const getSessionRes = (data) => {
    if (data.Result.length === 0) {
      sendRequest(
        postEditScreenSessions,
        "POST",
        sessionPayload,
        postSessionRes,
        accessToken
      );
    } else {
      setEMessage(
        `Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`
      );
      setIsErrorMessage(true);
    }
  };

  const handleOpenModal = () => {
    dispatch(stockOrderForm([]));
    dispatch(openForm(index));
    sendRequest(
      getEditScreenSessions,
      "POST",
      getOpenSession,
      getSessionRes,
      accessToken
    );
  };

  
  return (
    <div className="ml-2">
      <div
        onClick={handleOpenModal}
        className=" hidden items-center mr-2  group-hover:flex cursor-pointer "
      >
        <GrExpand className="mr-2" />
        Open
      </div>
      {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
    </div>
  );
};

export default StockOrderFormModal;
