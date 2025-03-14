import React, { useState } from "react";
import { PiDotsThreeBold } from "react-icons/pi";

const ButtonMenu = (props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      className={`${
        props.tab.label === "Files" ? "w-[70px]" : "w-[100px]"
      } relative flex items-center text-[14px]  py-[5px] px-[10px] text-customblack  line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-customHover rounded-[4px] hover:bg-customHover 
    after:absolute after:right-[0px]  `}
      onClick={() => props.tabClicked(props.index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className=" flex items-center gap-2">
        {props.tab.icon && props.tab.icon}
        <div
          style={{ width: isHovered ? "60%" : "" }}
          className={`overflow-hidden overflow-ellipsis whitespace-nowrap `}
        >
          {props.tab.label}
        </div>
      </div>
      <div
        className={`toggle-element absolute top-1/2 right-2 transform  -translate-y-1/2 hover:bg-white px-[1px] py-[2px]  rounded-[4px] ${
          isHovered ? "visible " : "invisible"
        }`}
      >
        <PiDotsThreeBold className="text-[16px]   text-customIcon" />
      </div>
    </div>
  );
};

export default ButtonMenu;
