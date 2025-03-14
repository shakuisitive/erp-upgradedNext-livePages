import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import RadioButton from "../../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import { useSelector } from "react-redux";
import { FaCircleInfo } from "react-icons/fa6";
const ShipToRight = ({
  country,
  setCountry,
  countryName,
  setCountryName,
  province,
  setProvince,
  couID,
  setCouID,
  active,
  setActive,
  postal,
  setPostal,
  isError,
  phone,
  setPhone,
}) => {
  const [filterProvinceList, setFilterProvinceList] = useState([]);
  const provinceList = useSelector((state) => state.customerSlice.province);
  const countryList = useSelector((state) => state.customerSlice.countryList);

  useEffect(() => {
    const filteredProvinces = provinceList.filter(
      (province) => province.COUNTRY_NAME === country
    );
    setFilterProvinceList(filteredProvinces);
  }, [country]);

  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const handleProvinceState = (e) => {
    setProvince(e.target.value);
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
  const handlePostal = (e) => {
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
  const option = [
    {
      id: 1,
      value: "hello",
    },
  ];
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[45px]">
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
          Phone <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={phone}
            onChange={handlePhone}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Phone"
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
            onChange={handlePostal}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
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
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={countryList}
            optionKeyId="COU_ID"
            optionKeyValue="COUNTRY_NAME"
            value={couID}
            onChange={handleCountry}
            placeholder="Please Select"
          />
          {!couID && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select Country </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Province
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={filterProvinceList}
            optionKeyId="PROSTA_ID"
            optionKeyValue="PROVIENCE_NAME"
            value={province}
            onChange={handleProvinceState}
            placeholder="Please Select"
          />
          {/* {!province && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select Province </span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ShipToRight;
