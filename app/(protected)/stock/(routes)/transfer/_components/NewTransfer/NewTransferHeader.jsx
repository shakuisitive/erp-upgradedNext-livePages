import React, { useEffect, useRef, useState } from "react";
import NewButton from "../../../../../../../components/misc/pureComponents/buttons/NewButton";
import WarehouseDropdown from "../TransferForm/WarehouseDropdown";
import {
  newFormPayload,
  setNewModal,
  updatePCId,
  newDetailPayload,
  setRefresh,
  updateTCId,
} from "../../redux/TransferSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  PhysicalCount,
  Transfer,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";

const NewTransferHeader = () => {
  const dispatch = useDispatch();
  const [isSend, setIsSend] = useState(false);
  const [isSendD, setIsSendD] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  // const [isError, setIsError] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const DetailPayload = useSelector(
    (state) => state.TransferSlice.newDetailPayload
  );
  const FormPayload = useSelector(
    (state) => state.TransferSlice.newFormPayload
  );
  const transferDetails = useSelector(
    (state) => state.TransferSlice.transferDetails
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getDetail = (data) => {
    dispatch(setNewModal(false));
    dispatch(setRefresh(true));
  };

  const getForm = (data) => {
    dispatch(updateTCId(data.Result));
    dispatch(newDetailPayload());
    setIsSendD(true);
  };

  useEffect(() => {
    if (isSend == true) {
      // console.log("payload form", FormPayload);
      sendRequest(
        Transfer.PostInventoryTransfer,
        "POST",
        FormPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  useEffect(() => {
    if (isSendD == true) {
      // console.log("payload grid ", DetailPayload);

      sendRequest(
        Transfer.PostInventoryTransferDetails,
        "POST",
        DetailPayload,
        getDetail,
        token
      );
    }
  }, [isSendD]);

  const postForm = () => {
    dispatch(newFormPayload());
    setIsSend(true);
  };

  const onApply = () => {
    if (transferDetails?.length !== 0) {
      postForm();
    } else {
      setEMessage("Please Add Product to Apply");
      setIsErrorMessage(true);
    }
  };
  return (
    <div className="flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="flex items-center">
        <NewButton label="Apply" handleClick={onApply} />
        <div className="border-b border-b-gray-300 border-l-green-400 border-l-4 py-1">
          <WarehouseDropdown disable={false} />
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default NewTransferHeader;
