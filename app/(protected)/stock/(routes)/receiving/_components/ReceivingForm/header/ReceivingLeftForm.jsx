import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import DatePicker from "../../../../../../../../components/misc/pureComponents/textinput/newDatePicker/DatePicker";
import { FcCalendar } from "react-icons/fc";
import { useSelector,useDispatch } from "react-redux";
import { setRefDate } from "../../../redux/receivingSlices";

const ReceivingLeftForm = () => {
  const [isDate, setIsDate] = useState("MM/DD/YYYY");
  const dispatch = useDispatch()
  const [isDatePicker, setIsDatePicker] = useState(false);

 
  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );


  const formatDateAndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeFormat = hours >= 12 ? "PM" : "AM";

    return `${year}-${month}-${day} / ${hours}:${minutes} ${timeFormat}`;
  };

  const onDateChange = (date) => {
    setIsDate(date);
    dispatch(setRefDate(date))
  };

  const onDateAdd = () => {
    setIsDatePicker(!isDatePicker);
  };

  return (
    <div className="flex gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3 ">
      <div className=" w-full md:w-1/2 flex flex-col gap-3  ">
        <div className="flex  items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
          <select
            className="border-b border-b-gray-300  bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            disabled={
              true
            }
           
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
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled={
               true
            }
          >
            <option className="text-customblack" value="volvo">
            {recDetails?.SUPPLIER}
            </option>
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
          <div>
            <p>{recDetails?.city}</p>
            <p>{recDetails?.SUPPLIER_PHONE}</p>
            <p>{recDetails?.SUPPLIER_EMAIL}</p>
            <br />
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
              className="border-b text-[14px] border-b-gray-300 py-1 bg-white  w-full shadow-sm outline-none"
              name="whereHouse"
              id="whereHouse"
              disabled={
                true
              }
            >
              <option className="text-customblack" value="volvo">
                NC-Main
              </option>
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
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled={
              true
            }
          >
            <option className="text-customblack" value="volvo">
              admin
            </option>
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

        <div className="text-[14px] text-customIcon ml-2 font-light">
          <div>
            <p>
              {recDetails?.ADDRESS_1}
            </p>
          </div>
        </div>
        <div className="flex gap-2  items-center ml-2 mt-[31px] ">
          <p className="text-[14px] text-customblack">Req Date</p>
          <div className="relative z-30">
            <div>
              <div
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block min-w-[150px] w-full p-2.5 "
                onClick={onDateAdd}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{recDetails?.SUPPLIER_INVOICE_DATE != '' ? formatDateAndTime(recDetails?.SUPPLIER_INVOICE_DATE) : isDate}</span>
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

export default ReceivingLeftForm;
