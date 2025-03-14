import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";

import {
  Administration,
  ItemMaster,
} from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";
const DistributionLeft = ({
  city,
  setCity,
  phone1,
  setPhone1,
  email1,
  setEmail1,
  postal,
  setPostal,
  locationID,
  setLocationID,
  address1,
  setAddress1,
  address2,
  setAddress2,
  name,
  setName,
  code,
  setCode,
  isError,
}) => {
  const [validation, setValidation] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);
  const distributionEditForm = useSelector(
    (state) => state.customerSlice.distributionEditForm
  );
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
    setCode(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "BRANCH_CODE",
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
  const handlePhone1 = (e) => {
    setPhone1(
      e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1)-$2")
        .replace(/(\d{3})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    );
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
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleLocationID = (e) => {
    setLocationID(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail1(e.target.value);
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email1)) {
      setCheckEmail(true);
      setEmail1(email1);
    } else {
      setCheckEmail(false);
    }
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full ">
      <div className="grid grid-cols-[170px_auto] mb-[12px] mt-[20px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={code}
            onChange={handleCode}
            disabled={!!distributionEditForm?.CODE}
            placeholder=" Code"
          />
          {!validation && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Invalid Customer Branch Code
              </span>
            </div>
          )}
          {!code && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Please Enter Customer Branch Code{" "}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={name}
            onChange={handleName}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Name"
          />
          {!name && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Email <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={email1}
            onChange={handleEmail}
            onBlur={handleBlurEmail}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Email"
          />
          {checkEmail && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Invalid Email Format </span>
            </div>
          )}
          {!email1 && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Email </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Phone <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={phone1}
            onChange={handlePhone1}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Phone"
          />
          {!phone1 && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Phone </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Ship Address 1<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={address1}
            onChange={handleAddress1}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder="Address 1"
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
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Ship Address 2
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            // isRequired={true}
            value={address2}
            onChange={handleAddress2}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Address 2"
          />
          {/* {!custCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Customer Code </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Zip/Postal <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={postal}
            onChange={handlePostalCode}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Zip/Postal"
          />
          {!postal && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Postal </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          City <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={city}
            onChange={handleCity}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" City"
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
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Location ID
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            // isRequired={true}
            value={locationID}
            onChange={handleLocationID}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Location ID"
          />
        </div>
      </div>
    </div>
  );
};

export default DistributionLeft;
