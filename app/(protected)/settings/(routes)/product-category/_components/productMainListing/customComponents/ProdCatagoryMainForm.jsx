import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { Inventory, GetAuditLog } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { setFormIndex, setProdCatagoryFormData } from "../../../_redux/prodCategorySlice";

const ProdCatagoryMainForm = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const paylaodHtCode = {
    data: {
        PARCAT_ID: index?.PARCAT_ID,
    },
    action: "InventoryWeb",
    method: "GetPartCategoryDet",
    username: "SALES",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setProdCatagoryFormData(data?.Result));
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);
    console.log("Open Clicked")

    dispatch(setFormIndex(index));

    // for form
    sendRequest(
      Inventory.GetPartCategoryDet,
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
        className=" hidden items-center mr-2 group-hover:flex cursor-pointer"
      >
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default ProdCatagoryMainForm;
