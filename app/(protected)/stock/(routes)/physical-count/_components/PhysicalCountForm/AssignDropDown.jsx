import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { UpdateUserId } from "../../redux/physicalCountSlice";

const AssignDropDown = () => {
  const userList = useSelector((state) => state.physicalCount.userList);
  const physicalCountForm = useSelector((state) => state.physicalCount.physicalCountForm[0]);
  const dispatch = useDispatch();
  const handleSelectedOptionChange = (option) => {
    dispatch(UpdateUserId(option.USE_ID));
  };

  const getUser = userList.find((item) => item.USE_ID == physicalCountForm?.USE_ID_PREPARED_BY)

  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };
  return (
    <div>
      <Dropdown
        options={userList}
        optionKey1="USERNAME"
        optionKey2="USE_ID"
        onSelectedOptionChanged={handleSelectedOptionChange}
        placeholder="+ Add User"
        inputClassName=" focus:outline-none hover:bg-transparent border border-transparent hover:border-gray-200 text-customblack text-[14px] leading-[21px] font-normal"
        dropdownClassName=" bg-white border border-customGray rounded-[4px] mt-1 text-customblack shadow-md shadow-gray-400 "
        // customFocusKey1="shiftKey"
        // customFocusKey2="Z"
        customFocusKey="w"
        isDisabled={false}
        onClearInputValue={false}
        onHandleFocus={handleOnFocus}
        onDefaultInput= {getUser?.USERNAME}
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
    </div>
  );
};

export default AssignDropDown;
