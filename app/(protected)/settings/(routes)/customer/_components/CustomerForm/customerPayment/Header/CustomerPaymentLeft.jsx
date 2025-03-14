import React from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import RadioButton from "../../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import { useSelector } from "react-redux";
const CustomerPaymentLeft = ({
  paymentType,
  setPaymentType,
  payterId,
  setPayterID,
  creditLimit,
  setCreditLimit,
}) => {
  const payment = useSelector((state) => state.customerSlice.paymentTerm);
  const formIndex = useSelector((state) => state.customerSlice.formIndex);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };
  const handlePayTerID = (e) => {
    setPayterID(e.target.value);
  };
  const handleCreditLimit = (e) => {
    setCreditLimit(e.target.value);
  };

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[60px]">
        <div></div>
        <div className="flex  justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto] items-center">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Credit Card
            </label>
            <RadioButton
              name="paymentType"
              value="CREDIT_CARD"
              checked={paymentType === "CREDIT_CARD"}
              onChange={handlePaymentTypeChange}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Interact
            </label>
            <RadioButton
              name="paymentType"
              value="INTERACT"
              checked={paymentType === "INTERACT"}
              onChange={handlePaymentTypeChange}
              disabled={formIndex?.MASS_CUSTOMER_FLAG === "N" ? true : false}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]"></div>
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Credit Limit <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            // isRequired={true}
            value={creditLimit}
            onChange={handleCreditLimit}
            disabled={formIndex?.MASS_CUSTOMER_FLAG === "N" ? true : false}
            placeholder=" Credit Limit"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Payment Term
        </label>
        <UseSelect
          options={payment}
          optionKeyId="PAYTER_ID"
          optionKeyValue="NAME"
          value={payterId}
          onChange={handlePayTerID}
          placeholder="Please Select"
          disabled={formIndex?.MASS_CUSTOMER_FLAG === "N" ? true : false}
        />
      </div>
    </div>
  );
};

export default CustomerPaymentLeft;
