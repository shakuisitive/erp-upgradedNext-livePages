import React from "react";

const UseInput = ({
  type = "",
  placeholder = "",
  id,
  onChange,
  onClick,
  disabled,
  isRequired,
  value,
  onBlur,
  name,
  inputClassName,
  checked,
  step,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      disabled={disabled}
      {...(isRequired ? { required: true } : {})}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
      placeholder={placeholder}
      checked={checked}
      step={"0.01"}
      className={`w-full focus:outline-none focus:unset border-b py-2 px-3 ${
        disabled == true ? "bg-[#F6FAFB]  cursor-not-allowed" : ""
      } ${inputClassName}`}
    />
  );
};

export default UseInput;
