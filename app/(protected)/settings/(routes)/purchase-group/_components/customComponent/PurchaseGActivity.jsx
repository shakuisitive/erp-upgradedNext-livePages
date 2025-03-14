import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GrExpand, GrHomeRounded } from "react-icons/gr";
import { setFormIndex } from "../../_redux/purchaseGSlice";
import { useDispatch } from "react-redux";

const PurchaseGActivity = ({ rowData, index }) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(setFormIndex(index));
  };
  return (
    <div className="ml-2">
      <div
        onClick={handleOpenModal}
        className=" hidden items-center mr-2  group-hover:flex cursor-pointer "
      >
        <GrExpand className="mr-2" />
        Activity
      </div>
    </div>
  );
};

export default PurchaseGActivity;
