"use client"
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
const TaxLeftForm = ({

  active,
  setActive,
  taxName1,
  setTaxName1,
  taxRate1,
  settaxRate1,
  isError,
}) => {
  
  let [error, sendRequest] = useApiFetch();
   const [accessToken, setAccessToken] = useState();
  
  
  const handleActive = (e) => {
    setActive(e.target.checked)
  };
  
  const handleTaxName2 = (e) => {
    setTaxName1 (e.target.value)
  };

const handlTaxeRate2 = (e) => {
settaxRate1 (Number(e.target.value))
}
  
  // useEffect(() => {
  //   const Token =
  //     typeof localStorage !== "undefined"
  //       ? localStorage.getItem("tokenSession")
  //       : null;
  //   setAccessToken(Token);
  // }, []);
  // const handleCode = (e) => {
  //   setWarCode(e.target.value);

  //   const payloadUniqueCust = {
  //     data: {
  //       CODE: e.target.value.toString(),
  //       TYPE: "WAREHOUSE_NAME",
  //     },
  //     method: "GetCodeUniqueValidation",
  //     tid: "144",
  //     type: "rpc",
  //     username: "admin",
  //   };
  //   sendRequest(
  //     ItemMaster.GetCodeUniqueValidation,
  //     "POST",
  //     payloadUniqueCust,
  //     getCustCode,
  //     accessToken
  //   );
  // };
  // const getCustCode = (data) => {
  //   if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
  //     setValidation(true);
  //   } else {
  //     setValidation(false);
  //   }
  // };



  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">


          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Active
            </label>
            <ToggleSwitch
            id={"active"}
              checked={active}
              onChange={handleActive}
            />
          </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
        Name<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            onChange={handleTaxName2}
            value={taxName1}
            isRequired={true}
            placeholder="Enter Tax Name" 
            
            
          />
          {!taxName1 && isError && (
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
            isRequired={true}
          value={taxRate1}
          onChange={handlTaxeRate2}
            placeholder="Enter Tax Rate" 
          />
          {!taxRate1 && isError && (
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
export default TaxLeftForm;
