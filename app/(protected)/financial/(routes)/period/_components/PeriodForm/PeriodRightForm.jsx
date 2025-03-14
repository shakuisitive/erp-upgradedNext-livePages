import React from "react";
import UseInput from "../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import TextArea from "../../../../../../../components/misc/pureComponents/textinput/TextArea";

const PeriodRightForm = ({ periodActive, setperiodActive }) => {
    const handleActive = (event) => {
        setperiodActive(event.target.checked);
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
                            checked={periodActive}
                            onChange={handleActive}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    In a month
                </label>
                <UseInput
                    type="number"
                    //value={value}
                    //onChange={handleInputChange}
                    placeholder="Working Days"
                />
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    In a year
                </label>
                <UseInput
                    type="number"
                    //value={value}
                    //onChange={handleInputChange}
                    placeholder="Working Days"
                />
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Description<span className="text-red-500"> *</span>
                </label>
                <TextArea
                    type="text"
                    //value={value}
                    //onChange={handleInputChange}
                    placeHolder="Description"
                />
            </div>
        </div>
    );
};

export default PeriodRightForm;
