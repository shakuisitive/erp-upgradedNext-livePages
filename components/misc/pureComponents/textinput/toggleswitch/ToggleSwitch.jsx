import React, { useState } from "react";

const ToggleSwitch = ({ id, onChange, checked, fieldname, disabled }) => {
  return (
    <div className="flex items-center justify-center">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id={id}
            name={fieldname}
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <div className="toggle-line w-8 h-3 bg-blue-200 rounded-full shadow-inner"></div>
          <div
            className={`toggle-dot absolute w-4 h-4 bg-gray-400 rounded-full shadow -top-[2px] left-0 ${
              checked ? "translate-x-full bg-sky-400" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
