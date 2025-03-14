import React from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { FaCircleInfo } from "react-icons/fa6";

const ShipToLeft = ({
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isError,
}) => {
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleAddress1 = (e) => {
    setAddress1(e.target.value);
  };
  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };

  const handleFName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLName = (e) => {
    setLastName(e.target.value);
  };
  const option = [
    {
      id: 1,
      value: "hello",
    },
  ];
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full ">
      <div className="grid grid-cols-[170px_auto] mb-[12px] mt-[20px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          First Name <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={firstName}
            onChange={handleFName}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" First Name"
          />
          {!firstName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter First Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Last Name <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={lastName}
            onChange={handleLName}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Last Name"
          />
          {!lastName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Last Name </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Address 1<span className="text-red-600">*</span>
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
              <span className="text-red-500 ">Please Enter Address 1 </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Address 2
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
    </div>
  );
};

export default ShipToLeft;
