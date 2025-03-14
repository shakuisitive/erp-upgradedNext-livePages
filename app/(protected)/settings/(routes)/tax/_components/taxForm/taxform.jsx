"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import TaxLeftForm from "./Header/leftsideTaxform";
import TaxRuleRight from "./Header/rightsideTaxform";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeModallForm } from "../../redux/taxSlice";

const TaxForm = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const [taxId, setTaxId] = useState("");
   const [taxRate, settaxRate] = useState("");
   const [taxName, setTaxName] = useState("");
   const [taxRate1, settaxRate1] = useState("");
   const [taxName1, setTaxName1] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("CA");
  const [countryName, setCountryName] = useState("Canada");
  const [active, setActive] = useState(true);

  let [error, sendRequest] = useApiFetch();
  const taxEditDetForm = useSelector(
    (state) => state.tax.taxEditDetForm
  );
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const dispatch = useDispatch();

  const ACTIVE =
    taxEditDetForm?.ACTIVE_FLAG === "Y"
      ? true
      : taxEditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;

      const Payload = {
       NAME: taxName,
       OTHER_NAME: taxName1,
       OTHER_VALUE: taxRate1,
       TAX_VALUE: taxRate,
       PROSTATAX_ID: "",
       PROSTA_ID:province,
         TAX_ID: "",
        TAX_TYPE: "",
       ACTIVE_FLAG: active === true ? "Y":"N" ,
      };
console.log(country,"country");

   const payloadPosttax = {
    data: Payload,
    action: "Administration",
    method: "PostAdmProvinceStateTaxes",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
 console.log("payload", payloadPosttax);

  
  const handlePostTax = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
      console.log(data,"data");
      
    }
  };
  const handleApply = () => {
  
    
    if (
       Payload?.TAX_VALUE != "" &&
       Payload?.TAX_VALUE != undefined &&
       Payload?.OTHER_VALUE != "" &&
       Payload?.OTHER_VALUE != undefined &&
       Payload?.OTHER_NAME != "" &&
       Payload?.OTHER_NAME != undefined &&
       Payload?.NAME != "" &&
      Payload?.NAME!= undefined 
     
      // Payload?.PROVINCE != undefined 
     
    ) {
      console.log("Payload before API request:", Payload);
      sendRequest(
        
         Administration.PostAdmProvinceStateTaxes,
        "POST",
        payloadPosttax,
        handlePostTax,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };
  function toCamelCase(str) {
    return str?.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }
  const provinceLower = toCamelCase(taxEditDetForm?.PROVINCE);
  const otherName = toCamelCase(taxEditDetForm?.OTHER_NAME);
  useEffect(() => {
    if (taxEditDetForm) {
      setTaxId(taxEditDetForm?.TAX_ID);
     
      setCountryName(taxEditDetForm?.COUNTRY);
      if (taxEditDetForm?.COUNTRY === "Canada") {
        setCountry("CA");
      }
      if (taxEditDetForm?.COUNTRY === "United States") {
        setCountry("US");
      }
      setProvince(provinceLower);
      setTaxId(taxEditDetForm?.NAME);
       setTaxName1(otherName);
      //  setDesc(taxEditDetForm?.DESCRIPTION);
      // setBranch(taxEditDetForm?.LOC_ID);
      setActive(ACTIVE);
    }
  }, [taxEditDetForm]);
  
  //

  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex  rounded-lg">
      <div
        className=" flex flex-col relative  border lgdesktop:w-[100%]   desktop:w-[100%] laptop:w-[100%] tablet:w-[100%]
          rounded-md bg-white  "
      >
        <div className="py-2 ml-[50px]">
          <DropdownMenu label="Apply" handleClick={handleApply} />
        </div>

        <div className="py-1 w-full bg-gray-100"></div>
        <div className="h-[98%] overflow-x-auto">
          <div>
            <div className="ml-[50px] my-4">
              <button
                className="poppins flex gap-2  text-[16px] text-[#4ade80]  leading-[27px] font-medium items-center"
                onClick={() => setIsHeader(!isHeader)}
              >
                {isHeader ? (
                  <IoIosArrowUp className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                ) : (
                  <IoIosArrowDown className="text-[15px] text-[#4ade80] leading-[27px] font-medium" />
                )}
                Header
              </button>
            </div>
            {isHeader && (
              <div className="ml-10 ">
                <div className="flex  px-4 mr-2 gap-4  ">
                

                <div className="w-1/2 ">
                    <TaxRuleRight
                       isError={isError}
                       setIsError={setIsError}
                       taxName={taxName}
                       setTaxName={setTaxName}
                       taxRate={taxRate}
                       settaxRate={settaxRate}
                      
                      country={country}
                      setCountry={setCountry}
                      countryName={countryName}
                      setCountryName={setCountryName}
                      province={province}
                      setProvince={setProvince}
                    />
                  </div>

                  <div className="w-1/2 ">
                    <TaxLeftForm
                      isError={isError}
                      setIsError={setIsError}
                      active={active}
                      setActive={setActive}
                      taxName1={taxName1}
                       setTaxName1={setTaxName1}
                       taxRate1={taxRate1}
                       settaxRate1={settaxRate1}
                     
                    />
                  </div>
                 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default TaxForm
