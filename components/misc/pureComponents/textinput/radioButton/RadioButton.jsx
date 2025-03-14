const RadioButton = ({ name, value, checked, onChange, disabled }) => {
  return (
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className="form-radio h-5 w-5 text-blue-600 items-center"
    />
  );
};

export default RadioButton;
