import React from "react";
import { GrExpand } from "react-icons/gr";

const SupplierFormModal = () => {
  return (
    <div className="ml-2">
      <div
        // onClick={handleOpenModal}
        className=" hidden items-center mr-2  group-hover:flex cursor-pointer "
      >
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default SupplierFormModal;
