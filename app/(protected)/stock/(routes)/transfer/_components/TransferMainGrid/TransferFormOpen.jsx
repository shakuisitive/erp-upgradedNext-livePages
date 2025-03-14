import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrExpand } from "react-icons/gr";
import {
  setIsModalOpen,
  setPCIndex,
  setPCModal,
  setPhysicalCountDetails,
  setSelectedWarid,
  setSessionId,
  setTransferDetails,
} from "../../redux/TransferSlice";
import { SessionManagement } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const TransferFormOpen = ({ index }) => {
  const dispatch = useDispatch();

  let [error, sendRequest] = useApiFetch();

  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let PCIndex = useSelector((state) => state.TransferSlice.PCIndex);

  const postSessionRes = (data) => {
    dispatch(setSessionId(data.Result));
    // dispatch(setPhysicalCountDetails([]))
    // dispatch(setSelectedWarid({}));
    // dispatch(setPCIndex(index));
    // dispatch(setIsModalOpen(true));
  };
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const getOpenSession = {
    action: "Inventory",
    data: {
      SOURCE_PK: index?.INVTRA_ID.toString(),
      SOURCE_TABLE: "INVENTORY_TRANSFER",
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
      SOURCE_NO: index?.TRANSFER_NUMBER,
      SOURCE_PK: index?.INVTRA_ID.toString(),
      SOURCE_TABLE: "INVENTORY_TRANSFER",
      USE_ID: "2694",
    },
    method: "PostEditScreenSessions",
    tid: "144",
    type: "rpc",
    username: "admin",
  };

  const getSessionRes = (data) => {
    if (data.Result.length == 0) {
      sendRequest(
        SessionManagement.PostEditScreenSessions,
        "POST",
        sessionPayload,
        postSessionRes,
        accessToken
      );
      dispatch(setTransferDetails([]));
      dispatch(setSelectedWarid({}));
      dispatch(setPCIndex(index));
      dispatch(setPCModal(true));
    } else {
      setEMessage(
        `Order # ${data.Result[0].SOURCE_NO}, session in use by admin.`
      );
      setIsErrorMessage(true);
    }
  };

  const handleOpenModal = () => {
    //  dispatch(setSessionId(data.Result));
    // dispatch(setTransferDetails([]));
    // dispatch(setSelectedWarid({}));
    // dispatch(setPCIndex(index));
    // dispatch(setPCModal(true));
    sendRequest(
      SessionManagement.GetEditScreenSessions,
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

export default TransferFormOpen;
