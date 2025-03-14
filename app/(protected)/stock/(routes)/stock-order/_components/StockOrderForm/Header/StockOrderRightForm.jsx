import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { moment } from "moment";
import { setFormData } from "../../../redux/stockSlice";

const StockOrderRightForm = () => {
  const dispatch = useDispatch();
  const subData = useSelector((state) => state.stockSlices.subData);

  const dateFormat = (dateGet) => {
    const date = new Date(dateGet);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    return formattedDate;
  };

  const Notes = subData[0]?.form[0].STOCK_NOTES;
  const Reference = subData[0]?.form[0].STOCK_REFERENCE_NUMBER;

  const handleInputChangeRef = (e) => {
    dispatch(setFormData({value: e.target.value, field: "ref"}));
  };
  const handleInputChangeNotes = (e) => {
    dispatch(setFormData({value: e.target.value, field: "notes"}));
  };

  return (
    <div className="flex gap-10 flex-col md:flex-row items-start w-full h-full bg-[#e1eff2] rounded-[6px] shadow-md shadow-blue-50 border border-customgreen px-6  py-3">
      <div className="  w-full md:w-1/2 flex flex-col gap-3 ">
        {/* <div className="flex  items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
          <select
            className="border-b border-b-gray-300  bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
            disabled="true"
          >
            <option className="text-customblack ml-2" value="volvo">
              FEDEX
            </option>
            <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
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
        </div> */}
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack mr-[10px]">
            Rec#
          </p>
          <div className="w-full bg-white">
            <span className="text-[14px] text-customblack">
              {subData[0]?.form[0]?.RECEIVING_NUMBER}
            </span>
          </div>
          {/* <input  disabled={false}   type="text" className="w-full bg-white focus:outline-none border focus:border-customGray" /> */}
        </div>
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack">
            R.Date
          </p>
          <div className="w-full bg-white">
            <span className="text-[14px] text-customblack">
              {dateFormat(subData[0]?.form[0]?.RECEIVING_DATE)}
            </span>
          </div>
          {/* <input  disabled={false}   type="text" className="w-full bg-white focus:outline-none border focus:border-customGray" /> */}
        </div>
        <div className="flex items-center bg-white pr-2 mt-3  w-full">
          <div className="bg-green-400 h-[34px] w-[3px] mr-1" />
          <select
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white pr-4  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
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
        {/* <div className="flex gap-3 mt-4">
           <input
        type="checkbox"
        // id={id}
        // checked={checked}
        // onChange={onChange}
        className="form-checkbox h-5 w-5 ml-2 text-blue-600"
      />
      <label  className="ml-2 text-[14px] text-customblack">Charge Tax</label>
        </div> */}
      </div>
      <div className="   w-full  md:w-1/2  flex flex-col gap-3  mt-[2px]">
        <div className="flex gap-2 ml-2 mt-2">
          <p className="text-[14px] text-customblack focus:outline-customblack">
            Ref#
          </p>
          <input
            onChange={handleInputChangeRef}
            disabled={false}
            value={Reference}
            type="text"
            className="w-full bg-white focus:outline-none border focus:border-customGray"
          />
        </div>
        <div className="flex gap-1 ml-2 mt-4">
          <p className="text-[14px] text-customblack focus:outline-customblack">
            Notes
          </p>
          <textarea
            onChange={handleInputChangeNotes}
            disabled={false}
            value={Notes}
            type="text"
            className="w-full h-[100px] bg-white focus:outline-none border focus:border-customGray"
          />
        </div>
        <div className="flex gap-3">
          {/* <div className="flex ml-2 items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
            <select
              className="border-b  border-b-gray-300 py-1 bg-white   w-full shadow-sm outline-none"
              name="whereHouse"
              id="whereHouse"
            >
              <option className="text-customblack" value="volvo">
                CDN$
              </option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <div className="bg-customgreen h-[34px] w-[14px]"></div>

            <div className="flex gap-2 items-center">
              <div className="justify-center items-center gap-2 ">
                <IoIosArrowDown className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
              </div>
              
            </div>
          </div> */}

          {/* <div className="flex ml-2 items-center w-full bg-white  rounded-[4px] border-8 border-customgreen ">
            <select
              className="border-b  border-b-gray-300 py-1 bg-white   w-full shadow-sm outline-none"
              name="whereHouse"
              id="whereHouse"
            >
              <option className="text-customblack" value="volvo">
                AIR
              </option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <div className="bg-customgreen h-[34px] w-[14px]"></div>

            <div className="flex gap-2 items-center">
              <div className="justify-center items-center gap-2 ">
                <IoIosArrowDown className="text-[26px] text-customblack p-1 rounded-[4px] hover:bg-customLightGray" />
              </div>
              
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StockOrderRightForm;
