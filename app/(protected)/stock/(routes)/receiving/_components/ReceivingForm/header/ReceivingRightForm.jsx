import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { setNote, setRefNo } from "../../../redux/receivingSlices";

const ReceivingRightForm = () => {
  const dispatch = useDispatch()
  const recDetails = useSelector(
    (state) => state.receivingSlices.receivingDetails
  );
  const FormStatus = useSelector((state) => state.receivingSlices.FormStatus);
  const inputValues = useSelector((state) => state.receivingSlices.inputValues);

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

  const handleNoteChange = (e) => {
    dispatch(setNote(e.target.value));
  };

  const handleRefChange = (e) => {
    dispatch(setRefNo(e.target.value));
  };


  return (
    <div className="flex gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3">
      <div className="  w-full md:w-1/2 flex flex-col gap-3 ">
        <div className="flex  items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
          <select
            className="border-b border-b-gray-300  bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            disabled={
              FormStatus == "NEW" || FormStatus == "IN PROCESS" ? false : true
            }
          >
            <option className="text-customblack ml-2" value="volvo">
              FEDEX
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
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack mr-[23px]">
            PO#
          </p>
          <input
            disabled={true}
            value={recDetails?.PO_NUMBER}
            type="text"
            className="w-full bg-white focus:outline-none border focus:border-customGray text-[14px] px-2 py-2"
          />
        </div>
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack ">
            PO.Date
          </p>
          <input
            disabled={true}
            value={formatDateAndTime(recDetails?.PO_DATE)}
            type="text"
            className="w-full bg-white focus:outline-none border focus:border-customGray text-[14px] px-2 py-1"
          />
        </div>
        <div className="flex items-center bg-white pr-2 mt-3  w-full">
          <div className="bg-green-400 h-[34px] w-[3px] mr-1" />
          <select
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white pr-4  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled={
              FormStatus == "NEW" || FormStatus == "IN PROCESS" ? false : true
            }
          >
            <option className="text-customblack" value="volvo">
              FOB
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
        <div className="flex gap-3 mt-4">
          <input
            type="checkbox"
            // id={id}
            // checked={checked}
            // onChange={onChange}
            className="form-checkbox h-5 w-5 ml-2 text-blue-600"
            disabled={
              FormStatus == "NEW" || FormStatus == "IN PROCESS" ? false : true
            }
          />
          <label className="ml-2 text-[14px] text-customblack">
            Charge Tax
          </label>
        </div>
      </div>
      <div className="   w-full  md:w-1/2  flex flex-col gap-3  mt-[2px]">
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack">
            Ref#
          </p>
          <input
            value={recDetails?.RECIEVING_REFERENCE_NUMBER}
            onChange={handleRefChange}
            disabled={FormStatus !== 'NEW' && FormStatus !== 'IN PROCESS'}
            type="text"
            className="w-full bg-white focus:outline-none border focus:border-customGray"
          />
        </div>
        <div className="flex gap-1 ml-2 mt-4">
          <p className="text-[14px] text-customblack focus:outline-customblack">
            Notes
          </p>
          <textarea
            value={recDetails?.RECIEVING_NOTES}
            onChange={handleNoteChange}
            disabled={FormStatus !== 'NEW' && FormStatus !== 'IN PROCESS'}
            type="text"
            className="w-full h-[100px] bg-white focus:outline-none border focus:border-customGray"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex ml-2 items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
            <select
              className="border-b  border-b-gray-300 py-1 bg-white   w-full shadow-sm outline-none"
              name="whereHouse"
              id="whereHouse"
              disabled={
                FormStatus == "NEW" || FormStatus == "IN PROCESS" ? false : true
              }
            >
              <option className="text-customblack" value="volvo">
                CDN$
              </option>
              {/* <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option> */}
            </select>
            <div className="bg-customgreen h-[34px] w-[14px]"></div>

            <div className="flex gap-2 items-center">
              <div className="justify-center items-center gap-2 ">
                <IoIosArrowDown className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
              </div>
            </div>
          </div>

          <div className="flex ml-2 items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
            <select
              className="border-b  border-b-gray-300 py-1 bg-white   w-full shadow-sm outline-none"
              name="whereHouse"
              id="whereHouse"
              disabled={
                FormStatus == "NEW" || FormStatus == "IN PROCESS" ? false : true
              }
            >
              <option className="text-customblack" value="volvo">
                AIR
              </option>
              
            </select>
            <div className="bg-customgreen h-[34px] w-[14px]"></div>

            <div className="flex gap-2 items-center">
              <div className="justify-center items-center gap-2 ">
                <IoIosArrowDown className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default ReceivingRightForm;
