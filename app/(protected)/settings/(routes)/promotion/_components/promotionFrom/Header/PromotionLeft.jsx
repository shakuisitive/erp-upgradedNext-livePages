import React, { useEffect, useState } from "react";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import ToggleSwitch from "../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import RadioButton from "../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import { useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import { ItemMaster } from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { FaCircleInfo } from "react-icons/fa6";

const PromotionLeft = ({
  active,
  setActive,
  promoCode,
  setPromoCode,
  promoName,
  setPromoName,
  desc,
  setDesc,
  promoPriority,
  setPromoPriority,
  promoType,
  setPromoType,
  sku,
  setSku,
  promoPercent,
  setPromoPercent,
  promoAmount,
  setPromoAmount,
  isError,
  setIsError,
}) => {
  const [validation, setValidation] = useState(true);
  const [validationName, setValidationName] = useState(true);
  const [accessToken, setAccessToken] = useState();
  let [error, sendRequest] = useApiFetch();
  const skuList = useSelector((state) => state.promotionSlice.partList);
  const promoEditDetForm = useSelector(
    (state) => state.promotionSlice.promoEditDetForm
  );
  const option = [
    { id: "CA", label: "Canada" },
    { id: "US", label: "United States" },
  ];
  const handlePromoCode = (e) => {
    setPromoCode(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "PROMOTION_CODE",
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
      accessToken
    );
  };
  const getCustCode = (data) => {
    if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };
  const handlePromoName = (e) => {
    setPromoName(e.target.value);

    const payloadUniqueCust = {
      data: {
        CODE: e.target.value.toString(),
        TYPE: "PROMOTION_NAME",
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
      getPromoName,
      accessToken
    );
  };
  const getPromoName = (data) => {
    if (data?.Result[0].VALIDATION_RESULT === "TRUE") {
      setValidationName(true);
    } else {
      setValidationName(false);
    }
  };
  const handlePromoType = (event) => {
    setPromoType(event.target.value);
  };
  const handlePromoAmount = (event) => {
    setPromoAmount(event.target.value);
  };
  const handlePromoPercent = (event) => {
    setPromoPercent(event.target.value);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };
  const handlePromoPriority = (event) => {
    setPromoPriority(event.target.value);
  };
  const handleActive = (event) => {
    setActive(event.target.checked);
  };
  const handleSku = (e) => {
    setSku(e.target.value);
  };
  useEffect(() => {
    const Token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("tokenSession")
        : null;
    setAccessToken(Token);
  }, []);
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[55px] ">
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
          SKU<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={skuList}
            optionKeyId="PAR_ID"
            optionKeyValue="PAR_CODE"
            value={sku}
            onChange={handleSku}
            // disabled={!!locEditDetForm?.TEN_ID}
            placeholder="Please Select"
          />
          {!sku && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Select SKU </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={promoCode}
            onChange={handlePromoCode}
            disabled={!!promoEditDetForm?.PROMO_CODE}
            placeholder="Promo Code"
          />
          {!promoCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Promo Code</span>
            </div>
          )}
          {!validation && promoCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Promo Code Already Exist</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Promotion Name<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={promoName}
            placeholder=" Promo Name "
            isRequired={true}
            onChange={handlePromoName}
            disabled={!!promoEditDetForm?.NAME}
          />
          {!promoName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Promo Name</span>
            </div>
          )}
          {!validationName && promoName && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Promo Name Already Exist</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Description
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={desc}
            placeholder=" Promo Description "
            isRequired={true}
            onChange={handleDesc}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Promotion priority
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={promoPriority}
            placeholder=" Promo Priority "
            isRequired={true}
            onChange={handlePromoPriority}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between gap-2 ">
          <div className="grid grid-cols-[40px_100px_auto] items-center">
            <RadioButton
              name="promoType"
              value="PERCENT"
              checked={promoType === "PERCENT"}
              onChange={handlePromoType}
            />
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Percent (%)
            </label>
            <UseInput
              type="number"
              value={promoPercent}
              placeholder=" Promo Percent "
              onChange={handlePromoPercent}
              disabled={promoType === "AMOUNT" ? true : false}
            />
          </div>
          <div className="grid grid-cols-[40px_100px_auto] items-center">
            <RadioButton
              name="promoType"
              value="AMOUNT"
              checked={promoType === "AMOUNT"}
              onChange={handlePromoType}
            />
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Amount ($)
            </label>
            <UseInput
              type="Number"
              value={promoAmount}
              placeholder=" Promo Amount "
              onChange={handlePromoAmount}
              disabled={promoType === "PERCENT" ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionLeft;
