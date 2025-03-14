"use client";

import React, { useState, useEffect } from "react";

import { GrExpand } from "react-icons/gr";

import { openPermissionModal } from "../../redux/Role.slice";
import { useDispatch } from "react-redux";

const PermissionsDrawer = ({ index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log('check index in table' , index);

  // console.log('get purchase in apply buuton' , dataDetails);

  const dispatch = useDispatch();
  // console.log('modall index' , index);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(openPermissionModal(index));
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

export default PermissionsDrawer;
