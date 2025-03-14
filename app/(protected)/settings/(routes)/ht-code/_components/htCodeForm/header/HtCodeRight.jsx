import React from "react";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";

const HtCodeRight = ({
  active,
  setActive,
  forex,
  setForex,
  overheads,
  setOverheads,
  lcCode,
  setLcCode,
  transportFee,
  setTransportFee,
}) => {
  const handleActive = (event) => {
    setActive(event.target.checked);
  };
  const handleForex = (e) => {
    setForex(e.target.value);
  };
  const handleLcCode = (e) => {
    setLcCode(e.target.value);
  };
  const handleTransportFee = (e) => {
    setTransportFee(e.target.value);
  };
  const handleOverheads = (e) => {
    setOverheads(e.target.value);
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
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          LC Code
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={lcCode}
            onChange={handleLcCode}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" LC Code"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Forex
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Forex"
            onChange={handleForex}
            value={forex}
            // isRequired={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Transportation Fee
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Transportation Fee"
            onChange={handleTransportFee}
            value={transportFee}
            // isRequired={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Overheads
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Overheads"
            onChange={handleOverheads}
            value={overheads}
            // isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HtCodeRight;
