import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
// import VenderDropdown from './VenderDropdown'
import { useSelector, useDispatch } from "react-redux";
import VenderDropdown from "./VenderDropdown";
import WarehouseDropdown from "./WarehouseDropdown";
import Moment from "react-moment";
import { clearVenderListFormData } from "../../../redux/Purchase.slice";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from 'react-icons/fc';
import Dropdown from "../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";

const NewPurchaseLeftForm = ({
  phone,
  email,
  address,
  waraddress,
  setAddress,
  setEmail,
  setPhone,
  setWarAddress,
}) => {
  
    const venderListData = useSelector(
      (state) => state.PurchaseSlices.venderListData
    );
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

  useEffect(() => {}, [venderListData]);

  const onDateChange = (date) => {
    setIsDate(date);
  };

  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
  };

  const handleOnFocus = () => {
  
  };
  const handleOnBlur = () => {
    
  };
   const handleSelectedOptionChange = (option) => {
  


       
  };


  return (
    <div className="flex gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3 ">
      <div className=" w-full md:w-1/2 flex flex-col gap-3  ">
        <div className="flex  items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
          <select
            className="border-b border-b-gray-300  bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled="true"
          >
            <option className="text-customblack ml-2" value="volvo">
              RFQ
            </option>
            {/* <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option> */}
          </select>

          <div className="flex gap-2 items-center">
            <div className="justify-center items-center gap-2 ml-3">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>
            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
        </div>
        <div className="flex items-center bg-white pr-2  w-full">
          <div className="bg-green-400 h-[34px] w-[3px] mr-1" />
          <VenderDropdown />

          <div className="flex gap-2 items-center ml-auto">
            <div className="justify-center items-center gap-2">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>
            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
        </div>
        <div className="text-[14px] text-customIcon ml-2 font-[100]">
          {venderListData && venderListData?.email ? (
            <div>
              <p>{venderListData?.address}</p>
              <p>{venderListData?.phone}</p>
              <p>{venderListData?.email}</p>
              <div className="mt-3">
                <p>Payment Term: cash</p>
                <p>Payment Mode: cash</p>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>

      <div className=" w-full  md:w-1/2  flex flex-col gap-3  mt-[2px]">
        <div className="flex items-center justify-between bg-white pr-2 w-full">
          <div className="flex items-center">
            <div className="bg-green-400 h-[34px] w-[4px] mr-1"></div>
            <WarehouseDropdown />
          </div>

          <div className="flex gap-2 items-center">
            <div className="justify-center items-center gap-2">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>
            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
        </div>

        <div className="flex items-center w-full bg-white pr-2 mt-[5px]">
          <div className="bg-green-400 h-[34px] w-[4px] mr-1"></div>

        <Dropdown
        options={[]}
        optionKey1="WAREHOUSE"
        optionKey2="WAR_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Add Warehouse"
        inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName=" bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey = "u"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput = "Admin"
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />

          <div className="flex gap-2 items-center">
            <div className="justify-center items-center gap-2 ml-3">
              <IoAddSharp className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
            <div className="bg-customGray h-[24px] w-[1px]"></div>
            <div className="justify-center items-center gap-2">
              <FiEdit2 className="text-[23px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
            </div>
          </div>
        </div>

        <div className="text-[14px] text-customIcon ml-2 font-light">
          {!waraddress ? (
            <div className="flex flex-col">
              <p>6227 Boundary Road,</p>
              <p>South Glengarry, ON K6H 7R1</p>
            </div>
          ) : (
            <p className=" md:w-[151px]">{waraddress}</p>
          )}
        </div>
        <div className="flex gap-2  items-center ml-2 mt-[3px]">
          <p className="text-[14px] text-customblack">Req Date</p>
          <div className="relative z-30">
            <div>
              <div
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-[150px] p-2.5 "
                onClick={onDateAdd}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{isDate ? isDate : "MM/DD/YYYY"}</span>
                    <FcCalendar />
                </div>
              </div>
            </div>

            {isDatePicker && (
              <div className="absolute">
                <DatePicker
                  onDateChange={onDateChange}
                  setIsDatePicker={setIsDatePicker}
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

export default NewPurchaseLeftForm;
