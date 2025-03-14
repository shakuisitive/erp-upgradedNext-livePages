import { FaPencil } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa';
import React, { useState } from 'react';
import UseInput from './../../../../../../../../../components/misc/pureComponents/textinput/InputHook';
import UseSelect from '../../../../../../../../../components/misc/pureComponents/textinput/UseSelect';


const PMAttributeLeft = () => {

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
        <div className="w-full h-[340px] mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border p-10 tablet:w-full">
            <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Brand</label>
                <UseSelect
                    id="mySelect"
                    options={options}
                //value={selectedValue}
                //onChange={handleSelectChange}
                />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Warranty</label>
                <div className="grid grid-cols-[auto_1fr] items-center gap-[12px]">
                    <input type="checkbox" className='h-[38px] w-[38px]' />
                    <UseSelect
                        id="mySelect"
                        options={options}
                    //value={selectedValue}
                    //onChange={handleSelectChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Visibility</label>
                <UseSelect
                    id="mySelect"
                    options={options}
                //value={selectedValue}
                //onChange={handleSelectChange}
                />
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Category</label>
                <UseSelect
                    id="mySelect"
                    options={options}
                //value={selectedValue}
                //onChange={handleSelectChange}
                />
            </div>
            <div className="grid grid-cols-[150px_1fr_1fr] items-center gap-[18px] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">Effective Date</label>
                <input type="date" className="bg-white text-[14px] focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]" />
                <input type="date" className="bg-white text-[14px] focus:outline-none focus:unset border-b py-[8px] pl-[12px] pr-[36px]" />
            </div>
        </div>
    )
}

export default PMAttributeLeft
