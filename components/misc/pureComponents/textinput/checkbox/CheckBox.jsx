// components/Checkbox.js

import { useState } from "react";

const CheckBox = ({ checked, onChange, value, disabled }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          checked={checked}
          id="checked-checkbox"
          type="checkbox"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </label>
  );
};

export default CheckBox;
