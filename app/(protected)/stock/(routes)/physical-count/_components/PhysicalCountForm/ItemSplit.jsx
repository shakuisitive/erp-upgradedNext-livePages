import React, { useRef } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateSku,
  setLotList,
  splitRow,
} from "../../redux/physicalCountSlice";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import useApiFetch from "../../../../../../../customHook/useApiFetch";

const ItemSplit = ({ data, rowData, index }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  let [error, sendRequest] = useApiFetch();

  let partList = useSelector((state) => state.physicalCount.partList);
  const physicalCountForm = useSelector(
    (state) => state.physicalCount.physicalCountForm[0]
  );

  const split = () => {
    dispatch(splitRow(rowData.PHYCOUDET_ID));
  };
  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };

  const getLotList = (data) => {
    dispatch(setLotList(data.Result));
  };

  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  const handleSelectedOptionChange = (option) => {
    const data = {
      PC: option.PAR_CODE,
      SM: option.SKU_MANUFACTURE,
      PI: option.PAR_ID,
      ind: index,
    };
    dispatch(UpdateSku(data));
    const lotlistPayload = {
      data: {
        SEARCH: "",
        ORDER: "CODE ASC",
        RNUM_FROM: "1",
        RNUM_TO: "100",
        ACTIVE_FLAG: "Y",
        PAR_ID: option.PAR_ID,
      },
      action: "Administration",
      method: "GetPartLotList",
      username: "admin",
      type: "rpc",
      tid: "144",
    };
    sendRequest(
      Administration.GetPartLotList,
      "POST",
      lotlistPayload,
      getLotList,
      accessToken
    );
  };
  return (
    <div className="w-full h-full flex justify-center items-center pr-2 ">
      <div className="w-full">
        <Dropdown
          options={partList}
          optionKey1="PAR_CODE"
          optionKey2="PAR_ID"
          onSelectedOptionChanged={handleSelectedOptionChange}
          placeholder="select sku"
          inputClassName="focus:outline-none w-full text-center hover:bg-transparent 
        hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="bg-white w-full border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
          customFocusKey="s"
          isDisabled={
            physicalCountForm.PC_STATUS == "NEW" ||
            physicalCountForm.PC_STATUS == "Initiated"
              ? false
              : true
          }
          onClearInputValue={false}
          onHandleFocus={handleOnFocus}
          onDefaultInput={rowData?.PART_NUMBER}
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
          isCreateOption={false}
        />
      </div>
      {physicalCountForm.PC_STATUS == "NEW" ||
      physicalCountForm.PC_STATUS == "Initiated" ? (
        <div className={`px-4 border-l h-full  items-center flex `}>
          <FaRegSquarePlus
            onClick={split}
            className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer "
          />
        </div>
      ) : (
        <div className={`px-4 border-l h-full  items-center flex `}>
          <FaRegSquarePlus className="text-[22px] text-[#676879] hover:text-[#579BFC] cursor-pointer " />
        </div>
      )}
    </div>
  );
};

export default ItemSplit;
