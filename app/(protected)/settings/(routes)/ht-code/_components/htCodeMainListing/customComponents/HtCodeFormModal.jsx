import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import {
  Administration,
  Inventory,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { setFormIndex, setHtCodeFormData } from "../../../_redux/htCodeSlice";

const HtCodeFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const paylaodHtCode = {
    data: {
      HT_CODE_ID: index?.HT_CODE_ID,
    },
    action: "Administration",
    method: "GetHarmonizedTarrifCode",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setHtCodeFormData(data?.Result));
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);

    dispatch(setFormIndex(index));

    // for form
    sendRequest(
      Administration.GetHarmonizedTarrifCode,
      "POST",
      paylaodHtCode,
      handleGetCustDet,
      token
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
    </div>
  );
};

export default HtCodeFormModal;
