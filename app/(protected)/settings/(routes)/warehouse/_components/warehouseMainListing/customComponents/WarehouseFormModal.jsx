import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  WarEditForm,
  setFcLocList,
  setFcLocListPar,
  setLocationList,
  setWarEditDetForm,
} from "../../../_redux/warehouseSlice";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const WarehouseFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const payloadWar = {
    data: {
      WAR_ID: index?.WAR_ID,
      OFFSET: "",
    },
    action: "InventoryWeb",
    method: "GetInventoryWarehouses",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const locationPayload = {
    data: {
      SEARCH: "",
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "1000",
      OFFSET: "",
      WAR_ID: index?.WAR_ID,
      ACTIVE_FLAG: "Y",
    },
    action: "Administration",
    method: "GetWarehouseLocationList",
    username: "admin",
    password: "1234",
    type: "rpc",
    tid: "144",
  };
  const handleLocation = (data) => {
    dispatch(setLocationList(data?.Result.Results));
    dispatch(setFcLocList(data?.Result.Table1));
    const filteredArray = data.Result.Table1.filter(
      (item) => item.PAR_ID !== null
    );
    dispatch(setFcLocListPar(filteredArray));
    // console.log(filteredArray, "checking filter array");
  };
  const handleGetWarehouse = (data) => {
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Administration.GetWarehouseLocationList,
        "POST",
        locationPayload,
        handleLocation,
        token
      );
    }
    dispatch(setWarEditDetForm(data?.Result));
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(WarEditForm(index));

    // for form
    sendRequest(
      Administration.GetInventoryWarehouses,
      "POST",
      payloadWar,
      handleGetWarehouse,
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

export default WarehouseFormModal;
