import React, { useEffect, useState } from "react";
import Dropdown from "./../../../../../../components/misc/pureComponents/dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserId, readySubGridPayLoad, setAssignDrawer, setPhysicalCountDetails, setPhysicalCountForm, setRefresh } from "../redux/physicalCountSlice";
import useApiFetch from './../../../../../../customHook/useApiFetch';
import { PhysicalCount } from './../../../../../../components/misc/pureComponents/constants/apiConstant';
import NewButton from './../../../../../../components/misc/pureComponents/buttons/NewButton';
import Modal from "../../../../../../components/misc/pureComponents/modal/Modal";

const AssignDrawer = () => {
  const userList = useSelector((state) => state.physicalCount.userList);
  const physicalCountForm = useSelector(
    (state) => state.physicalCount.physicalCountForm[0]
  );
  const dispatch = useDispatch();
  const handleSelectedOptionChange = (option) => {
    dispatch(UpdateUserId(option.USE_ID));
  };

  const [isSend, setIsSend] = useState(false);
  const [eMessage, setEMessage] = useState("");
  const [isEMessage, setIsErrorMessage] = useState(false);
  let [error, sendRequest] = useApiFetch();

  const payload = useSelector((state) => state.physicalCount.subPayload);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("tokenSession") : null;

  const getDetail = (data) => {
    if (data.CODE == "SUCCESS") {
      dispatch(setRefresh(true));
      dispatch(setPhysicalCountForm([]));
      dispatch(setPhysicalCountDetails([]));
      dispatch(setAssignDrawer(false))
    }
  };

  const getForm = (data) => {
    if (data.CODE == "SUCCESS") {
      sendRequest(
        PhysicalCount.PostPhysicalCountDetail,
        "POST",
        payload.detailPayload,
        getDetail,
        token
      );
    }
  };

  useEffect(() => {
    if (isSend == true) {
      sendRequest(
        PhysicalCount.PostPhysicalCount,
        "POST",
        payload.formPayload,
        getForm,
        token
      );
    }
  }, [isSend]);

  const getUser = userList.find(
    (item) => item.USE_ID == physicalCountForm?.USE_ID_PREPARED_BY
  );

  const handleOnFocus = () => {
    // // console.log('log focus');
  };
  const handleOnBlur = () => {
    // // console.log('log blur');
  };

  const onSubmit = () => {
    if(physicalCountForm.APPROVED_FLAG == "Y") {
        dispatch(readySubGridPayLoad({ id: physicalCountForm.PHYCOU_ID }));
        setIsSend(true);
    } else {
        setEMessage("Select warehouse");
        setIsErrorMessage(true);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="mt-2">
        <NewButton label="Apply" handleClick={onSubmit} />
      </div>
      <div className="w-[300px] border border-gray-300 rounded mt-2 ml-2 p-2">
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
        onDefaultInput={getUser?.USERNAME}
        // showValue=""
        onHandleBlur={handleOnBlur}
        isCreateOption={false}
      />
      </div>
      {isEMessage && (
        <Modal setIsErrorMessage={setIsErrorMessage} eMessage={eMessage} />
      )}
    </div>
  );
};

export default AssignDrawer;
