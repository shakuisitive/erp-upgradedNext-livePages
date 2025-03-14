import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import UseInput from '../../../../../../../../../components/misc/pureComponents/textinput/InputHook'
import ToggleSwitch from '../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch'
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";

const PMDetailRight = () => {

  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
    console.log("Input Changed:", e.target.value);

  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("Select Changed:", e.target.value);
  };

  return (
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-10 tablet:w-full">
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">Active</label>
            <ToggleSwitch id="active" />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label className="w-[150px] p-[8px] font-[500] text-[14px]" htmlFor="code">Manage Stock</label>
            <ToggleSwitch id="manage-stock" />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label className="w-[150px] p-[8px] font-[500] text-[14px]" htmlFor="code">Shop Supply</label>
            <ToggleSwitch id="shop-supply" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">Allow Back Order</label>
            <ToggleSwitch id="order" />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label className="w-[150px] p-[8px] font-[500] text-[14px]" htmlFor="code">Clearance</label>
            <ToggleSwitch id="clearance" />
          </div>
          <div className="grid grid-cols-[130px_auto]">
            <label className="w-[150px] p-[8px] font-[500] text-[14px]" htmlFor="code">Restricted</label>
            <ToggleSwitch id="restricted" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Type</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Class</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Group</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Sub Group</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">UoM</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Conv, UoM</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Conv, Qty</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">OH Qty</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Item L X W X H</label>
        <div className="grid grid-cols-[auto_auto_auto_34%] text-[14px] gap-4 relative">
          <UseInput type='number' placeholder='Lenght' id="" />
          <UseInput type='number' placeholder='Width' id="" />
          <UseInput type='number' placeholder='Height' id="" />

          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Item Weight</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Shipping Weight</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Box DM L X W X H</label>
        <div className="grid grid-cols-[auto_auto_auto_34%] text-[14px] gap-4 relative">
          <UseInput type='number' placeholder='Lenght' id="" />
          <UseInput type='number' placeholder='Width' id="" />
          <UseInput type='number' placeholder='Height' id="" />

          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Box Weight</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Shipping Weight</label>
          <UseSelect
            id="mySelect"
            options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PMDetailRight;
