import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { useDispatch } from "react-redux";
import {
  PromoEditForm,
  setPromoEditDetForm,
  setPromoEditDetFormLot,
} from "../../../_redux/promotionSlice";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const PromotionFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const payloadGetPromo = {
    data: {
      PROMO_ID: index?.PROMO_ID,
    },
    action: "Administration",
    method: "GetPromotions",
    type: "rpc",
    tid: "144",
  };
  // const dispatch = useDispatch()
  const handleGetPromo = (data) => {
    dispatch(setPromoEditDetForm(data.Result.Results));
    dispatch(setPromoEditDetFormLot(data.Result.Table1));
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);

    dispatch(PromoEditForm(index));

    // for form
    sendRequest(
      Administration.GetPromotions,
      "POST",
      payloadGetPromo,
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

export default PromotionFormModal;
