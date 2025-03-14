"use client";

import React, { useState } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { GrHomeRounded } from "react-icons/gr";
import RightDrawer from "../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import RoleConversationTab from './RoleConversationTab';
import RoleConversationFileTab from './RoleConversationFileTab';



const RoleConversionModal = ({ index }) => {


  const [isDrawer, setIsDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawer(true);
  };
   const handleCloseDrawer = () => {
    setIsDrawer(false);
  };
    const tabs = [
    {
      label: "Updates",
      icon: <GrHomeRounded  className="text-customIcon text-[14px]"/>,
      content: <RoleConversationTab data={index}/>
    },
    {
      label: "Files",
      content: <RoleConversationFileTab data={index}/>
    },
    {
      label: "Activity Log",
       content: <div>this is activity content</div>
    }
  ]

  return (
    <div className="">
      <BiMessageRoundedAdd
       onClick={handleOpenDrawer}
        className="text-[22px] text-[#676879] hover:text-[#579BFC] "
      />
        <RightDrawer data={index} isOpen={isDrawer} onClose={handleCloseDrawer} heading={index?.NAME} tabs={tabs} />
    </div>
  );
};

export default RoleConversionModal;
