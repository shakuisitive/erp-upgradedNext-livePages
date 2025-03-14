import { FaPencil } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import React, { useState } from "react";
import UseInput from "./../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import PMAttributesRightDesc from "./PMAttributesRightDesc";

const PMAttributeRight = ({
  rightActive,
  setRightActive,
  description,
  setDescription,
  descTitle,
  setDescTitle,
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setDescTitle(value);
  };

  const handleActive = (e) => {
    setRightActive(e.target.checked);
  };
  const handleDescription = (content) => {
    setDescription(content);
  };
  // console.log("Description 1", description);

  return (
    <div className="w-full h-[340px] mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border p-10 tablet:w-full">
      <div className="grid grid-cols-[1fr_150px] items-center gap-[18px] mb-[12px]">
        <UseInput
          value={descTitle}
          onChange={handleInputChange}
          type="text"
          id=""
        />
        <div className="flex items-center gap-[18px]">
          <ToggleSwitch
            id="active"
            checked={rightActive}
            onChange={handleActive}
          />
          <p>Active</p>
        </div>
      </div>
      <PMAttributesRightDesc value={description} onChange={handleDescription} />
    </div>
  );
};

export default PMAttributeRight;
