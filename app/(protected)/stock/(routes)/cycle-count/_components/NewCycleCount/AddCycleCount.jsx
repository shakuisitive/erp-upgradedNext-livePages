import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApiFetch from "../../../../../../../customHook/useApiFetch";
import Modal from "./../../../../../../../components/misc/pureComponents/modal/Modal";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { addCycleCountDetails } from "../../redux/CycleCountSlice";
import { PhysicalCount } from "../../../../../../../components/misc/pureComponents/constants/apiConstant";

const AddCycleCount = ({ title, id }) => {
  const [zero, setZero] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let [error, sendRequest] = useApiFetch();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const SelectedWarid = useSelector(
    (state) => state.CycleCountSlice.SelectedWarid
  );
  const transferList = useSelector(
    (state) => state.CycleCountSlice.transferList
  );
  const physicalCountDetails = useSelector(
    (state) => state.CycleCountSlice.physicalCountDetails
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  // useEffect(() => {
  //   const hasZeroCount = rowData.some((item) => parseInt(item.QUANTITY) === 0);
  //   // const hasZeroLot = dataDetails.some(item => item.LOT_NUMBER === null);

  //   // setLotZero(hasZeroLot)
  //   setZero(hasZeroCount);
  // }, [rowData]);

  const getDetail = (data) => {
    dispatch(addCycleCountDetails(data.Result));
  }



  const handleSelectedOptionChange = (option) => {

    const getDetailPayload = {
      data: {
        WAR_ID: option.WAR_ID,
        PAR_ID: option.PAR_ID,
      },
      action: "InventoryWeb",
      method: "GetAutoCycleCountDetList",
      username: "admin",
      type: "rpc",
      tid: "144",
    };

    sendRequest(
      PhysicalCount.GetAutoCycleCountDetList,
      "POST",
      getDetailPayload,
      getDetail,
      token
    );
  };

  const handleOnFocus = () => {
    // dispatch(getFocused({ title: "Items", focus: true }));
  };
  const handleOnBlur = () => {
    // dispatch(getFocused({ title: "Items", focus: false }));
  };

  const getAvailableOptions = (list) => {
    return transferList.filter((item) => {
      return !physicalCountDetails?.some(
        (selectedItem) => selectedItem.PART_CODE === item.PAR_CODE
      );
    });
  };

  const availableLotList = getAvailableOptions();

  return (
    <div className="m-2">
      {Object.keys(SelectedWarid).length === 0 ? (
        <span className="line-through text-gray-400">+ Add Item</span>
      ) : (
        <Dropdown
          options={availableLotList}
          optionKey1="PART_CODE"
          optionKey2="PART_CODE"
          onSelectedOptionChanged={handleSelectedOptionChange}
          placeholder={`+ Add Item`}
          inputClassName="w-full focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
          dropdownClassName="w-[340px] bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 text-left"
          customFocusKey1="ctrlKey"
          customFocusKey="p"
          isDisabled={
            Object.keys(SelectedWarid).length === 0 ? true : false
            // zero == false && (FormStatus == "New" || venderListData.email != '') ||  FormStatus == "Initiated"  ? false : true
          }
          onClearInputValue={true}
          onHandleFocus={handleOnFocus}
          onHandleBlur={handleOnBlur}
          forwardedRef={dropdownRef}
          isCreateOption={false}
        />
      )}

      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default AddCycleCount;
