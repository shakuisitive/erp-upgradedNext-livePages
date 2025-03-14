import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setLocEditDetForm, LocEditForm } from "../../../_redux/branchSlice";

const BranchFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const payloadLoc = {
    data: {
      LOC_ID: index?.LOC_ID.toString(),
    },
    action: "Administration",
    method: "GetLocationDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleGetLocDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      // dispatch(closeModal());
    }
    dispatch(setLocEditDetForm(data.Result));
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(LocEditForm(index));

    // for form
    sendRequest(
      Administration.GetLocationDetails,
      "POST",
      payloadLoc,
      handleGetLocDet,
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

export default BranchFormModal;
