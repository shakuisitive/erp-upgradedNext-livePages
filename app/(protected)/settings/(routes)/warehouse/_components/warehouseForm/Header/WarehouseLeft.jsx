import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import TextArea from "../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const WarehouseLeft = ({
  warCode,
  setWarCode,
  desc,
  setDesc,
  address1,
  setAddress1,
  notes,
  setNotes,
  isError,
  postal,
  setPostal,
}) => {
  const [validation, setValidation] = useState(true);
  let [error, sendRequest] = useApiFetch();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  const handleCode = (e) => {
    setWarCode(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "WAREHOUSE_NAME",
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
  };
  const getCustCode = (data) => {
    if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const handleAddress1 = (e) => {
    setAddress1(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  const handlePostalCode = (e) => {
    let pCode = e.target.value;
    let formattedCode = pCode;
    if (/[a-zA-Z]/.test(pCode)) {
      formattedCode = pCode.toUpperCase();

      if (formattedCode.length > 7) {
        formattedCode = formattedCode.slice(0, 7);
      }

      if (formattedCode.length > 3 && formattedCode.charAt(3) !== " ") {
        formattedCode =
          formattedCode.slice(0, 3) + " " + formattedCode.slice(3);
      }
    } else if (/^\d+$/.test(pCode)) {
      formattedCode = pCode.slice(0, 5);
    }
    setPostal(formattedCode);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={warCode}
            onChange={handleCode}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Warehouse Code"
          />
          {!warCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Please Enter Warehouse Code{" "}
              </span>
            </div>
          )}
          {!validation && warCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Warehouse Code Already Exist
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Address<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address1}
            placeholder=" Warehouse Address "
            isRequired={true}
            onChange={handleAddress1}
          />
          {!address1 && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Address </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Description<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={desc}
            placeholder=" Warehouse Description "
            isRequired={true}
            onChange={handleDesc}
          />
          {!desc && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Description </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Postal/Zip Code<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={postal}
            onChange={handlePostalCode}
            placeholder="Postal/Zip Code "
          />
          {!postal && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Postal Code </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Notes
        </label>
        <TextArea
          label="Comments"
          value={notes}
          placeHolder="Comments"
          onChange={handleNotes}
        />
      </div>
    </div>
  );
};
export default WarehouseLeft;
