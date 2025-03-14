import React, { useState, useEffect } from "react";
import UseInput from "../../../../../../../../../components/misc/pureComponents/textinput/InputHook";

import UseSelect from "../../../../../../../../../components/misc/pureComponents/textinput/UseSelect";
import useApiFetch from "../../../../../../../../../customHook/useApiFetch";
import { Inventory } from "../../../../../../../../../components/misc/pureComponents/constants/apiConstant";
import { useDispatch } from "react-redux";
import {
  setAccountIDs,
  setNames,
  setName,
} from "../../../../_redux/chartSlice";
const ChartleftForm = ({
  accountID,
  setAccountid,
  name,
  setName,
  code,
  setCode,
  glGroup,
  setGlgroup,
  glGroupType,
  setGlgroupType,
}) => {
  const dispatch = useDispatch();
  const [glGroupList, setGlgroupList] = useState([]);
  let [error, sendRequest] = useApiFetch();

  const handleAccount = (e) => {
    const value = e.target.value;

    // Convert to decimal (float)
    const decimalValue = parseFloat(value);

    // Check if the value is a valid number
    if (!isNaN(decimalValue)) {
      setAccountid(decimalValue); // Set the state with the decimal value
      dispatch(setAccountIDs(decimalValue));
    } else {
      setAccountid(""); // Optionally reset or set an error
    }
  };
  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handleName = (e) => {
    // setName(e.target.value);
    setName(e.target.value);
    dispatch(setNames(e.target.value));
  };
  const handleGlgroup = (e) => {
    setGlgroup(e.target.value);
    let a = e.target.value;
    console.log(a, "aa");

    // Convert 'a' to a number for comparison
    const glType = glGroupList.find((item) => item.GLACCGRO_ID === Number(a));
    console.log(glType, "gltype");
    setGlgroupType(glType.GROUP_TYPE);
  };

  const handleGlgroupList = (data) => {
    console.log(data, "data"); // Log data to inspect the structure
    if (data?.Result) {
      setGlgroupList(data.Result); // Make sure data.Result is the list of provinces
    } else {
      console.error(" data is missing or malformed", data);
    }
  };
  const payloadGLgroupList = {
    data: {
      ORDER: "",
      RNUM_FROM: "1",
      RNUM_TO: "100",
      SEARCH: "",
      ACTIVE_FLAG: "Y",
    },
    action: "InventoryWeb",
    method: "GetGlAccountGroup",
    username: "admin",
    type: "rpc",
    tid: "144",
  };

  const Token =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("tokenSession")
      : null;

  useEffect(() => {
    sendRequest(
      Inventory.GetGlAccountGroup,
      "POST",
      payloadGLgroupList,
      handleGlgroupList,
      Token
    );
  }, []);

  return (
    <div className="w-full h-full mx-auto bg-[#E1EFF2] rounded-[6px] border-customgreen  border py-10 px-20 tablet:w-full">
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Account ID
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={accountID}
            onChange={handleAccount}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder="Account ID"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Name
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={name}
            onChange={handleName}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder="Name"
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className=" p-[8px] font-[500] text-[14px]" htmlFor="code">
          Code
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            isRequired={true}
            value={code}
            onChange={handleCode}
            // disabled={!!CusteditDetForm?.CUSTOMER_CODE}
            placeholder="Code"
          />
        </div>
      </div>

      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          GL Group
        </label>
        <div className="flex flex-col">
          <UseSelect
            options={glGroupList}
            optionKeyId={"GLACCGRO_ID"}
            optionKeyValue={"CODE"}
            type="text"
            placeholder="Select"
            onChange={handleGlgroup}
            value={glGroup}
            // isRequired={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-[170px_auto] mb-[12px]">
        <label className="p-[8px] font-[500] text-[14px]" htmlFor="code">
          GL Group Type
        </label>
        <div className="flex flex-col">
          <UseInput
            type="text"
            placeholder="GL Group Type"
            // onChange={handleGlgroupType}
            value={glGroupType}
            optionKeyId={"GROUP_TYPE"}
            // isRequired={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartleftForm;
