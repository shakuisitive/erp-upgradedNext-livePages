"use client";
import React, { useState, useEffect } from "react";
import RightDrawer from "../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { GrHomeRounded } from "react-icons/gr";
import PurchaseConversationTab from "../../purchase/_components/purchaseRightDrawer/PurchaseConversationTab";
import PurchaseFileTab from "../../purchase/_components/purchaseRightDrawer/PurchaseFileTab";
const PurchaseFormModall = ({ index }) => {
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
      icon: <GrHomeRounded className="text-customIcon text-[14px]" />,
      content: <PurchaseConversationTab data={index} />,
    },
    {
      label: "Files",
      content: <PurchaseFileTab data={index} />,
    },
    {
      label: "Activity Log",
      content: <div>this is activity content</div>,
    },
  ];

  return (
    <div className="">
      <BiMessageRoundedAdd
        onClick={handleOpenDrawer}
        className="text-[22px] text-[#676879] hover:text-[#579BFC] "
      />
      <RightDrawer
        data={index}
        isOpen={isDrawer}
        onClose={handleCloseDrawer}
        heading={index?.PO_NUMBER}
        tabs={tabs}
      />
    </div>
  );
};

export default PurchaseFormModall;
