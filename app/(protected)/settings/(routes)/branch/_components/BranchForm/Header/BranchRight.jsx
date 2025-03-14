import React, { useEffect, useState } from "react";

import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { FaCircleInfo } from "react-icons/fa6";

const BranchRight = ({
  country,
  setCountry,
  setCountryName,
  address1,
  setAddress1,
  address2,
  setAddress2,
  active,
  setActive,
  postal,
  setPostal,
  city,
  setCity,
  province,
  setProvince,
  isError,
  setIsError,
}) => {
  const [provinceStateList, setProvinceStateList] = useState([]);

  let [error, sendRequest] = useApiFetch();

  const countryList = [
    { id: "CA", label: "Canada" },
    { id: "US", label: "United States" },
  ];
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const handleCountry = (e) => {
    const selectedId = e.target.value;
    const selectedOption = countryList.find(
      (option) => option.id === selectedId
    );
    setCountry(selectedOption?.id);
    setCountryName(selectedOption?.label);
  };
  const handleActive = (e) => {
    setActive(e.target.checked);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleBranchName = (e) => {
    setBranchName(e.target.value);
  };
  const handleBranchManager = (e) => {
    setBranchManager(e.target.value);
  };
  const handleProvinceState = (e) => {
    // lowercase = e.target.value.toLowercase();
    setProvince(e.target.value);
  };
  const handleProvince = (data) => {
    setProvinceStateList(data?.Result);
  };
  const handleAddress1 = (e) => {
    setAddress1(e.target.value);
  };
  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
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

  const payloadProvince = {
    data: {
      COUNTRY_CODE: country,
    },
    action: "Administration",
    method: "GetStatesProvincesOfCountry",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  useEffect(() => {
    // console.log("country id payload", payloadProvince);

    sendRequest(
      Administration.GetStatesProvincesOfCountry,
      "POST",
      payloadProvince,
      handleProvince,
      Token
    );
  }, [country, Token]);
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[150px_auto] items-center mb-[58px]">
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
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Address<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address1}
            placeholder=" Address Line 1"
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
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="code"
        ></label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address2}
            placeholder=" Address Line 2 "
            isRequired={true}
            onChange={handleAddress2}
          />
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          City<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={city}
            onChange={handleCity}
            placeholder="City"
          />
          {!city && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter City </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Postal Code<span className="text-red-600">*</span>
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
          Country<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={countryList}
            optionKeyId="id"
            optionKeyValue="label"
            value={country}
            onChange={handleCountry}
            placeholder="Please Select"
          />
          {!country && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Country </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Province<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={provinceStateList}
            optionKeyId="STATE_PROVINCE"
            optionKeyValue="STATE_PROVINCE"
            value={province}
            onChange={handleProvinceState}
            placeholder="Please Select"
          />
          {!province && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Province </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchRight;
