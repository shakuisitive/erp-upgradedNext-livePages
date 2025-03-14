import React from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import TextArea from "../../../../../../../../components/misc/pureComponents/textinput/TextArea";

const HtCodeLeft = ({
  code,
  setCode,
  name,
  setName,
  desc,
  setDesc,
  notes,
  setNotes,
}) => {
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={code}
            onChange={handleCode}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Code"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Name"
            onChange={handleName}
            value={name}
            // isRequired={true}
          />
        </div>
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
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Notes
        </label>
        <div className="flex flex-col">
          <TextArea
            type="text"
            placeholder="Notes"
            onChange={handleNotes}
            value={notes}
            // isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HtCodeLeft;
