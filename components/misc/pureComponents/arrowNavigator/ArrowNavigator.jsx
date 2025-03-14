"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ArrowNavigator = (props) => {
  const [showNav, setShowNav] = useState(true);

  const onClickHandle = async () => {
    setShowNav(!showNav);
  };
  return (
    <div
      className="rounded-full p-1 cursor-pointer border text-customblack border-grayBlack"
      onClick={onClickHandle}
    >
      <IoIosArrowDown className={`${showNav ? "rotate-180" : ""}`} />
    </div>
  );
};

export default ArrowNavigator;
