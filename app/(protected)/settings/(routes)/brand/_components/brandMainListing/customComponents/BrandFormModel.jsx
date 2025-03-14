import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { Inventory } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { setFormIndex, setBrandFormData } from "../../../_redux/brandSlice";

const BrandFormModel = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();

  const paylaodHtCode = {
    data: {
        PARBRA_ID: index?.PARBRA_ID,
    },
    action: "InventoryWeb",
    method: "GetPartBrandDet",
    username: "SALES",
    type: "rpc",
    tid: "144",
  };

  const handleGetCustDet = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(setBrandFormData(data?.Result));
    }
  };

  const handleOpenModal = () => {
    // setIsModalOpen(true);
    console.log("Open Clicked")

    dispatch(setFormIndex(index));

    // for form
    sendRequest(
      Inventory.GetPartBrandDet,
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

export default BrandFormModel;
