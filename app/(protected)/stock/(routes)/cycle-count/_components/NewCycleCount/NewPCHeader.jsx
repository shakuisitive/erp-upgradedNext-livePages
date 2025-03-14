import React, { useEffect, useRef, useState } from "react";
import NewButton from "../../../../../../../components/misc/pureComponents/buttons/NewButton";
import WarehouseDropdown from "../CycleCountForm/WarehouseDropdown";
import {
  newFormPayload,
  setNewModal,
  updatePCId,
  newDetailPayload,
  setRefresh
} from "../../redux/CycleCountSlice";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { PhysicalCount } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const NewPCHeader = () => {
  const dispatch = useDispatch();
  const [isSend, setIsSend] = useState(false);
  const [isSendD, setIsSendD] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const DetailPayload = useSelector(
    (state) => state.CycleCountSlice.newDetailPayload
  );
  const FormPayload = useSelector(
    (state) => state.CycleCountSlice.newFormPayload
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getDetail = (data) => {
    dispatch(setNewModal(false));
    dispatch(setRefresh(true));
  };

  const getForm = (data) => {
    dispatch(updatePCId(data.Result));
    dispatch(newDetailPayload(data.Result));
    setIsSendD(true)
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        PhysicalCount.PostPhysicalCount,
        "POST",
        FormPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  useEffect(() => {
    if (isSendD == true) {
      sendRequest(
        PhysicalCount.PostPhysicalCountDetail,
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
    postForm()
  };
  return (
    <div className="flex w-full justify-between px-2 bg-white py-2 mb-2 rounded-t-md">
      <div className="flex items-center">
        <NewButton label="Apply" handleClick={onApply} />
        <div className="border-b border-b-gray-300 border-l-green-400 border-l-4 py-1">
          <WarehouseDropdown disable={false} />
        </div>
      </div>
    </div>
  );
};

export default NewPCHeader;
