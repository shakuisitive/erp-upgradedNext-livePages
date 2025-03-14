"use client";
import React, { useState } from "react";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import { setLocations, setPhysicalCountDetails, setSelectedWarid } from "../../redux/physicalCountSlice";
import { Administration } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import VerifyModal from './../../../../../../../components/misc/pureComponents/modal/VerifyModal';

const WarehouseDropdown = ({disable}) => {
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const checkUpdatelist = useSelector((state) => state.physicalCount.wareHouse);
  const physicalCountForm = useSelector((state) => state.physicalCount.physicalCountForm[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token =
  typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  // 2190
  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };
  const getLocations = (res) => {
    if (res?.CODE === "SUCCESS") {
      let secOptions = [];
      let rowOptions = [];
      let binOptions = [];

      let locList = res?.Result?.Results.map((item) => {
        let location = item.LOCATION;
        const hasAlphabets = /[A-Za-z]{2,}/.test(location);
        if (location === "SOSROSBOS") {
          location = "OS";
        } else if (hasAlphabets) {
          location = location.replace(/[SRB]/g, "");
        }
        if (!secOptions.includes(item?.SECTION)) {
          secOptions.push(item?.SECTION);
        }
        if (!rowOptions.includes(item?.ROW)) {
          rowOptions.push(item?.ROW);
        }
        if (!binOptions.includes(item?.BIN)) {
          binOptions.push(item?.BIN);
        }
        return { ...item, value: item.LOCATION, label: location };
      });

      const customSort = (a, b) => {
        if (a === "OS") return 1; // "OS" goes to the end
        if (b === "OS") return -1; // "OS" goes to the end

        // Sort numbers in ascending order 
        return a - b;
      };


      secOptions = secOptions.sort(customSort);
      rowOptions = rowOptions.sort(customSort);
      binOptions = binOptions.sort(customSort);
      dispatch(setLocations({sec: secOptions, row: rowOptions, bin: binOptions, loc: locList}))
    }
  }
  const handleSelectedOptionChange = (option) => {
    // setIsModalOpen(true)
    const warehouseLocationPayload = {
      action: "Administration",
      data: {
        ACTIVE_FLAG: "Y",
        SEARCH: "",
        ORDER: "LOCATION ASC",
        RNUM_FROM: "1",
        RNUM_TO: "100000",
        OFFSET: "",
        WAR_ID: option.WAR_ID,
      },
      method: "GetWarehouseLocationList",
      tid: "144",
      type: "rpc",
      username: "admin",
    };
    if(option.WAR_ID != 2190) {
      sendRequest(
        Administration.GetWareHouseLocations,
        "POST",
        warehouseLocationPayload,
        getLocations,
        token
      );
    } else {
      dispatch(setLocations({sec: [], row: [], bin: []}))
    }
    setSelectedOption(option);
    dispatch(setSelectedWarid(option));
  };

  const handleVerifyCode = () => {
      // dispatch(setPhysicalCountDetails([]))
      setIsModalOpen(false); 
  };

  return (
    <div>
      <Dropdown
        options={checkUpdatelist}
        optionKey1="WAREHOUSE"
        optionKey2="WAR_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Add Warehouse"
        inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName=" bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey="w"
        isDisabled={disable}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput= {physicalCountForm?.INVENTORY}
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
      {isModalOpen && (
        <VerifyModal
          onClose={() => setIsModalOpen(false)}
          cancle={"cancel"}
          verify={"Verify"}
          msg ="Products will be deleted, Do you wish to continue?"
          action={handleVerifyCode}
        />
      )}
    </div>
  );
};

export default WarehouseDropdown;
