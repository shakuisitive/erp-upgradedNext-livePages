import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  VenEditForm,
  closeModal,
  setVenEditDetForm,
} from "../../../redux/supplierSlice";

const VendorFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const payloadVen = {
    data: {
      VEN_ID: index?.VEN_ID.toString(),
      OFFSET: "",
    },
    action: "Administration",
    method: "GetVendors",
    type: "rpc",
    tid: "144",
  };
  const handleGetVendors = (data) => {
    if (data?.CODE === "SUCCESS") {
      // dispatch(closeModal());
    }
    dispatch(setVenEditDetForm(data.Result));
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(VenEditForm(index));

    // for form
    sendRequest(
      Administration.GetVendors,
      "POST",
      payloadVen,
      handleGetVendors,
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

export default VendorFormModal;
