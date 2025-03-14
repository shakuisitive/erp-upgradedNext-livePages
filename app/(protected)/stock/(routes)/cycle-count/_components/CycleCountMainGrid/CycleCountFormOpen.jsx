import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GrExpand } from "react-icons/gr";
import { setIsModalOpen, setPCIndex, setPhysicalCountDetails, setSelectedWarid, setSessionId } from "../../redux/CycleCountSlice";
import { SessionManagement } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const CycleCountFormOpen = ({ index }) => {
  const dispatch = useDispatch();

  let [error, sendRequest] = useApiFetch();

  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);

  const postSessionRes = (data) => {
    dispatch(setSessionId(data.Result));
    dispatch(setPhysicalCountDetails([]))
    dispatch(setSelectedWarid({}));
    dispatch(setPCIndex(index));
    dispatch(setIsModalOpen(true));
  };
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const getOpenSession = {
    action: "Inventory",
    data: {
      SOURCE_PK: index?.PHYCOU_ID.toString(),
      SOURCE_TABLE: "PHYSICAL_COUNT",
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
      SOURCE_NO: index?.PC_NUMBER,
      SOURCE_PK: index?.PHYCOU_ID.toString(),
      SOURCE_TABLE: "PHYSICAL_COUNT",
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
        SessionManagement.PostEditScreenSessions,
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

export default CycleCountFormOpen;
