import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import TextArea from "../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";

const VendorLeftForm = ({
  venCode,
  setVenCode,
  venName,
  setVenName,
  venEmail1,
  setVenEmail1,
  venAddress1,
  setVenAddress1,
  venPhone,
  setVenPhone,
  venCity,
  setVenCity,
  venCountry,
  setVenCountry,
  venCountryName,
  setVenCountryName,
  venProvince,
  setVenProvince,
  venNotes,
  setVenNotes,
  venDesc,
  setVenDesc,
  venPostal,
  setVenPostal,
  isError,
  setIsError,
}) => {
  let [error, sendRequest] = useApiFetch();
  const [accessToken, setAccessToken] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [validation, setValidation] = useState(true);
  const [provinceStateList, setProvinceStateList] = useState([]);

  const venEditDetForm = useSelector(
    (state) => state.supplierSlice.venEditDetForm
  );
  const handleCode = (e) => {
    setVenCode(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "SUPPLIER_CODE",
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
  const handleName = (e) => {
    setVenName(e.target.value);
  };
  const handleDesc = (e) => {
    setVenDesc(e.target.value);
  };

  const handleEmail = (e) => {
    setVenEmail1(e.target.value);
  };
  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(venEmail1)) {
      setCheckEmail(true);
      setVenEmail1(venEmail1);
    } else {
      setCheckEmail(false);
    }
  };
  const handlePhone = (e) => {
    setVenPhone(
      e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1)-$2")
        .replace(/(\d{3})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    );
  };
  const handleAddress1 = (e) => {
    setVenAddress1(e.target.value);
  };
  const handleCity = (e) => {
    setVenCity(e.target.value);
  };
  const handleProvinceState = (e) => {
    setVenProvince(e.target.value);
  };
  const handleCountry = (e) => {
    const selectedId = e.target.value;
    const selectedOption = countryList.find(
      (option) => option.id === selectedId
    );
    setVenCountry(selectedOption?.id);
    setVenCountryName(selectedOption?.label);
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
    setVenPostal(formattedCode);
  };
  const handleNotes = (e) => {
    setVenNotes(e.target.value);
  };
  const countryList = [
    { id: "CA", label: "Canada" },
    { id: "US", label: "United States" },
  ];
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const handleProvince = (data) => {
    setProvinceStateList(data?.Result);
  };
  const payloadProvince = {
    data: {
      COUNTRY_CODE: venCountry,
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
  }, [venCountry, Token]);

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={venCode}
            onChange={handleCode}
            disabled={!!venEditDetForm?.SUPPLIER_CODE}
          />
          {!validation && venCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Vendor Code Already Exist</span>
            </div>
          )}
          {!venCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Code </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="businessName"
        >
          Business Name<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venName} onChange={handleName} />
          {!venName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="businessName"
        >
          Description
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venDesc} onChange={handleDesc} />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="businessNumber"
        >
          Business#
        </label>

        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="apEmail">
          AP Email<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={venEmail1}
            onChange={handleEmail}
            onBlur={handleBlurEmail}
          />
          {!venEmail1 && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Email </span>
            </div>
          )}
          {checkEmail && (
            <div className="items-center flex gap-2 text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500">Invalid Email Format</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="apPhone">
          AP Phone<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venPhone} onChange={handlePhone} />
          {!venPhone && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Phone </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="apFax">
          AP Fax
        </label>
        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="addressLine1"
        >
          Address Line1<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venAddress1} onChange={handleAddress1} />
          {!venAddress1 && isError && (
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
          htmlFor="addressLine2"
        >
          Address Line2
        </label>

        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="city">
          City/Town<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venCity} onChange={handleCity} />
          {!venCity && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter City </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="country">
          Country<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={countryList}
            optionKeyId="id"
            optionKeyValue="label"
            value={venCountry}
            onChange={handleCountry}
            placeholder="Please Select"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="province">
          Province<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={provinceStateList}
            optionKeyId="STATE_PROVINCE"
            optionKeyValue="STATE_PROVINCE"
            value={venProvince}
            onChange={handleProvinceState}
            placeholder="Please Select"
          />
          {!venProvince && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Province </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="postalCode">
          Postal Code<span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={venPostal} onChange={handlePostalCode} />
          {!venPostal && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Postal Code</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="fob">
          FOB
        </label>

        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label
          className="p-[8px] font-[500] text-[14px]"
          htmlFor="registrationDate"
        >
          Registration Date
        </label>

        <UseInput
          type="text"
          //value={value}
          //onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Notes
        </label>
        <TextArea type="text" value={venNotes} onChange={handleNotes} />
      </div>
    </div>
  );
};

export default VendorLeftForm;
