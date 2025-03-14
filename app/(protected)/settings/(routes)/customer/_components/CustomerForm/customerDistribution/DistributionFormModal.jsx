import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import {
  setDistributionEditForm,
  setEditDistribution,
  setNewDistribution,
} from "../../../_redux/customerSlice";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useDispatch } from "react-redux";

const DistributionFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  //   const handleGetBranchList = (data) => {
  //     dispatch(setDistributionEditForm(data?.Result));
  //   };

  const paylaodCustBranch = {
    data: {
      CUSBRA_ID: index?.CUSBRA_ID.toString(),
    },
    action: "Administration",
    method: "GetCustomerBranch",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setDistributionEditForm(data.Result));
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);

    dispatch(setEditDistribution(index));
    dispatch(setNewDistribution(true));

    // for form
    sendRequest(
      Administration.GetCustomerBranch,
      "POST",
      paylaodCustBranch,
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

export default DistributionFormModal;
