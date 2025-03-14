import React, { useEffect, useRef, useState } from "react";

import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import ToggleSwitch from "../../../../../../../../../components/misc/pureComponents/textinput/toggleswitch/ToggleSwitch";
import RadioButton from "../../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import CheckBox from "../../../../../../../../../components/misc/pureComponents/textinput/checkbox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleInfo, FaPencil } from "react-icons/fa6";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import RightDrawer from "../../../../../../../../../components/misc/pureComponents/rightdrawer/RightDrawer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { GrHomeRounded } from "react-icons/gr";
import CustNcGrid from "../../customComponent/CustNcGrid";
import CustBoltonGrid from "../../customComponent/CustBoltonGrid";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { Administration } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import {
  setAccessFlag,
  setClearPartPricePayload,
  setNewPartPriceId,
  setPartPriceOverrideList,
  setPartPricePayload,
} from "../../../../_redux/customerSlice";
import { FaEye, FaFileExport } from "react-icons/fa";
import InputModal from "../../../../../../../../../components/misc/pureComponents/modal/InputModal";
import { AiOutlineClose } from "react-icons/ai";
import Loading from "../../../../../../../../../components/misc/loader/loading";
// import Image from "next/image";

const CustomerRight = ({
  partnerId,
  setPartnerId,
  active,
  setActive,
  odrAck,
  setOdrAck,
  customerType,
  setCustomerType,
  sameAddress,
  setSameAddress,
  billCity,
  setBillCity,
  billCountry,
  setBillCountry,
  billCouID,
  setBillCouID,
  couID,
  address1,
  address2,
  city,
  country,
  postalCode,
  province,
  billaddress1,
  setBillAddress1,
  billaddress2,
  setBillAddress2,
  billPostalCode,
  setBillPostalCode,
  email2,
  setEmail2,
  phone2,
  setPhone2,
  SPS,
  setSPS,
  grpDisc,
  setGrpDisc,
  discGId,
  setDiscGId,
  discValue,
  setDiscValue,
  discPercent,
  setDiscPercent,
  discAddValue,
  setDiscAddValue,
  billprovince,
  setBillProvince,
  partPriceList,
  setPartPriceList,
  partPriceCode,
  setPartPriceCode,
  isError,
  setIsError,
}) => {
  const [checkEmail, setCheckEmail] = useState(false);
  const [filterProvinceList, setFilterProvinceList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessAdmin, setAccessAdmin] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [getPartPriceList, setGetPartPriceList] = useState([]);
  const [error, sendRequest] = useApiFetch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  const countryList = useSelector((state) => state.customerSlice.countryList);
  const provinceList = useSelector((state) => state.customerSlice.province);
  const discountG = useSelector((state) => state.customerSlice.discount);
  const PartPriceList = useSelector(
    (state) => state.customerSlice.PartPriceList
  );
  const CusteditDetForm = useSelector(
    (state) => state.customerSlice.CusteditDetForm
  );
  const partPricePayload = useSelector(
    (state) => state.customerSlice.partPricePayload
  );
  const partPriceOverrideList = useSelector(
    (state) => state.customerSlice.partPriceOverrideList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredProvinces = provinceList.filter(
      (province) => province.COUNTRY_NAME === billCountry
    );

    setFilterProvinceList(filteredProvinces);
  }, [billCountry]);

  const handleOpenDrawer = () => {
    setIsDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawer(false);
    dispatch(setAccessFlag());
    dispatch(setNewPartPriceId());
  };

  const tabs = [
    {
      label: "NC",
      content: <CustNcGrid />,
    },
    {
      label: "Bolton",
      content: <CustBoltonGrid />,
    },
  ];
  const handleActive = (event) => {
    setActive(event.target.checked);
  };
  const handleCustTypeChange = (event) => {
    setCustomerType(event.target.value);
  };
  const handleSPS = (event) => {
    setSPS(event.target.value);
  };
  const handleSameAddress = (e) => {
    setSameAddress(e.target.checked);
  };
  const handleOdrAck = (e) => {
    setOdrAck(e.target.checked);
  };
  const handlePartner = (e) => {
    setPartnerId(e.target.value);
  };
  const handleEmail2 = (e) => {
    setEmail2(e.target.value);
  };

  const handleBlurEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email2)) {
      setCheckEmail(true);
      setEmail2(email2);
    } else {
      setCheckEmail(false);
    }
  };
  const handlephone2 = (e) => {
    setPhone2(
      e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{3})(\d)/, "$1)-$2")
        .replace(/(\d{3})(\d{1,5})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    );
  };
  const handleBillAdd1 = (e) => {
    setBillAddress1(e.target.value);
  };
  const handleBillAdd2 = (e) => {
    setBillAddress2(e.target.value);
  };
  const handeBillCity = (e) => {
    setBillCity(e.target.value);
  };
  const handeBillCountry = (e) => {
    // setBillCountry(e.target.value);
    const selectedId = +e.target.value;
    const selectedOption = countryList.find(
      (option) => option.COU_ID === selectedId
    );
    setBillCouID(selectedOption.COU_ID);
    setBillCountry(selectedOption?.COUNTRY_NAME);
  };
  const handleBillPostalCode = (e) => {
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
    setBillPostalCode(formattedCode);
  };
  const handleBillProvince = (e) => {
    setBillProvince(e.target.value);
  };
  const handleGrpDisc = (event) => {
    setGrpDisc(event.target.value);
  };

  const handlePartPriceList = (option) => {
    setPartPriceList(option?.PARPRICLIST_ID);
    setPartPriceCode(option?.CODE);
  };

  const handleOnBlur = () => {};
  const handleOnFocus = () => {};

  const handlePartPriceOverride = (data) => {
    setLoading(false);
    dispatch(setPartPriceOverrideList(data?.Result));
    setGetPartPriceList(data?.Result);
  };
  const payloadPartPriceOverride = {
    data: {
      PARPRICLIST_ID: partPriceList,
    },
    action: "Administration",
    method: "GetPartPriceOverride",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handleViewPartPrice = () => {
    if (partPriceList) {
      sendRequest(
        Administration.GetPartPriceOverride,
        "POST",
        payloadPartPriceOverride,
        handlePartPriceOverride,
        token
      );

      handleOpenDrawer();
      setLoading(true);
    }
  };
  const handleEditPartPrice = () => {
    setIsModalOpen(true);
  };
  const overridePayload = {
    data: {
      ADMIN_PASSWORD: accessAdmin,
    },
    action: "Administration",
    method: "GetAdminAccess",
    username: "admin",
  };
  const handleVerifyCodeResData = (data) => {
    // console.log("checking access admin flag", data?.Result);
    if (data?.CODE === "SUCCESS") {
      dispatch(setAccessFlag(data?.Result[0]));
    }
  };
  const handleAccessAdmin = () => {
    if (accessAdmin == "12123") {
      sendRequest(
        Administration.GetAdminAccess,
        "POST",
        overridePayload,
        handleVerifyCodeResData,
        token
      );
      setIsModalOpen(false);
      setAccessAdmin("");
      handleViewPartPrice();
    }
  };

  const getpartpricelist = (data) => {
    const payloadPartPriceOverride = {
      data: {
        PARPRICLIST_ID: data?.Result,
      },
      action: "Administration",
      method: "GetPartPriceOverride",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    setPartPriceList(data?.Result);
    if (data?.CODE === "SUCCESS") {
      sendRequest(
        Administration.GetPartPriceOverride,
        "POST",
        payloadPartPriceOverride,
        handlePartPriceOverride,
        token
      );
    }
  };
  const handleCreateNew = (newOption) => {
    setNewOption(newOption.toUpperCase());
    const payloadDetails = {
      data: {
        PARPRICLIST_ID: "",
        CODE: newOption,
        DESCRIPTION: "",
        ACTIVE_FLAG: "Y",
      },
      action: "Administration",
      method: "PostPartPriceList",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      Administration.PostPartPriceList,
      "POST",
      payloadDetails,
      getpartpricelist,
      token
    );
    dispatch(setNewPartPriceId(newOption));
    handleOpenDrawer();
  };

  const handlePostPartPriceOverride = (data) => {
    if (data?.CODE == "SUCCESS") {
      dispatch(setClearPartPricePayload(true));
      handleCloseDrawer();
    }
  };
  const handlePostPartPrice = () => {
    const payloadPostPartPriceOverride = {
      data: partPricePayload,
      action: "Administration",
      method: "PostPartPriceOverride",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    if (partPricePayload.length > 0) {
      sendRequest(
        Administration.PostPartPriceOverride,
        "POST",
        payloadPostPartPriceOverride,
        handlePostPartPriceOverride,
        token
      );
    }
  };
  const formatString = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };
  const handleReport = () => {
    // console.log("report clicked");

    const logoImg = new Image();
    logoImg.src = "/media/bg/nc-logo.png";
    const pdf = new jsPDF("p", "pt", "letter");

    const margins = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40,
    };
    const lineHeight = 20;
    const linesPerItem = 5;
    const itemHeight = lineHeight * linesPerItem;

    logoImg.onload = () => {
      const logoImgWidth = 120;
      const logoImgHeight = 100;
      const logoImgX = margins.left;
      const logoImgY = margins.top;

      const canvas = document.createElement("canvas");
      canvas.width = logoImgWidth;
      canvas.height = logoImgHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(logoImg, 0, 0, logoImgWidth, logoImgHeight);
      const logoImgData = canvas.toDataURL("image/png");

      pdf.addImage(
        logoImgData,
        "PNG",
        logoImgX,
        logoImgY,
        logoImgWidth,
        logoImgHeight
      );

      const heading = "\nNatural Calm Canada";
      const subHeading =
        "\n1455 16th Ave # 5, Richmond Hill\nL4B 4W5, ON\nONTARIO, Canada";
      const headingWidth =
        pdf.getStringUnitWidth(heading) * pdf.internal.getFontSize();
      const headingX =
        pdf.internal.pageSize.width - margins.right - headingWidth;
      const headingY = margins.top;

      pdf.text(heading, headingX, headingY);

      pdf.setFontSize(10);
      pdf.text(subHeading, headingX, headingY + 20);

      pdf.setFontSize(14);
      pdf.setFont("bold");
      const title = `Customer Price List`;

      const titleWidth =
        pdf.getStringUnitWidth(title) * pdf.internal.getFontSize();
      const pageWidth = pdf.internal.pageSize.width;
      const titleX = (pageWidth - titleWidth) / 2;

      pdf.setFont("helvetica", "bold");

      pdf.text(title, titleX, 160);
      pdf.setFontSize(11);
      const subtitle = `${formatString(partPriceCode)}`;
      const subtitleWidth =
        pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize();
      const subtitleX = (pageWidth - subtitleWidth) / 2;
      const subtitleY = 180;
      pdf.text(subtitle, subtitleX, subtitleY);

      pdf.setFont("helvetica", "normal");

      const tableData = partPriceOverrideList.map((item) => [
        item.SKU,
        item.SKU_DESCRIPTION,
        item.PURCHASE_GROUP === null ? "GROUP B" : item.PURCHASE_GROUP,
        item.MSRP,
        item.LIST_PRICE === null ? "" : item.LIST_PRICE,
      ]);

      pdf.autoTable({
        head: [["SKU", "Description", "PG", "MSRP", "List Price"]],
        body: tableData,
        headStyles: {
          fillColor: "#ffffff",
          textColor: "#000000",
          fontStyle: "bold",
        },
        startY: 190,

        columnStyles: {
          1: { cellWidth: 200 },
          4: { cellWidth: 60 },
        },
      });

      const pdfDataUri = pdf.output("datauristring");

      const iframe = document.createElement("iframe");
      iframe.src = pdfDataUri;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.position = "fixed";
      iframe.style.zIndex = "2000";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.right = "0";
      iframe.style.bottom = "0";

      const closeButton = document.createElement("button");

      closeButton.innerHTML = "x";
      closeButton.style.position = "fixed";
      closeButton.style.zIndex = "2001";
      closeButton.style.top = "100px";
      closeButton.style.right = "80px";
      closeButton.style.fontSize = "30px";
      closeButton.style.fontWeight = "600px";
      closeButton.style.padding = "5px";
      closeButton.style.border = "none";
      closeButton.style.cursor = "pointer";

      closeButton.style.color = "#fff";
      closeButton.addEventListener("click", () => {
        document.body.removeChild(iframe);
        document.body.removeChild(closeButton);
      });

      document.body.appendChild(iframe);
      document.body.appendChild(closeButton);

      iframe.addEventListener("load", () => {
        closeButton.style.display = "block";
      });
    };
  };
  const handleDiscG = (e) => {
    const selectedId = +e.target.value;
    const selectedOption = discountG.find(
      (option) => option.DISGRP_ID === selectedId
    );
    setDiscGId(selectedOption.DISGRP_ID);
    setDiscValue(selectedOption.DISCOUNT_PERCENTAGE);
  };
  const handleDiscAddValue = (e) => {
    setDiscAddValue(e.target.value);
  };
  const handleBlurDiscAddValue = (e) => {
    if (discAddValue) {
      const addValue = parseFloat(discAddValue).toFixed(2);
      setDiscAddValue(addValue);
    }
  };
  const handleDiscPercent = (e) => {
    setDiscPercent(e.target.value);
  };
  const handleBlurDiscPercent = (e) => {
    if (discPercent) {
      const addValue = parseFloat(discPercent).toFixed(2);
      setDiscPercent(addValue);
    }
  };
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen border py-10 px-20 tablet:w-full">
      {loading == true && <Loading />}

      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
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
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Prepay
            </label>
            <RadioButton
              name="customerType"
              value="prepay"
              checked={customerType === "prepay"}
              onChange={handleCustTypeChange}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Mass
            </label>
            <RadioButton
              name="customerType"
              value="mass"
              checked={customerType === "mass"}
              onChange={handleCustTypeChange}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]"></div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              SPS
            </label>
            <RadioButton
              name="SPS"
              value="SPS"
              checked={SPS === "SPS"}
              onChange={handleSPS}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              Non SPS
            </label>
            <RadioButton
              name="NonSPS"
              value="NonSPS"
              checked={SPS === "NonSPS"}
              onChange={handleSPS}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]"></div>
        </div>
      </div>
      <div className="grid grid-cols-[155px_auto] items-center mb-[12px]">
        <div></div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <CheckBox checked={sameAddress} onChange={handleSameAddress} />
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Billing same as customer address
            </label>
          </div>
        </div>
      </div>
      {customerType === "mass" && (
        <div className="grid grid-cols-[155px_auto] items-center mb-[12px]">
          <div></div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="grid grid-cols-[130px_auto]">
              <CheckBox
                onChange={handleOdrAck}
                checked={odrAck}
                disabled={CusteditDetForm.CUS_ID ? true : false}
              />
              <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
                Order Acknowledgment Required ?
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="Partner ID">
          Partner ID
        </label>
        <UseInput
          type="text"
          placeholder="Partner ID"
          value={partnerId}
          onChange={handlePartner}
          disabled={SPS === "SPS" ? false : true}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Email 2
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            value={email2}
            placeholder=" Email 2"
            onChange={handleEmail2}
            onBlur={handleBlurEmail}
          />

          <div className="flex items-center gap-2 text-[14px] relative text-customblack">
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
          Phone 2
        </label>
        <UseInput
          type="text"
          placeholder="Phone 2"
          value={phone2}
          onChange={handlephone2}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Bill Addr 1 <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          placeholder="Bill Address Line 1"
          value={sameAddress ? address1 : billaddress1}
          disabled={sameAddress ? true : false}
          onChange={handleBillAdd1}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Bill Addr 2
        </label>
        <UseInput
          type="text"
          placeholder="Bill Address Line 2"
          value={sameAddress ? address2 : billaddress2}
          disabled={sameAddress ? true : false}
          onChange={handleBillAdd2}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          City/Town<span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          placeholder="Bill City"
          value={sameAddress ? city : billCity}
          disabled={sameAddress ? true : false}
          onChange={handeBillCity}
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Country
        </label>
        <UseSelect
          options={countryList}
          optionKeyId="COU_ID"
          optionKeyValue="COUNTRY_NAME"
          value={sameAddress ? couID : billCouID}
          disabled={sameAddress ? true : false}
          onChange={handeBillCountry}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Province/State <span className="text-red-600">*</span>
        </label>
        <UseSelect
          options={filterProvinceList}
          optionKeyId="PROSTA_ID"
          optionKeyValue="PROVIENCE_NAME"
          value={sameAddress ? province : billprovince}
          disabled={sameAddress ? true : false}
          onChange={handleBillProvince}
          placeholder="Please Select"
        />
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Postal/Zip Code <span className="text-red-600">*</span>
        </label>
        <UseInput
          type="text"
          placeholder="Postal/Zip code (billing)"
          value={sameAddress ? postalCode : billPostalCode}
          disabled={sameAddress ? true : false}
          onChange={handleBillPostalCode}
        />
      </div>
      {customerType === "mass" && (
        <div className="grid grid-cols-[170px_auto] items-center mb-[12px]">
          <div></div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="grid grid-cols-[150px_auto] items-center">
              <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
                Group Discount
              </label>
              <RadioButton
                name="group"
                onChange={handleGrpDisc}
                value="group"
                checked={grpDisc === "group"}
              />
            </div>

            <div className="grid grid-cols-[150px_auto] items-center">
              <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
                Manual Price List
              </label>
              <RadioButton
                name="manual"
                onChange={handleGrpDisc}
                value="manual"
                checked={grpDisc === "manual"}
              />
            </div>
            <div className="grid grid-cols-[150px_auto] items-center"></div>
          </div>
        </div>
      )}

      {grpDisc === "manual" && (
        <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
          <div className="grid grid-cols-[170px_auto] relative">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Manual Price
            </label>
            <Dropdown
              options={PartPriceList}
              optionKey1="CODE"
              optionKey2="CODE"
              showValue={partPriceCode}
              onSelectedOptionChanged={handlePartPriceList}
              placeholder="Please Select"
              inputClassName="focus:outline-none  hover:bg-transparent 
              hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal py-[3px] text-left"
              dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
              customFocusKey="p"
              onClearInputValue={false}
              onHandleFocus={handleOnFocus}
              onDefaultInput={partPriceCode ? partPriceCode : ""}
              onHandleBlur={handleOnBlur}
              onNewOption={handleCreateNew}
              isCreateOption={true}
            />
          </div>
          <div className="grid grid-cols-[auto_auto_auto] relative ">
            <FaEye
              className="text-blue-600 ml-[40px] text-[25px] "
              onClick={handleViewPartPrice}
            />
            <FaPencil
              className="text-green-600 text-[25px]"
              onClick={handleEditPartPrice}
            />
            <FaFileExport
              onClick={handleReport}
              className="text-yellow-600 text-[25px]"
            />
          </div>
        </div>
      )}
      {grpDisc === "group" && (
        <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
          <div className="grid grid-cols-[170px_auto] relative">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Discount Group
            </label>
            <UseSelect
              options={discountG}
              optionKeyId="DISGRP_ID"
              optionKeyValue="NAME"
              value={discGId}
              onChange={handleDiscG}
              placeholder="Please Select"
            />
          </div>
          <div className="grid grid-cols-[70px_auto] relative">
            <label
              className="p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            ></label>
            <UseInput type="text" value={discValue} disabled={true} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        {grpDisc === "group" && (
          <div className="grid grid-cols-[170px_auto] relative">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Add. Disc Value ($)
            </label>
            <UseInput
              type="text"
              value={discAddValue}
              onChange={handleDiscAddValue}
              onBlur={handleBlurDiscAddValue}
            />
          </div>
        )}
        {discAddValue && grpDisc === "group" && (
          <div className="grid grid-cols-[70px_auto] relative">
            <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
              Value(%)
            </label>
            <UseInput
              type="text"
              value={discPercent}
              onChange={handleDiscPercent}
              onBlur={handleBlurDiscPercent}
            />
          </div>
        )}
      </div>
      {isModalOpen && (
        <InputModal
          onClose={() => setIsModalOpen(false)}
          code={accessAdmin}
          setCode={setAccessAdmin}
          isError={isError}
          action={handleAccessAdmin}
        />
      )}
      <RightDrawer
        isOpen={isDrawer}
        onClose={handleCloseDrawer}
        heading={newOption || partPriceCode}
        tabs={tabs}
        handleApply={handlePostPartPrice}
        handleReport={handleReport}
      />
    </div>
  );
};

export default CustomerRight;
