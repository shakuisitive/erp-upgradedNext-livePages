import React, { useEffect, useState } from "react";
import TextArea from "../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";

const BranchLeft = ({
  locCode,
  setLocCode,
  branchName,
  setBranchName,
  branchManager,
  setBranchManager,
  tenId,
  setTenId,
  phone,
  setPhone,
  email,
  setEmail,
  notes,
  setNotes,
  isError,
  setIsError,
}) => {
  const [validation, setValidation] = useState(true);
  let [error, sendRequest] = useApiFetch();
  const [accessToken, setAccessToken] = useState();
  const [checkEmail, setCheckEmail] = useState(false);

  const organizationList = useSelector(
    (state) => state.branchSlice.organization
  );
  const locEditDetForm = useSelector(
    (state) => state.branchSlice.locEditDetForm
  );
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  const handleCode = (e) => {
    setLocCode(e.target.value);

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

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  const handleBranchName = (e) => {
    setBranchName(e.target.value);
  };
  const handleBranchManager = (e) => {
    setBranchManager(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setCheckEmail(true);
      setEmail(email);
    } else {
      setCheckEmail(false);
    }
  };
  const handlePhone = (e) => {
    setPhone(
      e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1)-$2")
        .replace(/(\d{3})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    );
  };
  const handleOrganization = (e) => {
    setTenId(e.target.value);
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
            value={locCode}
            onChange={handleCode}
            disabled={!!locEditDetForm?.CODE}
            placeholder=" Code"
          />
          {!locCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Location Code</span>
            </div>
          )}
          {!validation && locCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Location Code Already Exist</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Branch Name<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={branchName}
            placeholder=" Branch Name "
            isRequired={true}
            onChange={handleBranchName}
          />
          {!branchName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Branch Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Branch Manager<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={branchManager}
            placeholder=" Branch Manager Name "
            isRequired={true}
            onChange={handleBranchManager}
          />
          {!branchManager && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">
                Please Enter Branch Manager Name{" "}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Organization<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={organizationList}
            optionKeyId="TEN_ID"
            optionKeyValue="CORPORATE_NAME"
            value={tenId}
            onChange={handleOrganization}
            disabled={!!locEditDetForm?.TEN_ID}
            placeholder="Please Select"
          />
          {!tenId && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Organiztion </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Email<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={email}
            onChange={handleEmail}
            onBlur={handleBlurEmail}
            placeholder="Email "
          />
          {!email && isError && (
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
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Phone<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={phone}
            onChange={handlePhone}
            placeholder="Phone "
          />
          {!phone && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Phone </span>
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

export default BranchLeft;
