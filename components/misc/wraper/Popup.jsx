import React, { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";

const Popup = ({ wid, lable, Icon, children, openPopup, setOpenPopup, id }) => {
  const [isOpen, setIsOpen] = useState();
  const handleOpen = () => {
    if (openPopup == id) {
      setOpenPopup(null);
    } else {
      setOpenPopup(id);
    }
  };
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setOpenPopup(false);
      }
    };

    if (openPopup) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openPopup]);

  return (
    <div className="  relative border cursor-pointer text-14px hover:bg-customHover text-customblack rounded-[4px]  border-transparent flex gap-2 items-center p-1">
      <div onClick={handleOpen} className="flex gap-2">
        <Icon className="text-[18px] text-customIcon" />
        {lable}
      </div>
      {openPopup == id && (
        <div
          ref={tooltipRef}
          style={{ width: wid ? wid : "fit-content" }}
          className=" absolute -left-[10px] top-8  max-h-fit overflow-auto mt-2  bg-gray-50 border  rounded-lg shadow-lg z-50 p-5  "
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popup;
