import React from "react";
import { GrExpand } from "react-icons/gr";

const OpenDrawer = ({ index }) => {
  return (
    <div>
      <div className=" hidden items-center mr-2 border-l group-hover:flex cursor-pointer ">
        <GrExpand className="mr-2" />
        Open
      </div>
    </div>
  );
};

export default OpenDrawer;
