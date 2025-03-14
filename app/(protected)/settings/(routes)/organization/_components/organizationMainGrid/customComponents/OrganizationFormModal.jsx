import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { openForm } from "../../../redux/pmSlice";

const PMFormModal = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // console.log("gr Expand clicked not redux")
    dispatch(openForm(index));
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
