import React, { useState } from "react";
import TextArea from "../../../../../../../components/misc/pureComponents/textinput/TextArea";
import { ItemMaster } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const ProdCatagoryLeftForm = ({
    codeValue,
    setcodeValue,
    nameValue,
    setNameValue,
    parentCatagory,
    setParentCatagory,
    descriptionValue,
    setDescriptionValue,
    isError,
    setIsError,
    codes,
}) => {
    const [accessToken, setAccessToken] = useState("");
    const [error, sendRequest] = useApiFetch();

    const handleCodeValue = (e) => {
        const value = e.target.value;

        const payloadUniqueCust = {
            data: {
                CODE: e.target.value.toString(),
                TYPE: "PRODUCT_CATAGORY",
            },
            method: "GetCodeUniqueValidation",
            tid: "144",
            type: "rpc",
            username: "admin",
        };
        sendRequest(
            ItemMaster.GetCodeUniqueValidation,
            "POST",
            payloadUniqueCust,
            getCustCode,
            accessToken
        );
        setcodeValue(value);
    };

    const getCustCode = (data) => {
        if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
            setValidation(true);
        } else {
            setValidation(false);
        }
    };

    const handleNameValue = (e) => {
        setNameValue(e.target.value);
    };

    const handleParentCatagory = (e) => {
        console.log(e.target.value);
        setParentCatagory(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    }

    return (
        <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-20 tablet:w-full">
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Code<span className="text-red-500"> *</span>
                </label>
                <input
                    type="text"
                    value={codeValue}
                    onChange={handleCodeValue}
                    placeholder="Code"
                    className="bg-white w-full border border-gray-300 focus:outline-none focus:border-0 py-[8px] pl-[12px]"
                />
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Name<span className="text-red-500"> *</span>
                </label>
                <input
                    type="text"
                    value={nameValue}
                    onChange={handleNameValue}
                    placeholder="Name"
                    className="bg-white w-full border border-gray-300 focus:outline-none focus:border-0 py-[8px] pl-[12px]"
                />
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Parent Catagory<span className="text-red-500"> *</span>
                </label>
                <select
                    id="parent-catagory"
                    value={parentCatagory}
                    onChange={handleParentCatagory}
                    className="bg-white w-full border border-gray-300 focus:outline-none focus:border-0 py-[8px] pl-[12px]"
                >
                    <option value="">Select...</option>
                    {codes && codes.map((item,index) => (
                        <option
                            className="bg-white border border-gray-300 mt-1 rounded"
                            key={index}
                            value={item.CODE}
                        >
                            {item.CODE}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-[170px_auto] mb-[12px]">
                <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
                    Description<span className="text-red-500"> *</span>
                </label>
                <TextArea
                    type="text"
                    value={descriptionValue}
                    onChange={handleDescriptionChange}
                    placeHolder="Description"
                />
            </div>
        </div>
    );
};

export default ProdCatagoryLeftForm;