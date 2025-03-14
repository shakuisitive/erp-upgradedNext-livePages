import React, { useEffect, useState } from "react";
import RadioButton from "../../../../../../../../components/misc/pureComponents/textinput/radioButton/RadioButton";
import UseInput from "../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import MultiSelect from "../../../../../../../../components/misc/pureComponents/multiSelect/MultiSelect";
import { FaCircleInfo } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../../customHook/useApiFetch";
import {
  Administration,
  ItemMaster,
} from "../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { setPartLotList } from "../../../_redux/promotionSlice";

const PromotionRight = ({
  custType,
  setCustType,
  allCust,
  setAllCust,
  assignCust,
  setAssignCust,
  purgroId,
  setPurgroId,
  lot,
  setLot,
  minQty,
  setMinQty,
  maxQty,
  setMaxQty,
  dateTo,
  setDateTo,
  dateFrom,
  setDateFrom,
  assignCustName,
  sku,
}) => {
  const [checkDateFrom, setCheckDateFrom] = useState(false);
  const [isDatePickerF, setIsDatePickerF] = useState(false);
  const [checkDateTo, setCheckDateTo] = useState(false);
  const [isDatePickerT, setIsDatePickerT] = useState(false);
  const [lotList, setLotList] = useState();
  const [custName, setCustName] = useState("Option 1, Option 2");
  const [custId, setCustId] = useState("1,2");
  let [error, sendRequest] = useApiFetch();

  const purchaseGroup = useSelector(
    (state) => state.promotionSlice.purchaseGroup
  );
  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;
  const dispatch = useDispatch();

  const customerList = useSelector((state) => state.promotionSlice.customer);
  const promoEditDetFormLot = useSelector(
    (state) => state.promotionSlice.promoEditDetFormLot
  );

  const invparlotIds = promoEditDetFormLot.map((item) => item.INVPARLOT_ID);

  const idsString = invparlotIds.join(", ");
  const lotIds = idsString;
  // const partLotList = useSelector((state) => state.promotionSlice.partLotList);

  const multioption = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
  ];
  const handleAllCustomer = (event) => {
    setAllCust(event.target.value);
  };

  const handleCustomerType = (event) => {
    setCustType(event.target.value);
  };

  const handleMultiSelectChange = (newSelectedOptions) => {
    // console.log("checking new", newSelectedOptions);

    const ids = newSelectedOptions.map((option) => option.CUS_ID).join(", ");
    setAssignCust(ids);
  };
  // console.log("checking new", assignCust);

  const handlePurchaseG = (e) => {
    setPurgroId(e.target.value);
  };
  const handleLot = (newSelectedOptions) => {
    const ids = newSelectedOptions
      .map((option) => option.INVPARLOT_ID)
      .join(",");
    setLot(ids);
  };
  const handleMinQty = (e) => {
    setMinQty(e.target.value);
  };
  const handleMaxQty = (e) => {
    setMaxQty(e.target.value);
  };
  const payloadPartLot = {
    data: {
      SEARCH: "",
      ORDER: "CODE ASC",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      ACTIVE_FLAG: "Y",
      PAR_ID: sku,
      PURGRO_ID: "",
    },
    action: "Administration",
    method: "GetPartLotList",
    username: "admin",
    type: "rpc",
    tid: "144",
  };
  const handlePartLot = (data) => {
    setLotList(data?.Result);
  };
  // useEffect(() => {
  //   dispatch(setPartLotList(lotList));
  // }, [lotList]);

  const onDateAddFrom = () => {
    setIsDatePickerF(!isDatePickerF);
    // setCheckDateFrom(false);
  };

  const onDateChangeF = (date) => {
    if (!date) {
      date = new Date();
    }
    setDateFrom(date);
  };

  const onDateAddTo = () => {
    setIsDatePickerT(!isDatePickerT);
    // setCheckDateTo(false);
  };
  const onDateChangeT = (date) => {
    setDateTo(date);
    // setCheckDateTo(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY"; // Fallback if no date is provided

    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };
  useEffect(() => {
    sendRequest(
      Administration.GetPartLotList,
      "POST",
      payloadPartLot,
      handlePartLot,
      Token
    );
  }, [Token, sku]);
  // console.log("checking cust id", custId);
  // console.log("checking cust NAme", custName);
  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] items-center mb-[12px]">
        <div>
          <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
            Customer type
          </label>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Prepaid
            </label>
            <RadioButton
              name="custType"
              value="prepaid"
              checked={custType === "prepaid"}
              onChange={handleCustomerType}
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
              name="custType"
              value="mass"
              checked={custType === "mass"}
              onChange={handleCustomerType}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]"></div>
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] items-center mb-[12px]">
        <div>
          <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
            All Customer(s)?
          </label>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="grid grid-cols-[130px_auto]">
            <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
              Yes
            </label>
            <RadioButton
              name="allCustomer"
              value="yes"
              checked={allCust === "yes"}
              onChange={handleAllCustomer}
            />
          </div>
          <div className="grid grid-cols-[130px_auto] items-center">
            <label
              className="w-[150px] p-[8px] font-[500] text-[14px]"
              htmlFor="code"
            >
              No
            </label>
            <RadioButton
              name="allCustomer"
              value="no"
              checked={allCust === "no"}
              onChange={handleAllCustomer}
            />
          </div>
          <div className="grid grid-cols-[130px_auto]"></div>
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Customers<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <MultiSelect
            options={customerList}
            defaultSelectedIDs={assignCust}
            onChange={handleMultiSelectChange}
            optionID="CUS_ID"
            optionValue="CUSTOMER_NAME"
            placeholder="Select options"
          />
          {/* {!tenId && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Organiztion </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Purchase Group<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={purchaseGroup}
            optionKeyId="PURGRO_ID"
            optionKeyValue="CODE"
            value={purgroId}
            onChange={handlePurchaseG}
            // disabled={!!locEditDetForm?.TEN_ID}
            placeholder="Please Select"
          />
          {/* {!tenId && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Organiztion </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Lot #<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <MultiSelect
            options={lotList}
            defaultSelectedIDs={lotIds}
            onChange={handleLot}
            optionID="INVPARLOT_ID"
            optionValue="LOT_NUMBER"
            placeholder="Select options"
          />
          {/* {!tenId && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Organiztion </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Min Qty <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="number"
            isRequired={true}
            value={minQty}
            onChange={handleMinQty}
            // disabled={!!locEditDetForm?.CODE}
            placeholder=" Min Qty"
          />
          {/* {!locCode && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Location Code</span>
            </div>
          )}
          {!validation && locCode && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Location Code Already Exist</span>
            </div>
          )} */}
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Max Qty<span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          <UseInput
            type="number"
            value={maxQty}
            placeholder=" Max Qty "
            isRequired={true}
            onChange={handleMaxQty}
          />
          {/* {!branchName && isError && (
            <div className="items-center flex gap-2  text-[14px] relative text-customblack">
              <FaCircleInfo />
              <span className="text-red-500 ">Please Enter Branch Name </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[170px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Validity(from) <span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-full p-2.5 "
              onClick={onDateAddFrom}
              tabIndex={0}
              // onBlur={handleBlurDate}
            >
              <div className="flex justify-between items-center w-full">
                <span>{dateFrom ? formatDate(dateFrom) : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
            {isDatePickerF && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeF}
                  setIsDatePicker={setIsDatePickerF}
                  setPastYears={0}
                />
              </div>
            )}
            {/* {!kitDateFrom && isError && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )} */}
          </div>
        </div>
        <div className="grid grid-cols-[150px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Validity(to)<span className="text-red-600">*</span>
          </label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-auto p-2.5"
              tabIndex={0}
              onClick={onDateAddTo}
              //   onBlur={handleBlurDateT}
            >
              <div className="flex justify-between items-center w-full">
                <span>{dateTo ? formatDate(dateTo) : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
            {isDatePickerT && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeT}
                  setIsDatePicker={setIsDatePickerT}
                  setPastYears={0}
                />
              </div>
            )}
            {/* {checkDateTo && (
              <div className="items-center flex gap-2 text-[14px] relative text-customblack">
                <FaCircleInfo />
                <span className="text-red-500">
                  Date selection is mandatory
                </span>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionRight;
