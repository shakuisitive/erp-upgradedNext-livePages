import { FaPencil } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa';
import React, { useState } from 'react';
import UseInput from './../../../../../../../../../components/misc/pureComponents/textinput/InputHook';
import ToggleSwitch from '../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch';
import QuillEditor from './../../../../../../../../../components/misc/pureComponents/editor/QuillEditor';


const PMAttributeRight = () => {

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    function editorHandler(html, text) {
        //console.log(html,text)
    }
    return (
        <div className="w-full h-[340px] mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border p-10 tablet:w-full">
            <div className="grid grid-cols-[1fr_150px] items-center gap-[18px] mb-[12px]">
                <UseInput value={setInputValue} onChange={handleInputChange} type='text' id="" />
                <div className="flex items-center gap-[18px]">
                    <ToggleSwitch />
                    <p>Active</p>
                </div>
            </div>
            <QuillEditor
                toolid={"drawerHome"}
                func={editorHandler}
            />
        </div>
    )
}

export default PMAttributeRight
