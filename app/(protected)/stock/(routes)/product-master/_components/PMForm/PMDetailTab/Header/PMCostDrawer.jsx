import React, { useEffect, useState } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";
import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import { useDispatch, useSelector } from "react-redux";
import TextArea from "../../../../../../../../../components/misc/pureComponents/textinput/TextArea";
import InputTextEut from "../../../../../../../../../components/misc/pureComponents/textinput/InputTextEut";
import { IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";
import Dropdown from "../../../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import {
  setCostDrawer,
  setLandCost,
  setListsPrice,
} from "../../../../redux/pmSlice";

const PMCostDrawer = ({ unitCost, setUnitCost }) => {
  //   const [formColaps, setFormColaps] = useState(true);
  const [currTab, setCurrTab] = useState("Cost");
  const [htCodeCurrent, setHtCodeCurrent] = useState("");
  // const [unitCost, setUnitCost] = useState("");
  const [otherCharges, setOtherCharges] = useState("");
  const [landedCost, setLandedCost] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const HTData = useSelector((state) => state.commonSlices.HTData);
  const costDrawer = useSelector((state) => state.pmSlices.costDrawer);
  const landCost = useSelector((state) => state.pmSlices.landCost);
  const listsPrice = useSelector((state) => state.pmSlices.listPrice);
  const selectedItemCurrent = HTData.find(
    (item) => item.HT_CODE_ID === htCodeCurrent
  );
  //   console.log("form colapse", formColaps);
  //   console.log("option selected item", selectedItemCurrent);

  const handleChangeHtCodeCurrent = (option) => {
    setHtCodeCurrent(option?.HT_CODE_ID);
  };
  useEffect(() => {
    const forex = Number(selectedItemCurrent?.FOREX) || 0;
    const transportFee = Number(selectedItemCurrent?.TRANSPORATION_FEE) || 0;

    const calculatedLandedCost =
      Number(unitCost) + forex + transportFee + Number(otherCharges);
    setLandedCost(calculatedLandedCost);
  }, [unitCost, otherCharges, selectedItemCurrent]);
  useEffect(() => {
    dispatch(setLandCost(landedCost));
  }, [landedCost]);
  useEffect(() => {
    dispatch(setListsPrice(listPrice));
  }, [listPrice]);

  useEffect(() => {
    if (unitCost > 0) {
      const calculatedProfit = ((listPrice - unitCost) / unitCost) * 100;
      setProfit(calculatedProfit);
    } else {
      setProfit(0); // If unitCost is 0 or less, set profit to 0
    }
  }, [unitCost, listPrice]);
  return (
    <div
      className={`right-0 pl-[10px] pr-[10px] border h-[82%] ${
        costDrawer == true
          ? " w-[0px] overflow-hidden"
          : "lgdesktop:w-[20%] desktop:w-[20%]  laptop:w-[20%] tablet:w-[20%] "
      }  bg-white transition-all  duration-300  absolute  rounded-md shadow-md shadow-gray-200 py-2 overflow-auto`}
    >
      <div>
        <div
          onClick={() => dispatch(setCostDrawer(!costDrawer))}
          className="py-2  rounded-r-md cursor-pointer w-fit border -translate-x-[0.5rem] bg-white"
        >
          <IoIosArrowForward className=" text-[18px]  " />
        </div>
      </div>

      <div className={`${costDrawer == true ? "hidden" : ""}`}>
        <div className="flex gap-1 mb-2">
          <div
            className={`${
              currTab == "Cost" ? "border-b-[#0073ea] border-b-[2px]" : ""
            }  pb-[3px] mt-[2px] `}
          >
            <button
              className={`flex items-center text-[14px] w-[100px] relative p-[8px] text-customblack h-[32px] gap-2 line-[24px] after:content-[''] after:h-[16px] after:border-r-[1px] after:border-solid  after:border-[#d0d4e4] rounded-[4px] hover:bg-customHover 
               after:absolute after:right-[0px]`}
              onClick={() => currTabHandler("Cost")}
            >
              <GoHome className="text-[18px] text-customIcon" />
              Cost
            </button>
          </div>
        </div>
      </div>

      <InputTextEut
        type="number"
        placeHolder="Unit Cost"
        value={unitCost}
        onChange={(e) => setUnitCost(e.target.value)}
      />
      <div className="flex items-center border-b border-b-gray-300 w-full bg-white pb-2  mb-2">
        <Dropdown
          options={HTData}
          optionKey1="CODE"
          optionKey2="HT_CODE_ID"
          onSelectedOptionChanged={handleChangeHtCodeCurrent}
          placeholder="Select HT Code"
          inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="w-full bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          // customFocusKey1="shiftKey"
          // customFocusKey2="Z"
          customFocusKey="u"
          isDisabled={false}
          onClearInputValue={false}
          onHandleFocus={() => {}}
          onDefaultInput=""
          // showValue=""
          onHandleBlur={() => {}}
          isCreateOption={false}
        />
      </div>
      <InputTextEut
        placeHolder="Duty"
        // initialValue={formData?.PHONE_1}
        value={selectedItemCurrent?.DUTY_LC_CODE}
        // onChange={handleInputChangePhone}
        isDisabled={true}
      />
      <InputTextEut
        placeHolder="Transportation"
        // initialValue={formData?.EMAIL}
        value={selectedItemCurrent?.TRANSPORATION_FEE}
        isDisabled={true}
      />
      <InputTextEut
        placeHolder="Forex"
        // initialValue={formData?.EMAIL}
        value={selectedItemCurrent?.FOREX}
        isDisabled={true}
      />
      <InputTextEut
        placeHolder="Overhaed"
        // initialValue={formData?.EMAIL}
        value={selectedItemCurrent?.OVERHEADS}
        isDisabled={true}
      />
      <InputTextEut
        placeHolder="Other Charges"
        value={otherCharges}
        onChange={(e) => setOtherCharges(e.target.value)}
      />
      <InputTextEut
        placeHolder="Landed Cost"
        value={landCost}
        isDisabled={true}
      />

      <div className={`${costDrawer == true ? "hidden" : ""}`}>
        <span className="text-[14px] pl-2 font-medium text-[customblack]">
          Price
        </span>
        <div className=" bg-white w-full  rounded-[4px] text-customblack text-[14px] border border-gray-300 p-2">
          <InputTextEut
            placeHolder="Unit Cost"
            // initialValue={formData?.EMAIL}
            value={landCost}
            isDisabled={true}
          />
          <InputTextEut
            placeHolder="Profit"
            isDisabled={true}
            value={profit > 0 ? `${Math.round(profit)}%` : "0%"}
            // onChange={(e) => setOtherCharges(e.target.value)}
          />
          <InputTextEut
            placeHolder="List Price"
            value={listsPrice}
            onChange={(e) => setListPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PMCostDrawer;
