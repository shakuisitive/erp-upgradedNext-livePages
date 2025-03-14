import React from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import TextArea from "../../../../../../../../components/misc/pureComponents/textinput/TextArea";

const VendorRightForm = ({ venActive, setVenActive }) => {
  const options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];
  const handleActive = (event) => {
    setVenActive(event.target.checked);
  };
  return (
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-10 tablet:w-full">
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Active
            </label>
            <ToggleSwitch
              id="active"
              checked={venActive}
              onChange={handleActive}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Transit Method
        </label>
        <UseSelect
          options={options}
          optionKeyId="id"
          optionKeyValue="label"
          // value={values.country}
          // onChange={(value) => setFieldValue("country", value)}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Partner ID
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Email<span className="text-red-500"> *</span>
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Phone<span className="text-red-500"> *</span>
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Fax
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Currency
        </label>
        <UseSelect
          options={options}
          optionKeyId="id"
          optionKeyValue="label"
          // value={values.country}
          // onChange={(value) => setFieldValue("country", value)}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Payment Term
        </label>
        <UseSelect
          options={options}
          optionKeyId="id"
          optionKeyValue="label"
          // value={values.country}
          // onChange={(value) => setFieldValue("country", value)}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Discount %
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Discount Days
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Lead Time
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Cycle
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Min
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          GLA/C#
        </label>
        <UseSelect
          options={options}
          optionKeyId="id"
          optionKeyValue="label"
          // value={values.country}
          // onChange={(value) => setFieldValue("country", value)}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          P/O Min
        </label>
        <TextArea
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default VendorRightForm;
