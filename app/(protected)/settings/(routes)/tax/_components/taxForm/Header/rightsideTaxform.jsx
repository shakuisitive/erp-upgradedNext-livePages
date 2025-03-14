"use client"
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { useSelector } from "react-redux";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { Inventory } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";

const TaxRuleRight = ({
  isError,
  province,
  setProvince,
  country,
  setCountry,
  setCountryName,
  taxName,
  setTaxName,
  taxRate,
  settaxRate,

  
}) => {
  
  const [provinceStateList, setProvinceStateList] = useState([]);
  let [error, sendRequest] = useApiFetch();
console.log(provinceStateList,"provincelist");

  


  const handleCountry = (e) => {
    const selectedId = e.target.value;
    const selectedOption = countryList.find(
      (option) => option.id === selectedId,
     
    );
  
    
    setCountry(selectedOption?.id);
    setCountryName(selectedOption?.label);
  };

 console.log(handleCountry,"function");
 
  const handleProvinceState = (e) => {
    setProvince(e.target.value);
  
  };
    console.log(province,"setprovince");


const handlTaxName = (e)=>{
  setTaxName(e.target.value)
}

const handleTaxRate = (e)=>{
  settaxRate(Number(e.target.value))
}
  const countryList = [
    { id: "US", label: "United State" },
    { id: "CA", label: "Canada" },
  ]

  // console.log(countryList,"list");
  // const handleProvince = (data) => {
  //   setProvinceStateList(data?.Result);
  //   console.log(setProvinceStateList,"setprovince");
  //   console.log(data,"data");
    
  // };

  //f
  const handleProvince = (data) => {
    console.log(data); // Log data to inspect the structure
    if (data?.Result) {
      setProvinceStateList(data.Result); // Make sure data.Result is the list of provinces
    } else {
      console.error("Provinces data is missing or malformed", data);
    }
  };
  
  const payloadProvince = {
    data: {
      FINZ_FLAG: "",
      OFFSET: "",
      ORDER: "",
      RNUM_FROM: "",
      RNUM_TO: "",
      SEARCH: "",
      VOID_FLAG: "",
    },
    action: "Inventory",
    method: "GetProvinceState",
    username: "admin",
    type: "rpc",
    tid: "144",
  };


const Token =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("tokenSession")
    : null;
  
  // useEffect(() => {
  //   // console.log("country id payload", payloadProvince);


  //   sendRequest(
  //     Inventory.GetProvinceState,
  //     "POST",
  //     payloadProvince,
  //     handleProvince,
  //     Token
        
  //   );
  // }, [country]);
  //f
  useEffect(() => {
    if (country) {
      sendRequest(
        Inventory.GetProvinceState,
        "POST",
        payloadProvince,
        handleProvince,
        Token
      );
    }
  }, [country]);
  
  return (
    <div className="w-full h-full bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-12 px-12 tablet:w-full">
      
  
      {/* <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={countryList}
            optionKeyId = "id"
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
      </div> */}

      {/* f */}
       {/* Country Selection */}
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
          <div className="items-center flex gap-2 text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500">Please Enter Country </span>
          </div>
        )}
      </div>
    </div>

      {/* <div className="grid grid-cols-[170px_auto] mb-[12px]">
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
      </div> */}

      {/* ff */}
         {/* Province Selection */}
    <div className="grid grid-cols-[170px_auto] mb-[12px]">
      <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
        Province
      </label>
      <div>
        <UseSelect
          options={provinceStateList}
          optionKeyId="PROSTA_ID" // Ensure the correct key for the value
          optionKeyValue="PROVIENCE_NAME" // Ensure the correct key for the label
          value={province}
          onChange={handleProvinceState}
          placeholder={provinceStateList.length === 0 ? "Loading provinces..." : "Please Select"}
        />
        {!province && isError && (
          <div className="items-center flex gap-2 text-[14px] relative text-customblack">
            <FaCircleInfo />
            <span className="text-red-500">Please Enter Province </span>
          </div>
        )}
      </div>
    </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
        Name<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
           value={taxName}
           onChange={handlTaxName}
            placeholder="Enter Tax Name" 
            isRequired={true}
    
          />
           {!taxName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Tax Name </span>
            </div>
          )} 
        </div> 
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Rate<span className="text-red-600">*</span> <span>(%)</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="number"
            value={taxRate}
            onChange={handleTaxRate}
            isRequired={true}
            placeholder="Enter Tax Rate" 
          />
           {!taxRate && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 "> </span>
            </div>
          )} 
        </div>
      </div>


    </div>
  );
};

export default TaxRuleRight;
