import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import {
  Administration,
  General,
} from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { FaCircleInfo } from "react-icons/fa6";
import { useSelector } from "react-redux";

const DistributionRight = ({
  province,
  setProvince,
  city,
  setCity,
  country,
  setCountry,
  setCountryName,
  postal,
  setPostal,
  active,
  setActive,
  phone2,
  address1,
  address2,
  setPhone2,
  email2,
  setEmail2,
  couID,
  setCouID,
}) => {
  const [provinceStateList, setProvinceStateList] = useState([]);
  const [checkEmail, setCheckEmail] = useState(false);
  const [filterProvinceList, setFilterProvinceList] = useState([]);
  const provinceList = useSelector((state) => state.customerSlice.province);
  const countryList = useSelector((state) => state.customerSlice.countryList);

  useEffect(() => {
    const filteredProvinces = provinceList.filter(
      (province) => province.COUNTRY_NAME === country
    );
    setFilterProvinceList(filteredProvinces);
  }, [country]);
  let [error, sendRequest] = useApiFetch();
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const handleProvinceState = (e) => {
    setProvince(e.target.value);
  };
  const handleEmail2 = (e) => {
    setEmail2(e.target.value);
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email2)) {
      setCheckEmail(true);
      setEmail2(email2);
    } else {
      setCheckEmail(false);
    }
  };
  const handlePhone2 = (e) => {
    setPhone2(
      e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1)-$2")
        .replace(/(\d{3})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    );
  };

  const handleCountry = (e) => {
    // setCountry(e.target.value);
    const selectedId = +e.target.value;
    const selectedOption = countryList.find(
      (option) => option.COU_ID === selectedId
    );
    setCouID(selectedOption.COU_ID);
    setCountry(selectedOption?.COUNTRY_NAME);
  };

  const handleActive = (e) => {
    setActive(e.target.checked);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[30px]">
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
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Email 2
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={email2}
            onChange={handleEmail2}
            onBlur={handleBlurEmail}
            placeholder=" Email 2"
          />
          {checkEmail && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Invalid Email Format </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Phone 2
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={phone2}
            onChange={handlePhone2}
            placeholder=" Phone 2"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Bill Address 1
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address1}
            placeholder=" Bill Address 1"
            disabled={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Bill Address 2
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address2}
            placeholder=" Bill Address 2"
            disabled={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Zip/Postal
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={postal}
            disabled={true}
            placeholder=" Zip Postal Code"
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
          City
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={city}
            disabled={true}
            placeholder=" City"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country
        </label>
        <UseSelect
          options={countryList}
          optionKeyId="COU_ID"
          optionKeyValue="COUNTRY_NAME"
          value={couID}
          onChange={handleCountry}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Province
        </label>
        <UseSelect
          options={filterProvinceList}
          optionKeyId="PROSTA_ID"
          optionKeyValue="PROVIENCE_NAME"
          value={province}
          onChange={handleProvinceState}
          placeholder="Please Select"
        />
      </div>
    </div>
  );
};

export default DistributionRight;
