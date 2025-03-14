import React, { use, useEffect, useState } from "react";
import DropdownMenu from "../../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CustomerPaymentLeft from "./Header/CustomerPaymentLeft";
import CustomerPaymentRight from "./Header/CustomerPaymentRight";
import { set } from "date-fns";
import { Administration } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { closeModal } from "../../../_redux/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";

const CustomerPayment = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [paymentType, setPaymentType] = useState("CREDIT_CARD");
  const [payterId, setPayterID] = useState("");
  const [creditLimit, setCreditLimit] = useState("");

  const [name, setName] = useState("");
  const [CC, setCC] = useState("");
  const [expiry, setExpiry] = useState("");
  const [CVV, setCVV] = useState("");
  const [transitID, setTransitID] = useState("");
  const [bankID, setBankID] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  let [error, sendRequest] = useApiFetch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const dispatch = useDispatch();
  const CusteditDetForm = useSelector(
    (state) => state.customerSlice.CusteditDetForm
  );
  const MASS_CUSTOMER_FLAG =
    CusteditDetForm?.MASS_CUSTOMER_FLAG === "Y"
      ? "mass"
      : CusteditDetForm?.MASS_CUSTOMER_FLAG === "N"
      ? "prepay"
      : "mass";
  const ACTIVE =
    CusteditDetForm?.ACTIVE_FLAG === "Y"
      ? "Y"
      : CusteditDetForm?.ACTIVE_FLAG === "N"
      ? "N"
      : "Y";
  const ADDRESS_SAME_FLAG =
    CusteditDetForm?.ADDRESS_SAME_FLAG === "Y"
      ? "Y"
      : CusteditDetForm?.ADDRESS_SAME_FLAG === "N"
      ? "N"
      : "Y";
  const PAYMENT_TYPE =
    CusteditDetForm?.PAYMENT_TYPE === "CREDIT_CARD"
      ? "CREDIT_CARD"
      : "INTERACT";
  const ACK_REQUIRED_FLAG = CusteditDetForm?.ACK_REQUIRED_FLAG ? true : false;
  const SPS_CUSTOMER_FLAG =
    CusteditDetForm?.SPS_CUSTOMER_FLAG === "Y"
      ? "SPS"
      : CusteditDetForm?.SPS_CUSTOMER_FLAG === "N"
      ? "NonSPS"
      : "NonSPS";
  const payload = {
    CUS_ID: CusteditDetForm?.CUS_ID,
    PARPRICLIST_ID: CusteditDetForm?.PARPRICLIST_ID,
    CODE: CusteditDetForm?.CUSTOMER_CODE,
    NAME: CusteditDetForm?.CUSTOMER_NAME,
    ADDRESS_1: CusteditDetForm?.ADDRESS_1,
    ADDRESS_2: CusteditDetForm?.ADDRESS_2,
    PROSTA_ID: CusteditDetForm?.PROSTA_ID,
    PROVSTA_CODE: "",
    CITY: CusteditDetForm?.CITY,
    POSTAL_CODE: CusteditDetForm?.POSTAL_CODE,
    EMAIL: CusteditDetForm?.EMAIL,
    PHONE_1: CusteditDetForm?.PHONE_1,
    PHONE_2: CusteditDetForm?.PHONE_2,
    FAX_1: "",
    INSURANCE_EXPIRY_DATE: "",
    INSURANCE_COMPANY: "",
    INSURANCE_LIABILITY_LIMIT: "",
    INSURANCE_NOTES: "",
    SHOSUP_ID: "",
    LABRAT_ID: "",
    LABRAT_ID_FUEL: "",
    PARCON_ID: "",
    PAYTER_ID: payterId,
    CUSUNIGRO_ID: "",
    MAIGRO_ID: "",
    CARD_VERIFICATION_VALUE: CVV,
    CREDIT_CARD_NUMBER: CC,
    CREDIT_LIMIT: creditLimit,
    CREDIT_CARD_EXP_MONTH_YEAR: expiry,
    CREDIT_LIMIT_APPROV_DATE: CusteditDetForm?.CREDIT_LIMIT_APPROVAL_DATE,
    REQUIRES_WO_PO_FLAG: "",
    REQUIRES_RTMI_PO_FLAG: "",
    REQUIRES_WO_CUSTOMER_PROOF: "",
    BUSINESS_NUMBER: "",
    WO_INSTRUCTION_NOTES: "",
    RTMI_INSTRUCTION_NOTES: "",
    NO_RENT_LEASE_FLAG: "",
    NOTES: CusteditDetForm?.NOTES,
    ACTIVE_FLAG: ACTIVE,
    BILLING_INSTRUCTION_NOTES: "",
    CREDIT_CARD_EXP_DATE: "",
    PURGRO_ID: CusteditDetForm?.PURGRO_ID,
    PAYMENT_TYPE:
      paymentType === "CREDIT_CARD"
        ? "CREDIT_CARD"
        : paymentType === "INTERACT"
        ? "INTERACT"
        : null,

    CREDIT_CARD_NAME: name,
    TRANSIT_NUMBER: transitID,
    INSTITUTION_NUMBER: bankID,
    ACCOUNT_TITLE: accountTitle,
    ACCOUNT_NUMBER: accountNum,
    ADDRESS_SAME_FLAG: CusteditDetForm?.ADDRESS_SAME_FLAG,
    CUSGRO_ID: "",
    BILLING_CITY: CusteditDetForm?.BILLING_CITY,
    BILLING_PROSTA_ID: CusteditDetForm?.BILLING_PROSTA_ID,
    BILLING_POSTAL_CODE: CusteditDetForm?.BILLING_POSTAL_CODE,
    MASS_CUSTOMER_FLAG: CusteditDetForm?.MASS_CUSTOMER_FLAG,
    WAR_ID_DEFAULT: CusteditDetForm?.WAR_ID_DEFAULT,
    REGISTRATION_NUMBER: "",
    DISCOUNT_PERCENTAGE: CusteditDetForm?.DISCOUNT_PERCENTAGE,
    DISGRP_ID: CusteditDetForm?.DISGRP_ID,
    PROVINCE: "",
    COUNTRY: CusteditDetForm?.COUNTRY,
    BILLING_PROVINCE: "",
    BILLING_COUNTRY: CusteditDetForm?.BILLING_COUNTRY,
    USE_ID: "2694",
    TRADING_PARTNER_NUMBER: CusteditDetForm?.trading_partner_number,
    SHIPPING_ADDRESS_2: CusteditDetForm?.BILLING_ADDRESS_1,
    BILLING_ADDRESS_2: CusteditDetForm?.BILLING_ADDRESS_2,
    EMAIL_2: CusteditDetForm?.EMAIL_2,
    PASSWORD: CusteditDetForm?.Password,
    SPS_CUSTOMER_FLAG: CusteditDetForm?.SPS_CUSTOMER_FLAG,
    ACK_REQUIRED_FLAG: CusteditDetForm?.ACK_REQUIRED_FLAG,
    ADDITIONAL_DISCOUNT_PERCENTAGE:
      CusteditDetForm?.ADDITIONAL_DISCOUNT_PERCENTAGE,
    ADDITIONAL_DISCOUNT_VALUE: CusteditDetForm?.ADDITIONAL_DISCOUNT_VALUE,
  };
  const payloadCustomer = {
    data: payload,
    action: "Administration",
    method: "PostCustomers",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleCustomer = (data) => {
    if (data?.CODE === "SUCCESS") {
      dispatch(closeModal());
    }
  };
  const handleApply = () => {
    // console.log("payload", payloadCustomer);
    sendRequest(
      Administration.PostCustomers,
      "POST",
      payloadCustomer,
      handleCustomer,
      token
    );
    // if (
    //   payload?.CODE != "" &&
    //   payload?.CODE != undefined &&
    //   payload?.NAME != "" &&
    //   payload?.NAME != undefined &&
    //   payload?.WAR_ID_DEFAULT != "" &&
    //   payload?.WAR_ID_DEFAULT != undefined &&
    //   payload?.ADDRESS_1 != "" &&
    //   payload?.ADDRESS_1 != undefined &&
    //   payload?.EMAIL != "" &&
    //   payload?.EMAIL != undefined &&
    //   payload?.PHONE_1 != "" &&
    //   payload?.PHONE_1 != undefined &&
    //   payload?.PURGRO_ID != "" &&
    //   payload?.PURGRO_ID != undefined &&
    //   payload?.CITY != "" &&
    //   payload?.CITY != undefined &&
    //   payload?.POSTAL_CODE != "" &&
    //   payload?.POSTAL_CODE != undefined &&
    //   payload?.PROSTA_ID != "" &&
    //   payload?.PROSTA_ID != undefined
    // ) {
    //   sendRequest(
    //     Administration.PostCustomers,
    //     "POST",
    //     payloadCustomer,
    //     handleCustomer,
    //     token
    //   );
    // } else {
    //   setEMessage("Please Fill all Mandatory(*) Fields");
    //   setIsErrorMessage(true);
    //   setIsError(true);
    // }
  };
  // useEffect(() => {
  //   if (CusteditDetForm?.CREDIT_CARD_NUMBER) {
  //     let cCardNo = CusteditDetForm?.CREDIT_CARD_NUMBER;
  //     let lastThreeDigits = cCardNo.slice(-3);
  //     let newString = `xxxx-xxxx-xxxx-x${lastThreeDigits}`;
  //     setCC(newString);
  //   }
  // }, []);

  useEffect(() => {
    if (CusteditDetForm) {
      setCreditLimit(CusteditDetForm?.CREDIT_LIMIT);
      setCC(CusteditDetForm?.CREDIT_CARD_NUMBER);
      setCVV(CusteditDetForm?.CARD_VERIFICATION_VALUE);
      setPayterID(CusteditDetForm?.PAYTER_ID);
      setExpiry(CusteditDetForm?.CREDIT_CARD_EXP_MONTH_YEAR);
      setTransitID(CusteditDetForm?.TRANSIT_NUMBER);
      setBankID(CusteditDetForm?.INSTITUTION_NUMBER);
      setAccountNum(CusteditDetForm?.ACCOUNT_NUMBER);
      setAccountTitle(CusteditDetForm?.ACCOUNT_TITLE);
      setPaymentType(PAYMENT_TYPE);
      setName(CusteditDetForm?.CREDIT_CARD_NAME);
    }
  }, [CusteditDetForm]);
  return (
    <div className="  h-[98%] mt-[4px] gap-2   flex     rounded-lg">
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
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <CustomerPaymentLeft
                      paymentType={paymentType}
                      setPaymentType={setPaymentType}
                      payterId={payterId}
                      setPayterID={setPayterID}
                      creditLimit={creditLimit}
                      setCreditLimit={setCreditLimit}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <CustomerPaymentRight
                      paymentType={paymentType}
                      transitID={transitID}
                      setTransitID={setTransitID}
                      accountNum={accountNum}
                      setAccountNum={setAccountNum}
                      bankID={bankID}
                      setBankID={setBankID}
                      accountTitle={accountTitle}
                      setAccountTitle={setAccountTitle}
                      name={name}
                      setName={setName}
                      CC={CC}
                      setCC={setCC}
                      expiry={expiry}
                      setExpiry={setExpiry}
                      CVV={CVV}
                      setCVV={setCVV}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )} */}
      </div>
    </div>
  );
};

export default CustomerPayment;
