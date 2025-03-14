import React from 'react'
import { BsArrowRightCircle } from "react-icons/bs";
import { GrExpand } from "react-icons/gr";
import { IoMdCopy } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreOption from '../../../../../../components/misc/pureComponents/GridTable/MoreOption';

const PMGridMoreOption = () => {
    const options = [
    {
      label: "Open Project",
      icon: GrExpand,
      hide: false,
      onClick: () => {
        console.log("Open Project clicked");
      },
    },
    {
      label: "Move to",
      icon: BsArrowRightCircle,
      hide: false,
      onClick: () => {
        console.log("Move to clicked");
      },
    },
    {
      label: "Duplicate",
      icon: IoMdCopy,
      hide: false,
      onClick: () => {
        console.log("Duplicate clicked");
      },
    },
    {
      label: "Delete",
      icon: RiDeleteBin6Line,
      hide: false,
      onClick: () => {
        console.log("Delete clicked");
      },
    },
  ];

  return (
    <div>
      <MoreOption options = {options}/>
    </div>
  )
}

export default PMGridMoreOption
