import React from "react";
import { CgProfile } from "react-icons/cg";
import Tooltip from "../../../../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import { useSelector } from "react-redux";

const PMGridOwner = () => {
  const owner = useSelector((state) => state.user.username);
  return (
    <div className="w-full h-full flex justify-center items-center text-[30px] text-gray-300">
      <Tooltip content={owner}>
        <CgProfile />
      </Tooltip>
    </div>
  );
};

export default PMGridOwner;
