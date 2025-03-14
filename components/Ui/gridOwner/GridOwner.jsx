import React from "react";
import { CgProfile } from "react-icons/cg";
// import Tooltip from "../../../../../../../components/misc/pureComponents/tooltip/Tooltip";
import Tooltip from "../../misc/pureComponents/tooltip/Tooltip"

const GridOwner = ({ data, rowData, index }) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-[30px] text-gray-300">
    <Tooltip content={rowData.USE_ID_PREPARED_BY}>
        <CgProfile />
    </Tooltip>
      </div>
  )
}

export default GridOwner

