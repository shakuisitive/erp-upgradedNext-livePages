import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const WarehouseRight = ({
  isError,
  active,
  setActive,
  province,
  setProvince,
  city,
  setCity,
  country,
  setCountry,
  branch,
  setBranch,
  branchName,
  setBranchName,
  countryName,
  setCountryName,
}) => {
  const branchList = useSelector((state) => state.warehouseSlice.branch);
  const [accessToken, setAccessToken] = useState();
  const [provinceStateList, setProvinceStateList] = useState([]);
  let [error, sendRequest] = useApiFetch();

  const handleActive = (e) => {
    setActive(e.target.checked);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    const selectedId = e.target.value;
    const selectedOption = countryList.find(
      (option) => option.id === selectedId
    );
    setCountry(selectedOption?.id);
    setCountryName(selectedOption?.label);
  };

  const handleBranch = (e) => {
    const selectedId = +e.target.value;
    const selectedOption = branchList.find(
      (option) => option.LOC_ID === selectedId
    );
    setBranch(selectedOption?.LOC_ID);
    setBranchName(selectedOption?.CODE);
  };
  const handleProvinceState = (e) => {
    setProvince(e.target.value);
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
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-12 px-12 tablet:w-full">
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
          Branch
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={branchList}
            optionKeyId="LOC_ID"
            optionKeyValue="CODE"
            value={branch}
            onChange={handleBranch}
            placeholder="Please Select"
          />
          {!branch && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Branch </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          City<span className="text-red-500"> *</span>
        </label>
        <div className="flex flex-col">
          <UseInput type="text" value={city} onChange={handleCity} />

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
          Country
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
          Province
        </label>
        <div>
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

export default WarehouseRight;
