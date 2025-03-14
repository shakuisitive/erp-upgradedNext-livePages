import React, { useState, useEffect } from "react";

const TextArea = ({
  placeHolder,
  isDisabled,
  onChange,
  isRequired,
  value,
  onBlur,
  fieldname,
  inputClassName,
}) => {
  return (
    <div className="py-2">
      <textarea
        className={`w-full ${inputClassName} bg-white focus:outline-none outline-none focus:unset min-h-[100px] border-b py-[8px] pl-[12px] pr-[36px]`}
        rows="3"
        placeholder={placeHolder}
        value={value}
        name={fieldname}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={onBlur}
        {...(isRequired ? { required: true } : {})}
      />
    </div>
  );
};

export default TextArea;

//method to call in parent
//  const [commentvalue, setCommentValue] = useState('');
//    const handleCommentChange = (e) => {
//   setInputValue(e.target.value);
// };
{
  /* <TextArea label="Comments" value={commentvalue} placeHolder='Comments' onChange={handleCommentChange} />*/
}
