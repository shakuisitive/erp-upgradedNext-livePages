import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import {
  setDistributionEditForm,
  setEditDistribution,
  setEditShipTo,
  setNewDistribution,
  setNewShipTo,
  setShipToEditForm,
} from "../../../_redux/customerSlice";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useDispatch } from "react-redux";

const ShipToFormModal = ({ index }) => {
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
      CUS_DRPSHP_ID: index?.CUS_DRPSHP_ID,
    },
    action: "Administration",
    method: "GetCustomerDropShipAddressDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setShipToEditForm(data.Result));
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);

    dispatch(setEditShipTo(index));
    dispatch(setNewShipTo(true));

    // for form
    sendRequest(
      Administration.GetCustomerDropShipAddressDetails,
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

export default ShipToFormModal;
