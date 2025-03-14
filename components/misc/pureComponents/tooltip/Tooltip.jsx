import React, { useState } from "react";

const Tooltip = ({ content, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // console.log("this is log", isTooltipVisible);
  return (
    <div className="group ">
      {isTooltipVisible && (
        <div className="absolute z-10 bg-gray-600 text-white w-fit max-w-fit p-2 rounded-md text-sm shadow-lg -mt-16">
          <div className="text-sm ">{content}</div>
        </div>
      )}
      <div
        className="inline-block cursor-pointer"
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
