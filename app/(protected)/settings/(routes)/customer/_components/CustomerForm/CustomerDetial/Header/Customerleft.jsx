import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import TextArea from "../../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import { ItemMaster } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { FaCircleInfo } from "react-icons/fa6";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";

const Customerleft = ({
  password,
  setPassword,
  custCode,
  setCustCode,
  custName,
  setCustName,
  phone1,
  setPhone1,
  email1,
  setEmail1,
  address1,
  setAddress1,
  address2,
  setAddress2,
  postalCode,
  setPostalCode,
  province,
  setProvince,
  city,
  setCity,
  country,
  setCountry,
  notes,
  setNotes,
  warID,
  setWarID,
  date,
  setDate,
  purGroID,
  setPurGroID,
  isError,
  couID,
  setCouID,
}) => {
  const warehouseList = useSelector((state) => state.customerSlice.warehouse);
  const countryList = useSelector((state) => state.customerSlice.countryList);
  const purchaseG = useSelector((state) => state.customerSlice.purchaseGroup);
  const provinceList = useSelector((state) => state.customerSlice.province);
  const [filterProvinceList, setFilterProvinceList] = useState([]);

  useEffect(() => {
    const filteredProvinces = provinceList.filter(
      (province) => province.COUNTRY_NAME === country
    );
    setFilterProvinceList(filteredProvinces);
  }, [country]);

  const CusteditDetForm = useSelector(
    (state) => state.customerSlice.CusteditDetForm
  );
  const [validation, setValidation] = useState(true);
  const [checkEmail, setCheckEmail] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);

  let [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const handleCode = (e) => {
    setCustCode(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "CUSTOMER_CODE",
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
      token
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
    setCustName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail1(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
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
  const handlePhone = (e) => {
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
  const handleCity = (e) => {
    setCity(e.target.value);
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
  const handleProvince = (e) => {
    setProvince(e.target.value);
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
    setPostalCode(formattedCode);
  };

  const handleWarehouse = (e) => {
    setWarID(e.target.value);
  };
  const handlePurchaseG = (e) => {
    setPurGroID(e.target.value);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };
  const handleDateAdd = (date) => {
    setDate(date);
  };
  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
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
            value={custCode}
            onChange={handleCode}
            disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder=" Customer Code"
          />
          {!custCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Customer Code </span>
            </div>
          )}
          {!validation && custCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Customer Code Already Exist</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Name"
            onChange={handleName}
            value={custName}
            isRequired={true}
          />
          {!custName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Name </span>
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
            type="email"
            value={email1}
            isRequired={true}
            onChange={handleEmail}
            onBlur={handleBlurEmail}
            placeholder=" Email"
          />

          <div className="flex items-center gap-2 text-[14px] relative text-customblack">
            {!email1 && isError && (
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
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Password <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            // isRequired={true}
          />
          {/* {!phone1 && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Phone </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Phone <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="Phone"
            value={phone1}
            onChange={handlePhone}
            isRequired={true}
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
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Ship Addr 1<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={address1}
            placeholder=" Shipping Address Line 1"
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
          Ship Addr 2
        </label>
        <UseInput
          type="text"
          value={address2}
          placeholder=" Shipping Address Line 2"
          onChange={handleAddress2}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          City/Town <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={city}
            onChange={handleCity}
            placeholder="City/Town"
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
          Province/State <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={filterProvinceList}
            optionKeyId="PROSTA_ID"
            optionKeyValue="PROVIENCE_NAME"
            value={province}
            onChange={handleProvince}
            placeholder="Please Select"
          />
          {!province && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select Province </span>
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
            value={postalCode}
            onChange={handlePostalCode}
            placeholder="Postal/Zip Code (shipping)"
          />
          {!postalCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Postal Code </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Default Inventory <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={warehouseList}
            optionKeyId="WAR_ID"
            optionKeyValue="WAREHOUSE"
            value={warID}
            required={true}
            onChange={handleWarehouse}
            placeholder="Please Select"
          />
          {!warID && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select Warehouse </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Purchase Group <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={purchaseG}
            optionKeyId="PURGRO_ID"
            optionKeyValue="CODE"
            value={purGroID}
            onChange={handlePurchaseG}
            placeholder="Please Select"
          />
          {!purGroID && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select Warehouse </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Approval Date
        </label>

        <div className="relative flex flex-col">
          <div
            id="date"
            className="bg-white text-customblack text-sm block w-full p-2.5 cursor-pointer"
            onClick={onDateAdd}
          >
            <div className="flex justify-between items-center">
              <span>{date ? formatDate(date) : "MM/DD/YYYY"}</span>
              <FcCalendar className="cursor-pointer" />
            </div>
          </div>
          {isDatePicker && (
            <div className="absolute right-0 mt-9">
              <DatePicker
                onDateChange={handleDateAdd}
                setIsDatePicker={setIsDatePicker}
                setPastYears={0}
              />
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
export default Customerleft;
