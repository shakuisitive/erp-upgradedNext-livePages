import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Customerleft from "../CustomerForm/CustomerDetial/Header/Customerleft";
import CustomerRight from "../CustomerForm/CustomerDetial/Header/CustomerRight";
import Modal from "../../../../../../../components/misc/pureComponents/modal/Modal";
import DropdownMenu from "../../../../../../../components/misc/pureComponents/buttons/DropdownMenu";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { closeModal } from "../../_redux/customerSlice";
const CustomerDetials = () => {
  const [isHeader, setIsHeader] = useState(true);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [custID, setCustID] = useState("");
  const [custCode, setCustCode] = useState("");
  const [custName, setCustName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [warID, setWarID] = useState();
  const [purGroID, setPurGroID] = useState();
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [couID, setCouID] = useState();
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");

  const [partnerId, setPartnerId] = useState("");
  const [active, setActive] = useState(true);
  const [sameAddress, setSameAddress] = useState(true);
  const [odrAck, setOdrAck] = useState(false);
  const [customerType, setCustomerType] = useState("mass");
  const [SPS, setSPS] = useState("NonSPS");
  const [billaddress1, setBillAddress1] = useState("");
  const [billaddress2, setBillAddress2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [billprovince, setBillProvince] = useState("");
  const [billPostalCode, setBillPostalCode] = useState("");
  const [billCity, setBillCity] = useState("");
  const [billCountry, setBillCountry] = useState("");
  const [billCouID, setBillCouID] = useState();
  const [grpDisc, setGrpDisc] = useState("");
  const [discGId, setDiscGId] = useState();
  const [discValue, setDiscValue] = useState();
  const [discAddValue, setDiscAddValue] = useState();
  const [discPercent, setDiscPercent] = useState();
  const [partPriceList, setPartPriceList] = useState();
  const [partPriceCode, setPartPriceCode] = useState();

  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
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
      ? true
      : CusteditDetForm?.ACTIVE_FLAG === "N"
      ? false
      : true;
  const ADDRESS_SAME_FLAG =
    CusteditDetForm?.ADDRESS_SAME_FLAG === "Y"
      ? true
      : CusteditDetForm?.ADDRESS_SAME_FLAG === "N"
      ? false
      : true;

  const ACK_REQUIRED_FLAG = CusteditDetForm?.ACK_REQUIRED_FLAG ? true : false;
  const SPS_CUSTOMER_FLAG =
    CusteditDetForm?.SPS_CUSTOMER_FLAG === "Y"
      ? "SPS"
      : CusteditDetForm?.SPS_CUSTOMER_FLAG === "N"
      ? "NonSPS"
      : "NonSPS";

  const payload = {
    CUS_ID: custID,
    ACK_REQUIRED_FLAG: odrAck ? "Y" : "N",
    CODE: custCode,
    NAME: custName,
    ADDRESS_1: address1,
    ADDRESS_2: sameAddress ? address2 : billaddress2,
    PROSTA_ID: province,
    CITY: city,
    POSTAL_CODE: postalCode,
    EMAIL: email1,
    PHONE_1: phone1,
    PHONE_2: phone2,
    PASSWORD: password,
    INSURANCE_EXPIRY_DATE: "",
    INSURANCE_COMPANY: "",
    INSURANCE_LIABILITY_LIMIT: "",
    INSURANCE_NOTES: "",
    PARPRICLIST_ID: grpDisc === "manual" ? partPriceList : null,
    DISGRP_ID: grpDisc === "group" ? discGId : null,
    CUSUNIGRO_ID: "",
    MAIGRO_ID: "",
    CARD_VERIFICATION_VALUE: CusteditDetForm?.CARD_VERIFICATION_VALUE,
    CREDIT_CARD_NUMBER: CusteditDetForm?.CREDIT_CARD_NUMBER,
    CREDIT_LIMIT: CusteditDetForm?.CREDIT_LIMIT,
    CREDIT_CARD_EXP_MONTH_YEAR: CusteditDetForm?.CREDIT_CARD_EXP_MONTH_YEAR,
    CREDIT_LIMIT_APPROV_DATE: date,
    CREDIT_CARD_NAME: CusteditDetForm?.CREDIT_CARD_NAME,
    TRANSIT_NUMBER: CusteditDetForm?.TRANSIT_NUMBER,
    INSTITUTION_NUMBER: CusteditDetForm?.INSTITUTION_NUMBER,
    ACCOUNT_TITLE: CusteditDetForm?.ACCOUNT_TITLE,
    ACCOUNT_NUMBER: CusteditDetForm?.ACCOUNT_NUMBER,
    REQUIRES_WO_PO_FLAG: "",
    REQUIRES_RTMI_PO_FLAG: "",
    REQUIRES_WO_CUSTOMER_PROOF: "",
    BUSINESS_NUMBER: "",
    WO_INSTRUCTION_NOTES: "",
    RTMI_INSTRUCTION_NOTES: "",
    NO_RENT_LEASE_FLAG: "",
    NOTES: notes,
    ACTIVE_FLAG: active ? "Y" : "N",
    BILLING_INSTRUCTION_NOTES: notes,
    CREDIT_CARD_EXP_DATE: "",
    PURGRO_ID: purGroID,
    ADDRESS_SAME_FLAG: sameAddress ? "Y" : "N",
    CUSGRO_ID: "",
    BILLING_CITY: sameAddress ? city : billCity,
    BILLING_PROSTA_ID: sameAddress ? province : billprovince,
    BILLING_POSTAL_CODE: sameAddress ? postalCode : billPostalCode,
    SPS_CUSTOMER_FLAG: SPS === "SPS" ? "Y" : SPS === "NonSPS" ? "N" : null,
    MASS_CUSTOMER_FLAG:
      customerType === "mass" ? "Y" : customerType === "prepay" ? "N" : "mass",
    WAR_ID_DEFAULT: warID,
    REGISTRATION_NUMBER: "",
    DISCOUNT_PERCENTAGE: discValue,
    COUNTRY: country,
    BILLING_COUNTRY: sameAddress ? country : billCountry,
    USE_ID: "2694",
    TRADING_PARTNER_NUMBER: partnerId,
    SHIPPING_ADDRESS_2: address2,
    BILLING_ADDRESS_2: sameAddress ? address2 : billaddress2,
    EMAIL_2: email2,
    ADDITIONAL_DISCOUNT_PERCENTAGE: discPercent,
    ADDITIONAL_DISCOUNT_VALUE: discAddValue,
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
    if (
      payload?.CODE != "" &&
      payload?.CODE != undefined &&
      payload?.NAME != "" &&
      payload?.NAME != undefined &&
      payload?.WAR_ID_DEFAULT != "" &&
      payload?.WAR_ID_DEFAULT != undefined &&
      payload?.ADDRESS_1 != "" &&
      payload?.ADDRESS_1 != undefined &&
      payload?.EMAIL != "" &&
      payload?.EMAIL != undefined &&
      payload?.PHONE_1 != "" &&
      payload?.PHONE_1 != undefined &&
      payload?.PURGRO_ID != "" &&
      payload?.PURGRO_ID != undefined &&
      payload?.CITY != "" &&
      payload?.CITY != undefined &&
      payload?.POSTAL_CODE != "" &&
      payload?.POSTAL_CODE != undefined &&
      payload?.PROSTA_ID != "" &&
      payload?.PROSTA_ID != undefined
    ) {
      sendRequest(
        Administration.PostCustomers,
        "POST",
        payloadCustomer,
        handleCustomer,
        token
      );
    } else {
      setEMessage("Please Fill all Mandatory(*) Fields");
      setIsErrorMessage(true);
      setIsError(true);
    }
  };
  useEffect(() => {
    if (CusteditDetForm) {
      setCustID(CusteditDetForm?.CUS_ID);
      setCustCode(CusteditDetForm?.CUSTOMER_CODE);
      setCustName(CusteditDetForm?.CUSTOMER_NAME);
      setEmail1(CusteditDetForm?.EMAIL);
      setEmail2(CusteditDetForm?.EMAIL_2);
      setPurGroID(CusteditDetForm?.PURGRO_ID);
      setCity(CusteditDetForm?.CITY);
      if (CusteditDetForm?.COUNTRY == "CANADA") {
        setCouID(83.0);
        setProvince(CusteditDetForm?.PROSTA_ID);
        setCountry(CusteditDetForm?.COUNTRY);
      }
      if (CusteditDetForm?.COUNTRY == "USA") {
        setCouID(84.0);
        setProvince(CusteditDetForm?.PROSTA_ID);
        setCountry(CusteditDetForm?.COUNTRY);
      }
      setPhone1(CusteditDetForm?.PHONE_1);
      setPhone2(CusteditDetForm?.PHONE_2);
      setPostalCode(CusteditDetForm?.POSTAL_CODE);
      setAddress1(CusteditDetForm?.ADDRESS_1);
      setBillAddress1(CusteditDetForm?.ADDRESS_2);
      setAddress2(CusteditDetForm?.SHIPPING_ADDRESS_2);
      setBillAddress2(CusteditDetForm?.BILLING_ADDRESS_2);
      setDate(CusteditDetForm?.CREDIT_LIMIT_APPROVAL_DATE);
      setNotes(CusteditDetForm?.NOTES);
      setPartnerId(CusteditDetForm?.trading_partner_number);
      setWarID(CusteditDetForm?.WAR_ID_DEFAULT);
      setBillCity(CusteditDetForm?.BILLING_CITY);

      if (CusteditDetForm?.BILLING_COUNTRY == "CANADA") {
        setBillCouID(83.0);
        setBillProvince(CusteditDetForm?.BILLING_PROSTA_ID);
        setBillCountry(CusteditDetForm?.BILLING_COUNTRY);
      }
      if (CusteditDetForm?.BILLING_COUNTRY == "USA") {
        setBillCouID(84.0);
        setBillProvince(CusteditDetForm?.BILLING_PROSTA_ID);
        setBillCountry(CusteditDetForm?.BILLING_COUNTRY);
      }

      setBillPostalCode(CusteditDetForm?.BILLING_POSTAL_CODE);
      setDiscValue(CusteditDetForm?.DISCOUNT_PERCENTAGE);
      if (CusteditDetForm?.PARPRICLIST_ID) {
        setGrpDisc("manual");
        setPartPriceList(CusteditDetForm?.PARPRICLIST_ID);
        setPartPriceCode(CusteditDetForm?.PRICE_LIST_CODE);
      }
      if (CusteditDetForm?.DISGRP_ID) {
        setGrpDisc("group");
        setDiscGId(CusteditDetForm?.DISGRP_ID);
        setDiscAddValue(CusteditDetForm?.ADDITIONAL_DISCOUNT_VALUE);
        setDiscPercent(CusteditDetForm?.ADDITIONAL_DISCOUNT_PERCENTAGE);
      }
      setSameAddress(ADDRESS_SAME_FLAG);
      setActive(ACTIVE);
      setCustomerType(MASS_CUSTOMER_FLAG);
      setSPS(SPS_CUSTOMER_FLAG);
      setOdrAck(ACK_REQUIRED_FLAG);
      setPassword(CusteditDetForm?.Password);
    }
  }, [CusteditDetForm]);

  return (
    <div className="  h-[98%] mt-[4px] gap-2 flex rounded-lg">
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
                {CusteditDetForm.CUS_ID && (
                  <span className="text-red-500 ml-10  font-bold">
                    Note: changing customer type (prepaid/mass), default
                    inventory , or Purchase Group could result in the resetting
                    of sales data for this customer
                  </span>
                )}
                <div className="flex flex-col lg:flex-row mt-[15px] px-4 mr-2 gap-4  ">
                  <div className="w-full lg:w-1/2 ">
                    <Customerleft
                      password={password}
                      setPassword={setPassword}
                      custCode={custCode}
                      setCustCode={setCustCode}
                      custName={custName}
                      setCustName={setCustName}
                      phone1={phone1}
                      setPhone1={setPhone1}
                      email1={email1}
                      setEmail1={setEmail1}
                      address1={address1}
                      setAddress1={setAddress1}
                      address2={address2}
                      setAddress2={setAddress2}
                      postalCode={postalCode}
                      setPostalCode={setPostalCode}
                      province={province}
                      setProvince={setProvince}
                      city={city}
                      setCity={setCity}
                      country={country}
                      setCountry={setCountry}
                      couID={couID}
                      setCouID={setCouID}
                      notes={notes}
                      setNotes={setNotes}
                      warID={warID}
                      setWarID={setWarID}
                      purGroID={purGroID}
                      setPurGroID={setPurGroID}
                      date={date}
                      setDate={setDate}
                      isError={isError}
                      setIsError={setIsError}
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <CustomerRight
                      partnerId={partnerId}
                      setPartnerId={setPartnerId}
                      active={active}
                      setActive={setActive}
                      sameAddress={sameAddress}
                      setSameAddress={setSameAddress}
                      grpDisc={grpDisc}
                      setGrpDisc={setGrpDisc}
                      odrAck={odrAck}
                      setOdrAck={setOdrAck}
                      customerType={customerType}
                      setCustomerType={setCustomerType}
                      SPS={SPS}
                      setSPS={setSPS}
                      billCity={billCity}
                      setBillCity={setBillCity}
                      billCountry={billCountry}
                      setBillCountry={setBillCountry}
                      billCouID={billCouID}
                      couID={couID}
                      setBillCouID={setBillCouID}
                      billaddress1={billaddress1}
                      setBillAddress1={setBillAddress1}
                      billaddress2={billaddress2}
                      setBillAddress2={setBillAddress2}
                      billPostalCode={billPostalCode}
                      setBillPostalCode={setBillPostalCode}
                      city={city}
                      country={country}
                      province={province}
                      address1={address1}
                      address2={address2}
                      postalCode={postalCode}
                      email2={email2}
                      setEmail2={setEmail2}
                      phone2={phone2}
                      setPhone2={setPhone2}
                      discGId={discGId}
                      setDiscGId={setDiscGId}
                      discValue={discValue}
                      setDiscValue={setDiscValue}
                      discPercent={discPercent}
                      setDiscPercent={setDiscPercent}
                      discAddValue={discAddValue}
                      setDiscAddValue={setDiscAddValue}
                      billprovince={billprovince}
                      setBillProvince={setBillProvince}
                      partPriceList={partPriceList}
                      setPartPriceList={setPartPriceList}
                      partPriceCode={partPriceCode}
                      setPartPriceCode={setPartPriceCode}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isEMessage && (
          <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
        )}
      </div>
    </div>
  );
};
export default CustomerDetials;
