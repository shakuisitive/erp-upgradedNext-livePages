import React from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
const CustomerPaymentRight = ({
  paymentType,
  transitID,
  setTransitID,
  accountNum,
  setAccountNum,
  bankID,
  setBankID,
  accountTitle,
  setAccountTitle,
  name,
  setName,
  CC,
  setCC,
  expiry,
  setExpiry,
  CVV,
  setCVV,
}) => {
  const handleTransitID = (e) => {
    let pCode = e.target.value;
    pCode = pCode.replace(/\D/g, "");
    if (pCode.length > 5) {
      pCode = pCode.slice(0, 5);
    }
    setTransitID(pCode);
  };
  const handleBankID = (e) => {
    let pCode = e.target.value;
    pCode = pCode.replace(/\D/g, "");
    if (pCode.length > 3) {
      pCode = pCode.slice(0, 3);
    }
    setBankID(pCode);
  };
  const handleAccountNum = (e) => {
    let pCode = e.target.value;
    pCode = pCode.replace(/\D/g, "");
    if (pCode.length > 12) {
      pCode = pCode.slice(0, 12);
    }
    setAccountNum(pCode);
  };
  const handleCC = (e) => {
    let pCode = e.target.value;

    let digitsOnly = pCode.replace(/\D/g, "");

    if (digitsOnly.length > 16) {
      digitsOnly = digitsOnly.slice(0, 16);
    }

    let formattedInput = digitsOnly
      .replace(/(\d{4})(?=\d)/g, "$1-")
      .replace(/(\d{4}-\d{4})(?=\d)/g, "$1-")
      .replace(/(\d{4}-\d{4}-\d{4})(?=\d)/g, "$1-");

    setCC(formattedInput);
  };

  const handleExpiry = (e) => {
    let val = e.target.value;

    let digitsOnly = val.replace(/\D/g, "");

    if (digitsOnly.length > 4) {
      digitsOnly = digitsOnly.slice(0, 4);
    }

    let formattedInput = digitsOnly;
    if (digitsOnly.length > 2) {
      formattedInput = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
    }

    setExpiry(formattedInput);
  };
  const handleCVV = (e) => {
    const num = e.target.value.slice(0, 3);
    setCVV(num);
  };
  const handleAccountTitle = (e) => {
    setAccountTitle(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      {paymentType === "CREDIT_CARD" ? (
        <>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Name
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                isRequired={true}
                value={name}
                onChange={handleName}
                // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
                placeholder=" Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              CC#
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="Credit Card #"
                onChange={handleCC}
                value={CC}
                isRequired={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Expiry
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="MM/YY"
                inputClassName="text-right"
                onChange={handleExpiry}
                value={expiry}
                isRequired={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              CVV
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="CVV"
                inputClassName="text-right"
                onChange={handleCVV}
                value={CVV}
                isRequired={true}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Transit ID
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                isRequired={true}
                value={transitID}
                onChange={handleTransitID}
                // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
                placeholder=" Transit ID"
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Bank ID
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="Bank ID"
                onChange={handleBankID}
                value={bankID}
                isRequired={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Account #
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="Account #"
                onChange={handleAccountNum}
                value={accountNum}
                isRequired={true}
              />
            </div>
          </div>
          <div className="grid grid-cols-[170px_auto] mb-[12px]">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Account Title
            </label>
            <div className="flex flex-col">
              <UseInput
                type="text"
                placeholder="Account Title"
                onChange={handleAccountTitle}
                value={accountTitle}
                isRequired={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerPaymentRight;
