import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  EditForm,
  setDuplicateLotData,
  setEditDetForm,
  setEditFormVariance,
  setField,
  setImagesData,
  setLoader,
  setPartNameOverride,
} from "../../redux/pmSlice";
import {
  Administration,
  General,
  ItemMaster,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const PMFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const formIndex = useSelector((state) => state.pmSlices.formIndex);

  const payloadGetPartDet = {
    data: {
      OFFSET: "+04:00",
      PAR_ID: index?.PAR_ID,
    },
    action: "ItemMaster",
    method: "GetPartDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const variancePayload = {
    data: {
      PAR_ID: index?.PAR_ID,
    },
    action: "Administration",
    method: "GetProductVariance",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadGetPartLotList = {
    data: {
      ACTIVE_FLAG: "Y",
      ORDER: "",
      PAR_ID: index?.PAR_ID,
      RNUM_FROM: "1",
      RNUM_TO: "100000",
      SEARCH: "",
    },
    action: "Administration",
    method: "GetPartLotList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const partNameOverridePayload = {
    data: { PAR_ID: index?.PAR_ID },
    action: "Administration",
    method: "GetPartNameOverrides",
    username: "admin",
  };

  const duplicateLotListPayload = {
    data: { PAR_ID: index?.PAR_ID },
    action: "Inventory",
    method: "GetDuplicatePartLots",
    username: "admin",
  };

  const partAttachmentPayload = {
    data: {
      PAR_ID: index?.PAR_ID,
      SEARCH: "",
    },
    action: "ITEMMASTER",
    method: "GetPartAttachments",
  };

  const handleGetPartAttachments = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setImagesData(data?.Result));
    }
  };

  const handleGetDuplicatePartLots = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setDuplicateLotData(data?.Result));
      sendRequest(
        ItemMaster.GetPartAttachments,
        "POST",
        partAttachmentPayload,
        handleGetPartAttachments,
        token
      );
    }
  };

  const handleGetPartLotList = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        General.GetDuplicatePartLots,
        "POST",
        duplicateLotListPayload,
        handleGetDuplicatePartLots,
        token
      );
    }
  };

  const handleGetPartDet = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setEditDetForm(data.Result));
      dispatch(setLoader(false));
      sendRequest(
        Administration.GetPartLotList,
        "POST",
        payloadGetPartLotList,
        handleGetPartLotList,
        token
      );
    }
  };

  const handleGetPartNameOverRide = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setPartNameOverride(data?.Result || data?.Results));
      sendRequest(
        ItemMaster.GetPartDetail,
        "POST",
        payloadGetPartDet,
        handleGetPartDet,
        token
      );
    }
  };
  const handleGetProdVariance = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setEditFormVariance(data?.Result || data?.Results));
    }
  };
  const handleOpenModal = () => {
    dispatch(setLoader(true));
    setIsModalOpen(true);
    dispatch(EditForm(index));
    sendRequest(
      Administration.GetPartNameOverrides,
      "POST",
      partNameOverridePayload,
      handleGetPartNameOverRide,
      token
    );
    sendRequest(
      Administration.GetProductVariance,
      "POST",
      variancePayload,
      handleGetProdVariance,
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

export default PMFormModal;
