import React, { useEffect, useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  KitEditForm,
  kitEditForm,
  setEditKitCust,
  setKitSubGrid,
  setEditKitDetForm,
  setEditKitForm,
  setKitImagesData,
} from "../../../../../redux/pmSlice";

const PMKitFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const postKitRes = useSelector((state) => state.pmSlices.postKitRes);

  const kitSubGrid = useSelector((state) => state.pmSlices.kitSubGrid);

  const payloadGetKitDet = {
    data: {
      KIT_ID: index?.KIT_ID,
    },
    action: "ItemMaster",
    method: "GetKitDetails",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const payloadGetKit = {
    data: {
      KIT_ID: index?.KIT_ID,
    },
    action: "ItemMaster",
    method: "GetKit",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

 

  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(KitEditForm(index));
    // for grid
    sendRequest(
      ItemMaster.GetKitDetails,
      "POST",
      payloadGetKitDet,
      GetKitDet,
      token
    );
    // for form
    sendRequest(ItemMaster.GetKit, "POST", payloadGetKit, GetKit, token);
  };
  // useEffect(() => {}, [data]);
  const partAttachmentPayload = {
    data: {
      KIT_ID: index?.KIT_ID,
      SEARCH: "",
    },
    action: "ITEMMASTER",
    method: "GetPartAttachments",
  };

  const handleGetPartAttachments = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setKitImagesData(data?.Result));
    }
  };
  const GetKitDet = (data) => {
    if (data?.CODE == "SUCCESS") {
      sendRequest(
        ItemMaster.GetPartAttachments,
        "POST",
        partAttachmentPayload,
        handleGetPartAttachments,
        token
      );
      dispatch(setKitSubGrid(data.Result.Results));
    }
  };
  const GetKit = (data) => {
    dispatch(setEditKitForm(data.Result.Results));
    dispatch(setEditKitCust(data.Result.Table1));
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

export default PMKitFormModal;
