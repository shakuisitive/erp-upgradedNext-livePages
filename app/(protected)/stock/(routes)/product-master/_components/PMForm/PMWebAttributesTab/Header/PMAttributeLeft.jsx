import { FaPencil } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
import React, { useState } from "react";
import UseInput from "./../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import MultiLevelCategory from "../../../../../../../../../components/misc/pureComponents/multiLevelCategory/MultiLevelCategory";
import { useSelector } from "react-redux";
import { FcCalendar } from "react-icons/fc";
import DatePicker from "../../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";

const PMAttributeLeft = ({
  brandId,
  setBrandId,
  assignCat,
  setAssignCat,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}) => {
  const [isDateTo, setIsDateTo] = useState("");
  const [isDateFrom, setIsDateFrom] = useState("");
  const brandList = useSelector((state) => state.commonSlices.brandList);
  const categoryList = useSelector((state) => state.commonSlices.categoryList);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleBrand = (e) => {
    setBrandId(e.target.value);
  };

  const handleCategory = (newSelectedOptions) => {
    const parcatIDs = newSelectedOptions.map((option) => option.PARCAT_ID);
    const parcatIDString = parcatIDs.join(" ,");
    setAssignCat(parcatIDString);

    // console.log("Selected PARCAT_IDs:", parcatIDString);
  };
  const onDateAddFrom = () => {
    setIsDateFrom(!isDateFrom);
  };

  const onDateChangeF = (date) => {
    setDateFrom(date);
    setIsDateFrom(false);
  };

  const onDateAddTo = () => {
    setIsDateTo(!isDateTo);
  };

  const onDateChangeT = (date) => {
    setDateTo(date);
    setIsDateTo(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "MM/DD/YYYY";
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };
  //   console.log("options: ", categoryList);

  return (
    <div className="w-full h-[340px] mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border p-10 tablet:w-full">
      <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Brand
        </label>

        <UseSelect
          options={brandList}
          optionKeyId="PARBRA_ID"
          optionKeyValue="CODE"
          value={brandId}
          placeholder={"Select Brand"}
          onChange={handleBrand}
        />
      </div>
      {/* <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Warranty
        </label>
        <div className="grid grid-cols-[auto_1fr] items-center gap-[12px]">
          <input type="checkbox" className="h-[38px] w-[38px]" />
          <UseSelect
            id="mySelect"
            options={options}

            //value={selectedValue}
            //onChange={handleSelectChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Visibility
        </label>
        <UseSelect
          id="mySelect"
          options={options}
          //value={selectedValue}
          //onChange={handleSelectChange}
        />
      </div> */}
      <div className="grid grid-cols-[150px_1fr] items-center gap-[18px] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          Category
        </label>

        <MultiLevelCategory
          options={categoryList}
          onChange={handleCategory}
          placeholder="Select Category"
          optionID="PARCAT_ID"
          optionValue="CODE"
          // defaultSelectedIDs="1020159 , 1018955"
          defaultSelectedIDs={assignCat}
        />
      </div>
      <div className="grid grid-cols-[auto_auto] gap-4 mb-[12px]">
        <div className="grid grid-cols-[170px_auto] relative">
          <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
            Set Product as New
          </label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-full p-2.5 "
              onClick={onDateAddFrom}
              tabIndex={0}
            >
              <div className="flex justify-between items-center w-full">
                <span>{dateFrom ? formatDate(dateFrom) : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
            {isDateFrom && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeF}
                  setIsDatePicker={setIsDateFrom}
                  setPastYears={0}
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-[80px_auto] relative">
          <label
            className="p-[8px] font-[500] text-[14px]"
            htmlFor="code"
          ></label>
          <div className="flex flex-col">
            <div
              id="date"
              className="bg-white  text-customblack text-sm  block w-auto p-2.5"
              tabIndex={0}
              onClick={onDateAddTo}
            >
              <div className="flex justify-between items-center w-full">
                <span>{dateTo ? formatDate(dateTo) : "MM/DD/YYYY"}</span>
                <FcCalendar />
              </div>
            </div>
            {isDateTo && (
              <div className="absolute right-0 top-[40px]">
                <DatePicker
                  onDateChange={onDateChangeT}
                  setIsDatePicker={setIsDateTo}
                  setPastYears={0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMAttributeLeft;
