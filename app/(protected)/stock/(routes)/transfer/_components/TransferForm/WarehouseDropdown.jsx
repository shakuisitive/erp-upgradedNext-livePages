"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import {
  setLocations,
  setPhysicalCountDetails,
  setSelectedWarid,
  setTransferDetails,
  setTransferList,
  updateWarId,
} from "../../redux/TransferSlice";
import {
  Administration,
  PhysicalCount,
  Transfer,
} from "../../../../../../../components/misc/pureComponents/constants/apiConstant";
import VerifyModal from "./../../../../../../../components/misc/pureComponents/modal/VerifyModal";

const WarehouseDropdown = ({ disable }) => {
  let [error, sendRequest] = useApiFetch();
  const dispatch = useDispatch();
  const checkUpdatelist = useSelector((state) => state.TransferSlice.wareHouse);
  const TransferForm = useSelector(
    (state) => state.TransferSlice.TransferForm[0]
  );
  const SelectedWarid = useSelector(
    (state) => state.TransferSlice.SelectedWarid
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSelectionMade, setInitialSelectionMade] = useState(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;
  // 2190
  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };

  const transferList = (data) => {
    dispatch(setTransferList(data.Result));
  };
  useEffect(() => {
    if (initialSelectionMade && selectedOption !== null) {
      setIsModalOpen(true);
    }
  }, [initialSelectionMade, selectedOption]);

  const handleSelectedOptionChange = (option) => {
    setSelectedOption(option);

    if (!initialSelectionMade && selectedOption) {
      setInitialSelectionMade(true);
    }

    const autoTransferList = {
      data: {
        WAR_ID: option.WAR_ID,
      },
      action: "InventoryWeb",
      method: "GetAutoTransferDetailsList",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      Transfer.GetAutoTransferDetailsList,
      "POST",
      autoTransferList,
      transferList,
      token
    );
    if (!initialSelectionMade && !selectedOption) {
      dispatch(setSelectedWarid(option));
      dispatch(updateWarId(option));
    }
    // dispatch(setSelectedWarid(option));
    // dispatch(updateWarId(option));
  };
  // useEffect(() => {
  //   if (!initialSelectionMade) {
  //     dispatch(setSelectedWarid(selectedOption));
  //     dispatch(updateWarId(selectedOption));
  //   }
  // }, []);

  const handleVerifyCode = () => {
    if (initialSelectionMade) {
      dispatch(setSelectedWarid(selectedOption));
      dispatch(updateWarId(selectedOption));
      dispatch(setTransferDetails([]));
    }
    setIsModalOpen(false);
  };
  const warehouse = SelectedWarid?.WAREHOUSE;
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
        onDefaultInput={TransferForm?.INVENTORY_FROM}
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
      {isModalOpen && (
        <VerifyModal
          onClose={() => setIsModalOpen(false)}
          cancle={"Cancel"}
          verify={"Ok"}
          msg="Products will be deleted, Do you wish to continue?"
          action={handleVerifyCode}
        />
      )}
    </div>
  );
};

export default WarehouseDropdown;
