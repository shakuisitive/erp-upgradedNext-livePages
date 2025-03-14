import React from "react";
import logo from "../../../assets/logo1.png";
import {
  ControlPointOutlined,
  MoreHoriz,
  NotificationsNone,
} from "@mui/icons-material";
import SelectCountry from "./SelectCountry";
const Header = () => {
  return (
    <header className="text-[1.026vw] w-full select-none  h-[3.07692vw] pt-[0.77vw]  flex justify-between items-center px-[2.051vw] ">
      <div className="logo z-1 flex  items-center gap-[0.5128vw]">
        <img src={logo} alt="" className="w-[2.05128vw] " />
        <h2 className="flex gap-[0.5128vw]">
          <span className="text-[1.026vw]">
            <span className="font-bold">EUT</span>
            <span className="text-green-400">SOL</span>
          </span>
          <span className="text-gray-400 text-[1.026vw]">
            Distribution Management
          </span>
        </h2>
      </div>
      <div className="flex items-center gap-[1.025vw]">
        <div className="icons flex gap-[0.5128vw]">
          <MoreHoriz className="icon" />
          <ControlPointOutlined className="icon" />
          <div>
            <NotificationsNone className="icon" />
            <div className="bg-red-600 rounded-full flex items-center justify-center w-[0.7vw] h-[0.7vw] text-white text-[0.5vw] absolute top-[1.2vw] right-[19.5vw]">
              2
            </div>
          </div>
        </div>
        <div className="country h-[1.5vw]">
          <SelectCountry />
        </div>
        <div className="logo">
          <div className="bg-gray-400 text-red-800 w-[2.05128vw] h-[2.05128vw] flex items-center justify-center font-bold text-[1.282vw]  rounded-full">
            T
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
