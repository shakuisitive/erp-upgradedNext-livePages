import React, { useEffect } from 'react'
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { stockOrderForm } from '../../../redux/stockSlice';
import useApiFetch from '../../../../../../../../customHook/useApiFetch';

const StockOrderLeftForm = () => {

  const dispatch = useDispatch();
  let [error, sendRequest] = useApiFetch();

  let id = useSelector((state) => state.stockSlices?.formIndex);
  const apiUrl = `${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}InventoryWeb/GetStockOrder`;

  const payload = {
    data: {
      INVSTO_ID: `${id?.INVSTO_ID}`,
      OFFSET: "+5.00",
    },
    action: "InventoryWeb",
    method: "GetSaleOrder",
    type: "rpc",
    tid: "144",
  };

  //  const accessToken = localStorage.getItem('tokenSession');
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  function getAllTask(data) {
    const getDataDet = [{
      id: data.Result.Results[0].INVSTO_ID,
      product: data.Result.Table1,
      form: data.Result.Results,
    }];
    dispatch(stockOrderForm(getDataDet));
    // dispatch(setStockOrderFormData(data.Result.Results));
    // dispatch(setStockOrderDetailData(data.Result.Table1));
  }

  // useEffect(() => {
  //   sendRequest(apiUrl, "POST", payload, getAllTask, accessToken);
  // }, []);
  const subData = useSelector((state) => state.stockSlices.subData);
  const wareHouse = useSelector((state) => state.stockSlices.wareHouse);
  const VenderList = useSelector((state) => state.stockSlices.VenderList);
  const vender = VenderList.filter((item) => item.VEN_ID === subData[0]?.form[0]?.VEN_ID)
  const war = wareHouse.filter((item) => item.WAR_ID === subData[0]?.form[0]?.WAR_ID)
  
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
          <select
            className="border-b text-[14px] border-b-gray-300 py-1 bg-white  w-full shadow-sm outline-none"
            name="whereHouse"
            id="whereHouse"
          >
            <option className="text-customblack" value="volvo">
              {vender[0]?.SUPPLIER}
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
              <p>{vender[0]?.ADDRESS_1}</p>
              <p>{vender[0]?.PHONE_1}</p>
              <p>{vender[0]?.EMAIL}</p>
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
          >
            <option className="text-customblack" value="volvo">
              {war[0]?.WAREHOUSE}
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
                {war[0]?.ADDRESS_1}
              </p>
            </div>
          
        </div>
        {/* <div className="flex gap-2  items-center ml-2 mt-[20px]">
          <p className="text-[14px] text-customblack">Req Date</p>
        
            <input
              defaultValue={'MM/DD/YYY'}
              type="date"
              className="bg-gray-50 border px-3 py-1 outline-none"
              placeholder="Select date"
            />
          
        </div> */}
      </div>
    </div>
  )
}

export default StockOrderLeftForm
