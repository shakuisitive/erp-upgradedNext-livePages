import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import PMAttributesDescription from "./PMAttributesDescription";

const PMAdditionalTabs = ({
  index,
  initialInputValue = "",
  initialDescription = "",
  initialActive = true,
  onInputChange = () => {},
  onActiveChange = () => {},
  onDescriptionChange = () => {},
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onInputChange(value);
  };
  const handleActiveToggle = (e) => {
    const newActiveState = e.target.checked;
    onActiveChange(newActiveState);
  };

  const handleDesc = (content) => {
    onDescriptionChange(content);
  };

  return (
    <div className="w-full h-[340px] mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen border p-10 ">
      <div className="grid grid-cols-[1fr_150px] items-center gap-[18px] mb-[12px]">
        <UseInput
          value={initialInputValue}
          onChange={handleInputChange}
          type="text"
        />
        <div className="flex items-center gap-[18px]">
          <ToggleSwitch checked={initialActive} onChange={handleActiveToggle} />

          <p>Active</p>
        </div>
      </div>
      <PMAttributesDescription
        value={initialDescription}
        onChange={handleDesc}
        id={index}
      />
    </div>
  );
};

export default PMAdditionalTabs;
