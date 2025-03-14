import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { Administration } from "../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import {
  CustEditForm,
  closeModal,
  setCustBranchList,
  setCustEditDetForm,
  setPromoDetails,
  setShipToList,
  setTaxDetails,
} from "../_redux/customerSlice";
import useApiFetch from "../../../../../../customHook/useApiFetch";

const CustomerFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const handleGetBranchList = (data) => {
    dispatch(setCustBranchList(data?.Result));
  };
  const payloadShipto = {
    data: {
      CUS_ID: index?.CUS_ID.toString(),
    },
    action: "Administration",
    method: "GetCustomerDropShipAddressList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadCust = {
    data: {
      CUS_ID: index?.CUS_ID.toString(),
      OFFSET: "",
    },
    action: "Administration",
    method: "GetCustomerDetails",
    type: "rpc",
    tid: "144",
  };
  const payloadTax = {
    data: {
      CUS_ID: index?.CUS_ID.toString(),
    },
    action: "Administration",
    method: "GetTaxesList",
    type: "rpc",
    tid: "144",
  };
  const paylaodCustBranch = {
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      CUS_ID: index?.CUS_ID.toString(),
    },
    action: "Administration",
    method: "GetCustomerBranchList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadPromotion = {
    data: {
      CUS_ID: index?.CUS_ID.toString(),
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "",
    },
    action: "Administration",
    method: "GetCustomerPromosList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleGetShipTo = (data) => {
    dispatch(setShipToList(data?.Result));
  };
  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Administration.GetCustomerBranchList,
        "POST",
        paylaodCustBranch,
        handleGetBranchList,
        token
      );
    }
    dispatch(setCustEditDetForm(data.Result));
  };
  const handleGetTax = (data) => {
    dispatch(setTaxDetails(data.Result));
    sendRequest(
      Administration.GetCustomerDropShipAddressList,
      "POST",
      payloadShipto,
      handleGetShipTo,
      token
    );
  };
  const handleGetPromo = (data) => {
    dispatch(setPromoDetails(data.Result));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(CustEditForm(index));

    // for form
    sendRequest(
      Administration.GetCustomerDetails,
      "POST",
      payloadCust,
      handleGetCustDet,
      token
    );
    sendRequest(
      Administration.GetCustomerARTaxes,
      "POST",
      payloadTax,
      handleGetTax,
      token
    );
    sendRequest(
      Administration.GetCustomerPromosList,
      "POST",
      payloadPromotion,
      handleGetPromo,
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

export default CustomerFormModal;
