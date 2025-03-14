import React, { useState } from "react";

import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { useDispatch } from "react-redux";
import {
  setCurentBudgets,
  setPurposedBudgets,
} from "../../../../_redux/chartSlice";

const ChartrightForm = ({
  active,
  setActive,
  purposed,
  setPurposed,
  current,
  setCurrent,
  desc,
  setDesc,
  approvalFlag,
  setApprovalFlag,
}) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleActive = (event) => {
    setActive(event.target.checked);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "gray",
    color: "black",
    text: "Approve",
  });

  // Handle approval flag toggle
  const handleApprovalFlag = () => {
    const newApprovalFlag = approvalFlag === "Y" ? "N" : "Y";
    setApprovalFlag(newApprovalFlag);
    console.log(newApprovalFlag);

    setButtonStyle({
      backgroundColor: newApprovalFlag === "Y" ? "black" : "gray",
      color: newApprovalFlag === "Y" ? "white" : "black",
      text: newApprovalFlag === "Y" ? "Approved" : "Approve",
    });
    alert("clicked");
  };

  const handlePurposed = (e) => {
    const value = e.target.value;

    // Set the purposed value without decimal validation
    setPurposed(value);
    dispatch(setPurposedBudgets(value));

    ///If current value is greater than purposed, show an error
    if (parseFloat(current) > parseFloat(value)) {
      setError("Purposed value cannot be less than current value.");
    } else {
      setError("");
    }
  };

  const handleCurent = (e) => {
    const value = e.target.value;

    // Set the current value without any decimal validation
    setCurrent(value);
    dispatch(setCurentBudgets(value));

    // Validate if current value is greater than purposed
    if (parseFloat(value) > parseFloat(purposed)) {
      setError("Current value cannot be greater than purposed value.");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Active
            </label>
            <ToggleSwitch
              id="active"
              checked={active}
              onChange={handleActive}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-10 ">
        <div className="grid grid-cols-[170px_auto] mb-[12px] ">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Purposed Budget
          </label>
          <div className="flex flex-col">
            <UseInput
              type="text"
              placeholder="Purposed"
              onChange={handlePurposed}
              value={purposed}
              // isRequired={true}
            />
          </div>
        </div>

        {/* Approval Button */}
        <button
          className="px-4 py-3 rounded mb-3 text-xs"
          style={{
            backgroundColor: buttonStyle.backgroundColor,
            color: buttonStyle.color,
          }}
          onClick={handleApprovalFlag}
        >
          {buttonStyle.text}
        </button>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Current Budget
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Overheads"
            onChange={handleCurent}
            value={current}
            // isRequired={true}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Description
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Description"
            onChange={handleDesc}
            value={desc}
            // isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartrightForm;
