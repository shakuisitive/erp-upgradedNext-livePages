import React, { useState } from "react";
import { GrExpand } from "react-icons/gr";

const OrganizationFormModal = ({ index }) => {
  return (
    <div className="ml-2">
      <div className=" hidden items-center mr-2  group-hover:flex cursor-pointer ">
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default OrganizationFormModal;
