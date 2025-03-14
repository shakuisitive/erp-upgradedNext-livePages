import React, { useState } from "react";
import { FaLessThanEqual } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
// import VenderDropdown from './VenderDropdown'
import { useSelector } from "react-redux";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from 'react-icons/fc';

const PurchaseLeftForm = () => {
  const PurchaseDetails = useSelector(
    (state) => state.PurchaseSlices.purchaseOrderDetails
  );
  const [isDate, setIsDate] = useState("");
  const [isDatePicker, setIsDatePicker] = useState(false);

 

  const onDateChange = (date) => {
    setIsDate(date);
  };

  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
  };

  return (
    <div className="flex gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3 ">
      <div className=" w-full md:w-1/2 flex flex-col gap-3  ">
        <div className="flex  items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
          <select
            className="border-b border-b-gray-300  bg-red  w-full shadow-sm outline-none"
            disabled={false}
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
          <select
            className="border-b border-b-gray-300 py-1 text-[14px] bg-white pr-4  w-full shadow-sm outline-none whitespace-nowrap overflow-hidden overflow-ellipsis"
            name="whereHouse"
            id="whereHouse"
          >
            <option className="text-customblack text-[14px] " value="volvo">
              {PurchaseDetails?.SUPPLIER}
            </option>
            {/* <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option> */}
          </select>

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
          <p> {PurchaseDetails?.ADDRESS_1}</p>
          <p>+1 {PurchaseDetails?.PHONE_1}</p>
          <p> {PurchaseDetails?.EMAIL}</p>
          <div className="mt-3">
            <p>Payment Term: cash</p>
            <p>Payment Mode: cash</p>
          </div>
        </div>
      </div>

      <div className=" w-full  md:w-1/2  flex flex-col gap-3  mt-[2px]">
        <div className="flex items-center justify-between bg-white pr-2 w-full">
          <div className="flex items-center">
            <div className="bg-green-400 h-[34px] w-[4px] mr-1"></div>
            <select
              className="border-b border-b-gray-300 py-1 text-[14px] bg-white pr-4  w-full shadow-sm outline-none whitespace-nowrap overflow-hidden overflow-ellipsis"
              name="whereHouse"
              id="whereHouse"
              disabled="true"
            >
              <option className="text-customblack text-[14px] " value="volvo">
                {PurchaseDetails?.WAREHOUSE}
              </option>
              {/* <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option> */}
            </select>
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

          <select
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white pr-4 w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled={true}
          >
            <option className="text-customblack" value="volvo">
              {" "}
              {PurchaseDetails?.PREPARED_BY}
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

        <div className="text-[14px] text-customIcon ml-2 font-light  md:w-[151px]">
          {PurchaseDetails?.WAREHOUSE_ADDRESS}
        </div>
        <div className="flex gap-2  items-center ml-2 mt-[3px]">
          <p className="text-[14px] text-customblack">Req Date</p>
          <div className="relative z-50">
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
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseLeftForm;
